import IntroBox from "../../../components/IntroBox/IntroBox";
import ScrollToTop from "../../../components/ScrollToTop/ScrollToTop";
import TopBackNext from "../../../components/TopBar/TopBackNext";

function ValueHints() {
  function ListRule(props) {
    return (
      <>
        <p>
          <span className="numberList">/{props.number}</span>
          &nbsp; {props.text}
        </p>
        <br />
        <hr />
        <br />
      </>
    );
  }

  return (
    <>
      <ScrollToTop>
        {" "}
        <TopBackNext to="my-idea" text="Helpful Hints" />
        <IntroBox
          text="    Thank you for your interest in elevating blockchain technology.
                Before proceeding, please read these helpful tips. Admission to
                BlockSwan Airdrop is very selective. We are looking for
                thoroughly researched, well communicated, attractive investment
                ideas."
        />
        <br />
        <p>Here are a few tips for successful ideas:</p>
        <br />
        <ListRule number="1" text="Your case should stand on its own." />
        <ListRule
          number="2"
          text="Consider whether your case is comparable to a better than average idea found on the site. If it isn’t, wait until you have an idea and writeup that one"
        />
        <ListRule
          number="3"
          text="Coins whose value is significantly determined by the movement of other prices should have an explanation of value that is independent of the asset."
        />
        <ListRule
          number="4"
          text=" If an idea has been posted to the site, we are looking for unique insights and additional research. If an idea has been applied with quite frequently, it is probably a well-followed idea and it will be harder to give insights that we consider unique."
        />
        <ListRule
          number="5"
          text="If an idea isn't compelling, we recommend waiting to apply with an idea that is compelling."
        />
        <ListRule
          number="6"
          text="There is no guideline to length, but generally, the complexity of the write-up should match the complexity of the idea. Bitcoin just can't be written up in 2 pages."
        />
        <ListRule
          number="7"
          text="All ideas are welcome for now so feel free to post multiple."
        />
      </ScrollToTop>
    </>
  );
}

export default ValueHints;
