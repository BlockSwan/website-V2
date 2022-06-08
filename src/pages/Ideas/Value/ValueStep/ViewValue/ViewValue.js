import numeral from "numeral";
import { useMoralisQuery } from "react-moralis";
import { useParams } from "react-router-dom";
import TopBar from "../../../../../components/TopBar/TopBar";
import "./ViewValue.css";

function ViewValue(props) {
  const params = useParams();

  var { data } = useMoralisQuery("ValueIdea", (query) =>
    query.equalTo("objectId", params.valueIdeaId)
  );

  const valueidea = JSON.stringify(data, null, 2);
  const objValueIdea = JSON.parse(valueidea);

  const DisplayData = objValueIdea.map((info) => {
    return (
      <>
        <div className="flex">
          <h2>{info.fullname}</h2>&nbsp;
          <h4 className="valueIdeaTicker">{info.ticker}</h4>
        </div>
        <br />
        <p>
          {new Date(info.createdAt).toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </p>
        <i>
          by <strong>{"bswn" + info.user}</strong>
        </i>
        <br />
        <div className="flex">
          <h4>{info.position_type} | </h4>
          <p>
            {info.token_type} - {info.blockchain}
          </p>
        </div>
        <br />
        <u>Price:</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {numeral(info.current_price).format("($0,0.00)")} <br />
        <u>Marketcap:</u> &nbsp;
        {numeral(info.current_marketcap).format("($0.00a)")}
        <br />
        <u>24h Volume</u>
        &nbsp;&nbsp;
        {numeral(info.volume_24h).format("($0.00a)")}
        <br />
        <u>Supply:</u>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {info.supply}
        <br /> <br />
        <hr />
        <br />
        <h3>Description</h3>
        <br />
        <div
          className="value_investment"
          dangerouslySetInnerHTML={{
            __html: info.value_investment,
          }}
        ></div>
        <br />
        <br />
        <hr />
        <br />
        <h3>Catalyst</h3>
        <br />
        <p>{info.catalyst}</p>
        <br />
      </>
    );
  });

  return (
    <>
      <div className="content">
        <TopBar text="NOT FINANCIAL ADVICE" />

        {DisplayData}
      </div>
    </>
  );
}

export default ViewValue;
