import { Link } from "react-router-dom"

const Catalog = ({products}) => {
    return (
        <>
        <h2>Catalog</h2>

        <div>
            {products.length > 0 ?
            <ul>
                {products.map(x => <li key={x._id} ><Link to={`/products/${x._id}`}>{x.title}</Link></li>)}
            </ul>
            : <p>There are no clothing articles for sale at the moment.</p>
            }
        </div>
        </>
    )
}

export default Catalog