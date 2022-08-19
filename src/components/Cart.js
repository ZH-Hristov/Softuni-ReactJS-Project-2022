import { useContext } from "react"
import { Link } from "react-router-dom"

import { CartContext } from "../contexts/cartContext"
import styles from './Cart.module.css'

const Cart = () => {

    const { cartItems, clearCart } = useContext(CartContext)

    return (
        <>
        <h2>Cart</h2>

        <div>
            {Object.keys(cartItems).length > 0 ?
            <ul>
                {Object.values(cartItems).map(x => 
                <li key={x._id} >
                    <img className={styles.catalogimg} alt={x.title} src={x['image-url']} />
                    <Link to={`/products/${x._id}`}>{x.title}</Link>
                </li>)}
            </ul>
            : <p>You have no products in your cart!</p>
            }
            <button onClick={clearCart}>Clear cart</button>
        </div>
        </>
    )
}

export default Cart