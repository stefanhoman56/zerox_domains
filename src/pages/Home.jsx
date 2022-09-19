import LOGO from '../assets/images/logo.png';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Web3Modal from "web3modal";
import { useState } from 'react';
import { providerOptions, ContractAddress, DomainSuffix, RinkebyChainID, MainnetChainID } from '../constants';
import { ethers } from "ethers";
import { useEffect } from 'react';
import ContractABI from '../constants/abi';
import SaleModal from '../components/SaleModal';
import { useNavigate } from "react-router-dom";

const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
});

const Home = () => {
    const [library, setLibrary] = useState();
    const [account, setAccount] = useState();
    const [newDomain, setNewDomain] = useState("");
    const [buyDomain, setBuyDomain] = useState("");
    const [initialPrice, setInitialPrice] = useState("");
    const [buyPrice, setBuyPrice] = useState();
    const [userContract, setUserContract] = useState();
    const [userDomains, setUserDomains] = useState([]);
    const [sellIndex, setSellIndex] = useState(-1);
    const [openSaleModal, setOpenSaleModal] = useState(false);
    const [saleDomain, setSaleDomain] = useState(false);
    const [message, setMessage] = useState({
        text: "",
        error: false,
    })
    const [txAddress, setTxAddress] = useState("");
    const navigate = useNavigate();

    const gotoAboutus = () => {
        navigate('/aboutus');
        window.scrollTo(0, 0);
    };

    const defaultProvider = new ethers.providers.InfuraProvider(RinkebyChainID, "ddef606e612846de9e71a2174cea02fb");
    const readContract = new ethers.Contract(ContractAddress, ContractABI, defaultProvider);

    const connectWallet = async () => {
        try {
            let provider;
            try {
                provider = await web3Modal.connect();
            } catch (error) {
                return;
            }
            const library = new ethers.providers.Web3Provider(provider);
            const accounts = await library.listAccounts();
            setLibrary(library);
            if (accounts)
                setAccount(accounts[0]);
            
            const contract = new ethers.Contract(ContractAddress, ContractABI, library.getSigner());
            setUserContract(contract);
        } catch (error) {
            if (error !== 'Modal closed by user') {
                setMessage({
                    text: error,
                    error: true,
                })
            }
        }
    };

    const disconnectWallet = () => {
        web3Modal.clearCachedProvider();
        setAccount();
        setMessage("");
    };

    const reduceAddress = (address) => {
        return address.substr(0, 6) + "..." + address.substr(-4);
    };

    useEffect(() => {
        if (!library) {
            return;
        }
        // setContract(contract);
    }, [library]);

    const refreshUserDomains = async () => {
        if (!account) {
            return;
        }
        const _domains = await readContract.getNames(account);
        let domains = [];
        _domains.map((domain) => {
            domains.push({
                name: domain,
                sale: false,
            })
        })
        setUserDomains(domains);
        if (domains.length) {
            let result = [];
            for (let i = 0; i < domains.length; i++) {
                const domainStatus = await readContract.domainStatus(domains[i].name);
                result.push({
                    name: domains[i].name,
                    sale: domainStatus.toNumber() == 1,
                })
            }
            setUserDomains(result);
        }
    };

    useEffect(async () => {
        refreshUserDomains();
    }, [account]);

    function onlyLettersAndNumbers(str) {
        return /^[A-Za-z0-9]*$/.test(str);
    }

    const publish = async () => {
        if (!newDomain || !newDomain.length) {
            return;
        }
        let domain = newDomain.toLocaleLowerCase();
        if (domain.endsWith(DomainSuffix)) {
            domain = domain.slice(0, -3);
        }
        if (!domain || !domain.length || !onlyLettersAndNumbers(domain)) {
            setMessage({
                text: 'Only letters and numbers are currently recognized!',
                error: true,
            });
            return;
        }
        domain = domain + DomainSuffix;
        setBuyDomain(domain);
        let price = 10;
        for (let i = 0; i < domain.length - 4; i ++) {
            price /= 2;
        }
        setInitialPrice(price);

        let domainStatus = await readContract.domainStatus(domain);
        domainStatus = domainStatus.toNumber();
        if (domainStatus === 0) { // not exist
            setBuyPrice();
            setMessage({});
            buy(domain, price);
        } else if (domainStatus === 1) { // for sale
            let price = await readContract.getPrice(domain);
            price = ethers.utils.formatEther(price);
            setBuyPrice(price);
            setMessage({});
        } else if (domainStatus === 2) { // is using
            const owner = await readContract.ownerOfDomain(domain);
            setBuyPrice();
            setMessage({
                text: `Unavailable: registered by ${owner}`,
                error: true
            })
        }
    };

    function capitalizeFirstLetter(string) {
        if (!string) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const buy = async (domain, price) => {
        if (!account) {
            setMessage({
                text: "Connect to wallet using the top right button!",
                error: true,
            })
        } else {
            try {
                const transaction = await userContract.registerDomain(domain, {value: ethers.utils.parseEther(price.toString())});
                // const transaction = await userContract.registerDomain(domain, {value: "1000000000"});
                const tx_result = await transaction.wait();
                setMessage({
                    text: "Successfully bought domain: " + domain,
                    error: false,
                })
                setTxAddress(tx_result.transactionHash);
                refreshUserDomains();
                setBuyPrice();
            } catch (error) {
                setMessage({
                    text: capitalizeFirstLetter(error.reason),
                    error: true,
                })
            }
        }
    }

    const showSaleModal = (domain) => {
        setSaleDomain(domain);
        setOpenSaleModal(true);
    }

    const setSalePrice = async (price) => {
        setOpenSaleModal(false);
        try {
            const transaction = await userContract.prepareSale(saleDomain, ethers.utils.parseEther(price));
            const tx_result = await transaction.wait();
            setMessage({
                text: `Successfully set the selling price as ${price} ETH for domain ${saleDomain}`,
                error: false
            });
            setTxAddress(tx_result.transactionHash);
        } catch (error) {
            setMessage({
                text: capitalizeFirstLetter(error.reason),
                error: true
            });
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            publish();
        }
    }

    return (
        <>
            <div>
                <img id="logo" src={LOGO} alt="" />
                <div>
                    { account ? (
                        <button className="walletButton" onClick={disconnectWallet}>
                            Disconnect ({reduceAddress(account)})
                        </button>
                    ):(
                        <button className="walletButton" onClick={connectWallet}>
                            Connect Wallet
                        </button>
                    )}
                </div>
                <div id="searchbar">
                    <div id="newrow">
                        <h1><b>Buy &amp; Sell Your Domains </b></h1>
                        { account && (
                            <div id="yourdomains">
                                <div className="dropdown">
                                    <button className="dropbtn">
                                        Your domains
                                    </button>
                                    <div className="dropdown-content">
                                        {userDomains.map((domain, index) => (
                                            <a 
                                                key={index}
                                                onMouseEnter={() => setSellIndex(index)}
                                                onMouseLeave={() => setSellIndex(-1)}
                                                onClick={() => showSaleModal(domain.name)}
                                                className={domain.sale ? "for-sale" : ""}
                                            >
                                                { sellIndex === index ? (
                                                    <center style={{fontWeight: '600', cursor: 'pointer'}}>
                                                        SELL
                                                    </center>
                                                ) : domain.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="drow">
                        <div id="ox">.0x</div>
                    </div>
                    <div className="searched_domain">
                        <div id="greentext"> {buyDomain} </div>
                        <h3> {initialPrice && `Price: ${parseFloat(initialPrice.toFixed(4))} ETH`} </h3>
                    </div>
                    <div className="drow searchbar">
                        <input
                            type="text"
                            className="input_domain"
                            placeholder="Search for your new domain"
                            value={newDomain}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => {
                                setBuyPrice();
                                setInitialPrice();
                                setBuyDomain();
                                setMessage({});
                                setNewDomain(e.target.value);
                            }}
                        />
                        <button id="publish" onClick={publish}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z">
                                </path>
                            </svg> 
                            &nbsp;Search
                        </button>
                    </div>
                    { message.error && (
                        <p id="error">{message.text}</p>
                    )}
                    <div>
                        { buyPrice && (
                            <div id="newr">
                                <p id="buyfrom">
                                    Buy from owner for {buyPrice} ETH 
                                </p>
                                <button id="buybut" onClick={() => buy(buyDomain, buyPrice)}>
                                    Buy
                                </button>
                            </div>
                        )}
                        <p></p>
                        { !message.error && message.text && (
                            <p id="success">
                                <a target="_blank" href={"https://rinkeby.etherscan.io/tx/" + txAddress}>{message.text}</a>
                            </p>
                        )}
                    </div>
                </div>
                <FAQ />
                <Footer link="About us" onLink={gotoAboutus} />
            </div>
            <SaleModal
                show={openSaleModal}
                onConfirm={setSalePrice}
                onCancel={() => setOpenSaleModal(false)}
                domain={saleDomain}
            />
        </>
    )
};

export default Home;