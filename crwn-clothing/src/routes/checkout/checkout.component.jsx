import { useContext } from 'react';
import './checkout.styles.scss';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="checkout-container" >
      {
        cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} checkoutItem={cartItem} />
        ))
      }
    </div>
  )
};

export default Checkout;
