import { Link } from "react-router-dom";
import Nav from "./Nav";

export default function Header() {
  return (
    <header>
      <Link to={"/"}>
        <h1>Alquiler Seguro</h1>
      </Link>
      <p>Un espacio para narrar tus experiencias y descubrir nuevos hogares</p>
      <Nav />
    </header>
  );
}
