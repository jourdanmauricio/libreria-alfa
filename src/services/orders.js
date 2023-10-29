const BACKEND = import.meta.env.PUBLIC_BACKEND;
const URL = import.meta.env.PUBLIC_URL;

export const createOrder = async (data) => {
  try {
    const res = await fetch(`${BACKEND}/orders`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', url: URL },
    });
    if (res.status !== 201) {
      console.log('Error creando el pedido', res.status, res.statusText);
      throw 'Error creando el pedido';
    }
    const order = await res.json();
    return order;
  } catch (error) {
    console.log('ERROR DE CONEXION. Contacte al administrador!!!!', error);
  }
};
