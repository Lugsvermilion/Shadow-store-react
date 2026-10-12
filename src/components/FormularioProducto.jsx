import { useState } from "react";

const estadoInicial = { id: "", nombre: "", precio: "", stock: "" };

export default function FormularioProducto({ onProductoCreado }) {
  const [formulario, setFormulario] = useState(estadoInicial);
  const [imagen, setImagen] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // NUEVO: un único manejador actualiza el campo que cambió.
  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
  }

  async function manejarEnvio(evento) {
    evento.preventDefault(); // Evita que el navegador recargue la página.
    setMensaje("");
    setError("");
    if (!imagen) {
      setError("Seleccioná una imagen antes de guardar.");
      return;
    }
    if (
      !formulario.id.trim() ||
      !formulario.nombre.trim() ||
      formulario.precio === "" ||
      formulario.stock === ""
    ) {
      setError("Completá todos los campos del formulario.");
      return;
    }
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    if (!apiKey) {
      setError(
        "Falta configurar VITE_IMGBB_API_KEY. Copiá .env.example a .env.local y agregá tu clave de ImgBB.",
      );
      return;
    }

    setEnviando(true);
    try {
      // NUEVO: ImgBB espera la imagen en formato FormData.
      console.log("Subiendo imagen a Imgbb...");
      const datosImagen = new FormData();
      datosImagen.append("image", imagen);
      const respuestaImagen = await fetch(
        `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          body: datosImagen,
        },
      );
      const resultadoImagen = await respuestaImagen.json();
      if (!respuestaImagen.ok || !resultadoImagen.success) {
        throw new Error(
          resultadoImagen.error?.message || "ImgBB no pudo subir la imagen.",
        );
      }
      const productoCompleto = {
        id: formulario.id.trim(),
        nombre: formulario.nombre.trim(),
        precio: formulario.precio,
        stock: formulario.stock,
        urlImagen: resultadoImagen.data.url,
        // imagen permite mostrar el producto nuevo en el catálogo de esta sesión.
        imagen: resultadoImagen.data.display_url || resultadoImagen.data.url,
      };
      console.log("Imagen subida con éxito.");
      console.log("URL:", productoCompleto.urlImagen);
      // NUEVO: se simula el envío a una API mostrando el objeto completo en consola.
      const { imagen: _imagenVista, ...datosParaEnviar } = productoCompleto;
      console.log(
        "Enviando los siguientes datos COMPLETOS a la API:",
        datosParaEnviar,
      );
      onProductoCreado(productoCompleto);
      setFormulario(estadoInicial);
      setImagen(null);
      evento.target.reset();
      setMensaje(
        "¡Producto cargado! La imagen se subió a ImgBB y los datos se mostraron en consola.",
      );
    } catch (err) {
      console.error("Error al guardar el producto:", err);
      setError(`No se pudo guardar el producto: ${err.message}`);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="formulario-seccion" aria-labelledby="titulo-formulario">
      <div className="seccion-encabezado">
        <span className="sobrelinea">AMPLIÁ TU COLECCIÓN</span>
        <h2 id="titulo-formulario">Agregar nuevo producto</h2>
        <p>Incorporá una nueva sombra al catálogo.</p>
      </div>
      <form className="formulario-producto" onSubmit={manejarEnvio}>
        <label htmlFor="producto-id">ID del producto</label>
        <input
          id="producto-id"
          name="id"
          value={formulario.id}
          onChange={manejarCambio}
          required
          placeholder="Ej.: 6"
        />
        <label htmlFor="producto-nombre">Nombre del producto</label>
        <input
          id="producto-nombre"
          name="nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
          placeholder="Ej.: Ashborn Monarch"
        />
        <div className="campos-dobles">
          <div>
            <label htmlFor="producto-precio">Precio ($)</label>
            <input
              id="producto-precio"
              name="precio"
              type="number"
              min="0"
              step="1"
              value={formulario.precio}
              onChange={manejarCambio}
              required
              placeholder="Ej.: 25000"
            />
          </div>
          <div>
            <label htmlFor="producto-stock">Stock</label>
            <input
              id="producto-stock"
              name="stock"
              type="number"
              min="0"
              step="1"
              value={formulario.stock}
              onChange={manejarCambio}
              required
              placeholder="Ej.: 10"
            />
          </div>
        </div>
        <label htmlFor="producto-imagen">Imagen del producto</label>
        <input
          id="producto-imagen"
          name="imagen"
          type="file"
          accept="image/*"
          required
          onChange={(e) => setImagen(e.target.files?.[0] ?? null)}
        />
        {imagen && (
          <p className="archivo-seleccionado">Archivo: {imagen.name}</p>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {mensaje && (
          <p className="form-exito" role="status">
            {mensaje}
          </p>
        )}
        <button className="boton-primario" type="submit" disabled={enviando}>
          {enviando ? "Subiendo imagen..." : "Guardar producto"}
        </button>
      </form>
      <p className="nota-formulario">
        La carga de imagen es real. El envío de datos a una API de productos se
        simula con <code>console.log</code>.
      </p>
    </section>
  );
}
