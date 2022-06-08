import "./Writter.css";
import { Typewriter } from "react-simple-typewriter";

function Writter() {
  return (
    <div className="wrapper">
      <h1 id="caption">
        It's all about&nbsp;
        <mark>
          <Typewriter
            words={["NFTs", "DAOs", "DeFi", "Crypto", "Tech"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={120}
            deleteSpeed={70}
          />
        </mark>
      </h1>
    </div>
  );
}
export default Writter;
