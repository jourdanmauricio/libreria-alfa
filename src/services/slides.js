const BACKEND = import.meta.env.BACKEND;
const URL = import.meta.env.URL;

export const getSlides = async () => {
  let slides = [];
  try {
    const res = await fetch(`${BACKEND}/slides`, {
      headers: { 'Content-Type': 'application/json', url: URL },
    });
    if (res.status !== 200) {
      console.log('Error GET Slides: ', res.status, res.statusText);
    }
    slides = await res.json();
  } catch (error) {
    console.log('ERROR DE CONEXION. Contacte al administrador!!!!', error);
  }

  return slides;
};
