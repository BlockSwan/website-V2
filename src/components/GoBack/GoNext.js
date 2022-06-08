import { NavLink } from "react-router-dom";
import "./GoBack.css";

function GoNext(props) {
  return (
    <div id="GobackDiv">
      <NavLink to={props.to}>
        <span>
          <h3 id="btnGoback">Next&nbsp;&gt;</h3>
        </span>
      </NavLink>
    </div>
  );
}
export default GoNext;
