import './page-does-not-exist.css';
import notFound from '../../assets/page-not-found-image.jpg';


const PageDoesNotExist = () => {
    return (
        <div id="not-found-main-container">
            <h1 id="not-found-header">The Page You Have Navigated to Does Not Exist!</h1>
            <img src={notFound} id="not-found-image" alt="not-found-spaceship" />
        </div>
    )
}

export default PageDoesNotExist;