import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Catalog = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("http://localhost:3030/data/products")
            .then(res => res.json())
            .then(result => {
                setProducts(result)
            })
    }, [])

    return (
        <>
        <h2>Catalog</h2>

        <div>
            <ul>
                {products.map(x => <li key={x._id} ><Link to={`/products/${x._id}`}>{x.name}</Link></li>)}
            </ul>
        </div>
        </>
    )
}

export default Catalog