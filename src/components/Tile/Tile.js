import { NavLink } from "react-router-dom";
import "./Tile.css";

function Tile(props) {
  return (
    <NavLink to={props.to} activeclassname="active">
      <span className="navLink">&gt; {props.text}</span>
    </NavLink>
  );
}
export default Tile;
