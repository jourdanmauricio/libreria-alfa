import { useStore } from '@nanostores/react';
import React, { useRef, useEffect } from 'react';
import {
  isFavoritesOpen,
  favoritesItems,
  removeFavoriteItem,
} from '@stores/favorites';

export default function FavoritesFlyout() {
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
      !componenteRef.current.contains(event.target)
    ) {
      console.log('current', componenteRef.current);
      console.log('target', event.target);
      isFavoritesOpen.set(false);
    }
  };

  return (
    <>
      {/* <div
        className={`absolute backdrop-blur-sm left-0 right-0 top-10 md:top-14 h-screen opacity-100 z-[5] ${
          $isFavoritesOpen ? 'block' : 'hidden'
        } `}
      ></div> */}
      <aside
        ref={componenteRef}
        className={`absolute p-6 bg-slate-200 top-10 md:top-14 right-0 border-2 h-screen overflow-y-auto transition duration-300 ease-in-out origin-top-right z-[5] ${
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
            <li
              key={item.id}
              className="text-sm flex gap-2 border-b-2"
            >
              <img
                className="w-14"
                src={item.image}
                alt={item.altImage}
              />
              <div className="w-full flex flex-col justify-between">
                <p>{item.name}</p>
                <div className="flex justify-between text-gray-800">
                  {/* <p>{item.seller_custom_field}</p> */}
                  <p>${item.price}</p>
                  <span
                    onClick={(e) => handleDelete(item.id)}
                    className="text-xs cursor-pointer p-1 rounded-md text-red-500  hover:bg-red-50"
                  >
                    Borrar
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
