import { Icon } from '@iconify/react';
import { addCartItem, subtractCartItem } from '../../store/cart';
import sinImagen from '@assets/images/sin-imagen-disponible.jpg';
import useCheckout from './useCheckout';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0 },
  visible: ({ delay }) => ({ opacity: 1, transition: { delay, duration: 1 } }),
};

const OrderItem = ({ item, index }) => {
  const { getQuantity } = useCheckout();

  return (
    <>
      <motion.li
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        layoutId={item.id}
        custom={{ delay: (index + 1) * 0.2 }}
        className="text-sm flex items-center gap-2 border-b-2 py-2"
      >
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
              <span className="text-xs">{getQuantity(item.id)} unidades</span>
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
            <span className="">${item.price * getQuantity(item.id)}</span>
          </div>
        </div>
      </motion.li>
      <hr />
    </>
  );
};
export default OrderItem;
