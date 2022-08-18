import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
    const [ product, setProduct ] = useState({})
    const { productID } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3030/data/products/${productID}`)
            .then(res => res.json())
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
        </>
    )
}

export default Product