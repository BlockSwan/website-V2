import BoxZone from "../../../Post/BoxZone/BoxZone";

function IdeaFinancial({ valueIdeaForm, setValueIdeaForm }) {
  return (
    <>
      <BoxZone text="Financial Information" className="one">
        <table className="idea-id">
          <tr>
            <td>
              <u>
                <h4>
                  <mark>current price ($):</mark>
                </h4>
              </u>
            </td>
            <td>
              <input
                value={
                  valueIdeaForm.current_price === "0"
                    ? null
                    : valueIdeaForm.current_price
                }
                onChange={(event) =>
                  setValueIdeaForm({
                    ...valueIdeaForm,
                    current_price: event.target.value,
                  })
                }
                autoComplete="off"
                type="number"
                name="price"
                placeholder="44144.34"
              />
            </td>
          </tr>
          <tr>
            <td>
              <u>
                <h4>
                  <mark>current marketcap ($)</mark>
                </h4>
              </u>
            </td>
            <td>
              <input
                type="number"
                value={
                  valueIdeaForm.current_marketcap === "0"
                    ? null
                    : valueIdeaForm.current_marketcap
                }
                onChange={(event) =>
                  setValueIdeaForm({
                    ...valueIdeaForm,
                    current_marketcap: event.target.value,
                  })
                }
                autoComplete="off"
                name="marketcap"
                placeholder="830000000000"
              />
            </td>
          </tr>
          <tr>
            <td>
              <u>
                <h4>
                  <mark>24h Volume ($)</mark>
                </h4>
              </u>
            </td>
            <td>
              <input
                value={
                  valueIdeaForm.volume_24h === "0"
                    ? null
                    : valueIdeaForm.volume_24h
                }
                onChange={(event) =>
                  setValueIdeaForm({
                    ...valueIdeaForm,
                    volume_24h: event.target.value,
                  })
                }
                autoComplete="off"
                type="number"
                name="volume"
                placeholder="5390000000"
              />
            </td>
          </tr>
          <tr>
            <td>
              <u>
                <h4>
                  <mark> Supply type</mark>
                </h4>
              </u>
            </td>
            <td>
              <select
                id="supply"
                value={valueIdeaForm.supply}
                onChange={(event) =>
                  setValueIdeaForm({
                    ...valueIdeaForm,
                    supply: event.target.value,
                  })
                }
              >
                <option value="Fixed">Fixed</option>
                <option value="Inflationary">Inflationary</option>
                <option value="Deflationary">Deflationary</option>
              </select>{" "}
            </td>
          </tr>
        </table>
      </BoxZone>
    </>
  );
}

export default IdeaFinancial;
