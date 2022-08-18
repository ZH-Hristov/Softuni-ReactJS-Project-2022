import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { ProductContext } from "../contexts/productContext";

import * as productService from '../services/productService'

const Product = () => {
    const [product, setProduct] = useState({})
    const { productID } = useParams();
    const { deleteProductHandler } = useContext(ProductContext)
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
            <h3>Product: {product.title}</h3>

            <h4>Product Details:</h4>
            <ul>
                <li>Size: {product['product-size']}</li>
                <li>Price: {product['product-price']}</li>
            </ul>
            <Link to={`/products/${productID}/edit`}>Edit listing</Link>
            <button onClick={onDelete}>Delete listing</button>
        </>
    )
}

export default Product