import './footer.css';
import Logo from '../../assets/issue-insight-logo.png';

function Footer() {
    return (
        <><footer id="footer">
            <div id="app-info-container-footer">
                <p id="icon-para">Developed & Designed by <a href="https://github.com/zacharybaca" target="_blank" rel="noopener noreferrer">Zachary</a></p>
                <p>Built with <span className="tech-description">MongoDB</span>, <span className="tech-description">ExpressJS</span>, <span className="tech-description">ReactJS</span>, and <span className="tech-description">NodeJS</span><br /><br />[<span className="tech-description">MERN Stack</span>]</p>
        </div>
        <div id="tagline-container-footer">
                <h1 id="tagline">Issue Insight — Streamline bug tracking and team collaboration</h1>
                <img src={Logo} alt="logo" />
            </div>
            <div id="contact-container-footer">
                <p>Contact me at: <a href="mailto:bacazachary@icloud.com">bacazachary@icloud.com</a></p>
                <p id="copyright-para">©️ {new Date().getFullYear()} Issue Insight. All rights reserved.</p>
            </div>
        </footer>
        </>
    )
}

export default Footer;
