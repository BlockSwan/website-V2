import "./TopBanner.css";

function TopBanner(props) {
  return (
    <div id="zoneBanner">
      <h1> {props.text}</h1>
    </div>
  );
}
export default TopBanner;
