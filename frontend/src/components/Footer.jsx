import { FaFacebook } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"  
import { Link } from "react-router-dom"
import '../style/footer.css'
const Footer = ()=>  {
  
  return (
   <footer>
    {/* Desktop view*/ }   
    <section className="desktop-footer">
      <aside>
        <h2>CJ. Emma</h2>
        <div>
          <Link to="/"> Home </Link>
          <Link to="/about"> About </Link>
        </div>
        <p> &copy; 2025 by CJ. Emma  </p>
        <p>All rights reserved.</p>
      </aside>
      <aside className="Link">
        <Link to="https://www.facebook.com" target="blank"><FaFacebook /></Link>
        <Link to="https://www.twitter.com"><FaTwitter /></Link>
        <Link to="https://www.instagram.com"><FaInstagram /></Link>
        <span><a href="mailto:cajemma122@gmail.com">cajemma122@gmail.com</a></span>
      </aside>
    </section>


   </footer>
  )
}

export default Footer