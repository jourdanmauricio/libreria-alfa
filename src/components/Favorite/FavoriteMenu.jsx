import { useRef } from 'react';
import { useStore } from '@nanostores/react';
import { favoritesItems, isFavoritesOpen } from '@stores/favorites';
import FavoritesFlyout from '@components/Favorite/FavoritesFlyout';
import { Icon } from '@iconify/react';

const FavoriteMenu = () => {
  const $favorites = useStore(favoritesItems);
  const $isFavoritesOpen = useStore(isFavoritesOpen);
  const noCloseRef = useRef(null);

  const handleClick = () => {
    isFavoritesOpen.set(!$isFavoritesOpen);
  };

  return (
    <>
      <button
        ref={noCloseRef}
        className="relative"
        disabled={$favorites.length === 0}
        onClick={handleClick}
      >
        <Icon
          icon="mdi:heart-outline"
          className="w-6 h-6 text-slate-950 pointer-events-none"
        />
        {$favorites.length > 0 && (
          <span className="w-4 bg-[#f98b24] rounded-full absolute -top-1 -right-2 text-xs text-slate-950 pointer-events-none">
            {$favorites.length}
          </span>
        )}
      </button>
      <FavoritesFlyout
        client:only
        noCloseRef={noCloseRef}
      />
    </>
  );
};
export default FavoriteMenu;
