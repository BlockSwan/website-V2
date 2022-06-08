import "./Sidebar.css";
import Tile from "../Tile/Tile";
import { useMoralis } from "react-moralis";

function Sidebar() {
  const { isAuthenticated, user } = useMoralis();
  const adminWallet = "8QPt5NNCVTZfFbEf2fZpS3j9MEMjeGtavZ9m7ZSCwTwc";

  return (
    <div id="sidebar">
      <div className="centerSmall">
        {" "}
        <ul className="Sidebar-list">
          <li>
            <Tile to="/metrics" text="metrics" />
          </li>
          <li>
            <Tile to="/ideas" text="ideas" />
          </li>
          <li>
            <Tile to="/crypto" text="crypto" />
          </li>
          <li>
            <Tile to="/learn" text="learn" />
          </li>
          {/* 
          <li>
            <Tile to="/dao" text="dao" />
          </li> */}
          <li>
            <Tile to="/about" text="about" />
          </li>

          {isAuthenticated && user.get("solAddress") === adminWallet ? (
            <li>
              <Tile to="/admin" text="admin" />
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
