import { useMoralis } from "react-moralis";
import { NavLink } from "react-router-dom";
import "./NewIdea.css";
function NewIdea(props) {
  const { isAuthenticated } = useMoralis();
  return (
    <>
      <NavLink to={isAuthenticated ? "post" : "/login"}>
        <div className={isAuthenticated ? "newIdeaCard" : "newIdeaCard-notco"}>
          {" "}
          <b>
            {" "}
            <p className="writeText">
              {isAuthenticated ? props.text : "authenticate to post"}
            </p>
          </b>
          {isAuthenticated ? <i className="fa fa-plus" id="plus"></i> : null}
        </div>
      </NavLink>
    </>
  );
}
export default NewIdea;
