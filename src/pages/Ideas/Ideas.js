import { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";
import { NavLink, useLocation } from "react-router-dom";
import IntroBox from "../../components/IntroBox/IntroBox";
import NewIdea from "./NewIdea/NewIdea";
import "./Ideas.css";
import numeral from "numeral";

function Ideas() {
  const location = useLocation();
  const [valueIdeaList, setValueIdeaList] = useState([]);
  const { data } = useMoralisQuery("ValueIdea");

  useEffect(() => {
    const valueidea = JSON.stringify(data, null, 2);
    const objValueIdea = JSON.parse(valueidea);

    setValueIdeaList(objValueIdea);

    console.log("jizz");
  }, [data]);

  function HeaderIdea() {
    if (location.pathname === "/ideas") {
      var index = 0;
    } else if (location.pathname === "/ideas/trades") {
      index = 1;
    } else if (location.pathname === "/ideas/airdrops") {
      index = 2;
    }

    return (
      <>
        {" "}
        <div className="headerAssetTab">
          <div className="navAsset">
            <NavLink to={"/ideas"}>
              <h4 className={index === 0 ? "assetNavLink" : "activeTab"}>
                values
              </h4>
            </NavLink>

            <NavLink to={"/ideas/trades"}>
              <h4 className={index === 1 ? "assetNavLink" : "activeTab"}>
                trades
              </h4>
            </NavLink>

            <NavLink to={"/ideas/aidrops"}>
              <h4 className={index === 2 ? "assetNavLink" : "activeTab"}>
                airdrops
              </h4>
            </NavLink>
          </div>
        </div>
      </>
    );
  }

  if (location.pathname === "/ideas/trades") {
    return (
      <div className="content">
        <HeaderIdea />
        <p>trades</p>
      </div>
    );
  }

  var date2 = 100;
  var visible = true;

  return (
    <div className="content">
      {/* <HeaderIdea /> */}
      <IntroBox text="As BlockSwan protocol is under development, content access restriction is not implemented yet. Data is display live with full access permission for any tier-user so enjoy it wisely until you can!" />
      <br />
      <NewIdea text="New value investment" to="/ideas/post" />
      <br />
      {valueIdeaList
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        .map((info) => {
          var date = new Date(info.createdAt).getDay();

          if (date !== date2) {
            visible = true;
            date2 = date;
          } else {
            visible = false;
          }
          return (
            <>
              {visible ? (
                <>
                  {" "}
                  <div className="blockDay">
                    <h4 className="center">
                      {" "}
                      {new Date(info.createdAt).toLocaleDateString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </h4>
                  </div>
                  <br />
                </>
              ) : null}
              <div className="previewValueIdea">
                <div className="topPreviewValueIdea">
                  <NavLink to={info.objectId} className="navLink">
                    <h3>{info.fullname}</h3>{" "}
                  </NavLink>
                </div>{" "}
                <br />
                <div className="topPreviewValueIdea">
                  <h4>{info.ticker}</h4>
                  &nbsp;| &nbsp;
                  {info.position_type}
                  &nbsp;| &nbsp;
                  {numeral(info.current_price).format("($0,0.00)")}
                  &nbsp;| &nbsp;
                  <i> {numeral(info.current_marketcap).format("($0.00a)")}</i>
                </div>
                <h4>
                  {info.token_type} - {info.blockchain} - {info.supply} Supply
                </h4>
                <p>
                  by <strong>{"bswn" + info.user}</strong>
                </p>{" "}
                <br />
                <NavLink to={info.objectId}>
                  <button className="readWhy">Read Why</button>
                </NavLink>
              </div>
              <br />
              <br />
              <hr />
              <br />
              <br />
            </>
          );
        })}
    </div>
  );
}
export default Ideas;
