import "./Admin.css";
import FundTx from "./FundTx/FundTx";
import GetPrice from "./UserTx/GetPrice/GetPrice";
import UserTx from "./UserTx/UserTx";

function Admin() {
  return (
    <div className="content">
      <UserTx />
      <br />
      <FundTx />
      <br />
      <GetPrice />
    </div>
  );
}
export default Admin;
