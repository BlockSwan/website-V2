import "./DropMenu.css";

function DropMenu(props) {
  return (
    <>
      <div className="dropNavLink">
        <span className="prefix">&gt;</span> {props.title}
      </div>
      <div className="dropdownsidebar">
        <a
          className="navLink"
          href="https://discord.gg/ffrzhYEn57"
          target="_blank"
          rel="noreferrer"
        >
          &gt; virtual office
        </a>
        <br />
        <br />
        <br />
        <a
          className="navLink"
          href="https://whitepaper.blockswan.finance/"
          target="_blank"
          rel="noreferrer"
        >
          &gt; whitepaper
        </a>
        <br />
        <br />
        <br />
        <a
          className="navLink"
          href="https://repository.blockswan.finance/"
          target="_blank"
          rel="noreferrer"
        >
          &gt; network repo
        </a>{" "}
      </div>
    </>
  );
}
export default DropMenu;
