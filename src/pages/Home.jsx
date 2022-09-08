import LOGO from '../assets/images/logo.png';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <div>
                <img id="logo" src={LOGO} alt="" />
                <div>
                    <button className="walletButton">
                        Connect Wallet
                    </button>
                </div>
                <div id="searchbar">
                    <div id="newrow">
                        <h1><b>Buy &amp; Sell Your Domains </b></h1>
                        <div id="yourdomains">
                            <p></p>
                        </div>
                    </div>
                    <row>
                        <div id="ox">.0x</div>
                    </row>
                    <div id="flex">
                        <div id="greentext"> </div>
                        <h3> </h3>
                    </div>
                    <row>
                        <input type="text" placeholder="Search for your new domain" />
                        <button id="publish">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z">
                                </path>
                            </svg> 
                            &nbsp;Search
                        </button>
                    </row>
                    <p id="error"></p>
                    <p>
                        <p></p>
                        <p></p>
                        <p id="success"></p>
                    </p>
                    <div className="popup-wrapper"></div>
                    <div id="board"></div>
                </div>
                <FAQ />
                <Footer />
            </div>
        </>
    )
};

export default Home;