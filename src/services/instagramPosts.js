const BACKEND = import.meta.env.PUBLIC_BACKEND;
const URL = import.meta.env.PUBLIC_URL;

export const getInstagramPosts = async () => {
  let networks = [];
  try {
    const res = await fetch(`${BACKEND}/instagram-posts`, {
      headers: { 'Content-Type': 'application/json', url: URL },
    });
    if (res.status !== 200) {
      console.log('Error GET instagram: ', res.status, res.statusText);
    }
    networks = await res.json();
  } catch (error) {
    console.log('ERROR DE CONEXION. Contacte al administrador!!!!', error);
  }

  return networks[0];
};
