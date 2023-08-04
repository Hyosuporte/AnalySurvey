import { Link } from "react-router-dom";

export function NavbarLandig() {
  return (
    <header>
      <nav>
        <ul className="navbar-landi">
          <li>Analy Survey</li>
          <li>Funciones</li>
          <li>Plantillas</li>
          <li>Acerca de</li>
          <li>Inicio</li>
        </ul>
        <ul className="navbar-btnLand">
          <li>
            <Link to="/login">
              <button>Log in/Sing Up</button>
            </Link>
          </li>
          <li>
            <Link to="profile">
              <button>Comenzar Encuesta</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
