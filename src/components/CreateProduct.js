import { useContext } from 'react'

import * as productService from '../services/productService'
import { ProductContext } from '../contexts/productContext'

import styles from './CreateProduct.module.css'

const CreateProduct = () => {
    const { createProductHandler } = useContext(ProductContext)
    const onSubmit = (e) => {
        e.preventDefault()

        const productData = Object.fromEntries(new FormData(e.target))

        productService.create(productData)
            .then((result => {
                createProductHandler(result)
            }))
    }

    return (
        <>
            <h1>Create Product Listing</h1>

            <div className={styles.createcontainer}>
                <form id="create" className={styles.createform} onSubmit={onSubmit}>
                    <label className={styles.createlabel} htmlFor="product-title">Product name:</label>
                    <input
                        className={styles.createinput}
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter Product Title"
                    />
                    <label className={styles.createlabel} htmlFor="product-size">Product Size:</label>
                    <select id="product-size" name="product-size" className={styles.createinput}>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                    <label className={styles.createlabel} htmlFor="product-price">Product Price:</label>
                    <input
                        className={styles.createinput}
                        type="number"
                        id="product-price"
                        name="product-price"
                        min={1}
                        step={0.01}
                        placeholder={4.99}
                    />
                    <label className={styles.createlabel} htmlFor="product-image-url">Product Image Link:</label>
                    <input
                        className={styles.createinput}
                        type="text"
                        id="product-image-url"
                        name="image-url"
                        placeholder="https://imgur.com/myImage.jpg"
                    />
                    <label className={styles.createlabel} htmlFor="product-additional-details">Additional Details:</label>
                    <textarea className={styles.createinput} name="product-additional-details" id="product-additional-details" defaultValue="" />

                    <input
                        className="btn submit"
                        type="submit"
                        value="Create"
                    />
                </form>
            </div>
        </>
    )
}

export default CreateProduct