import { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import useCheckout from './useCheckout';
import { getNetworks } from '../../services/networks';
import { parseCurrency } from '../../utils/parse';
import { cartItems } from '../../store/cart';
import { useStore } from '@nanostores/react';

const FinishOrder = ({ order }) => {
  const { getAmount } = useCheckout();
  const $cartItems = useStore(cartItems);
  const [message, setMessage] = useState();

  const buyer = useMemo(
    () =>
      `PEDIDO NRO ${order.id}\n* Nombre: ${order.buyer[0].name}\n* Email: ${order.buyer[0].email}\n* DNI: ${order.buyer[0].dni}\n* Teléfono: ${order.buyer[0].name}\n`,
    [order]
  );

  const delivery = useMemo(() => {
    if (!order.delivery) return '*** Sin envío ***';
    return `*** Envío ***\n* Provincia: ${order.deliveryInfo[0].state}\n* Ciudad: ${order.deliveryInfo[0].city}\n* Dirección: ${order.deliveryInfo[0].address}\n`;
  }, [order]);

  const observation = useMemo(
    () => `*** Observación ***\n${order.observation}`,
    [order]
  );

  const products = useMemo(
    () =>
      order.items
        .reduce(
          (message, product) =>
            message.concat(
              `* ${product.id}-${product.name}\n ${parseCurrency(
                product.price
              )} x ${product.quantity} u = ${parseCurrency(
                product.price * product.quantity
              )}\n ---------- \n`
            ),
          `*** Productos ***\n`
        )
        .concat(`Total: ${parseCurrency(getAmount())}\n`),
    [order]
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNetworks();
      let whatsapp = data.whatsapp.split('=')[0];
      whatsapp = `${whatsapp}=${encodeURIComponent(
        `${buyer}\n${products}\n${delivery}\n${observation}`
      )}`;

      $cartItems.map((item) => removeCartItem(item.id));
      setMessage(whatsapp);
    };
    fetchData();
  }, []);

  console.log('message', message);

  return (
    <div>
      <h2 className="text-xl">Pedido registrado con exitosamente</h2>

      <p className="py-8">También puedes enviarlo por whatsapp.</p>

      <a
        href={message}
        target="_blank"
        className="w-full py-2 bg-[#25D366] rounded flex justify-center items-center font-semibold text-white gap-4"
      >
        Enviar por Whatsapp{' '}
        <Icon
          icon="mdi:whatsapp"
          className="w-8 h-8 text-white"
        />
      </a>

      <p className="py-8 font-semibold text-xl">
        Muchas gracias, en breve nos pondremos en contacto
      </p>
    </div>
  );
};
export default FinishOrder;
