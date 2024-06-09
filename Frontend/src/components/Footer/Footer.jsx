import playStore from "../../assets/playstore.png"
import appStore from "../../assets/Appstore.png"
import "./footer.css"

const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS Mobile Phone</p>
            <img src={playStore} alt="playStore" />
            <img src={appStore} alt="appStore" />
        </div>


        <div className="midFooter">
            <h1>ECOMMERCE</h1>
            <p>High Quality is our first priority</p>

            <span>Copyrights 2024 &copy; DavidGoyal</span>
        </div>


        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="#">Instagram</a>
            <a href="#">Youtube</a>
            <a href="#">Facebook</a>
        </div>
    </footer>
  )
}

export default Footer