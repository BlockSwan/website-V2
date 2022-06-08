import { NavLink } from "react-router-dom";
import "./GoBack.css";

function GoBack2(props) {
  return (
    <div id="GobackDiv">
      <NavLink to={props.to}>
        <span>
          <h3 id="btnGoback">&lt;&nbsp;Back</h3>
        </span>
      </NavLink>
    </div>
  );
}
export default GoBack2;
