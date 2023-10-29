import { useStore } from '@nanostores/react';
import { addCartItem, cartItems, subtractCartItem } from '../../store/cart';
import { Icon } from '@iconify/react';
import AddToCart from '../Cart/AddToCart';
import sinImagen from '@assets/images/sin-imagen-disponible.jpg';
import useCheckout from './useCheckout';

const Order = ({ handleStep }) => {
  const $cartItems = useStore(cartItems);

  const { getQuantity, getAmount } = useCheckout();

  return (
    <>
      <ul className="max-w-[500px] mx-auto">
        {$cartItems.map((item) => (
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
                <div className="flex flex-col md:flex-row justify-between items-center text-gray-800">
                  <p>Precio: ${item.price}</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => subtractCartItem(item.id)}
                      className="border border-gray-700 hover:bg-[#f98b24] px-2 rounded"
                    >
                      <Icon
                        icon="mdi:minus"
                        className="w-6 h-6 text-slate-700"
                      />
                    </button>
                    <span className="text-xs">
                      {getQuantity(item.id)} unidades
                    </span>
                    <button
                      onClick={() => addCartItem(item)}
                      className="border border-gray-700 hover:bg-[#f98b24] px-2 rounded"
                    >
                      <Icon
                        icon="mdi:plus"
                        className="w-6 h-6 text-slate-700"
                      />
                    </button>
                  </div>
                  <span>${item.price * getQuantity(item.id)}</span>
                </div>
              </div>
            </li>
            <hr />
          </div>
        ))}
      </ul>
      <div className="max-w-[500px] mx-auto flex flex-col items-end gap-8 mt-4">
        <div className="">Total ${getAmount()}</div>
        <button
          onClick={() => handleStep(2)}
          className="py-2 px-4 border rounded w-full bg-[#f98b24]"
        >
          Confirmar pedido
        </button>
      </div>
    </>
  );
};
export default Order;
