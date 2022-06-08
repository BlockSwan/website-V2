import GoBack from "../GoBack/GoBack";
import GoNext from "../GoBack/GoNext";
import "./TopBar.css";

function TopBackNext(props) {
  return (
    <div className="topZone">
      <div className="topbacknext">
        <GoBack />

        <h3>
          <u>{props.text}</u>
        </h3>
        <GoNext to={props.to} />
      </div>
    </div>
  );
}

export default TopBackNext;
