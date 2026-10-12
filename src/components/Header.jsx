import { Link, NavLink } from 'react-router-dom';

export default function Header({ cantidadCarrito }) {
  return (
    <header className="site-header">
      {/* NUEVO: el logo también funciona como enlace para volver al Inicio. */}
      <Link to="/" className="brand" aria-label="Shadow Store, ir al inicio">
        <img src="/img/logo-solo-leveling.png" alt="Logo Shadow Store" />
        <span>SHADOW <strong>STORE</strong></span>
      </Link>
      <nav className="navegacion" aria-label="Navegación principal">
        <NavLink to="/" end>Inicio</NavLink>
        <a href={`${import.meta.env.BASE_URL}#catalogo`}>Cazadores</a>
        <NavLink to="/contacto">Contacto</NavLink>
        <NavLink to="/carrito" className="enlace-carrito">Carrito <span className="contador-carrito">{cantidadCarrito}</span></NavLink>
      </nav>
    </header>
  );
}
