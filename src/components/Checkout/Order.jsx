import { useStore } from '@nanostores/react';
import { AnimatePresence } from 'framer-motion';
import { cartItems } from '../../store/cart';
import OrderItem from './OrderItem';
import useCheckout from './useCheckout';
import { motion } from 'framer-motion';

const Order = ({ handleStep }) => {
  const $cartItems = useStore(cartItems);
  const { getAmount } = useCheckout();

  return (
    <>
      <motion.ul
        layout
        className="max-w-[500px] mx-auto"
      >
        {$cartItems.map((item, index) => (
          <OrderItem
            key={item.id}
            item={item}
            index={index}
          />
        ))}
      </motion.ul>
      <div className="max-w-[500px] mx-auto flex flex-col items-end gap-8 mt-4">
        <div className="">Total ${getAmount()}</div>
        <button
          onClick={() => handleStep(2)}
          className="py-2 px-4 border rounded w-full bg-[#f98b24]"
        >
          Confirmar productos
        </button>
      </div>
    </>
  );
};
export default Order;
