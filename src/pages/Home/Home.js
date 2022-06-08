import { NavLink } from "react-router-dom";
import Genesis from "./Genesis/Genesis";
import "./Home.css";
import Network from "./Network/Network";
import TypeWritter from "./Writter/Writter";

function Home() {
  return (
    <div>
      <div className="content">
        <div className="centered">
          <img id="tokenLogo" src="images/gifBSWN.gif" alt="BSWN"></img>
          <h1 id="Slogan">
            Blockchain and digital assets organisation powered by community
            intelligence
          </h1>
          <Network />
          <TypeWritter />
          <Genesis />
          <ul className="bottom-nav">
            <li>
              <NavLink to="/privacy">
                <h3 className="navLink">Privacy Policy</h3>
              </NavLink>
            </li>
            <li>
              <NavLink to="/terms">
                <h3 className="navLink">Terms of Use</h3>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact">
                <h3 className="navLink">Contact Us</h3>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
