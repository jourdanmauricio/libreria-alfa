import { useState } from 'react';
import {
  initialCheckoutErrors,
  initialCheckoutForm,
  checkoutFields,
} from '@config/variables';
import { validations } from '@utils/validations';
import { cartItems, removeCartItem } from '../../store/cart';
import { useStore } from '@nanostores/react';
import { createOrder } from '@services/orders';

const useCheckout = () => {
  const $cartItems = useStore(cartItems);
  const [form, setForm] = useState(initialCheckoutForm);
  const [errors, setErrors] = useState(initialCheckoutErrors);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById(e.target.id);

    const data = new FormData(form);
    const info = Object.fromEntries(data.entries());

    let formErrors = {};
    for (let name in info) {
      if (!checkoutFields[name]) continue;
      formErrors = validations(checkoutFields, name, info[name], formErrors);
    }
    setErrors(formErrors);

    for (let error in formErrors) {
      if (formErrors[error]) return;
    }

    const obj = {
      id: new Date().valueOf(),
      buyer: [
        {
          name: info.name,
          dni: info.dni,
          email: info.email,
          phone: info.phone,
        },
      ],
      items: $cartItems,
      delivery: info.delivery ? true : false,
      observation: info.observation,
      amount: getAmount(),
      status: 'active',
      payment: false,
    };
    if (info.delivery) {
      obj.deliveryInfo = [
        {
          state: info.state,
          city: info.city,
          address: info.address,
        },
      ];
    }

    try {
      const newOrder = await createOrder(obj);

      console.log('setOrder');
      // $cartItems.map((item) => removeCartItem(item.id));
      console.log('delete items card');
      return newOrder;
    } catch (err) {
      console.log('ERRRORRRR', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setForm({ ...form, [name]: e.target.checked });
    } else {
      setForm({ ...form, [name]: value });
    }
    handleError(e);
  };

  const handleBlur = (e) => {
    handleError(e);
  };

  const handleError = (e) => {
    const { name, value, id } = e.target;
    if (!checkoutFields[name]) return;
    setErrors(validations(checkoutFields, name, value, errors));
  };

  const getQuantity = (id) => {
    const found = $cartItems.find((cartItem) => cartItem.id === id);
    return found ? found.quantity : null;
  };

  const getAmount = () => {
    const amount = $cartItems.reduce(
      (acum, item) => acum + item.quantity * item.price,
      0
    );
    return amount;
  };

  return {
    form,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    getQuantity,
    getAmount,
  };
};
export default useCheckout;
