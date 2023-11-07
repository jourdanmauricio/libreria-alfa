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
      <motion.section layout>
        <motion.ul layout>
          {$cartItems.map((item, index) => (
            <OrderItem
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </motion.ul>
        <div className="max-w-[500px] mx-auto flex flex-col items-end mt-4">
          <div className="">Total ${getAmount()}</div>
        </div>
        <button
          onClick={() => handleStep(2)}
          className="py-2 px-4 border rounded w-full bg-primary mt-8"
        >
          Confirmar productos
        </button>
      </motion.section>
    </>
  );
};
export default Order;
