import { useEffect, useState } from 'react';
import Order from './Order';
import PersonalInfo from './PersonalInfo';
import FinishOrder from './FinishOrder';
import { useStore } from '@nanostores/react';
import { cartItems } from '../../store/cart';
import WithoutProducst from './WithoutProducst';

const CheckoutOrder = () => {
  const $cartItems = useStore(cartItems);
  const [step, setStep] = useState();
  const [order, setOrder] = useState();

  useEffect(() => {
    setStep(1);
  }, []);

  if ($cartItems.length === 0) return <WithoutProducst />;

  return (
    <div>
      {step === 1 && <Order handleStep={setStep} />}
      {step === 2 && (
        <PersonalInfo
          handleStep={setStep}
          setOrder={setOrder}
        />
      )}
      {step === 3 && <FinishOrder order={order} />}
    </div>
  );
};

export default CheckoutOrder;
