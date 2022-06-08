import numeral from "numeral";
import { useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Address from "../../components/Address/Address";
import Notif from "../../components/Notif/Notif";
import TopBanner from "../../components/TopBanner/TopBanner";
import "./Profile.css";

function Profile() {
  const {
    Moralis,
    refetchUserData,
    user,
    logout,
    setUserData,
    userError,
    isUserUpdating,
  } = useMoralis();
  const [isNotifVisible, setIsNotifVisible] = useState(false);
  const loc = useNavigate();

  const copy = (tocopy) => {
    navigator.clipboard.writeText(tocopy).then(
      function () {
        setIsNotifVisible(true);
        setTimeout(function () {
          setIsNotifVisible(false);
        }, 3000);
      },
      function () {
        console.log("fail to copy");
      }
    );
  };

  function LogOut() {
    logout();
    loc("/");
  }

  var { data } = useMoralisQuery("Asset", (query) =>
    query.greaterThan("usd_balance", 0)
  );

  const assetList = JSON.stringify(data, null, 2);
  const objAssetList = JSON.parse(assetList);

  let ibswn_AUM = objAssetList.reduce((a, v) => (a = a + v.usd_balance), 0);

  const [AllUsers, setAllUsers] = useState([]);
  const [CC, setCC] = useState();

  const searchUsers = async () => {
    const result = await Moralis.Cloud.run("loadUsers");
    const stringed = JSON.stringify(result, null, 2);
    const parsed = JSON.parse(stringed);
    let ibswn_cc = parsed.reduce((a, v) => (a = a + v.ibswn_balance), 0);
    setCC(ibswn_cc);
    setAllUsers(parsed);
  };

  let ibswn_p = CC > 0 ? ibswn_AUM / CC : 1;

  useEffect(() => {
    searchUsers();
    console.log(CC, AllUsers);
  }, []);

  const [isUserInfo, setisUserInfo] = useState({
    name: "",
    email: "",
  });

  const [isUsername, setIsUsername] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  if (user) {
    return (
      <div>
        <div className="content">
          <TopBanner text="Investor Profile" />

          <div className="center">
            {" "}
            <button id="btnAuthenticate" onClick={() => LogOut()}>
              &nbsp; &nbsp;Logout&nbsp; &nbsp;
            </button>
          </div>
          <br />
          {user.get("ibswn_balance") !== undefined && (
            <div className="center">
              <table className="ibswnGINFO">
                <th></th>
                <tbody>
                  <tr>
                    <td className="">
                      <u>iBSWN balance:</u>
                    </td>
                    <td>{user.get("ibswn_balance").toFixed(4)}</td>
                  </tr>
                  <tr>
                    <td>
                      <u>value:</u>
                    </td>
                    <td>
                      {" "}
                      {numeral(user.get("ibswn_balance") * ibswn_p).format(
                        "($0,0.00)"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <br />
          <div className="investorCard">
            <div className="flex">
              <div>
                <p>
                  <b>SOLANA ADDRESS</b>
                </p>
                <div className="flex">
                  {" "}
                  &gt;&nbsp;
                  <Address size={"9"} />
                </div>
              </div>
              <i
                className="fa fa-copy"
                onClick={() => copy(user.get("solAddress"))}
              ></i>
              <a
                href={`https://explorer.solana.com/address/${user.get(
                  "solAddress"
                )}`}
                target="blank"
              >
                <i className="fa fa-link"></i>
              </a>
            </div>
            <br />
            <div className="flex">
              <div>
                <p>
                  <b>BLOCKSWAN ADDRESS</b>
                </p>
                <p>&gt; {"bswn" + user.id}</p>
              </div>
              <i
                className="fa fa-copy"
                onClick={() => copy("bswn" + user.id)}
              ></i>
            </div>
            <br />
            <div className="flex" style={{ justifyContent: "space-between" }}>
              <div>
                <p>
                  <b>USERNAME</b>
                </p>
                {!isUsername || user.get("username") === null ? (
                  <p>&gt; {user.get("username")}</p>
                ) : (
                  <input
                    value={isUserInfo.name}
                    onChange={(event) =>
                      setisUserInfo({
                        ...isUserInfo,
                        name: event.target.value,
                      })
                    }
                    autoComplete="off"
                    type="text"
                    name="username"
                    placeholder="username"
                  />
                )}
              </div>
              {!isUsername ? (
                <i
                  className="fa fa-gear"
                  onClick={() => setIsUsername(true)}
                ></i>
              ) : (
                <i
                  className="fa fa-check"
                  onClick={() => {
                    setIsUsername(false);
                    setUserData({
                      username: isUserInfo.name,
                    });
                    refetchUserData();
                  }}
                ></i>
              )}
            </div>
            <br />
            <div className="flex" style={{ justifyContent: "space-between" }}>
              <div>
                <p>
                  <b>Email</b>
                </p>
                {!isEmail || user.get("email") === null ? (
                  <p>&gt; {user.get("email")}</p>
                ) : (
                  <input
                    value={isUserInfo.email}
                    onChange={(event) =>
                      setisUserInfo({
                        ...isUserInfo,
                        email: event.target.value,
                      })
                    }
                    autoComplete="off"
                    type="text"
                    name="email"
                    placeholder="email@gmail.com"
                  />
                )}
              </div>
              {!isEmail ? (
                <i className="fa fa-gear" onClick={() => setIsEmail(true)}></i>
              ) : (
                <i
                  className="fa fa-check"
                  onClick={() => {
                    setIsEmail(false);
                    setUserData({
                      email: isUserInfo.email,
                    });
                    refetchUserData();
                  }}
                ></i>
              )}
            </div>
            {userError && <p>{userError.message}</p>}
          </div>
        </div>
        {isNotifVisible ? <Notif message={"Address copied!"} /> : null}
      </div>
    );
  }

  return <></>;
}

export default Profile;
