import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { useLocalStorage } from './hooks/useLocalStorage';

import { AuthContext } from './contexts/authContext';
import { ProductContext } from './contexts/productContext';

import * as productService from './services/productService'

import Navigation from './components/Navigation';
import Catalog from './components/Catalog';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import NotFound from './components/NotFound';
import Product from './components/Product';
import CreateProduct from './components/CreateProduct';
import './App.css';

function App() {

    const [products, setProducts] = useState([])
    const [auth, setAuth] = useLocalStorage('auth', {})
    const navigate = useNavigate()

    const userLogin = (authData) => {
        setAuth(authData)
    }

    const userLogout = () => {
        setAuth({})
    }

    const createProductHandler = (productData) => {
        setProducts(state => [
            ...state, 
            productData
        ])

        navigate('/')
    }

    useEffect(() => {
        productService.getAll()
            .then(result => {
                setProducts(result)
            })
    }, [])

    return (
        <div className="App">
            <AuthContext.Provider value={{user: auth, userLogin, userLogout}}>
            <Navigation />

            <ProductContext.Provider value={{products, createProductHandler}}>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path='/' element={<Catalog products={products} />} />
                <Route path="/login" element={<Login />}/>
                <Route path="/logout" element={<Logout />}></Route>
                <Route path="/register" element={<Register />} />
                <Route path="/products/:productID" element={<Product />} />
                <Route path="/createproduct" element={<CreateProduct />} />
            </Routes>
            </ProductContext.Provider>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
