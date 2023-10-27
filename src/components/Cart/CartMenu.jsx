import { Icon } from '@iconify/react';
import { useStore } from '@nanostores/react';
import { cartItems } from '../../store/cart';

const CartMenu = () => {
  const $cartItems = useStore(cartItems);

  console.log('$cartItems', $cartItems);

  return (
    <button
      className="relative w-6 h-6"
      id="cart"
    >
      <Icon
        icon="mdi:cart-outline"
        className="w-6 h-6 text-slate-950"
      />
      {$cartItems.length > 0 && (
        <span className="w-4 bg-[#f98b24] rounded-full absolute -top-1 -right-2 text-xs text-slate-950 pointer-events-none">
          {$cartItems.length}
        </span>
      )}
    </button>
  );
};
export default CartMenu;
