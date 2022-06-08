import GoBack2 from "../GoBack/GoBack2";
import "./TopBar.css";

function TopBar2(props) {
  return (
    <ul className="topZone">
      <li>
        <GoBack2 to={props.to} />
      </li>
      <li id="titleCentered">
        <h2> {props.text}</h2>
      </li>
    </ul>
  );
}

export default TopBar2;
