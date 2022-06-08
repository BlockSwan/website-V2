import { useMoralis } from "react-moralis";
import IntroBox from "../../components/IntroBox/IntroBox";
import TopBar from "../../components/TopBar/TopBar";
import "./Contact.css";

function Contact() {
  const { Moralis } = useMoralis();
  return (
    <div>
      <div className="content">
        <TopBar direction="/" text="Contact Us" />
        <IntroBox text="Welcome to BlockSwan! You maybe have a question? Feel absolutely free to send us a message via this form. Make sure to join us on Discord so you never miss another announcement or discussion with the strategists or community!" />
        <br />
        <br />
        <div id="contactForm">
          <form>
            <u>Nom:</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              id="contactInput"
              className="contactInput"
              type="text"
              autoComplete="off"
              name="name"
              placeholder="Anon"
            />
            <br />
            <br />
            <u>Email:</u>&nbsp;&nbsp;&nbsp;
            <input
              id="mailUser"
              autoComplete="off"
              className="contactInput"
              type="mail"
              name="email"
              placeholder="satoshi@bitcoin.eth"
            />
            <br />
            <br />
            <u>Your message:</u>&nbsp;
            <br />
            <br />
            <textarea
              id="mailArea"
              placeholder="gm BlockSwan, I would like to talk about ..."
            ></textarea>{" "}
            <br />
            <br />
            <div id="zonebtnSubmit">
              <input type="submit" value="Send!" id="button-mail" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
