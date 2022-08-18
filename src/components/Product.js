import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import * as productService from '../services/productService'

const Product = () => {
    const [ product, setProduct ] = useState({})
    const { productID } = useParams();

    useEffect(() => {
        productService.getOne( productID )
            .then(result => {
                setProduct(result)
            })
    }, [productID])

    return (
        <>
            <h3>Product: {product.title}</h3>

            <h4>Product Details:</h4>
            <ul>
                <li>Size: {product['product-size']}</li>
                <li>Price: {product['product-price']}</li>
            </ul>
            <Link to={`/products/${productID}/edit`}>Edit listing</Link>
        </>
    )
}

export default Product