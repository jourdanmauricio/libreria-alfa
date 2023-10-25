import { useStore } from '@nanostores/react';
import { Icon } from '@iconify/react';
import { favoritesItems, isFavoritesOpen } from '@store/favorites';

const FavoriteMenu = () => {
  const $favorites = useStore(favoritesItems);
  const $isFavoritesOpen = useStore(isFavoritesOpen);

  console.log('isFavoritesOpen', $isFavoritesOpen);

  const handleClick = () => {
    isFavoritesOpen.set(!$isFavoritesOpen);
  };

  return (
    <button
      className="relative"
      id="favorites"
      disabled={$favorites.length === 0}
      onClick={handleClick}
    >
      <Icon
        icon="mdi:heart-outline"
        className="w-6 h-6 text-slate-950"
      />
      {$favorites.length > 0 && (
        <span className="w-4 bg-[#f98b24] rounded-full absolute -top-2 -right-2 text-xs text-slate-950">
          {$favorites.length}
        </span>
      )}
    </button>
  );
};
export default FavoriteMenu;
