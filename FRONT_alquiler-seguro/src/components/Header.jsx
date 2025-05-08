import Nav from "./Nav";
import "../styles/Header.css";
import { HashLink } from "react-router-hash-link";

export default function Header() {
  return (
    <header className="main-header">
      <HashLink to="/#home" className="logo-link">
        <img src="/clickAlquilerLogo.png" alt="Alquiler Seguro" className="logo" />
      </HashLink>

      <h2 className="header-slogan">
        {/* Un espacio para narrar tus experiencias y descubrir nuevos hogares */}
      </h2>

      <Nav />
    </header>
  );
}
