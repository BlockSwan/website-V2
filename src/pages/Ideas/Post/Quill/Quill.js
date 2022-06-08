import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css";
import "./Quill.css";

function Quill({ valueIdeaForm, setValueIdeaForm }) {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],

      [{ list: "ordered" }, { list: "bullet" }],

      ["link", "image"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = ["bold", "italic", "underline", "list", "link", "image"];
  const { quill, quillRef } = useQuill({ modules, formats });

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(
        `${
          valueIdeaForm.value_investment === ""
            ? `<strong>${valueIdeaForm.fullname} Competition</strong><br/>
            <i>Who are they playing against?  What is their respective market share? What is the competitive advantage? </i><br/>
            <br/><strong>Team and Partners behind ${valueIdeaForm.fullname} </strong><br/>
            <i>Who is riding the project? What is their proven records? Any partners worth mentioning</i><br/>
            <br/><strong>${valueIdeaForm.fullname} Community</strong><br/>
            <i>Who are the users? Who much are they? What's the current social presence? Growth factors?</i><br/>
            <br/><strong>The ${valueIdeaForm.ticker} token </strong><br/>
            <i>What is the token distribution? Who holds the ${valueIdeaForm.ticker} token? How many are they? What is the token utility? Why is the token relevant?</i><br/>
            <br/><strong>${valueIdeaForm.ticker} price and value</strong><br/>
            <i>Why such numbers? What will be driving upward/downward pressure? A bit of numbers projection?</i><br/>
            `
            : valueIdeaForm.value_investment
        }`
      );

      quill.on("text-change", (e) => {
        const quillText = quill.root.innerHTML;

        setValueIdeaForm({
          ...valueIdeaForm,
          value_investment: quillText,
        });

        console.log(quillText);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill]);

  return (
    <>
      <div className="editorbox">
        <div ref={quillRef} />
      </div>
      <br />
    </>
  );
}

export default Quill;
