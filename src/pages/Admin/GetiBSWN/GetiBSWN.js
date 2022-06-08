/* eslint-disable react-hooks/rules-of-hooks */
import { useMoralisQuery } from "react-moralis";

export function getiBSWNaum() {
  var { data } = useMoralisQuery("Asset", (query) =>
    query.greaterThan("usd_balance", 0)
  );

  const assetList = JSON.stringify(data, null, 2);
  const objAssetList = JSON.parse(assetList);

  let ibswn_AUM = objAssetList.reduce((a, v) => (a = a + v.usd_balance), 0);

  return ibswn_AUM;
}

export function getIbswnMinted() {
  var { data } = useMoralisQuery("TxUser", (query) =>
    query.equalTo("tx_type", "DEPOSIT")
  );

  const assetMintList = JSON.stringify(data, null, 2);
  const objAssetMintList = JSON.parse(assetMintList);

  let ibswn_minted = objAssetMintList.reduce(
    (a, v) => (a = a + v.ibswn_amount),
    0
  );

  return ibswn_minted;
}

export function getIbswnBurned() {
  var { data } = useMoralisQuery("TxUser", (query) =>
    query.equalTo("tx_type", "WITHDRAW")
  );

  const assetBurnList = JSON.stringify(data, null, 2);
  const objAssetBurnList = JSON.parse(assetBurnList);

  let ibswn_burned = objAssetBurnList.reduce(
    (a, v) => (a = a + v.ibswn_amount),
    0
  );

  return ibswn_burned;
}

export function getIbswnCC() {
  var { data } = useMoralisQuery("User");

  const assetUserb = JSON.stringify(data, null, 2);
  const objAssetUserb = JSON.parse(assetUserb);

  let ibswn_cc = objAssetUserb.reduce((a, v) => (a = a + v.ibswn_balance), 0);

  return ibswn_cc;
}

export async function getIbswnPrice() {
  return getiBSWNaum() / getIbswnCC();
}
