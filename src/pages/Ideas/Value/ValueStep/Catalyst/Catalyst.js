import BoxZone from "../../../Post/BoxZone/BoxZone";

function Catalyst({ valueIdeaForm, setValueIdeaForm }) {
  return (
    <div>
      <BoxZone text="Catalyst:">
        <textarea
          value={valueIdeaForm.catalyst}
          onChange={(event) =>
            setValueIdeaForm({ ...valueIdeaForm, catalyst: event.target.value })
          }
          className="catalyst"
          autoComplete="off"
          type="text"
          name="catalyst"
        ></textarea>
      </BoxZone>
      <br />
      <br />
      <div className="definitions">
        {" "}
        <p>
          {" "}
          I agree that by making this submission, you represent, warrant and
          covenant that this submission complies in all respects with
          BlockSwan's Terms and Conditions, including without limitation that
          your submission does not (a) violate, plagiarize, or infringe upon the
          rights of any third party, including copyright, trademark, privacy or
          other personal or proprietary rights; (b) contain any undisclosed
          material inside information; (c) contain false, libelous or otherwise
          unlawful material; or (d) otherwise violate any applicable laws.
        </p>{" "}
        <br /> <br />
        <div className="flex">
          <label className="check">
            <input
              checked={valueIdeaForm.disclosure}
              type="checkbox"
              onChange={(event) =>
                setValueIdeaForm({
                  ...valueIdeaForm,
                  disclosure: !valueIdeaForm.disclosure,
                })
              }
            />
            <span className="checkmark"></span>
          </label>{" "}
          &nbsp; &nbsp; &nbsp;
          <p className="ok">I agree</p>
        </div>
      </div>
    </div>
  );
}

export default Catalyst;
