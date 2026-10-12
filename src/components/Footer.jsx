const equipo = [
  { nombre: 'Valentina Fernández', rol: 'CEO', iniciales: 'VF', color: 'lila' },
  { nombre: 'Martín Bianchi', rol: 'Desarrollador', iniciales: 'MB', color: 'azul' },
  { nombre: 'Camila Pérez', rol: 'Marketing', iniciales: 'CP', color: 'rosa' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-marca">
        <img src="/img/logo-solo-leveling.png" alt="" />
        <div><strong>SHADOW STORE</strong><p>Tu poder. Tu colección. Tu sombra.</p></div>
      </div>
      <section className="equipo" aria-labelledby="titulo-equipo">
        <h2 id="titulo-equipo">Nuestro equipo</h2>
        <div className="equipo-grid">
          {equipo.map((persona) => (
            // NUEVO: .map renderiza las tres tarjetas; key identifica cada tarjeta para React.
            <article className="persona-card" key={persona.iniciales}>
              <div className={`avatar avatar-${persona.color}`} aria-hidden="true">{persona.iniciales}</div>
              <h3>{persona.nombre}</h3><p>{persona.rol}</p>
              <a href={`mailto:${persona.nombre.toLowerCase().replaceAll(' ', '.')}@shadowstore.com`}>{persona.nombre.toLowerCase().replaceAll(' ', '.')}@shadowstore.com</a>
            </article>
          ))}
        </div>
      </section>
      <p className="copyright">© {new Date().getFullYear()} Shadow Store · Proyecto educativo React · Inspirado en Solo Leveling</p>
    </footer>
  );
}
