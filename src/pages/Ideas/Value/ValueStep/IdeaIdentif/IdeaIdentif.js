import { useMoralisQuery } from "react-moralis";
import BoxZone from "../../../Post/BoxZone/BoxZone";

function IdeaIdentif({ valueIdeaForm, setValueIdeaForm }) {
  const { data } = useMoralisQuery("Asset", (query) =>
    query.equalTo("category", "Infrastructure")
  );
  const infra = JSON.stringify(data, null, 2);
  const objInfra = JSON.parse(infra);

  function validateFullname(e) {
    setValueIdeaForm({
      ...valueIdeaForm,
      fullname: e.target.value,
    });
  }

  return (
    <>
      <BoxZone text="Idea Identification" className="one">
        <table className="idea-id">
          <tr>
            <td>
              <u>
                <h4>
                  <mark>fullname:</mark>
                </h4>
              </u>
            </td>
            <td>
              <input
                value={valueIdeaForm.fullname}
                onChange={(event) => validateFullname(event)}
                autoComplete="off"
                type="text"
                name="fullname"
                placeholder="Bitcoin"
              />
            </td>
          </tr>
          <tr>
            <td>
              <u>
                <h4>
                  <mark>ticker:</mark>
                </h4>
              </u>
            </td>
            <td>
              <input
                value={valueIdeaForm.ticker}
                onChange={(event) =>
                  setValueIdeaForm({
                    ...valueIdeaForm,
                    ticker: event.target.value,
                  })
                }
                autoComplete="off"
                type="text"
                name="ticker"
                placeholder="BTC"
              />
            </td>
          </tr>
          <tr>
            <td>
              <u>
                <h4>
                  <mark>Ecosystem:</mark>
                </h4>
              </u>
            </td>
            <td>
              <select
                id="blockchain"
                value={valueIdeaForm.blockchain}
                onChange={(event) =>
                  setValueIdeaForm({
                    ...valueIdeaForm,
                    blockchain: event.target.value,
                  })
                }
              >
                <option value="Native">Native</option>
                {objInfra
                  .sort((a, b) => (a.fullname > b.fullname ? 1 : -1))
                  .map((info) => {
                    return (
                      <>
                        <option key={info.objectId} value={info.fullname}>
                          {info.fullname}
                        </option>
                      </>
                    );
                  })}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <u>
                <h4>
                  <mark>token type:</mark>
                </h4>
              </u>
            </td>
            <td>
              <select
                id="token-type"
                value={valueIdeaForm.token_type}
                onChange={(event) =>
                  setValueIdeaForm({
                    ...valueIdeaForm,
                    token_type: event.target.value,
                  })
                }
              >
                <option value="Payments token">Payments token</option>
                <option value="Utility token">Utility token</option>
                <option value="Security token">Security token</option>

                <option value="Non-fungible token">Non-fungible token</option>
              </select>{" "}
            </td>
          </tr>
          <tr>
            <td>
              <u>
                <h4>
                  <mark>Long or Short:</mark>
                </h4>
              </u>
            </td>
            <td>
              <select
                id="long-short"
                value={valueIdeaForm.position_type}
                onChange={(event) =>
                  setValueIdeaForm({
                    ...valueIdeaForm,
                    position_type: event.target.value,
                  })
                }
              >
                <option value="Long">Long</option>
                <option value="Short">Short</option>
              </select>{" "}
            </td>
          </tr>
        </table>
      </BoxZone>
    </>
  );
}

export default IdeaIdentif;
