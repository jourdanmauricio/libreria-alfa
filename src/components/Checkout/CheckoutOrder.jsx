import { useEffect, useState } from 'react';
import Order from './Order';
import PersonalInfo from './PersonalInfo';
import FinishOrder from './FinishOrder';
import { useStore } from '@nanostores/react';
import { cartItems } from '../../store/cart';
import WithoutProducst from './WithoutProducst';
import { motion } from 'framer-motion';

const CheckoutOrder = () => {
  const $cartItems = useStore(cartItems);
  const [step, setStep] = useState();
  const [order, setOrder] = useState();

  useEffect(() => {
    setStep(1);
  }, []);

  // if ($cartItems.length === 0 && !order) return <WithoutProducst />;

  return (
    <div className="max-w-[500px] mx-auto">
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
          type: 'spring',
        }}
        className="text-3xl text-center py-8"
      >
        Finalizar pedido
      </motion.h1>

      {/* <motion.section layout> */}
      {$cartItems.length === 0 && !order ? (
        <WithoutProducst />
      ) : (
        <>
          {step === 1 && <Order handleStep={setStep} />}
          {step === 2 && (
            <PersonalInfo
              handleStep={setStep}
              setOrder={setOrder}
            />
          )}
          {step === 3 && <FinishOrder order={order} />}
        </>
      )}
      {/* </motion.section> */}
    </div>
  );
};

export default CheckoutOrder;
