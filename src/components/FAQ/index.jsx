import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import './style.css';

const FAQ = () => {
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
        </>
    )
};

export default FAQ;