import { useContext } from 'react';
import './checkout-item.styles.scss';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ checkoutItem }) => {
  console.log({ checkoutItem });
  const { imageUrl, name, quantity, price } = checkoutItem;
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);
  const addProductToCart = () => addItemToCart(checkoutItem);
  const removeProductFromCart = () => removeItemFromCart(checkoutItem);

  return (
    <div className='checkout-item'>
      <img src={imageUrl} alt={name} />
      <span>{name}</span>
      <div className="quantity">
        <span className="arrow" onClick={removeProductFromCart}>&#8249;</span>
        <span>{quantity}</span>
        <span className="arrow" onClick={addProductToCart}>&#8250;</span>
      </div>
      <span>{price}</span>
      <span>X</span>
    </div>
  );
};

export default CheckoutItem;