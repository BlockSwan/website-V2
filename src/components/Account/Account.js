import { useMoralis } from "react-moralis";
import { NavLink } from "react-router-dom";
import Address from "../Address/Address";
import "./Account.css";

function Account() {
  const { isAuthenticated } = useMoralis();

  if (!isAuthenticated) {
    return (
      <>
        <NavLink to="/login">
          <p id="btnAuthenticate">Authenticate</p>
        </NavLink>
      </>
    );
  }

  return (
    <div>
      <NavLink to="/profile">
        <button id="btnAuthenticate">
          <Address size={"4"} />
        </button>
      </NavLink>
    </div>
  );
}
export default Account;
