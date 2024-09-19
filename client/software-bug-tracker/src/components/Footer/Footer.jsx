import './footer.css';
import Logo from '../../assets/issue-insight-logo.png';

function Footer() {
    return (
        <footer id="footer">
            <p>Icons Provided By: <a href="https://icons8.com">Icons8</a></p>
            <img src={Logo} alt="logo" />
            <p>©️2024</p>
        </footer>
    )
}

export default Footer;
