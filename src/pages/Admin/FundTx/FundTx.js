import { useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import BoxZone from "../../Ideas/Post/BoxZone/BoxZone";
import "./FundTx.css";

function FundTx(props) {
  var { data } = useMoralisQuery("Asset");
  const { Moralis } = useMoralis();

  const assetList = JSON.stringify(data, null, 2);
  const objAssetList = JSON.parse(assetList);

  // eslint-disable-next-line no-redeclare
  var { data } = useMoralisQuery("FundWallet");

  const fundWallet = JSON.stringify(data, null, 2);
  const objFundWallet = JSON.parse(fundWallet);

  // eslint-disable-next-line no-redeclare
  var { data } = useMoralisQuery("Exchange");

  const exchangeList = JSON.stringify(data, null, 2);
  const objExchangeList = JSON.parse(exchangeList);

  const obj = {
    wallet_name: "",
    exchange_name: "",
    asset_sell_id: "",
    asset_sell_ticker: "",
    asset_sell_amount: 0,
    asset_sell_price: 0,
    asset_buy_id: "",
    asset_buy_ticker: "",
    asset_buy_amount: 1,
    asset_buy_price: 1,
    tx_type: "SWAP",
  };

  //get monster with id xWMyZ4YEGZ

  const [FundTx, setFundTx] = useState(obj);
  const [FundTxError, setFundTxError] = useState(false);

  function AddNewFundTx() {
    if (
      FundTx.wallet_name === "" ||
      FundTx.exchange_name === "" ||
      FundTx.asset_sell_ticker === "" ||
      FundTx.asset_buy_ticker === "" ||
      FundTx.asset_sell_amount === 0 ||
      FundTx.asset_buy_amount === 0
    ) {
      setFundTxError(true);
    } else {
      setFundTxError(false);
      // save(value);

      const TxFund = Moralis.Object.extend("TxFund");
      const txFund = new TxFund();
      txFund.set("wallet_name", FundTx.wallet_name);
      txFund.set("exchange_name", FundTx.exchange_name);
      txFund.set("asset_sell_id", FundTx.asset_sell_id);
      txFund.set("asset_sell_ticker", FundTx.asset_sell_ticker);
      txFund.set("asset_sell_amount", FundTx.asset_sell_amount);
      txFund.set("asset_sell_price", FundTx.asset_sell_price);
      txFund.set("asset_buy_id", FundTx.asset_buy_id);
      txFund.set("asset_buy_ticker", FundTx.asset_buy_ticker);
      txFund.set("asset_buy_amount", FundTx.asset_buy_amount);
      txFund.set("asset_buy_price", FundTx.asset_buy_price);
      txFund.set("tx_type", FundTx.tx_type);

      txFund.save().then(() => {
        // Execute any logic that should take place after the object is saved.
        updateBuyAssetBalance();
        updateSellAssetBalance();
      });
    }
  }

  function updateBuyAssetBalance() {
    let Asset = Moralis.Object.extend("Asset");
    let query = new Moralis.Query(Asset);

    query.get(FundTx.asset_buy_id).then((assetBuy) => {
      assetBuy.increment("balance", FundTx.asset_buy_amount);

      assetBuy.save();
    });
  }

  function updateSellAssetBalance() {
    let Asset = Moralis.Object.extend("Asset");
    let query = new Moralis.Query(Asset);

    query.get(FundTx.asset_sell_id).then((assetSell) => {
      assetSell.increment("balance", -FundTx.asset_sell_amount);
      assetSell.save();
    });
  }

  const assetKeys = Object.keys(objAssetList);
  const objSize = assetKeys.length;

  function changeAssetBuyAmount(event) {
    setFundTx({
      ...FundTx,
      asset_sell_amount: event.target.valueAsNumber,
      asset_buy_amount:
        (event.target.value.valueAsNumber * FundTx.asset_sell_price) /
        FundTx.asset_buy_price,
    });
  }

  function SetAsssetValueBuy(event) {
    for (var i = 0; i < objSize; i++) {
      // eslint-disable-next-line array-callback-return
      objAssetList.map((info) => {
        if (info.ticker === event.target.value) {
          setFundTx({
            ...FundTx,
            asset_sell_price: info.price,
            asset_sell_ticker: event.target.value,
            asset_sell_id: info.objectId,
            asset_buy_amount:
              (FundTx.asset_sell_amount * info.price) / FundTx.asset_buy_price,
          });
        }
      });
    }
  }
  function SetAsssetValueSell(event) {
    for (var i = 0; i < objSize; i++) {
      // eslint-disable-next-line array-callback-return
      objAssetList.map((info) => {
        if (info.ticker === event.target.value) {
          setFundTx({
            ...FundTx,
            asset_buy_price: info.price,
            asset_buy_id: info.objectId,
            asset_buy_ticker: event.target.value,
            asset_buy_amount:
              (FundTx.asset_sell_amount * FundTx.asset_sell_price) / info.price,
          });
        }
      });
    }
  }

  let FundTxValue = FundTx.asset_sell_amount * FundTx.asset_sell_price;

  return (
    <BoxZone text="Fund TXs">
      <div className="investorTX">
        <div className="flex">
          <table>
            <th></th>
            <tbody>
              <tr>
                <td> Wallet name:</td>
                <td>
                  {" "}
                  <select
                    id="walletname"
                    onChange={(event) =>
                      setFundTx({
                        ...FundTx,
                        wallet_name: event.target.value,
                      })
                    }
                  >
                    <option value="">-</option>{" "}
                    {objFundWallet.map((info) => {
                      return (
                        <>
                          <option key={info.walletName} value={info.walletName}>
                            {info.walletName}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td> Exchange name:</td>
                <td>
                  {" "}
                  <select
                    onChange={(event) =>
                      setFundTx({
                        ...FundTx,
                        exchange_name: event.target.value,
                      })
                    }
                    id="exchange_name"
                  >
                    <option value="">-</option>{" "}
                    {objExchangeList.map((info) => {
                      return (
                        <>
                          <option
                            key={info.Exchange_name}
                            value={info.Exchange_name}
                          >
                            {info.Exchange_name}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <div className="flex">
          <table>
            <th></th>
            <tbody>
              <tr>
                <td>
                  <input
                    onChange={(event) => changeAssetBuyAmount(event)}
                    className="usdt_amount_investorTx"
                    type="number"
                    placeholder="0.00"
                  ></input>{" "}
                  <select
                    onChange={(event) => {
                      SetAsssetValueBuy(event);
                    }}
                  >
                    <option value="">-</option>{" "}
                    {objAssetList.map((info) => {
                      return (
                        <>
                          <option key={info.ticker} value={info.ticker}>
                            {info.ticker}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </td>
                <td>=</td>
                <td>{FundTx.asset_buy_amount}</td>
                <td>
                  <select
                    onChange={(event) => {
                      SetAsssetValueSell(event);
                    }}
                  >
                    <option value="">-</option>{" "}
                    {objAssetList.map((info) => {
                      return (
                        <>
                          <option key={info.ticker} value={info.ticker}>
                            {info.ticker}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
      </div>
      <br />
      <p>
        <u>Transaction Value:</u> {FundTxValue.toFixed(2)}$
      </p>
      <p>
        - {FundTx.asset_sell_amount} {FundTx.asset_sell_ticker}{" "}
      </p>
      <p>
        + {FundTx.asset_buy_amount} {FundTx.asset_buy_ticker}{" "}
      </p>

      <br />

      <div className="doublebouton">
        <button onClick={() => AddNewFundTx()}>Add Fund Tx</button>
      </div>

      {FundTxError && (
        <>
          {" "}
          <br />
          <div className="errorValueIdea">
            <h3>
              <u>Please take note that:</u>
            </h3>
            <br />
            <p>&gt; wallet is required</p>
            <p>&gt; exchange is required</p>
            <p>&gt; Input Amount and asset</p>
            <p>&gt; usdt_amount is required</p>
          </div>
        </>
      )}
    </BoxZone>
  );
}

export default FundTx;
