import { Link } from "react-router-dom"
import styles from './Catalog.module.css'

const Catalog = ({products}) => {
    return (
        <>
        <h2>Catalog</h2>

        <div>
            {products.length > 0 ?
            <ul>
                {products.map(x => 
                <li key={x._id} >
                    <img className={styles.catalogimg} alt={x.title} src={x['image-url']} />
                    <Link to={`/products/${x._id}`}>{x.title}</Link>
                </li>)}
            </ul>
            : <p>There are no clothing articles for sale at the moment.</p>
            }
        </div>
        </>
    )
}

export default Catalog