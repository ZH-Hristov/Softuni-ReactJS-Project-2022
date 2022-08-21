import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { ProductContext } from "../contexts/productContext";
import { AuthContext } from "../contexts/authContext";
import { CartContext } from "../contexts/cartContext";

import * as productService from '../services/productService'

import styles from './Product.module.css'

const Product = () => {
    const [product, setProduct] = useState({})
    const { productID } = useParams();
    const { deleteProductHandler } = useContext(ProductContext)
    const { user } = useContext(AuthContext)
    const { cartItems, addCartItem, removeCartItem } = useContext(CartContext)
    const navigate = useNavigate()

    useEffect(() => {
        productService.getOne(productID)
            .then(result => {
                setProduct(result)
            })
    }, [productID])

    const onDelete = () => {
        const confirmation = window.confirm("Are you sure you wanna remove this listing?")

        if (confirmation) {
            productService.remove(productID)
                .then(() => {
                    deleteProductHandler(productID)
                    navigate('/')
                })
        }
    }

    return (
        <>
            <h1>Product: {product.title}</h1>

            <img className={styles.bigimg} src={product['image-url']} alt={product.title} />
            <ul className={styles.productul}>
                <li>Size: {product['product-size']}</li>
                <li>Price: {product['product-price']}</li>
                {product['product-additional-details'] &&
                    <>
                        <li>Additional Details:</li>
                        <li><textarea readOnly value={product['product-additional-details']}></textarea></li>
                    </>
                }
            </ul>
            {user.accessToken &&
                <div className={styles.cartbuttoncontainer}>
                    {cartItems[productID] ?
                        <button className={styles.button} onClick={() => removeCartItem(productID)}>Remove from cart</button>
                        :
                        <button className={styles.button} onClick={() => addCartItem(product)}>Add to cart</button>
                    }
                </div>
            }

            {user._id === product._ownerId
                &&
                <div className={styles.ownerbuttons}>
                    <Link className={styles.button} to={`/products/${productID}/edit`}>Edit listing</Link>
                    <button className={styles.button} onClick={onDelete}>Delete listing</button>
                </div>
            }

        </>
    )
}

export default Product