const BACKEND = import.meta.env.BACKEND;
const URL = import.meta.env.URL;

export const getProdsLib = async () => {
  let prodsLib = [];
  try {
    const res = await fetch(`${BACKEND}/prod-lib`, {
      headers: { 'Content-Type': 'application/json', url: URL },
    });
    if (res.status !== 200) {
      console.log('Error GET Prod Lib: ', res.status, res.statusText);
    }
    prodsLib = await res.json();
  } catch (error) {
    console.log('ERROR DE CONEXION. Contacte al administrador!!!!', error);
  }

  return prodsLib;
};
