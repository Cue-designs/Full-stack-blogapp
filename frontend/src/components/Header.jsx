import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import '../style/header.css';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="Desktop-nav">
      <div>
        <aside>CJ Emma </aside>
      
       {/*  desktop button */}
        <section>
          <Link to="/"> Home </Link>
          <Link to="/post/"> Blog </Link>
          <Link to="/about"> About </Link>
          <Link to="/login"> Login </Link>
          <Link to="/signup"> Signup </Link>
        </section>
        
        <button ><FaBars onClick={
          ()=>{
            setIsOpen(!isOpen) 
          }
          
          }/></button>

      </div>        


      {/*  mobile button */}
      <section className="mobile" style={{ display: isOpen ? 'block' :'none' }} >
        <Link to="/" className="homebtn"> Home </Link>
        <Link to="/post/"> Blog </Link>
        <Link to="/about"> About </Link>
        <Link to="/login"> Login </Link>  
        <Link to="/signup"> Signup </Link>
      </section>
 </nav>
      
  );
};

export default Header;