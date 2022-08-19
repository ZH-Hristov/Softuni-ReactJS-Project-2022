import { useState, useContext } from "react"
import { Link } from "react-router-dom"

import * as productService from '../services/productService'
import { ProductContext } from "../contexts/productContext"
import styles from './Catalog.module.css'

const Catalog = () => {

    const [searchText, setSearchText] = useState('')
    const [noProducts, setNoProducts] = useState('There are no clothing articles for sale at the moment.')
    const { products, searchProductHandler } = useContext(ProductContext)

    const onSubmit = (e) => {
        e.preventDefault()

        productService.getByName(searchText)
            .then(searchedProducts => {
                searchProductHandler(searchedProducts)
                if (searchText === '') {
                    setNoProducts('There are no clothing articles for sale at the moment.')
                } else {
                    setNoProducts('There are no clothing items matching your search term.')
                }
            })
    }

    const onChange = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <>
        <h1>Catalog</h1>

        <form onSubmit={onSubmit} id="search">
            <input className={styles.searchbar} onChange={onChange} name="searchtext" type="text"></input>
            <input
                    className={styles.searchbutton}
                    type="submit"
                    value="Search"
                />
        </form>

        <div>
            {products.length > 0 ?
            <ul className={styles.catalogul}>
                {products.map(x => 
                <li className={styles.catalogli} key={x._id} >
                    <Link to={`/products/${x._id}`}><img className={styles.catalogimg} alt={x.title} src={x['image-url']} /></Link>
                    <Link className={styles.catalogdetail} to={`/products/${x._id}`}>{x.title}</Link>
                    <p className={styles.catalogdetail} >{x['product-price']}$</p>
                    <p className={styles.catalogdetail}>Size: {x['product-size']}</p>
                </li>)}
            </ul>
            : <p>{noProducts}</p>
            }
        </div>
        </>
    )
}

export default Catalog