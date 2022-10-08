import "./App.css";

function Header(props) {
  return (
    <button className="connect">
      {props.address.slice(0, 5)}...{props.address.slice(60)}
    </button>
  );
}

export default Header;
