import FavoritesFlyout from '@components/Favorite/FavoritesFlyout';
import { useStore } from '@nanostores/react';
import { Icon } from '@iconify/react';
import { favoritesItems, isFavoritesOpen } from '@stores/favorites';
import { useRef, useState } from 'react';

const FavoriteMenu = () => {
  const $favorites = useStore(favoritesItems);
  const $isFavoritesOpen = useStore(isFavoritesOpen);
  const noCloseRef = useRef(null);

  const handleClick = () => {
    isFavoritesOpen.set(!$isFavoritesOpen);
    // console.log('noCloseRef', noCloseRef);
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
          <span className="w-4 bg-[#f98b24] rounded-full absolute -top-2 -right-2 text-xs text-slate-950 pointer-events-none">
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
