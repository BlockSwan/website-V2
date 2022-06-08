import { useMoralis } from "react-moralis";
import "./Address.css";

function Address(props) {
  const { user } = useMoralis();

  var wallet = user.get("solAddress");
  const n = wallet.length;
  var begWallet = wallet.substring(0, props.size);
  var shortWallet = begWallet.concat(
    "...",
    wallet.substring(n - props.size, n)
  );

  return <p id="addressContainer">{shortWallet}</p>;
}
export default Address;
