import { persistentAtom } from '@nanostores/persistent';

export const isCartOpen = persistentAtom('isCartOpen:', false, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const cartItems = persistentAtom('cartItems:', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const isInCart = (id) => {
  const found = cartItems.get().find((item) => item.id === id);
  return found ? true : false;
};

export const quantityInCart = (id) => {
  const found = cartItems.get().find((item) => item.id === id);
  return found.quantity || 0;
};

export function addCartItem(item) {
  const index = cartItems
    .get()
    .findIndex((cartItem) => cartItem.id === item.id);

  if (index !== -1) {
    const newItems = cartItems
      .get()
      .map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    cartItems.set(newItems);
  } else {
    cartItems.set([...cartItems.get(), item]);
  }
}

export function subtractCartItem(id) {
  let newItems = cartItems
    .get()
    .map((cartItem) =>
      cartItem.id == id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );

  newItems = newItems.filter((item) => item.quantity !== 0);
  cartItems.set(newItems);
}

export function removeCartItem(id) {
  cartItems.set(cartItems.get().filter((item) => item.id !== id));
}
