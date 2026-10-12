import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Inicio from './pages/Inicio.jsx';
import Carrito from './pages/Carrito.jsx';
import Contacto from './pages/Contacto.jsx';

const CART_KEY = 'shadow-store-carrito';

export default function App() {
  // NUEVO: el carrito vive en App para que Header, catálogo y página Carrito compartan los mismos datos.
  const [carrito, setCarrito] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) ?? []; }
    catch { return []; }
  });

  // NUEVO: persistimos el carrito para que no se pierda al actualizar la página.
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(carrito));
  }, [carrito]);

  function agregarAlCarrito(producto, cantidad = 1) {
    setCarrito((actual) => {
      const existente = actual.find((item) => item.id === producto.id);
      if (existente) {
        return actual.map((item) => item.id === producto.id
          ? { ...item, cantidad: Math.min(item.cantidad + cantidad, Number(item.stock ?? 9999)) }
          : item);
      }
      return [...actual, { ...producto, cantidad }];
    });
  }

  function cambiarCantidad(id, cantidad) {
    setCarrito((actual) => actual
      .map((item) => item.id === id ? { ...item, cantidad: Number(cantidad) } : item)
      .filter((item) => item.cantidad > 0));
  }

  function quitarDelCarrito(id) {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  }

  return (
    <Layout cantidadCarrito={carrito.reduce((suma, item) => suma + item.cantidad, 0)}>
      <Routes>
        <Route path="/" element={<Inicio onAgregar={agregarAlCarrito} />} />
        <Route path="/carrito" element={<Carrito items={carrito} onCambiarCantidad={cambiarCantidad} onQuitar={quitarDelCarrito} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<Inicio onAgregar={agregarAlCarrito} />} />
      </Routes>
    </Layout>
  );
}
