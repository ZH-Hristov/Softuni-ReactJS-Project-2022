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
        <h2>Catalog</h2>

        <form  onSubmit={onSubmit} id="search">
            <input onChange={onChange} name="searchtext" type="text"></input>
            <input
                    className="btn submit"
                    type="submit"
                    value="Search"
                />
        </form>

        <div>
            {products.length > 0 ?
            <ul>
                {products.map(x => 
                <li key={x._id} >
                    <img className={styles.catalogimg} alt={x.title} src={x['image-url']} />
                    <Link to={`/products/${x._id}`}>{x.title}</Link>
                </li>)}
            </ul>
            : <p>{noProducts}</p>
            }
        </div>
        </>
    )
}

export default Catalog