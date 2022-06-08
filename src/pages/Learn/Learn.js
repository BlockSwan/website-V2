import { useState } from "react";
import { useMoralisQuery } from "react-moralis";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import IntroBox from "../../components/IntroBox/IntroBox";
import TopBar from "../../components/TopBar/TopBar";
import TopBar2 from "../../components/TopBar/TopBar2";
import "./Learn.css";

function Learn() {
  const { data } = useMoralisQuery("Term");
  const [searchTerm, setSearchTerm] = useState("");
  const term = JSON.stringify(data, null, 2);
  const objTerm = JSON.parse(term);
  const params = useParams();

  return (
    <div className="content">
      <TopBar2 text="Dictionary" to="/" />
      <IntroBox text="You can find here a lists of blockchain related terms sorted from A to Z. Feel free to share ideas and proposals in the corresponding Discord Channel!" />
      <br />
      <input
        className="searchCoin"
        type="text"
        placeholder="Type your word..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      ></input>

      <br />
      <br />
      {objTerm
        .sort((a, b) => (a.term_name > b.term_name ? 1 : -1))
        .filter((info) => {
          if (searchTerm === "") {
            return info;
          } else if (
            info.term_name
              .toLowerCase()
              .includes(searchTerm.toLocaleLowerCase())
          ) {
            return info;
          }
        })

        .map((info) => {
          return (
            <>
              <Link
                to={
                  "/learn/" + info.term_name.replace(/\s/g, "-").toLowerCase()
                }
              >
                <div>
                  <div>
                    <h4>
                      <mark>{info.term_name}</mark>
                    </h4>
                    <br />
                    {params.term ===
                    info.term_name.replace(/\s/g, "-").toLowerCase() ? (
                      <div className="flex">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: info.term_description,
                          }}
                        ></p>
                      </div>
                    ) : (
                      <div className="flex">
                        <p>
                          {info.term_description.substring(0, 130) + "..."}{" "}
                          <u id={info.objectId}>Read more</u>
                        </p>
                      </div>
                    )}
                  </div>

                  <br />
                </div>
              </Link>
              <hr />
              <br />
            </>
          );
        })}
    </div>
  );
}
export default Learn;
