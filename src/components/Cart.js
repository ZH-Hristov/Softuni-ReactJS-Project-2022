import { useContext } from "react"
import { Link } from "react-router-dom"

import { CartContext } from "../contexts/cartContext"
import styles from './Cart.module.css'

const Cart = () => {

    const { cartItems, clearCart, cartPrice } = useContext(CartContext)

    return (
        <>
            <h1>My Cart</h1>

            <div>
                {Object.keys(cartItems).length > 0 ?
                    <>
                        <ul className={styles.cartul}>
                            {Object.values(cartItems).map(x =>
                                <li className={styles.cartli} key={x._id} >
                                    <Link to={`/products/${x._id}`} ><img className={styles.cartimg} alt={x.title} src={x['image-url']} /></Link>
                                    <Link className={`${styles.cartdetail} ${styles.carttitle}`} to={`/products/${x._id}`}>{x.title}</Link>
                                    <p className={styles.cartdetail} >{x['product-price']}$</p>
                                </li>)}
                        </ul>
                        <div className={styles.totalcontainer}>
                            <p className={styles.cartdetail} >Total Price: {cartPrice}$</p>
                            <button className={styles.totalbutton}>Checkout</button>
                            <button className={styles.totalbutton} onClick={clearCart}>Clear cart</button>
                        </div>
                    </>
                    : <p className={styles.nocartitems}>You have no products in your cart!</p>
                }
            </div>
        </>
    )
}

export default Cart