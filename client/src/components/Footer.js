import React from 'react'

const Footer = () => {

    return (
        <div className="footer-container">
            <div>
                <h3>Safety Partners</h3>
                <div className="partner-containers">
                    <div className="footer-card-div">
                        <h4>Recreate Responsibly</h4>
                        <ol>
                            <li>Know before you go</li>
                            <li>Practice physical distancing</li>
                            <li>Plan ahead</li>
                            <li>Play it safe</li>
                            <li>Explore locally</li>
                            <li>Leave no trace</li>
                            <li>Build an inclusive outdoors</li>
                        </ol>
                        <a className="footer-link" href="https://www.recreateresponsibly.org/">Learn More</a>
                    </div>
                    <div className="footer-card-div">
                        <h4>Leave No Trace</h4>
                        <ol>
                            <li>Plan ahead and prepare</li>
                            <li>Travel and camp on durable surfaces</li>
                            <li>Dispose of waste properly</li>
                            <li>Leave what you find</li>
                            <li>Minimize campfire impacts</li>
                            <li>Respect wildlife</li>
                            <li>Be considerate of other visitors</li>
                        </ol>
                        <a className="footer-link" href="https://lnt.org/why/7-principles/">Learn More</a>
                    </div>
                </div>
            </div>
            <div className="about-me-links">
                <h4 className="about-me-h4">About Me</h4>
                <a className="footer-icon-link" href="https://github.com/acyg2212">
                    <i class="fab fa-github"></i>
                </a>
                <a className="footer-icon-link" href="https://acyg2212.github.io/">
                    <i class="far fa-address-card"></i>
                </a>
            </div>
        </div>
    )
}

export default Footer;