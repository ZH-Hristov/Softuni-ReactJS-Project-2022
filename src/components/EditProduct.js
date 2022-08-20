import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate, Navigate } from "react-router-dom"

import * as productService from '../services/productService'
import { ProductContext } from "../contexts/productContext"
import { AuthContext } from "../contexts/authContext"

import styles from './EditProduct.module.css'

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

    if (Object.keys(currentProduct).length > 0 && currentProduct._ownerId !== user._id) {
        return (<Navigate to='/' replace />)
    }

    return (
        <>
            <h1>Edit Product Listing</h1>

            <div className={styles.editcontainer}>
                <form className={styles.editform} id="edit" onSubmit={onSubmit}>
                    <label className={styles.editlabel} htmlFor="product-title">Product name:</label>
                    <input
                        className={styles.editinput}
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter Product Title"
                        defaultValue={currentProduct.title}
                    />
                    <label className={styles.editlabel} htmlFor="product-size">Product Size:</label>
                    <select id="product-size" name="product-size" className={styles.editinput}>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                    <label className={styles.editlabel} htmlFor="product-price">Product Price:</label>
                    <input
                        className={styles.editinput}
                        type="number"
                        id="product-price"
                        name="product-price"
                        min={1}
                        step={0.01}
                        placeholder={4.99}
                        defaultValue={currentProduct['product-price']}
                    />
                    <label className={styles.editlabel} htmlFor="product-image-url">Product Image Link:</label>
                    <input
                        className={styles.editinput}
                        type="text"
                        id="product-image-url"
                        name="image-url"
                        placeholder="https://imgur.com/myImage.jpg"
                        defaultValue={currentProduct['image-url']}
                    />
                    <label className={styles.editlabel} htmlFor="product-additional-details">Additional Details:</label>
                    <textarea className={`${styles.editinput} ${styles.edittextarea}`} name="product-additional-details" id="product-additional-details" defaultValue={currentProduct['product-additional-details']} />

                    <input
                        className={styles.editsubmit}
                        type="submit"
                        value="Save"
                    />
                </form>
            </div>
        </>
    )
}

export default EditProduct