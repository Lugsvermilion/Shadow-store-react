import { useState } from 'react';
import ItemListContainer from '../components/ItemListContainer.jsx';
import FormularioProducto from '../components/FormularioProducto.jsx';

export default function Inicio({ onAgregar }) {
  const [productosAgregados, setProductosAgregados] = useState([]);
  function agregarProducto(producto) {
    // NUEVO: guardamos los productos del formulario en el estado del catálogo (solo esta sesión).
    setProductosAgregados((actuales) => [...actuales.filter((p) => String(p.id) !== String(producto.id)), producto]);
  }

  return (
    <>
      <section className="hero">
        <div className="hero-contenido"><span className="sobrelinea">EL SISTEMA TE HA ELEGIDO</span><h1>DESPERTÁ TU <span>PODER</span></h1><p>Artefactos y leyendas del universo Solo Leveling.</p><a className="boton-primario hero-boton" href="#catalogo">Explorar colección <span aria-hidden="true">↓</span></a></div>
        <div className="hero-sello" aria-hidden="true"><span>SYSTEM</span><strong>等级 UP</strong><small>SHADOW MONARCH</small></div>
      </section>
      <section className="catalogo seccion" id="catalogo">
        <div className="seccion-encabezado"><span className="sobrelinea">INVENTARIO DEL CAZADOR</span><h2>La colección de las sombras</h2><p>Elegí tu próxima invocación.</p></div>
        <ItemListContainer onAgregar={onAgregar} productosAgregados={productosAgregados} />
      </section>
      {/* NUEVO: el formulario está debajo del catálogo, como pide la consigna. */}
      <FormularioProducto onProductoCreado={agregarProducto} />
    </>
  );
}
