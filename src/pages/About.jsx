import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const About = () => {
    const navigate = useNavigate();

    const gotoHome = () => {
        navigate('/');
        window.scrollTo(0, 0);
    };

    return (
        <>
            <div style={{marginTop:'3%'}}>
                <div>
                    <button className="to_home" onClick={gotoHome}>Back to Home</button>
                    <h1 className="about_title"><b>About us</b></h1>
                    <div id="white">
                        <p id="title">What is Zerox Domains?</p>
                        <p id="text">
                            Zerox Domains is a naming service offering the TLD .0x, a fresh variant of what is already
                            available for purchase.
                            <br/><br/>
                            Zerox Domains is based on the Ethereum blockchain, giving you total control of your data.
                        </p>
                    </div>
                    <div id="gray">
                        <p id="title">Availability</p>
                        <p id="text">
                            Any domain can be bought without restriction on character length. We believe that everyone
                            should have the chance of purchasing something unique and special to them.
                            <br/><br/>
                            Currently, only English and Arabic are supported. This will change as the ecosystem develops.
                        </p>
                    </div>
                    <div id="white">
                        <p id="title">Why the TLD .0x?</p>
                        <p id="text">
                            Well, it's simple; every Ethereum-based wallet address begins with the same two characters in
                            the same order: 0x!
                        </p>
                    </div>
                    <div id="gray">
                        <p id="title">The functionality…</p>
                        <p id="text">Zerox Domains aims to provide meaningful functions and integrations so you can utilize your
                            domain to the max.
                        </p>
                    </div>
                    <div id="white">
                        <p id="title">Your domains</p>
                        <p id="text">Through this website, you can buy and sell your domains. The resell fee is capped at 1%.</p>
                    </div>
                </div>
                <Footer link="Home" onLink={gotoHome} />
            </div>
        </>
    )
};

export default About;