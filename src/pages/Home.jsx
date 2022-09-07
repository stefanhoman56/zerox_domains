import LOGO from '../assets/images/logo.png';
import { useNavigate } from "react-router-dom";
import Collapse from 'react-bootstrap/Collapse';
import { useState } from 'react';

const Home = () => {
    const navigate = useNavigate();

    const gotoAboutus = () => {
        navigate('/aboutus');
    };

    const [collapseOpen, setCollapseOpen] = useState(-1);

    const changeCollapse = (number) => {
        if (number === collapseOpen) {
            setCollapseOpen(-1);
        } else {
            setCollapseOpen(number);
        }
    }

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
                    <div>
                        <div className="bluearea">
                            <h1>FAQ</h1>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading1">
                                        <button onClick={() => changeCollapse(0)} className="accordion-button" type="button" data-bs-toggle="collapse" 
                                            data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                                                Where is my domain stored?
                                        </button>
                                    </h2>
                                    <Collapse id="collapse1" className="accordion-collapse" in={collapseOpen === 0}>
                                        <div className="accordion-body">
                                            Your domain is stored on the blockchain after it has been purchased.
                                        </div>
                                    </Collapse>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button onClick={() => changeCollapse(1)} className="accordion-button" type="button" data-toggle="collapse" 
                                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                What wallets are supported?
                                        </button>
                                    </h2>
                                    <Collapse id="collapseTwo" className="accordion-collapse" in={collapseOpen === 1}>
                                        <div className="accordion-body">
                                            Metamask and Coinbase Wallet are supported.
                                        </div>
                                    </Collapse>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button onClick={() => changeCollapse(2)} className="accordion-button" type="button" data-bs-toggle="collapse" 
                                            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Are there yearly fees for my
                                            domain?
                                        </button>
                                    </h2>
                                    <Collapse id="collapseThree" className="accordion-collapse" in={collapseOpen === 2}>
                                        <div className="accordion-body">Short answer: no.</div>
                                    </Collapse>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading4">
                                        <button  onClick={() => changeCollapse(3)} className="accordion-button" type="button" data-bs-toggle="collapse" 
                                            data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                                How do I know that my domain is on the Ethereum blockchain?
                                        </button>
                                    </h2>
                                    <Collapse id="collapse4" className="accordion-collapse" in={collapseOpen === 3}>
                                        <div className="accordion-body">Straight after you purchase your domain, an Etherscan link will
                                            appear, directing you to the particular domain transaction. Please note that this link
                                            will disappear after you refresh or leave the website.
                                        </div>
                                    </Collapse>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading5">
                                        <button  onClick={() => changeCollapse(4)} className="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                                How do I sell my domain?
                                        </button>
                                    </h2>
                                    <Collapse id="collapse5" className="accordion-collapse collapse"  in={collapseOpen === 4}>
                                        <div className="accordion-body">
                                            Hover over "Your domains" and then select the domain you would like to sell. You can change the price multiple times, paying only gas fees each time.
                                        </div>
                                    </Collapse>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div id="copyright">
                        Copyright © 2022 ZeroX Domains.<br />
                        All Rights Reserved.
                    </div>
                    <div id="aboutus" onClick={gotoAboutus}>
                        <p className="about"> About us</p>
                    </div>
                    <div id="contactus">
                        Contact us&nbsp;&nbsp;&nbsp;
                        <a href="https://twitter.com/ZeroxDomains" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#8090d1" className="bi bi-twitter" viewBox="0 0 16 16">
                                <path
                                    d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z">
                                </path>
                            </svg>
                        </a>
                        <br/>
                        info@zerox.domains
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;