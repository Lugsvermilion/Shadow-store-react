export default function Carrito({ items, onCambiarCantidad, onQuitar }) {
  const total = items.reduce((suma, item) => suma + Number(item.precio) * item.cantidad, 0);
  return (
    <section className="pagina-interna seccion">
      <div className="seccion-encabezado"><span className="sobrelinea">INVENTARIO PERSONAL</span><h1>Tu carrito de sombras</h1><p>Revisá tus invocaciones antes de confirmar.</p></div>
      {items.length === 0 ? <div className="carrito-vacio"><span aria-hidden="true">◇</span><h2>Tu portal está vacío</h2><p>Todavía no agregaste productos al carrito.</p><a className="boton-primario" href="/">Volver a la tienda</a></div> : <>
        <div className="carrito-lista">{items.map((item) => <article className="carrito-item" key={item.id}>
          <img src={item.imagen} alt={item.nombre} onError={(e) => { e.currentTarget.src = '/img/logo-solo-leveling.png'; }} />
          <div className="carrito-item-info"><h2>{item.nombre}</h2><p>${Number(item.precio).toLocaleString('es-AR')} por unidad</p><label>Cantidad <input type="number" min="1" max={item.stock ?? 99} value={item.cantidad} onChange={(e) => onCambiarCantidad(item.id, e.target.value)} /></label></div>
          <strong>${(Number(item.precio) * item.cantidad).toLocaleString('es-AR')}</strong><button className="boton-texto" onClick={() => onQuitar(item.id)}>Quitar</button>
        </article>)}</div>
        <div className="carrito-total"><span>Total estimado</span><strong>${total.toLocaleString('es-AR')}</strong><p>Proyecto de práctica: no se procesa ningún pago.</p></div>
      </>}
    </section>
  );
}
