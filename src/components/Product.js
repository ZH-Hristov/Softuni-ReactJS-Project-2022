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
    }, [])

    return (
        <>
            <h3>Product: {product.name}</h3>

            <h4>Product Details:</h4>
            <ul>
                <li>Color: {product.color}</li>
                <li>Size: {product.size}</li>
                <li>Price: {product.price}</li>
            </ul>
        </>
    )
}

export default Product