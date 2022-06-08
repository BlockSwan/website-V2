import { useEffect, useState } from "react";
import axios from "axios";

function AssetPrice(props) {
  const [data, setDataPrice] = useState([]);

  const url =
    "https://data.messari.io/api/v1/assets/" + props.ticker + "/metrics";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setDataPrice(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);

  console.log(data);
  var stringData = JSON.stringify(data);
  console.log(stringData);
  return <p>{stringData}</p>;
}

export default AssetPrice;
