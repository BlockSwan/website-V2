import "./Notif.css";
function Notif(props) {
  return (
    <>
      <div className="Notif">
        <p>{props.message}</p>
      </div>
    </>
  );
}
export default Notif;
