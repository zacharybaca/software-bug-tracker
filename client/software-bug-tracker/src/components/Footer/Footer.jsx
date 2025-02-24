import './footer.css';
import Logo from '../../assets/issue-insight-logo.png';

function Footer() {
    return (
        <footer id="footer">
            <div id="app-info-container-footer">
                <p id="icon-para">Developed & Designed by <a href="https://github.com/zacharybaca" target="_blank" rel="noopener noreferrer">Zachary</a></p>
                <p>Built with React, Node.js, and MongoDB</p>
            </div>
            <div id="tagline-container-footer">
                <h1 id="tagline">Issue Insight — Streamline bug tracking and team collaboration</h1>
                <img src={Logo} alt="logo" />
            </div>

            <div id="tech-specs-container-footer">
                <p id="copyright-para">©️ {new Date().getFullYear()} Issue Insight. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;
