import GoBack from "../GoBack/GoBack";
import "./TopBar.css";

function TopBar(props) {
  return (
    <ul className="topZone">
      <li>
        <GoBack />
      </li>
      <li id="titleCentered">
        <h2> {props.text}</h2>
      </li>
    </ul>
  );
}

export default TopBar;
