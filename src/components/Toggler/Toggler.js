import { useState } from "react";
import "./Toggler.css";
import { Themes } from "react-tradingview-widget";

function Toggler(props) {
  const [isWhite, setIsWhite] = useState(false);

  function switchTheme() {
    if (isWhite) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark"); //add this
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light"); //add this
    }
    setIsWhite(!isWhite);
    props.onToggle();
  }

  const currentTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "dark";

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }

  return (
    <div id="themeToggler">
      <label className="switch">
        <input onChange={switchTheme} type="checkbox" id="checkboxToggler" />
        <span className="slider"></span>
      </label>
    </div>
  );
}
export default Toggler;
