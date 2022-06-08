import axios from "axios";
import { useMoralis, useMoralisQuery } from "react-moralis";

function GetPrice(props) {
  const { Moralis } = useMoralis();
  var { data } = useMoralisQuery("Asset");

  const assetList = JSON.stringify(data, null, 2);

  const objAssetList = JSON.parse(assetList);
  const assetKeys = Object.keys(objAssetList);
  const objSize = assetKeys.length;

  function getAssetList() {
    for (var i = 0; i < objSize; i++) {
      getMessariPrice(
        objAssetList[i]?.messari,
        objAssetList[i]?.messari,
        objAssetList[i]?.objectId,
        objAssetList[i]?.TokenAddress,
        objAssetList[i]?.balance
      );
    }
  }

  function updateAssetBalance() {
    for (var i = 0; i < objSize; i++) {
      const Asset = Moralis.Object.extend("Asset");
      const query = new Moralis.Query(Asset);

      query.get(objAssetList[i]?.objectId).then((asset) => {
        let price = asset.get("price");
        let balance = asset.get("balance");
        asset.set("usd_balance", price * balance);
        console.log(price * balance);
        asset.save();
      });
    }
  }

  async function getMessariPrice(
    ticker,
    props,
    AssetID,
    TokenAddress,
    balance
  ) {
    const url = "https://data.messari.io/api/v1/assets/" + ticker + "/metrics";
    try {
      const response = await axios.get(url);
      var current_price = response.data.data.market_data.price_usd;
      if (current_price === null) {
        const url2 =
          "https://api.pancakeswap.info/api/v2/tokens/" + TokenAddress;
        try {
          const response2 = await axios.get(url2);
          current_price = parseFloat(response2.data.data.price);
        } catch (error) {
          console.log(error);
        }
      }
    } catch {
      const url2 = "https://api.pancakeswap.info/api/v2/tokens/" + TokenAddress;
      try {
        const response2 = await axios.get(url2);
        current_price = parseFloat(response2.data.data.price);
        if (!current_price) {
          const url3 =
            "https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=" +
            TokenAddress +
            "&vs_currencies=usd";
          try {
            const response3 = await axios.get(url3);
            current_price = response3.data[TokenAddress].usd;
          } catch (error) {
            console.log(error);
          }
        }
      } catch {
        const url3 =
          "https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=" +
          TokenAddress +
          "&vs_currencies=usd";
        try {
          const response3 = await axios.get(url3);
          current_price = response3.data[TokenAddress].usd;
        } catch (error) {
          console.log(error);
        }
      }
    }

    const Asset = Moralis.Object.extend("Asset");
    const query = new Moralis.Query(Asset);

    query.get(AssetID).then((asset) => {
      asset.set("price", current_price);
      asset.save();
    });
  }

  return (
    <div className="center">
      <button onClick={() => getAssetList()}>Get Price</button>
      <button onClick={() => updateAssetBalance()}>Update Asset balance</button>
    </div>
  );
}

export default GetPrice;
