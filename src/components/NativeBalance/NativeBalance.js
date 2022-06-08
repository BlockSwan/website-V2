import { useMoralis, useNativeBalance } from "react-moralis";
import "./NativeBalance.css";

function NativeBalance(props) {
  const { data: balance } = useNativeBalance(props);
  const { account, isAuthenticated } = useMoralis();

  if (!account || !isAuthenticated) return null;

  return (
    <div
      className="nativeBalance"
      style={{
        textAlign: "center",
        whiteSpace: "nowrap",
      }}
    >
      <p>
        <u>balance:</u>
      </p>
      <span>{balance.formatted}</span>
    </div>
  );
}
export default NativeBalance;
