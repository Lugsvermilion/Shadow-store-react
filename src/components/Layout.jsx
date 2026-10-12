import Header from './Header.jsx';
import Footer from './Footer.jsx';

// NUEVO: Layout envuelve las páginas y mantiene Header y Footer consistentes.
export default function Layout({ children, cantidadCarrito }) {
  return (
    <div className="app-shell">
      <Header cantidadCarrito={cantidadCarrito} />
      <main className="contenido-principal">{children}</main>
      <Footer />
    </div>
  );
}
