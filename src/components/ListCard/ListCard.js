import { NavLink } from "react-router-dom";
import "./ListCard.css";

function ListCard(props) {
  return (
    <>
      <NavLink to={"/crypto/" + props.messari}>
        <div className="maincard">
          <div className="listcard">
            <img className="iconAsset" src={props.icon} alt="iconAsset"></img>
            <h4>{props.fullname}</h4>
            <p className="tickersymbol">{props.ticker}</p>
            <p className="tickersymbol">
              <i>{props.category}</i>
            </p>
          </div>

          <br />
        </div>
      </NavLink>
    </>
  );
}
export default ListCard;
