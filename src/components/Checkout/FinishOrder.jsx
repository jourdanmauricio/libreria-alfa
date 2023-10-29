import useCheckout from './useCheckout';

const FinishOrder = ({ order }) => {
  console.log('Order FinishOrder', order);

  return (
    <div>
      <h2>Pedido enviado!!!</h2>
      {order && (
        <>
          <p>{order.id}</p>
        </>
      )}
    </div>
  );
};
export default FinishOrder;
