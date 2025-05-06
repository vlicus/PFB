import { Link } from "react-router-dom";
import Nav from "./Nav";
import "../styles/Header.css";

export default function Header() {
  return (
    <header className="main-header">
      <Link to="/" className="logo-link">
        <img
          src="/clickAlquilerLogo.png"
          alt="Alquiler Seguro"
          className="logo"
        />
      </Link>

      <h2 className="header-slogan">
        {/* Un espacio para narrar tus experiencias y descubrir nuevos hogares */}
      </h2>

      <Nav />
    </header>
  );
}
