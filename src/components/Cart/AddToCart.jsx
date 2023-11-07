import { useStore } from '@nanostores/react';
import {
  addCartItem,
  cartItems,
  isInCart,
  subtractCartItem,
} from '../../store/cart';
import { Icon } from '@iconify/react';

const AddToCart = ({ prod }) => {
  const $cartItems = useStore(cartItems);

  const getQuantity = (id) => {
    const found = $cartItems.find((cartItem) => cartItem.id === id);
    return found.quantity || 0;
  };

  const handleAddToCart = () => {
    addCartItem({
      id: prod.id,
      name: prod.name,
      quantity: 1,
      price: prod.price,
      image: prod.image,
      altImage: prod.altImage,
    });
  };
  return (
    <>
      {isInCart(prod.id) ? (
        <div className="flex justify-center border border-gray-700 rounded w-fit mx-auto">
          <button
            onClick={() => subtractCartItem(prod.id)}
            className="border-r border-gray-700 hover:bg-primary px-2"
          >
            <Icon
              icon="mdi:minus"
              className="w-6 h-6 text-slate-700"
            />
          </button>

          <div className="relative py-2 px-4 flex">
            <Icon
              icon="mdi:cart"
              className="w-6 h-6 text-slate-700"
            />
            <div className="bg-primary rounded-full absolute top-0 right-1 text-slate-950 pointer-events-none flex justify-center items-center p-1 w-5 h-5">
              <span className="text-xs">{getQuantity(prod.id)}</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="border-l border-gray-700 hover:bg-primary px-2"
          >
            <Icon
              icon="mdi:plus"
              className="w-6 h-6 text-slate-700"
            />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="p-2.5 border border-gray-700 rounded hover:bg-primary"
        >
          Agregar al carrito
        </button>
      )}
    </>
  );
};
export default AddToCart;
