import { useState } from "react";
import "./Genesis.css";
import Typist from "react-typist";
import CountUp from "react-countup";

function Genesis() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
    if (!isModalVisible) {
      document.body.style.overflow = "hidden";
    }
    if (isModalVisible) {
      document.body.style.overflow = "unset";
    }
  };

  const cursor = {
    show: false,
    blink: false,
    element: "booting...",
    hideWhenDone: true,
    hideWhenDoneDelay: 1,
  };

  const cursor2 = {
    show: true,
    blink: false,
    element: "booting...",
    hideWhenDone: true,
    hideWhenDoneDelay: 1,
  };

  function GenesisContent() {
    return (
      <div id="genesis-content">
        <div id="topContent">
          <h1 id="title">Genesis</h1>
          <h1 id="close" onClick={showModal}>
            X
          </h1>
        </div>

        <div id="bodyGenesis">
          <Typist avgTypingDelay={20} cursor={cursor}>
            <mark>/ BlockSwan is Awake</mark>
          </Typist>
          <br />

          <Typist avgTypingDelay={40} cursor={cursor}>
            <Typist.Delay ms={1000} />
            <p id="loader">(##############################)</p>
          </Typist>

          <p id="percent">
            <CountUp end={100} suffix=" %" delay={0.5} />
          </p>
          <br />

          <Typist avgTypingDelay={-100} cursor={cursor2}>
            <Typist.Delay ms={2800} />
            <p className="winbox-text" id="mission">
              Our mission is to build a platform allowing any individual to
              access blockchain technology knowledge or digital assets exposure
              within a transparent protocol and rewarding ecosystem.
              <br />
              <br />
              &gt; Centralized exchanges, blockchain influencers, and project’s
              increase in marketing expenses has nurtured blockchain awareness
              and created convenient ways for investors to access numerical
              goods through important advances in the interaction and
              manipulation of digital assets – commonly expressed to end-users
              as “crypto.” If the success of these platforms has meant that
              investors are perceiving true opportunities in a risky and
              emergent market, it has also produced several challenges for the
              industry. These include:
              <br />
              <br />
              <mark>Too Many Barriers</mark>
              <br />
              <br />
              &gt; Investors are increasingly having a hard time staying up to
              date with news, talking with involved experts, or simply keeping
              track of their assets within the ecosystem of multiple hardware
              wallet/blockchain addresses. Thus, even if they desire, investor
              can prevent themselves to access blockchain exposure.
            </p>
            <br />
            <br />
            <mark>Lack of knowledge</mark>
            <br />
            <br />
            &gt; While the crypto market growth is attracting new investors,
            they reckon to have about zero knowledge or would call their level
            of understanding as “emerging”, but apparently, that does not
            prevent them to invest, taking more risks often unconsidered.
            <br />
            <br />
            <mark>Missed Opportunities</mark>
            <br />
            <br />
            &gt; As the catalog of digital assets in the market expand thus
            increasing the number of missed opportunities, it has created new
            opportunities for involved builders, experts, or analysts to be
            rewarded for sharing their expertise or knowledge.
          </Typist>
        </div>
      </div>
    );
  }

  return (
    <div>
      {isModalVisible ? (
        <div>
          <div onClick={showModal} className="backdrop" />;
          <GenesisContent />
        </div>
      ) : null}
      <button disabled={isModalVisible} onClick={showModal} id="btnGenesis">
        <h1>Genesis</h1>
      </button>
    </div>
  );
}

export default Genesis;
