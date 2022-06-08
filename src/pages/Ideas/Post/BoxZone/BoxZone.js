import "./BoxZone.css";

function BoxZone(props) {
  return (
    <>
      <br />

      <div className="boxZone">
        <div className="topBoxZone">
          <h3>{props.text}</h3>
        </div>

        <div className="boxZoneContent">{props.children}</div>
      </div>
    </>
  );
}
export default BoxZone;
