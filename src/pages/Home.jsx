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
    const navigate = useNavigate();

    const gotoAboutus = () => {
        navigate('/aboutus');
    };
s.Contract(ContractAddress, ContractABI, library.getSigner());
            setUserContract(contract);
        } catch (error) {
            setMessage({
                text: error,
                error: true,
            })
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
        const domains = await readContract.getNames(account);
        setUserDomains(domains);
    };

    useEffect(async () => {
        refreshUserDomains();
    }, [account]);

    const publish = async () => {
        if (!newDomain || !newDomain.length) {
            return;
        }
        const domain = newDomain.endsWith(DomainSuffix) ? newDomain : newDomain + DomainSuffix;
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
                await transaction.wait();
                setMessage({
                    text: "Successfully bought domain: " + domain,
                    error: false,
                })
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
        console.log(ethers.utils.parseEther(price))
        setOpenSaleModal(false);
        try {
            const transaction = await userContract.prepareSale(saleDomain, ethers.utils.parseEther(price));
            await transaction.wait();
            setMessage({
                text: `Successfully set the selling price as ${price} ETH for domain ${saleDomain}`,
                error: false
            })
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
                                                onClick={() => showSaleModal(domain)}
                                            >
                                                { sellIndex === index ? (
                                                    <center style={{fontWeight: '600', cursor: 'pointer'}}>
                                                        SELL
                                                    </center>
                                                ) : domain}
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
                        <h3> {initialPrice && `Price: ${initialPrice} ETH`} </h3>
                    </div>
                    <div className="drow searchbar">
                        <input type="text" className="input_domain" placeholder="Search for your new domain" value={newDomain} onKeyDown={handleKeyDown} onChange={(e) => setNewDomain(e.target.value)} />
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
                        { !message.error && (
                            <p id="success">{message.text}</p>
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