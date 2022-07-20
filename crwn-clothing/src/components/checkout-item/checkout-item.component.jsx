import { useContext } from "react";
import './checkout-item.styles.scss'
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { addItemToCart, removeItemFromCart, deleteItemFromCart } = useContext(CartContext);

  const { id, imageUrl, name, quantity, price } = cartItem;
  return (
    <div key={id} className='checkout-item-container'>
      <div className="image-container"><img src={imageUrl} alt={name} /></div>

      <span className="name">{name}</span>

      <div className="quantity">
        <span className="arrow" onClick={() => removeItemFromCart(cartItem)}>&#8249;</span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={() => addItemToCart(cartItem)}>&#8250;</span>
      </div>

      <span className="price">{price}</span>
      <span onClick={() => deleteItemFromCart(cartItem)}>&#10005;</span>
    </div>
  )
}

export default CheckoutItem;