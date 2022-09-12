import LOGO from '../assets/images/logo.png';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Web3Modal from "web3modal";
import { useState } from 'react';
import { providerOptions, ContractAddress, DomainSuffix, RinkebyChainID, MainnetChainID } from '../constants';
import { ethers } from "ethers";
import { useEffect } from 'react';
import ContractABI from '../constants/abi';

const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
});

const Home = () => {
    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [error, setError] = useState("");
    const [account, setAccount] = useState();
    const [chainId, setChainId] = useState();
    const [network, setNetwork] = useState();
    const [message, setMessage] = useState("");
    const [signature, setSignature] = useState("");
    const [verified, setVerified] = useState();
    // const [contract, setContract] = useState();
    const [newDomain, setNewDomain] = useState("");
    const [buyDomain, setBuyDomain] = useState("");
    const [initialPrice, setInitialPrice] = useState("");
    const [salePrice, setSalePrice] = useState();
    const [userContract, setUserContract] = useState();
    const [userDomains, setUserDomains] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [sellIndex, setSellIndex] = useState(-1);

    const defaultProvider = new ethers.providers.InfuraProvider(RinkebyChainID, "ddef606e612846de9e71a2174cea02fb");
    const readContract = new ethers.Contract(ContractAddress, ContractABI, defaultProvider);

    const connectWallet = async () => {
        try {
            const provider = await web3Modal.connect();
            const library = new ethers.providers.Web3Provider(provider);
            const accounts = await library.listAccounts();
            const network = await library.getNetwork();
            setProvider(provider);
            setLibrary(library);
            if (accounts)
                setAccount(accounts[0]);
            
            const contract = new ethers.Contract(ContractAddress, ContractABI, library.getSigner());
            setUserContract(contract);
            setChainId(network.chainId);
        } catch (error) {
            setError(error);
        }
    };

    const handleNetwork = (e) => {
        const id = e.target.value;
        setNetwork(Number(id));
    };

    const refreshState = () => {
        setAccount();
        setChainId();
        setNetwork("");
        setMessage("");
        setSignature("");
        // setContract();
        setVerified(undefined);
    };

    const disconnectWallet = () => {
        web3Modal.clearCachedProvider();
        refreshState();
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
            setSalePrice();
            setError();
            buy(domain, price);
        } else if (domainStatus === 1) { // for sale
            let price = await readContract.getPrice(domain);
            price = ethers.utils.formatEther(price);
            setSalePrice(price);
            setError();
        } else if (domainStatus === 2) { // is using
            const owner = await readContract.ownerOfDomain(domain);
            setSalePrice();
            setError(`Unavailable: registered by ${owner}`);
        }
    };

    function capitalizeFirstLetter(string) {
        if (!string) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const buy = async (domain, price) => {
        if (!account) {
            setError("Connect to wallet using the top right button!");
        } else {
            try {
                const transaction = await userContract.registerDomain(domain, {value: ethers.utils.parseEther(price.toString())});
                // const transaction = await userContract.registerDomain(domain, {value: "1000000000"});
                await transaction.wait();
                setSuccessMessage("Successfully bought domain: " + domain);
                refreshUserDomains();
                setSalePrice();
            } catch (error) {
                setError(capitalizeFirstLetter(error.reason));
            }
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
                    <div id="flex">
                        <div id="greentext"> {buyDomain} </div>
                        <h3> {initialPrice && `Price: ${initialPrice} ETH`} </h3>
                    </div>
                    <div className="drow">
                        <input type="text" placeholder="Search for your new domain" value={newDomain} onChange={(e) => setNewDomain(e.target.value)} />
                        <button id="publish" onClick={publish}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z">
                                </path>
                            </svg> 
                            &nbsp;Search
                        </button>
                    </div>
                    <p id="error">{error}</p>
                    <div>
                        { salePrice && (
                            <div id="newr">
                                <p id="buyfrom">
                                    Buy from owner for {salePrice} ETH 
                                </p>
                                <button id="buybut" onClick={() => buy(buyDomain, salePrice)}>
                                    Buy
                                </button>
                            </div>
                        )}
                        <p></p>
                        <p id="success">{successMessage}</p>
                    </div>
                    <div className="popup-wrapper"></div>
                    <div id="board"></div>
                </div>
                <FAQ />
                <Footer />
            </div>
            <div id="popup-root">
                <div data-testid="overlay" data-popup="modal" className="popup-overlay" tabIndex={-1}>
                    <div className="popup-content " role="dialog" id="popup-1">
                        <div className="drow">
                            <h5>List domain for sale</h5>
                        </div>
                        <div className="drow">
                            <h5> tetsuyayama.0x &nbsp;&nbsp;</h5>
                            <input id="priceinput" type="text"/>
                            <h5>&nbsp;&nbsp;ETH</h5>
                        </div>
                        <div className="drow">
                            <p id="font">(Note: 1% of the sale will go to ZeroX Domains)</p>
                        </div>
                        <div className="drow">
                            <div id="cancelb">Cancel</div>
                            <div id="confirmb">Confirm</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;