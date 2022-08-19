import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate, Navigate } from "react-router-dom"

import * as productService from '../services/productService'
import { ProductContext } from "../contexts/productContext"
import { AuthContext } from "../contexts/authContext"

const EditProduct = () => {
    const [currentProduct, setCurrentProduct] = useState({})
    const { editProductHandler } = useContext(ProductContext)
    const { user } = useContext(AuthContext)
    const { productID } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        productService.getOne(productID)
            .then(productData => {
                setCurrentProduct(productData)
            })
    }, [productID])

    const onSubmit = (e) => {
        e.preventDefault()

        const productData = Object.fromEntries(new FormData(e.target))

        productService.edit(productID, productData)
            .then((result => {
                editProductHandler(productID, result)
                navigate(`/products/${result._id}`)
            }))
    }

    return (
        <div className="edit-container">

            {currentProduct._ownerId !== user._id && <Navigate to='/' />}

            <form id="edit" onSubmit={onSubmit}>
                <h1>Edit Product Listing</h1>
                <label htmlFor="product-title">Product name:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter Product Title"
                    defaultValue={currentProduct.title}
                />
                <label htmlFor="product-size">Product Size:</label>
                <select id="product-size" name="product-size">
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
                <label htmlFor="product-price">Product Price:</label>
                <input
                    type="number"
                    id="product-price"
                    name="product-price"
                    min={1}
                    step={0.01}
                    placeholder={4.99}
                    defaultValue={currentProduct['product-price']}
                />
                <label htmlFor="product-image-url">Product Image Link:</label>
                <input
                    type="text"
                    id="product-image-url"
                    name="image-url"
                    placeholder="https://imgur.com/myImage.jpg"
                    defaultValue={currentProduct['image-url']}
                />
                <label htmlFor="product-additional-details">Additional Details:</label>
                <textarea name="product-additional-details" id="product-additional-details" defaultValue={currentProduct['product-additional-details']} />

                <input
                    className="btn submit"
                    type="submit"
                    value="Save"
                />
            </form>
        </div>
    )
}

export default EditProduct