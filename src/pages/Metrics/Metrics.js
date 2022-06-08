import numeral from "numeral";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import BoxZone from "../Ideas/Post/BoxZone/BoxZone";
import "./Metrics.css";
import { useEffect } from "react";
import AUMChart from "./AUMChart/AUMChart";

function Metrics() {
	var { data } = useMoralisQuery("Asset", (query) =>
		query.notEqualTo("usd_balance", null)
	);

	const assetList = JSON.stringify(data, null, 2);
	const objAssetList = JSON.parse(assetList);
	let ibswn_AUM = objAssetList.reduce((a, v) => (a = a + v.usd_balance), 0);

	// eslint-disable-next-line array-callback-return
	const FundHoldings = objAssetList
		.sort((a, b) => b.usd_balance - a.usd_balance)
		// eslint-disable-next-line array-callback-return
		.map((info) => {
			let share = (info.usd_balance / ibswn_AUM) * 100;
			if (share !== 0) {
				return (
					<>
						<tr>
							<td className="imgiIcon">
								<img
									className="iconAsset"
									src={info.icon.url}
									alt="iconAsset"
								></img>
							</td>
							<td>{info.fullname}</td>
							<td>{share.toFixed(2)}%</td>
							<td> {numeral(info.price).format("($0,0.00)")}</td>
							<td> {numeral(info.balance).format("0.0a")}</td>
							<td> {numeral(info.usd_balance).format("($0,0.00)")}</td>
						</tr>
					</>
				);
			}
		});

	function longToShortWallet(long) {
		let n = long.length;
		var begWallet = long.substring(0, 6);
		var short = begWallet.concat("...", long.substring(n - 6, n));

		return short;
	}
	const { Moralis } = useMoralis();

	const [AllUsers, setAllUsers] = useState([]);
	const [CC, setCC] = useState();
	const [nbHolder, setNbHolder] = useState();

	const searchUsers = async () => {
		await Moralis.start({
			appId: "SJ3XaPUatEHsLW1txCV6tnVnz84hdAA96sV3FQqA",
			serverUrl: "https://wtjf6rurajha.usemoralis.com:2053/server",
		});
		const result = await Moralis.Cloud.run("loadUsers");
		const stringed = JSON.stringify(result, null, 2);
		const parsed = JSON.parse(stringed);
		let ibswn_cc = parsed.reduce((a, v) => (a = a + v.ibswn_balance), 0);
		const UserKeys = Object.keys(parsed);
		const objSize = UserKeys.length;
		setNbHolder(objSize);
		setCC(ibswn_cc);
		setAllUsers(parsed);
	};

	useEffect(() => {
		searchUsers();
		console.log(CC, AllUsers, nbHolder);
	}, []);

	// eslint-disable-next-line array-callback-return
	const UserList = AllUsers.sort((a, b) => b.ibswn_balance - a.ibswn_balance)
		// eslint-disable-next-line array-callback-return
		.map((info, key) => {
			let ownings = (info.ibswn_balance / CC) * 100;
			if (ownings !== 0) {
				return (
					<>
						<tr>
							<td>{key + 1}</td>
							<td key={info.objectId}>
								{"bswn" + longToShortWallet(info.objectId)}
							</td>
							<td> {numeral(info.ibswn_balance).format("0.0a")}</td>

							<td>
								<p> {ownings.toFixed(2)}% </p>
								<progress id="file" max="100" value={ownings.toFixed(2)}>
									{" "}
									{ownings.toFixed(2)}%{" "}
								</progress>
							</td>

							<td key={info.ibswn_balanc}>
								{" "}
								{numeral(info.ibswn_balance * (ibswn_AUM / CC)).format(
									"($0,0.00)"
								)}
							</td>
						</tr>
					</>
				);
			}
		});

	return (
		<div>
			<div className="content">
				<TopBar text="Investment Vehicle" />

				<BoxZone text="General iBSWN data">
					<table className="ibswnGINFO">
						<th></th>
						<tbody>
							<tr>
								<td>
									<u>AUM</u>
								</td>

								<td>
									{" "}
									<u>supply</u>
								</td>
								<td>
									{" "}
									<u>price</u>
								</td>
								<td>
									{" "}
									<u>hodlers</u>
								</td>
							</tr>
							<tr>
								<td>
									{" "}
									<h3>{numeral(ibswn_AUM).format("($0.00a)")}</h3>
								</td>
								<td>
									{" "}
									<h3> {numeral(CC).format("0.0a")}</h3>
								</td>

								<td>
									<h3> {numeral(ibswn_AUM / CC).format("($0,0.00)")}</h3>
								</td>
								<td>
									<h3>{nbHolder}</h3>
								</td>
							</tr>
						</tbody>
					</table>
				</BoxZone>
				<br />
				<br />
				<h3>
					<mark>Fund Holdings</mark>
				</h3>
				<br />
				<table id="fundHolding">
					<th></th>
					<tbody>
						<tr>
							<td></td>

							<td>
								{" "}
								<h3>NAME</h3>
							</td>
							<td>
								{" "}
								<h3>SHARE</h3>
							</td>
							<td>
								<h3>PRICE</h3>
							</td>
							<td>
								{" "}
								<h3>AMOUNT</h3>
							</td>
							<td>
								{" "}
								<h3>VALUE</h3>
							</td>
						</tr>
						{FundHoldings}
					</tbody>
				</table>
				<br />
				<br />

				<h3>
					<mark>iBSWN hodlers</mark>
				</h3>
				<br />
				<table id="fundHolding">
					<th></th>
					<tbody>
						<tr>
							<td>
								{" "}
								<h3>RANK</h3>
							</td>

							<td>
								{" "}
								<h3>ADDRESS</h3>
							</td>
							<td>
								{" "}
								<h3>QUANTITY</h3>
							</td>
							<td>
								<h3>% SUPPLY</h3>
							</td>
							<td>
								{" "}
								<h3>VALUE</h3>
							</td>
						</tr>
						{UserList}
					</tbody>
				</table>
				<br />
			</div>
		</div>
	);
}

export default Metrics;
