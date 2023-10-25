import { persistentAtom } from '@nanostores/persistent';

export const isFavoritesOpen = persistentAtom('isFavoritesOpen:', false, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const favoritesItems = persistentAtom('favoritesItems:', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const isFavorite = (id) => {
  const found = favoritesItems.get().find((fav) => fav.id === id);
  return found ? true : false;
};

export function addFavoriteItem(favorite) {
  favoritesItems.set([...favoritesItems.get(), favorite]);
  console.log('Store', favoritesItems);
}

export function removeFavoriteItem(id) {
  favoritesItems.set(favoritesItems.get().filter((fav) => fav.id !== id));
}
