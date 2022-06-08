import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IntroBox from "../../../components/IntroBox/IntroBox";
import TopBar from "../../../components/TopBar/TopBar";
import ValueInstruction from "../Value/ValueInstruction";
import ValueHints from "../Value/ValueHints";
import "./Post.css";
import Quill from "./Quill/Quill";
import IdeaIdentif from "../Value/ValueStep/IdeaIdentif/IdeaIdentif";
import IdeaFinancial from "../Value/ValueStep/IdeaFinancial/IdeaFinancial";
import Catalyst from "../Value/ValueStep/Catalyst/Catalyst";
import numeral from "numeral";
import { useMoralis, useNewMoralisObject } from "react-moralis";

function Post(props) {
  const { save } = useNewMoralisObject("ValueIdea");
  const { user } = useMoralis();
  const navigate = useNavigate();
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const location = useLocation();
  const [stepPost, setStepPost] = useState(1);
  const [valueIdeaForm, setValueIdeaForm] = useState({
    fullname: "",
    ticker: "",
    blockchain: "Native",
    token_type: "Payments token",
    position_type: "Long",
    current_price: "0",
    current_marketcap: "0",
    volume_24h: "0",
    supply: "Fixed",
    value_investment: "",
    catalyst: "",
    disclosure: false,
    user: user.id,
  });
  const [valueIdeaError, setValueIdeaError] = useState();
  const [valueIdeaError2, setValueIdeaError2] = useState();

  if (location.pathname === "/ideas/post") {
    var instructionStep = 0;
  } else if (location.pathname === "/ideas/post/helpful-hints") {
    instructionStep = 1;
  } else if (location.pathname === "/ideas/post/helpful-hints/my-idea") {
    instructionStep = 2;
  }

  function NumberSlider() {
    return (
      <>
        <div className="numberSlider">
          <div className="barNumber"></div>
          <div
            className={stepPost >= 1 ? "active-bubbleNumber" : "bubbleNumber"}
            onClick={stepPost >= 1 ? () => setStepPost(1) : null}
          >
            <h2>1</h2>
          </div>
          <div
            className={stepPost >= 2 ? "active-bubbleNumber" : "bubbleNumber"}
            onClick={stepPost >= 2 ? () => setStepPost(2) : null}
          >
            <h2>2</h2>
          </div>
          <div
            onClick={stepPost >= 3 ? () => setStepPost(3) : null}
            className={stepPost >= 3 ? "active-bubbleNumber" : "bubbleNumber"}
          >
            <h2>3</h2>
          </div>
          <div
            onClick={stepPost >= 4 ? () => setStepPost(4) : null}
            className={stepPost >= 4 ? "active-bubbleNumber" : "bubbleNumber"}
          >
            <h2>4</h2>
          </div>
          <div
            onClick={stepPost >= 5 ? () => setStepPost(5) : null}
            className={stepPost >= 5 ? "active-bubbleNumber" : "bubbleNumber"}
          >
            <h2>5</h2>
          </div>
        </div>
      </>
    );
  }

  function BottomNavIdea() {
    function ValidateStep1() {
      if (valueIdeaForm.fullname === "" || valueIdeaForm.ticker === "") {
        setValueIdeaError(true);
      } else {
        setValueIdeaError(false);

        toSecondstep();
      }
    }
    function ValidateStep2() {
      if (
        valueIdeaForm.current_price === "0" ||
        valueIdeaForm.current_marketcap === "0" ||
        valueIdeaForm.current_price === "" ||
        valueIdeaForm.current_marketcap === ""
      ) {
        setValueIdeaError2(true);
      } else {
        setValueIdeaError(false);

        toSecondstep();
      }
    }
    function ValidateStep3() {
      if (valueIdeaForm.value_investment === "") {
        setValueIdeaError(true);
      } else {
        setValueIdeaError(false);
        toSecondstep();
      }
    }

    function ValidateStep4() {
      if (!valueIdeaForm.disclosure) {
        setValueIdeaError(true);
      } else {
        setValueIdeaError(false);

        toSecondstep();
      }
    }
    function toSecondstep() {
      setStepPost(stepPost + 1);
    }

    function toPreviousStep() {
      setStepPost(stepPost - 1);
    }

    function AddNewValueIdea(content) {
      save(content);
      navigate("/ideas");
    }

    // const submitValueIdea = (e) => {
    //   e.preventDefault();
    //   setValueIdeaErrors(validate(valueIdeaForm));

    //   SetIsValueIdeaSubmit(true);
    // };

    return (
      <>
        <div className="bottomNavIdea">
          {stepPost !== 1 ? (
            <>
              <h3 onClick={toPreviousStep} className="buttonBACK">
                &lt; Back
              </h3>
            </>
          ) : null}
          <h3
            onClick={
              stepPost === 1
                ? ValidateStep1
                : stepPost === 2
                ? ValidateStep2
                : stepPost === 3
                ? ValidateStep3
                : stepPost === 4
                ? ValidateStep4
                : () => AddNewValueIdea(valueIdeaForm)
            }
            className="buttonStarYoutown"
          >
            &gt;{" "}
            {stepPost === 5
              ? "Submit idea"
              : stepPost === 4
              ? "Last Step"
              : "Next Step"}
          </h3>
        </div>
      </>
    );
  }

  if (props.type === 1) {
    return (
      <>
        <div className="content">
          {instructionStep === 0 ? <ValueInstruction /> : null}

          {instructionStep === 1 ? <ValueHints /> : null}

          {instructionStep === 2 ? (
            <>
              <TopBar text="My value investment" />
              {stepPost === 1 ? (
                <>
                  <IntroBox text="Before posting any crypto investment ideas, please ensure to read the Investment Idea Guide. Proper writing quality is expected as well as deep investigation and reflexion upon the digital asset." />
                  <br /> <br />
                  <NumberSlider />
                  <IdeaIdentif
                    valueIdeaForm={valueIdeaForm}
                    setValueIdeaForm={setValueIdeaForm}
                  />
                  <br /> <br />
                  {valueIdeaError && (
                    <div className="errorValueIdea">
                      <h3>
                        <u>Please take note that:</u>
                      </h3>
                      <br />
                      <p>&gt; Full digital asset name is required</p>
                      <br />
                      <p>&gt; Asset ticker is required</p>
                    </div>
                  )}
                  <br />
                  <BottomNavIdea />
                </>
              ) : null}

              {stepPost === 2 ? (
                <>
                  {" "}
                  <IntroBox text="Before posting any crypto investment ideas, please ensure to read the Investment Idea Guide. Proper writing quality is expected as well as deep investigation and reflexion upon the digital asset." />
                  <br /> <br />
                  <NumberSlider />
                  <IdeaFinancial
                    valueIdeaForm={valueIdeaForm}
                    setValueIdeaForm={setValueIdeaForm}
                  />
                  <br />
                  <br />{" "}
                  {valueIdeaError2 && (
                    <div className="errorValueIdea">
                      <h3>
                        <u>Please take note that:</u>
                      </h3>
                      <br />
                      <p>
                        &gt; Price eg: 1234.26 | <strike>1.234,26</strike>
                      </p>{" "}
                      <br />
                      <p>&gt; Decimals is up to you & delimited by "."</p>
                      <br />
                      <p>&gt; Current Marketcap is required</p>
                    </div>
                  )}{" "}
                  <br />
                  <BottomNavIdea />
                </>
              ) : null}
              {stepPost === 3 ? (
                <>
                  {" "}
                  <IntroBox text="Here as some questions written in your text editor to guide you along your writing. Don't forget to delete them or they will appear in your value investment idea." />
                  <br /> <br />
                  <NumberSlider />
                  <div className="griZone">
                    <br /> <br />
                    <Quill
                      valueIdeaForm={valueIdeaForm}
                      setValueIdeaForm={setValueIdeaForm}
                    />
                    <br /> <br />{" "}
                    {valueIdeaError && (
                      <div className="errorValueIdea">
                        <h3>
                          <u>Please take note that:</u>
                        </h3>
                        <br />
                        <p>
                          &gt; You need to write your own investment idea.
                          Remember to delete the tools questions for a nicer
                          post!.{" "}
                        </p>
                      </div>
                    )}
                    <br /> <br />
                    <BottomNavIdea />
                  </div>
                </>
              ) : null}
              {stepPost === 4 ? (
                <>
                  {" "}
                  <br /> <br />
                  <NumberSlider />
                  <div className="griZone">
                    <br /> <br />
                    <Catalyst
                      valueIdeaForm={valueIdeaForm}
                      setValueIdeaForm={setValueIdeaForm}
                    />
                    <br />
                    <br />
                    {valueIdeaError && (
                      <div className="errorValueIdea">
                        <h3>
                          <u>Please take note that:</u>
                        </h3>
                        <br />
                        <p>&gt; You need to agree with terms</p>
                      </div>
                    )}
                    <br />
                    <BottomNavIdea />
                  </div>
                </>
              ) : null}
              {stepPost === 5 ? (
                <>
                  <br /> <br />
                  <NumberSlider />
                  <br />
                  <h2 className="center">Preview:</h2>
                  <br />
                  <hr />
                  <br />
                  <div className="flex">
                    <h3>{valueIdeaForm.fullname}&nbsp; </h3>

                    <h3> - {valueIdeaForm.ticker}</h3>
                  </div>
                  <h4>
                    {valueIdeaForm.token_type} - {valueIdeaForm.blockchain}
                  </h4>
                  <p>
                    {" "}
                    {date} by{" "}
                    <i>
                      <span className="writtenby"> {"bswn" + user.id} </span>
                    </i>
                  </p>
                  <h4>{valueIdeaForm.position_type}</h4>
                  <br />
                  <u>Price:</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {numeral(valueIdeaForm.current_price).format(
                    "($0,0.00)"
                  )}{" "}
                  <br />
                  <u>Marketcap:</u> &nbsp;
                  {numeral(valueIdeaForm.current_marketcap).format("($0.00a)")}
                  <br />
                  <u>24h Volume</u>
                  &nbsp;&nbsp;
                  {numeral(valueIdeaForm.volume_24h).format("($0.00a)")}
                  <br />
                  <u>Supply:</u>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {valueIdeaForm.supply}
                  <br /> <br />
                  <hr />
                  <br />
                  <h3>Description</h3>
                  <br />
                  <div
                    className="preview"
                    dangerouslySetInnerHTML={{
                      __html: valueIdeaForm.value_investment,
                    }}
                  ></div>
                  <br />
                  <hr />
                  <br />
                  <h3>Catalyst</h3>
                  <br />
                  <p>{valueIdeaForm.catalyst}</p>
                  <br />
                  <BottomNavIdea />
                </>
              ) : null}
            </>
          ) : null}
        </div>
      </>
    );
  } else {
    return <p>ok</p>;
  }
}
export default Post;
