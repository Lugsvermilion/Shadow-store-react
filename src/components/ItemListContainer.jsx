import { useEffect, useState } from 'react';
import Item from './Item.jsx';

// NUEVO: este componente se encarga de obtener los productos y mostrarlos.
export default function ItemListContainer({ onAgregar, productosAgregados = [] }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // NUEVO: useEffect ejecuta el fetch cuando el componente se monta.
  useEffect(() => {
    let activo = true;
    fetch(`${import.meta.env.BASE_URL}data/productos.json`)
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error('No se pudo cargar productos.json');
        return respuesta.json();
      })
      .then((datos) => { if (activo) setProductos(datos); })
      .catch((err) => { if (activo) setError(err.message); })
      .finally(() => { if (activo) setCargando(false); });
    return () => { activo = false; };
  }, []);

  // NUEVO: los productos creados desde el formulario se combinan con los del JSON.
  const catalogo = [...productos, ...productosAgregados.filter((nuevo) => !productos.some((p) => String(p.id) === String(nuevo.id)))];

  if (cargando) return <p className="estado-catalogo">Cargando cazadores y sombras...</p>;
  if (error) return <p className="mensaje-error">{error}. Verificá que exista public/data/productos.json.</p>;

  return (
    <div className="productos-grid">
      {catalogo.map((producto) => <Item key={producto.id} producto={producto} onAgregar={onAgregar} />)}
    </div>
  );
}
