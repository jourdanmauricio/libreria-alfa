import { Icon } from '@iconify/react';
import { useStore } from '@nanostores/react';
import { cartItems } from '../../store/cart';

const CartMenu = () => {
  const $cartItems = useStore(cartItems);
  console.log('$cartItems', $cartItems);

  const handleClick = () => {
    console.log('Click');
  };

  return (
    <a
      className="relative w-6 h-6"
      id="cart"
      href="/libreria-alfa/checkout/"
    >
      <Icon
        icon="mdi:cart-outline"
        className="w-6 h-6 text-slate-950"
      />
      {$cartItems.length > 0 && (
        <span className="w-4 bg-primary rounded-full absolute -top-1 -right-2 text-xs text-slate-950 pointer-events-none flex items-center justify-center">
          {$cartItems.length}
        </span>
      )}
    </a>
  );
};
export default CartMenu;
