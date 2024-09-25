import './unauthorized-page.css';
import lockImage from '../../assets/lock-image.jpg';

const UnauthorizedPage = () => {
    return (
      <>
        <div id="unauthorized-container">
          <h1 id="unauthorized-heading">
            Sorry, You Do Not Have Access Privileges to This Part of the
            Application!
          </h1>
        </div>
        <div id="unauthorized-image-container">
            <img src={lockImage} id="lock-img" alt="picture of lock"/>
        </div>
      </>
    );
}


export default UnauthorizedPage;