import React, { useRef, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import AddToCart from '../Cart/AddToCart';
import {
  isFavoritesOpen,
  favoritesItems,
  removeFavoriteItem,
} from '@stores/favorites';
import sinImagen from '@assets/images/sin-imagen-disponible.jpg';

export default function FavoritesFlyout({ noCloseRef }) {
  const $isFavoritesOpen = useStore(isFavoritesOpen);
  const $favoritesItems = useStore(favoritesItems);
  const componenteRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDelete = (id) => {
    removeFavoriteItem(id);
    if ($favoritesItems.length <= 1) isFavoritesOpen.set(false);
  };

  const handleClickOutside = (event) => {
    if (
      componenteRef.current &&
      !componenteRef.current.contains(event.target) &&
      event.target !== noCloseRef.current
    ) {
      isFavoritesOpen.set(false);
    }
  };

  return (
    <>
      <div
        className={`absolute backdrop-blur-sm left-0 right-0 top-10 md:top-12 h-screen opacity-100 z-[5] min-w-[300px] ${
          $isFavoritesOpen ? 'block' : 'hidden'
        } `}
      ></div>
      <aside
        ref={componenteRef}
        className={`absolute p-6 bg-slate-200 top-10 md:top-12 right-0 border-2 h-screen overflow-y-auto transition duration-300 ease-in-out origin-top-right z-[5] ${
          $isFavoritesOpen ? 'scale-100' : 'scale-0'
        }`}
      >
        <h2 className="text-center text-xl text-gray-800">Favoritos</h2>
        <button
          onClick={() => isFavoritesOpen.set(false)}
          className="absolute text-xs top-2 right-2 cursor-pointer p-1 rounded-md text-gray-700  hover:bg-gray-100"
        >
          Cerrar
        </button>
        <hr />
        <ul>
          {$favoritesItems.map((item) => (
            <div key={item.id}>
              <li className="text-sm flex items-center gap-2 border-b-2 py-2">
                {item.image !== null ? (
                  <img
                    className="w-20 h-20 object-contain"
                    src={item.image}
                    alt={item.altImage}
                    loading="lazy"
                  />
                ) : (
                  <img
                    className="w-20 h-20 object-contain mx-auto"
                    src={sinImagen.src}
                    alt="Sin imagen disponible"
                    loading="lazy"
                  />
                )}
                <div className="w-full flex flex-col justify-between gap-4">
                  <p>{item.name}</p>
                  <div className="flex justify-between items-center text-gray-800">
                    <p>${item.price}</p>
                    <AddToCart prod={item} />
                    <span
                      onClick={(e) => handleDelete(item.id)}
                      className="text-xs cursor-pointer p-1 rounded-md text-red-500  hover:bg-red-50"
                    >
                      Borrar
                    </span>
                  </div>
                </div>
              </li>
              <hr />
            </div>
          ))}
        </ul>
      </aside>
    </>
  );
}
