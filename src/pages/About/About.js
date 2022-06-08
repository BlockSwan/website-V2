import IntroBox from "../../components/IntroBox/IntroBox";
import TopBanner from "../../components/TopBanner/TopBanner";
import "./About.css";

function About() {
  return (
    <div>
      <div className="content">
        <TopBanner text="Schh..You know Blockchain" />
        <IntroBox
          text="We are building a first class blockchain & digital assets organization and a protocol
ending current entry barriers to blockchain technology. We provide new opportunities for hodlers,
writers, analysts, searchers, traders or other actors involved in the revolution to elevate
technology adoption and “crypto” awarness."
        />
        <br />

        <ul id="listAbout">
          <li>
            <h3 className="aboutLink">
              <a
                href="https://discord.gg/ffrzhYEn57"
                target={"_blank"}
                rel="noreferrer"
              >
                <span className="prefix2"></span> Virtual
                Office&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </a>
            </h3>
          </li>
          <li>
            <h3 className="aboutLink">
              <a
                href="https://whitepaper.blockswan.finance/"
                target={"_blank"}
                rel="noreferrer"
              >
                <span className="prefix2"></span> Protocol WhitePaper&nbsp;
              </a>
            </h3>
          </li>
          <li>
            <h3 className="aboutLink">
              <a
                href="https://repository.blockswan.finance/"
                target={"_blank"}
                rel="noreferrer"
              >
                <span className="prefix2"></span> Network Repository&nbsp;&nbsp;
              </a>
            </h3>
          </li>
        </ul>
        <br />
        <div id="videoContainer">
          <iframe
            id="iframeAwake"
            src="https://www.youtube.com/embed/87EO69ehOzk?modestbranding=1&autoplay=0&autohide=1&showinfo=0&controls=0&rel=0"
            title="BlockSwan is Awake"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
export default About;
