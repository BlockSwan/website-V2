import { useState } from "react";
import { useMoralisQuery } from "react-moralis";
import IntroBox from "../../components/IntroBox/IntroBox";
import ListCard from "../../components/ListCard/ListCard";
import TopBar2 from "../../components/TopBar/TopBar2";
import "./Crypto.css";

function Crypto() {
  const { data } = useMoralisQuery("Asset");
  const [searchCoin, setSearchCoin] = useState("");
  const asset = JSON.stringify(data, null, 2);
  const objAsset = JSON.parse(asset);

  return (
    <div className="content">
      <TopBar2 to="/" text="Crypto List" />
      <IntroBox text="You may find more details about some digital assets. Feel free to share ideas and proposals in the corresponding Discord Channel!" />
      <br />
      <input
        className="searchCoin"
        type="text"
        placeholder="Search a digital asset..."
        onChange={(event) => {
          setSearchCoin(event.target.value);
        }}
      ></input>

      <br />
      <br />
      {objAsset
        .sort((a, b) => (a.fullname > b.fullname ? 1 : -1))
        // eslint-disable-next-line array-callback-return
        .filter((info) => {
          if (searchCoin === "") {
            return info;
          } else if (
            info.ticker
              .toLowerCase()
              .includes(searchCoin.toLocaleLowerCase()) ||
            info.fullname.toLowerCase().includes(searchCoin.toLocaleLowerCase())
          ) {
            return info;
          }
        })

        .map((info) => {
          return (
            <>
              <ListCard
                ticker={info.ticker}
                fullname={info.fullname}
                exchange={info.exchange}
                sector={info.sector}
                category={info.category}
                icon={info.icon.url}
                messari={info.messari}
              />
            </>
          );
        })}
    </div>
  );
}
export default Crypto;
