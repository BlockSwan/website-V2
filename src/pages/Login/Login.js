import { useMoralis } from "react-moralis";
import { NavLink } from "react-router-dom";
import IntroBox from "../../components/IntroBox/IntroBox";
import TopBanner from "../../components/TopBanner/TopBanner";
import TopBar from "../../components/TopBar/TopBar";
import "./Login.css";
function Login() {
  const {
    authenticate,
    logout,
    isAuthenticated,
    isAuthenticating,
    authError,
    user,
  } = useMoralis();

  async function LogIn() {
    await authenticate({
      type: "sol",
      signingMessage: "Welcome to BlockSwan",
    });
  }

  return (
    <div className="content">
      {!isAuthenticated ? (
        <>
          <TopBar direction="/" text="Connect your wallet" onClick="" />
          <IntroBox
            text={
              "We currently feature only the Solana chain from the PHANTOM wallet. Please dowload wallet on the link below if you don't already have it. We hope to add more chains and functionalities in the future."
            }
          />
          <br />

          <div className="center">
            <img
              id="solXphant"
              src="/images/phantomXsol.png"
              alt="phantomXsolana"
            ></img>{" "}
            <h4>
              <a
                id="getphantom"
                href="https://phantom.app/download"
                target="_blank"
                rel="noreferrer"
              >
                GET PHANTOM WALLET
              </a>
            </h4>
            <br />
            {isAuthenticating && (
              <p id="errorAuth">Waiting for blockchain signature</p>
            )}
            {authError && <p id="errorAuth">{authError.message}</p>}
            <button id="btnAuthenticate" onClick={LogIn}>
              login
            </button>
          </div>
        </>
      ) : (
        <>
          <TopBanner text="/Welcome to BlockSwan" />

          <div className="center">
            {" "}
            <br /> <br />
            <h2>You just connected with:</h2>
            <br />
            <p>{user.get("solAddress")}</p>
            <br />
            <br />
            <img
              id="swanworking"
              src="/images/SwanWorkingdark.gif"
              alt="gifworking"
            ></img>{" "}
            <br />
            <br />
            <br />
            <NavLink to="/profile">
              <button id="btnAuthenticate">Investor Profile</button>
            </NavLink>
            <br />
            <br />
            <p id="getphantom" onClick={() => logout()}>
              logout already...
            </p>
            <br />
            <br />
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
