import { useState } from "react";
import { useTokenPrice } from "react-moralis";
import "./TokenPrice.css";

function TokenPrice(props) {
  const { data: formattedData } = useTokenPrice(props);

  const [isUSDMode, setIsUSDMode] = useState(true);

  const toggleDisplayStyle = () => setIsUSDMode(!isUSDMode);

  // const noLogoToken = "https://etherscan.io/images/main/empty-token.png";

  return (
    <div id="token">
      <img id="appLogo" src={props.image} alt="Applgo" />
      {/* <img
        src={props.image || noLogoToken}
        alt="logo"
        style={{ height: props?.size || "20px" }}
      /> */}
      <span
        id="tokenPrice"
        style={{ cursor: "pointer" }}
        onClick={toggleDisplayStyle}
        title={`Show in ${isUSDMode ? "ETH" : "USD"}`}
      >
        {formattedData &&
          (isUSDMode
            ? formattedData.formattedUsd
            : formattedData.formattedNative)}
      </span>
    </div>
  );
}

export default TokenPrice;
