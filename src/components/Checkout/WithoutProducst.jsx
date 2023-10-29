const WithoutProducst = () => {
  return (
    <div className="max-w-[500px] mx-auto">
      <p className="py-10">
        Aún no posees productos en el carrito. Agrega algunos para enviar el
        pedido.
      </p>
      <a
        className="py-2 px-4 border rounded bg-[#f98b24] block w-full text-center"
        href="/libreria-alfa/productos/1/"
      >
        Ver productos
      </a>
    </div>
  );
};
export default WithoutProducst;
