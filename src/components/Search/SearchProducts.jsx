import { useRef, useState } from 'react';
import sinImagen from '@assets/images/sin-imagen-disponible.jpg';
import FavoriteBtn from '@components/Favorite/FavoriteBtn.jsx';

const SearchProduct = ({ products }) => {
  const [filterProds, setFilterProds] = useState([]);
  const [filterText, setFilterText] = useState('');
  const debounceRef = useRef();

  const handleChange = (value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const textFilter = value.trim().toLowerCase();

    debounceRef.current = setTimeout(() => {
      setFilterText(textFilter);
      let filter = [];
      let showDefault = false;
      if (textFilter.length === 0) {
        setFilterProds([]);
      } else {
        filter = products.filter((prod) =>
          prod.name.toLowerCase().includes(value)
        );

        filter = filter.sort((a, b) => a.order - b.order);

        setFilterProds(filter);
        showDefault = true;
      }

      const event = new CustomEvent('show-result-search', {
        detail: showDefault,
      });
      document.dispatchEvent(event);
    }, 400);
  };

  return (
    <>
      <div className="flex justify-end w-full">
        <input
          className="border py-1 px-2 rounded"
          type="text"
          id="search"
          name="search"
          placeholder="Buscar"
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {filterProds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filterProds.map((prod) => (
            <article
              key={prod.id}
              className="relative w-full h-fit shadow mx-auto max-w-[300px] lg:max-w-none"
            >
              <div className="w-full h-[200px] flex justify-center flex-none overflow-hidden">
                {prod.image !== null ? (
                  <img
                    className="w-[200px] h-[200px] object-contain mx-auto hover:scale-110 transition duration-500"
                    src={prod.image}
                    alt={prod.altImage}
                    loading="lazy"
                  />
                ) : (
                  <img
                    className="w-full h-full object-contain hover:scale-110 transition duration-500"
                    src={sinImagen.src}
                    alt="Sin imagen disponible"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="px-4">
                <h3 className="font-semibold min-h-[3rem]">{prod.name}</h3>
                <p className="py-4">${prod.price}</p>
              </div>
              <FavoriteBtn
                id={prod.id}
                image={prod.image}
                altImage={prod.altImage}
                name={prod.name}
                price={prod.price}
                client:load
              />
            </article>
          ))}
        </div>
      ) : (
        filterText.length > 0 && (
          <div className="text-center pt-8">
            <p>No existen productos con esa descripción</p>
          </div>
        )
      )}
    </>
  );
};
export default SearchProduct;
