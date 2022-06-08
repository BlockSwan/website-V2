import "./Asset.css";
import TradingViewWidget from "react-tradingview-widget";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useMoralisQuery } from "react-moralis";
import { useEffect, useState } from "react";
import axios from "axios";
import numeral from "numeral";
import TopBar2 from "../../../components/TopBar/TopBar2";

function Asset() {
  const params = useParams();
  const location = useLocation();

  var { data } = useMoralisQuery("Asset", (query) =>
    query.equalTo("messari", params.asset)
  );

  const asset = JSON.stringify(data, null, 2);
  const objAsset = JSON.parse(asset);

  if (location.pathname === "/crypto/" + params.asset + "/chart") {
    var index = 1;
  } else if (location.pathname === "/crypto/" + params.asset + "/token") {
    index = 2;
  } else if (location.pathname === "/crypto/" + params.asset + "/market") {
    index = 3;
  } else if (location.pathname === "/crypto/" + params.asset + "/links") {
    index = 4;
  } else {
    index = 0;
  }

  const DisplayData = objAsset.map((info) => {
    function AssetPrice(props) {
      const [assetMarketcap, setAssetMarketcap] = useState([]);
      const [assetData, setAssetData] = useState([]);
      const [assetATHprice, setAssetATHprice] = useState([]);
      const [assetCycleLow, setAssetCycleLow] = useState([]);
      const [assetROI, setAssetROI] = useState([]);
      const [assetSharpe, setAssetSharpe] = useState([]);
      const [assetVolatility, setAssetVolatility] = useState([]);

      const url =
        "https://data.messari.io/api/v1/assets/" + props.ticker + "/metrics";

      useEffect(() => {
        const getAssetData = async () => {
          try {
            const response = await axios.get(url);
            setAssetMarketcap(response.data.data.marketcap);
            setAssetData(response.data.data.market_data);
            setAssetATHprice(response.data.data.all_time_high);
            setAssetCycleLow(response.data.data.cycle_low);
            setAssetROI(response.data.data.roi_data);
            setAssetSharpe(response.data.data.risk_metrics.sharpe_ratios);
            setAssetVolatility(
              response.data.data.risk_metrics.volatility_stats
            );
          } catch (error) {
            console.log(error);
          }
        };
        getAssetData();
      }, [url]);

      var volume = assetData.volume_last_24_hours;
      var marketcap = assetMarketcap.current_marketcap_usd;
      var marketdominance = assetMarketcap.marketcap_dominance_percent;

      var usdPrice = assetData.price_usd;
      var ethPrice = assetData.price_eth;
      var btcPrice = assetData.price_btc;
      var usdPercent = assetData.percent_change_usd_last_24_hours;
      var ethPercent = assetData.percent_change_eth_last_24_hours;
      var btcPercent = assetData.percent_change_btc_last_24_hours;

      var assetATH = assetATHprice.price;
      var assetATHdays = assetATHprice.days_since;
      var percentdown = assetATHprice.percent_down;

      var assetCycleLowPrice = assetCycleLow.price;
      var assetCycleLowDays = assetCycleLow.days_since;
      var assetCycleLowPercent = assetCycleLow.percent_up;

      var usd1weekpercent = assetROI.percent_change_last_1_week;
      var usd1monthPercent = assetROI.percent_change_last_1_month;
      var usd3monthPercent = assetROI.percent_change_last_3_months;
      var usd1yearPercent = assetROI.percent_change_last_1_year;

      var eth1weekpercent = assetROI.percent_change_eth_last_1_week;
      var eth1monthPercent = assetROI.percent_change_eth_last_1_month;
      var eth3monthPercent = assetROI.percent_change_eth_last_3_months;
      var eth1yearPercent = assetROI.percent_change_eth_last_1_year;

      var btc1weekpercent = assetROI.percent_change_btc_last_1_week;
      var btc1monthPercent = assetROI.percent_change_btc_last_1_month;
      var btc3monthPercent = assetROI.percent_change_btc_last_3_months;
      var btc1yearPercent = assetROI.percent_change_btc_last_1_year;

      var yearVolatility = assetVolatility.volatility_last_1_year;
      var year3Volatility = assetVolatility.volatility_last_3_years;
      var days30Volatility = assetVolatility.volatility_last_30_days;
      var days90Volatility = assetVolatility.volatility_last_90_days;

      var yearSharpe = assetSharpe.last_1_year;
      var year3Sharpe = assetSharpe.last_3_years;
      var days30Sharpe = assetSharpe.last_30_days;
      var days90Sharpe = assetSharpe.last_90_days;

      return (
        <>
          <div>
            <h3 className="overviewTitle">Misc data</h3>
            <div className="rowMarket">
              {volume === null || volume === 0 ? null : (
                <div className="dataBox">
                  <p>
                    <u>24h volume</u>
                  </p>
                  <h3>{numeral(volume).format("($ 0.00 a)")}</h3>
                </div>
              )}
              {marketcap === null || marketcap === 0 ? null : (
                <div className="dataBox">
                  <p>
                    <u>marketcap</u>
                  </p>
                  <h3>{numeral(marketcap).format("($ 0.00 a)")}</h3>
                </div>
              )}
              {marketdominance === null || marketdominance === 0 ? null : (
                <div className="dataBox">
                  <p>
                    <u>dominance</u>
                  </p>
                  <h3>{parseFloat(marketdominance).toFixed(2)}%</h3>
                </div>
              )}
            </div>
            <h3 className="overviewTitle">Asset Value</h3>
            <div className="rowMarket">
              {usdPrice === null || usdPrice === 0 ? null : (
                <div className="dataBox">
                  <p>
                    <u>{info.ticker}/USDT</u>
                  </p>
                  <h3>{numeral(usdPrice).format("$0,0.00")}</h3>
                </div>
              )}
              {ethPrice === null || ethPrice === 0 ? null : (
                <div className="dataBox">
                  <p>
                    <u>{info.ticker}/ETH</u>
                  </p>
                  <h3>{parseFloat(ethPrice).toFixed(6)}</h3>
                </div>
              )}
              {info.ticker === "BTC" ||
              btcPrice === 0 ||
              btcPrice === null ? null : (
                <div className="dataBox">
                  <p>
                    <u>{info.ticker}/BTC</u>
                  </p>
                  <h3>{parseFloat(btcPrice).toFixed(8)}</h3>
                </div>
              )}
            </div>
          </div>
          <h3 className="overviewTitle">24h % change</h3>

          <div className="rowMarket">
            {usdPercent === null || usdPercent === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>{info.ticker}/USDT</u>
                </p>
                <h3>{parseFloat(usdPercent).toFixed(2)}%</h3>
              </div>
            )}
            {info.ticker === "ETH" ||
            ethPercent === 0 ||
            ethPercent === null ? null : (
              <div className="dataBox">
                <p>
                  <u>{info.ticker}/ETH</u>
                </p>
                <h3>{parseFloat(ethPercent).toFixed(2)}%</h3>
              </div>
            )}
            {info.ticker === "BTC" ||
            btcPrice === 0 ||
            btcPrice === null ? null : (
              <div className="dataBox">
                <p>
                  <u>{info.ticker}/BTC</u>
                </p>
                <h3>{parseFloat(btcPercent).toFixed(2)}%</h3>
              </div>
            )}
          </div>
          <h3 className="overviewTitle">All Time High</h3>
          <div className="rowMarket">
            {assetATH === null || assetATH === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>ATH price</u>
                </p>
                <h3>{numeral(assetATH).format("$0,0.00")}</h3>
              </div>
            )}

            {assetATHdays === null || assetATHdays === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>since</u>
                </p>
                <h3>{assetATHdays}days</h3>
              </div>
            )}
            {percentdown === null || percentdown === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>percent down</u>
                </p>
                <h3>{parseFloat(percentdown).toFixed(2)}%</h3>
              </div>
            )}
          </div>
          <h3 className="overviewTitle">Cycle Low</h3>
          <div className="rowMarket">
            {assetCycleLowPrice === null || assetCycleLowPrice === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>Low price</u>
                </p>
                <h3>{numeral(assetCycleLowPrice).format("$0,0.00")}</h3>
              </div>
            )}

            {assetCycleLowDays === null || assetCycleLowDays === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>since</u>
                </p>
                <h3>{assetCycleLowDays}days</h3>
              </div>
            )}

            {assetCycleLowPercent === null ||
            assetCycleLowPercent === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>percent up</u>
                </p>
                <h3>{parseFloat(assetCycleLowPercent).toFixed(2)}%</h3>
              </div>
            )}
          </div>
          <h3 className="overviewTitle">{info.ticker}/USDT RoI</h3>
          <div className="rowMarket">
            {usd1weekpercent === null || usd1weekpercent === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>1week</u>
                </p>
                <h3> {parseFloat(usd1weekpercent).toFixed(2)}%</h3>
              </div>
            )}

            {usd1monthPercent === null || usd1monthPercent === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>1month</u>
                </p>
                <h3> {parseFloat(usd1monthPercent).toFixed(2)}%</h3>
              </div>
            )}

            {usd3monthPercent === null || usd3monthPercent === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>3months</u>
                </p>
                <h3> {parseFloat(usd3monthPercent).toFixed(2)}%</h3>
              </div>
            )}
            {usd1yearPercent === null || usd1yearPercent === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>1year</u>
                </p>
                <h3> {parseFloat(usd1yearPercent).toFixed(2)}%</h3>
              </div>
            )}
          </div>
          <h3 className="overviewTitle">{info.ticker}/ETH RoI</h3>
          <div className="rowMarket">
            {eth1weekpercent === null || eth1weekpercent === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>1week</u>
                </p>
                <h3> {parseFloat(eth1weekpercent).toFixed(2)}%</h3>
              </div>
            )}

            {eth1monthPercent === null || eth1monthPercent === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>1month</u>
                </p>
                <h3> {parseFloat(eth1monthPercent).toFixed(2)}%</h3>
              </div>
            )}

            {eth3monthPercent === null || eth3monthPercent === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>3months</u>
                </p>
                <h3> {parseFloat(eth3monthPercent).toFixed(2)}%</h3>
              </div>
            )}
            {eth1yearPercent === null || eth1yearPercent === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>1year</u>
                </p>
                <h3> {parseFloat(eth1yearPercent).toFixed(2)}%</h3>
              </div>
            )}
          </div>
          <h3 className="overviewTitle">{info.ticker}/BTC RoI</h3>
          <div className="rowMarket">
            {btc1weekpercent === null || btc1weekpercent === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>1week</u>
                </p>
                <h3> {parseFloat(btc1weekpercent).toFixed(2)}%</h3>
              </div>
            )}

            {btc1monthPercent === null || btc1monthPercent === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>1month</u>
                </p>
                <h3> {parseFloat(btc1monthPercent).toFixed(2)}%</h3>
              </div>
            )}

            {btc3monthPercent === null || btc3monthPercent === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>3months</u>
                </p>
                <h3> {parseFloat(btc3monthPercent).toFixed(2)}%</h3>
              </div>
            )}
            {btc1yearPercent === null || btc1yearPercent === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>1year</u>
                </p>
                <h3> {parseFloat(btc1yearPercent).toFixed(2)}%</h3>
              </div>
            )}
          </div>
          <h3 className="overviewTitle">Volatility</h3>
          <div className="rowMarket">
            {days30Volatility === null || days30Volatility === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>30 days</u>
                </p>
                <h3> {parseFloat(days30Volatility).toFixed(2)}</h3>
              </div>
            )}
            {days90Volatility === null || days90Volatility === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>90 days</u>
                </p>
                <h3> {parseFloat(days90Volatility).toFixed(2)}</h3>
              </div>
            )}
            {yearVolatility === null || yearVolatility === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>1 year</u>
                </p>
                <h3> {parseFloat(yearVolatility).toFixed(2)}</h3>
              </div>
            )}

            {year3Volatility === null || year3Volatility === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>3 years</u>
                </p>
                <h3> {parseFloat(year3Volatility).toFixed(2)}</h3>
              </div>
            )}
          </div>
          <h3 className="overviewTitle">Sharpe Ratio</h3>
          <div className="rowMarket">
            {days30Sharpe === null || days30Sharpe === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>30 days</u>
                </p>
                <h3> {parseFloat(days30Sharpe).toFixed(2)}</h3>
              </div>
            )}
            {days90Sharpe === null || days90Sharpe === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>90 days</u>
                </p>
                <h3> {parseFloat(days90Sharpe).toFixed(2)}</h3>
              </div>
            )}
            {yearSharpe === null || yearSharpe === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>1 year</u>
                </p>
                <h3> {parseFloat(yearSharpe).toFixed(2)}</h3>
              </div>
            )}

            {year3Sharpe === null || year3Sharpe === 0 ? null : (
              <div className="dataBox">
                <p>
                  <u>3 years</u>
                </p>
                <h3> {parseFloat(year3Sharpe).toFixed(2)}</h3>
              </div>
            )}
          </div>
        </>
      );
    }

    function AssetDescription(props) {
      const [assetBackground, setAssetBackground] = useState([]);
      const [assetDetails, setAssetDetails] = useState([]);
      const [assetGovernance, setAssetGovernance] = useState([]);
      const [assetTech, setAssetTech] = useState([]);

      const url =
        "https://data.messari.io/api/v2/assets/" + props.ticker + "/profile";

      useEffect(() => {
        const getAssetData = async () => {
          try {
            const response = await axios.get(url);
            setAssetBackground(response.data.data.profile.general.background);
            setAssetDetails(response.data.data.profile.general.overview);
            setAssetGovernance(response.data.data.profile.governance);
            setAssetTech(response.data.data.profile.technology.overview);
          } catch (error) {
            console.log(error);
          }
        };
        getAssetData();
      }, [url]);

      var background = assetBackground.background_details;
      var assetdetails = assetDetails.project_details;
      var assetgovernance = assetGovernance.governance_details;
      var asssettech = assetTech.technology_details;

      return (
        <>
          <br />
          <h3 className="overviewTitle">Background</h3>
          <br />
          <div
            id="Assetbackground"
            dangerouslySetInnerHTML={{ __html: background }}
          ></div>
          <br />
          <h3 className="overviewTitle">Project Details</h3>
          <br />
          <div
            id="Assetbackground"
            dangerouslySetInnerHTML={{ __html: assetdetails }}
          ></div>
          <br />
          <h3 className="overviewTitle">Governance</h3>
          <br />
          <div
            id="Assetbackground"
            dangerouslySetInnerHTML={{ __html: assetgovernance }}
          ></div>
          <br />
          <h3 className="overviewTitle">Technology</h3>
          <br />
          <div
            id="Assetbackground"
            dangerouslySetInnerHTML={{ __html: asssettech }}
          ></div>
        </>
      );
    }

    function AssetToken(props) {
      const [assetConsensus, setAssetConsensus] = useState([]);
      const [assetSupply, setAssetSupply] = useState([]);
      const [assetLaunch, setAssetLaunch] = useState([]);
      const [assetTokenUse, setAssetTokenUse] = useState([]);

      const url =
        "https://data.messari.io/api/v2/assets/" + props.ticker + "/profile";

      useEffect(() => {
        const getAssetData = async () => {
          try {
            const response = await axios.get(url);
            setAssetConsensus(
              response.data.data.profile.economics.consensus_and_emission
                .consensus
            );
            setAssetSupply(
              response.data.data.profile.economics.consensus_and_emission.supply
            );
            setAssetLaunch(response.data.data.profile.economics.launch.general);
            setAssetTokenUse(response.data.data.profile.economics.token);
          } catch (error) {
            console.log(error);
          }
        };
        getAssetData();
      }, [url]);

      var consensus = assetConsensus.consensus_details;
      var supply = assetSupply.supply_curve_details;
      var launch = assetLaunch.launch_details;
      var tokenUse = assetTokenUse.token_usage_details;

      return (
        <>
          <br />
          <h3 className="overviewTitle">Consensus</h3>
          <br />
          <div
            id="Assetbackground"
            dangerouslySetInnerHTML={{ __html: consensus }}
          ></div>
          <br />
          <h3 className="overviewTitle">Supply</h3>
          <br />
          <div
            id="Assetbackground"
            dangerouslySetInnerHTML={{ __html: supply }}
          ></div>
          <br />
          <h3 className="overviewTitle">Launch</h3>
          <br />
          <div
            id="Assetbackground"
            dangerouslySetInnerHTML={{ __html: launch }}
          ></div>
          <br />
          <h3 className="overviewTitle">Token Usage</h3>
          <br />
          <div
            id="Assetbackground"
            dangerouslySetInnerHTML={{ __html: tokenUse }}
          ></div>
        </>
      );
    }

    function AssetLink(props) {
      const [assetLinks, setAssetLinks] = useState([]);

      const url =
        "https://data.messari.io/api/v2/assets/" + props.ticker + "/profile";

      useEffect(() => {
        const getAssetData = async () => {
          try {
            const response = await axios.get(url);
            setAssetLinks(
              response.data.data.profile.general.overview.official_links
            );
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        };
        getAssetData();
      }, [url]);

      var officiallinks = assetLinks;

      const showLinks = officiallinks?.map((link) => {
        return (
          <>
            <div className="rowMarket">
              {officiallinks === null || officiallinks === 0 ? null : (
                <div className="dataBox">
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noreferrer"
                    className="assetlink"
                  >
                    <h3 className="navLink">&gt; {link.name}</h3>
                  </a>
                </div>
              )}
            </div>
            <hr />
          </>
        );
      });

      return (
        <>
          <h3 className="overviewTitle">Official Links</h3>
          {showLinks}
        </>
      );
    }

    function HeaderAsset() {
      return (
        <>
          <TopBar2 to="/crypto" text={info.fullname + " $" + info.ticker} />
          <div className="headerAssetTab">
            <div className="navAsset">
              <NavLink to={"/crypto/" + params.asset}>
                <h4 className={index === 0 ? "assetNavLink" : "activeTab"}>
                  notes
                </h4>
              </NavLink>

              <NavLink to={"/crypto/" + params.asset + "/chart"}>
                <h4 className={index === 1 ? "assetNavLink" : "activeTab"}>
                  chart
                </h4>
              </NavLink>

              <NavLink to={"/crypto/" + params.asset + "/token"}>
                <h4 className={index === 2 ? "assetNavLink" : "activeTab"}>
                  token
                </h4>
              </NavLink>
              <NavLink to={"/crypto/" + params.asset + "/market"}>
                <h4 className={index === 3 ? "assetNavLink" : "activeTab"}>
                  data
                </h4>
              </NavLink>
              <NavLink to={"/crypto/" + params.asset + "/links"}>
                <h4 className={index === 4 ? "assetNavLink" : "activeTab"}>
                  links
                </h4>
              </NavLink>
            </div>
          </div>
          <br />
          <div className="topassetdetail">
            <div className="smallSizetopAsset">
              <div className="logoBoxandinfo">
                <div id="bigIconContainer">
                  <img
                    className="iconAssetBig"
                    src={info.icon.url}
                    alt="iconAsset"
                  ></img>
                </div>
                <div className="infoTicker ">
                  <h4 className="tickerbox">{info.category}</h4>
                  <h3 className="tickerbox">{info.sector}</h3>
                </div>
              </div>
            </div>
            <div className="assetLogoBox"></div>
          </div>
          <br />
        </>
      );
    }

    if (location.pathname === "/crypto/" + params.asset + "/chart") {
      return (
        <div className="content">
          <HeaderAsset />
          <div className="WidgetTradingView">
            <TradingViewWidget symbol={info.exchange} locale="fr" autosize />
          </div>
        </div>
      );
    }

    if (location.pathname === "/crypto/" + params.asset + "/token") {
      return (
        <div className="content">
          <HeaderAsset />
          <AssetToken ticker={info.messari} />
        </div>
      );
    }
    if (location.pathname === "/crypto/" + params.asset + "/market") {
      return (
        <div className="content">
          <HeaderAsset />
          <AssetPrice ticker={info.messari} />
        </div>
      );
    }

    if (location.pathname === "/crypto/" + params.asset + "/links") {
      return (
        <div className="content">
          <HeaderAsset />
          <hr /> <br />
          <h2 className="assetSloganBig">{info.tagline}</h2>
          <br />
          <AssetLink ticker={info.messari} />
        </div>
      );
    }
    return (
      <div className="content">
        <HeaderAsset />
        <hr /> <br />
        <h2 className="assetSloganBig">{info.tagline}</h2>
        <br />
        <AssetDescription ticker={info.messari} />
      </div>
    );
  });

  return <>{DisplayData}</>;
}
export default Asset;
