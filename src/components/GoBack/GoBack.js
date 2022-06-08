import { NavLink, useNavigate } from "react-router-dom";
import "./GoBack.css";

function GoBack(props) {
  const navigator = useNavigate();
  return (
    <div id="GobackDiv">
      <NavLink to={""} onClick={() => navigator(-1)}>
        <span>
          <h3 id="btnGoback">&lt;&nbsp;Back</h3>
        </span>
      </NavLink>
    </div>
  );
}
export default GoBack;
