import { useState } from 'react';

// NUEVO: Item es reutilizable. Recibe la información del producto mediante props.
export default function Item({ producto, onAgregar }) {
  // NUEVO: estado local independiente para la cantidad elegida en esta tarjeta.
  const [cantidad, setCantidad] = useState(1);
  const stock = Number(producto.stock ?? 99);

  return (
    <article className="producto-card">
      <div className="producto-imagen-wrap">
        <img className="producto-imagen" src={producto.imagen} alt={producto.nombre} loading="lazy"
          onError={(evento) => { evento.currentTarget.src = '/img/logo-solo-leveling.png'; }} />
        <span className="etiqueta-sombra">SHADOW ITEM</span>
      </div>
      <div className="producto-info">
        <h2>{producto.nombre}</h2>
        <p className="producto-precio">${Number(producto.precio).toLocaleString('es-AR')}</p>
        <p className="producto-stock">Stock disponible: {stock}</p>
        <div className="selector-cantidad">
          <button type="button" aria-label={`Restar cantidad de ${producto.nombre}`} onClick={() => setCantidad((n) => Math.max(1, n - 1))}>−</button>
          <output aria-label="Cantidad seleccionada">{cantidad}</output>
          <button type="button" aria-label={`Sumar cantidad de ${producto.nombre}`} disabled={cantidad >= stock} onClick={() => setCantidad((n) => Math.min(stock, n + 1))}>+</button>
        </div>
        <button className="boton-primario boton-agregar" type="button" disabled={stock < 1} onClick={() => onAgregar(producto, cantidad)}>
          Invocar al carrito
        </button>
      </div>
    </article>
  );
}
