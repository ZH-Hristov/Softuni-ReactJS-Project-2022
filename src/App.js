import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from "react"

import { AuthContext } from './contexts/authContext';

import Navigation from './components/Navigation';
import Catalog from './components/Catalog';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import Product from './components/Product';
import CreateProduct from './components/CreateProduct';
import './App.css';

function App() {

    const [products, setProducts] = useState([])
    const [auth, setAuth] = useState({})

    const userLogin = (authData) => {
        setAuth(authData)
    }

    useEffect(() => {
        fetch("http://localhost:3030/data/products")
            .then(res => res.json())
            .then(result => {
                setProducts(result)
            })
    }, [])

    return (
        <div className="App">
            <AuthContext.Provider value={{user: auth, userLogin}}>
            <Navigation />

            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path='/' element={<Catalog products={products} />} />
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />} />
                <Route path="/products/:productID" element={<Product />} />
                <Route path="/createproduct" element={<CreateProduct />} />
            </Routes>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
