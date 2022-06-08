import "./Header.css";
import { NavLink } from "react-router-dom";
import Toggler from "../Toggler/Toggler";
import Account from "../Account/Account";

function Header(props) {
  return (
    <div>
      <header>
        <ul className="header-list">
          <NavLink to="/">
            <div id="Typo"></div>
          </NavLink>
          <li id="tokenprice"></li>

          <div className="authbtnHeader">
            <Account />
          </div>
          <li>
            <Toggler onToggle={() => props.onToggle()} />
          </li>
        </ul>
      </header>
    </div>
  );
}
export default Header;
