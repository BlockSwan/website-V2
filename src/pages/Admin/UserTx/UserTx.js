import numeral from "numeral";
import { useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import BoxZone from "../../Ideas/Post/BoxZone/BoxZone";
import "./UserTx.css";

function UserTx(props) {
  const { Moralis } = useMoralis();

  var { data } = useMoralisQuery("Asset", (query) =>
    query.greaterThan("usd_balance", 0)
  );

  const assetList = JSON.stringify(data, null, 2);
  const objAssetList = JSON.parse(assetList);

  let ibswn_AUM = objAssetList.reduce((a, v) => (a = a + v.usd_balance), 0);

  // eslint-disable-next-line no-redeclare
  var { data } = useMoralisQuery("User");

  const assetUserb = JSON.stringify(data, null, 2);
  const objAssetUserb = JSON.parse(assetUserb);

  let ibswn_cc = objAssetUserb.reduce((a, v) => (a = a + v.ibswn_balance), 0);

  let ibswn_p = ibswn_cc > 0 ? ibswn_AUM / ibswn_cc : 1;

  // eslint-disable-next-line no-redeclare
  var { data } = useMoralisQuery("FundWallet");

  const fundWallet = JSON.stringify(data, null, 2);
  const objFundWallet = JSON.parse(fundWallet);

  let obj = {
    user: "",
    ibswn_price: ibswn_p,
    usdt_amount: 0,
    ibswn_amount: 1,
    wallet_name: "",
    tx_type: "",
    protocol_fee: 0,
  };

  //get monster with id xWMyZ4YEGZ

  const [UserTx, setUserTx] = useState(obj);
  const [UserTxError, setUserTxError] = useState(false);

  function AddNewUserTx(value) {
    if (
      UserTx.user === "" ||
      UserTx.wallet_name === "" ||
      UserTx.tx_type === "" ||
      UserTx.usdt_amount === 0
    ) {
      console.log(UserTx.ibswn_price);
      setUserTxError(true);
    } else {
      setUserTxError(false);

      const TransacUser = Moralis.Object.extend("TxUser");
      const txuser = new TransacUser();

      const TxFund = Moralis.Object.extend("TxFund");
      const txfund = new TxFund();

      txfund.set("tx_type", UserTx.tx_type);
      txfund.set("user", UserTx.user);

      txfund.set("wallet_name", UserTx.wallet_name);
      if (UserTx.tx_type === "DEPOSIT") {
        txfund.set("asset_buy_amount", UserTx.usdt_amount);
        txfund.set("asset_buy_price", 1);
        txfund.set("asset_buy_ticker", "USDT");
        txfund.set("asset_buy_id", "GBoJodUgEhxCZE7xwEe57rtM");
      }
      if (UserTx.tx_type === "WITHDRAW") {
        txfund.set(
          "asset_sell_amount",
          UserTx.usdt_amount - UserTx.protocol_fee * UserTx.ibswn_price
        );
        txfund.set("asset_sell_price", 1);
        txfund.set("asset_sell_ticker", "USDT");
        txfund.set("asset_sell_id", "GBoJodUgEhxCZE7xwEe57rtM");
      }

      txfund.save();
      txuser.save(UserTx);

      const Assetbalance = Moralis.Object.extend("Asset");
      const query = new Moralis.Query(Assetbalance);

      if (UserTx.tx_type === "DEPOSIT") {
        query.get("GBoJodUgEhxCZE7xwEe57rtM").then((asset) => {
          asset.increment("balance", +UserTx.usdt_amount);
          asset.save();
        });
      }

      if (UserTx.tx_type === "WITHDRAW") {
        query.get("GBoJodUgEhxCZE7xwEe57rtM").then((asset) => {
          asset.increment(
            "balance",
            -UserTx.usdt_amount + UserTx.protocol_fee * UserTx.ibswn_price
          );
          asset.save();
        });
      }

      const UserBalance = Moralis.Object.extend("User");
      const query2 = new Moralis.Query(UserBalance);

      if (UserTx.tx_type === "DEPOSIT") {
        query2.get(UserTx.user).then((balance) => {
          balance.increment(
            "ibswn_balance",
            +UserTx.ibswn_amount - UserTx.protocol_fee
          );
          balance.save();
        });
      }
      if (UserTx.tx_type === "WITHDRAW") {
        query2.get(UserTx.user).then((balance) => {
          balance.increment("ibswn_balance", -UserTx.ibswn_amount);
          balance.save();
        });
      }
      const query3 = new Moralis.Query(UserBalance);

      query3.get("DYg07vGATSzhcYmALQdWhnd6").then((balance) => {
        balance.increment("ibswn_balance", +UserTx.protocol_fee);
        balance.save();
      });
    }
  }

  return (
    <BoxZone text="Investors TXs">
      <div className="investorTX">
        <div className="flex">
          <table>
            <th></th>
            <tbody>
              <tr>
                <td> FROM:</td>
                <td>
                  {" "}
                  <select
                    id="useraddress"
                    onChange={(event) =>
                      setUserTx({
                        ...UserTx,
                        user: event.target.value,
                      })
                    }
                  >
                    <option value="">-</option>{" "}
                    {objAssetUserb.map((info) => {
                      return (
                        <>
                          <option
                            key={"bswn" + info.objectId}
                            value={info.objectId}
                          >
                            {"bswn" + info.objectId}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td> FundWallet:</td>
                <td>
                  {" "}
                  <select
                    onChange={(event) =>
                      setUserTx({
                        ...UserTx,
                        wallet_name: event.target.value,
                      })
                    }
                    id="useraddress"
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
                <td> TX Type</td>
                <td>
                  {" "}
                  <select
                    onChange={(event) =>
                      setUserTx({
                        ...UserTx,
                        tx_type: event.target.value,
                      })
                    }
                    id="tx_type"
                  >
                    <option value=""> - </option>{" "}
                    <option value="DEPOSIT">DEPOSIT</option>{" "}
                    <option value="WITHDRAW">WITHDRAW</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div className="center">
          {" "}
          <u>{numeral(ibswn_p).format("($0,0.00)")}/ iBSWN</u>
        </div>
        <br />

        <div className="flex">
          <table>
            <th></th>

            <tbody>
              <tr>
                <td>
                  <input
                    onChange={(event) =>
                      setUserTx({
                        ...UserTx,
                        usdt_amount: event.target.valueAsNumber,
                        ibswn_amount: event.target.valueAsNumber / ibswn_p,
                        protocol_fee:
                          (event.target.valueAsNumber / ibswn_p) * 0.025,
                      })
                    }
                    className="usdt_amount_investorTx"
                    type="number"
                    placeholder="0.00"
                  ></input>{" "}
                  USDT
                </td>
                <td>=</td>
                <td>{UserTx.ibswn_amount} iBSWN </td>{" "}
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div className="center">
          {" "}
          <p>Protocol fee = {UserTx.protocol_fee.toFixed(4)} iBSWN</p>
        </div>
      </div>{" "}
      <br />
      <br />
      <div className="doublebouton">
        <button onClick={() => AddNewUserTx(UserTx)}>Add User Tx</button>
      </div>
      {UserTxError && (
        <>
          {" "}
          <br />
          <div className="errorValueIdea">
            <h3>
              <u>Please take note that:</u>
            </h3>
            <br />
            <p>&gt; user_address is required</p>
            <p>&gt; wallet_name is required</p>
            <p>&gt; tx_type is required</p>
            <p>&gt; usdt_amount is required</p>
          </div>
        </>
      )}
    </BoxZone>
  );
}

export default UserTx;
