import { Icon } from '@iconify/react';
import { useStore } from '@nanostores/react';
import {
  addFavoriteItem,
  favoritesItems,
  isFavorite,
  removeFavoriteItem,
} from '@store/favorites';

const FavoriteBtn = ({ id, image, name, altImage, price }) => {
  const favorites = useStore(favoritesItems);

  const handleClick = () => {
    isFavorite(id)
      ? removeFavoriteItem(id)
      : addFavoriteItem({
          id,
          image,
          altImage,
          name,
          price,
        });
  };

  return (
    <button
      id="favorite-btn"
      onClick={handleClick}
      className="absolute top-0 right-0 p-2 hover:cursor-pointer"
    >
      {isFavorite(id) ? (
        <Icon
          icon="mdi:heart"
          className="w-8 h-8 text-[#f98b24]"
        />
      ) : (
        <Icon
          icon="mdi:heart-outline"
          className="w-8 h-8 text-[#f98b24]"
        />
      )}
    </button>
  );
};
export default FavoriteBtn;
