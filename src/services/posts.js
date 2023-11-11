const BACKEND = import.meta.env.PUBLIC_BACKEND;
const URL = import.meta.env.PUBLIC_URL;

export const getPosts = async () => {
  let posts = [];
  try {
    const res = await fetch(`${BACKEND}/posts`, {
      headers: { 'Content-Type': 'application/json', url: URL },
    });
    if (res.status !== 200) {
      console.log('Error GET posts: ', res.status, res.statusText);
    }
    posts = await res.json();
  } catch (error) {
    console.log('ERROR DE CONEXION. Contacte al administrador!!!!', error);
  }

  console.log('posts', posts);
  return posts;
};
