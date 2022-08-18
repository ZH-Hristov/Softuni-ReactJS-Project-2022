import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"

import { AuthProvider } from './contexts/authContext';
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
import EditProduct from './components/EditProduct';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {

    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    const createProductHandler = (productData) => {
        setProducts(state => [
            ...state,
            productData
        ])

        navigate('/')
    }

    const editProductHandler = (productID, productData) => {
        setProducts(state => state.map(x => x._id === productID ? productData : x))
    }

    const deleteProductHandler = (productID) => {
        setProducts(state =>
            state.filter(x => {
                return x._id !== productID
            })
        )
    }

    useEffect(() => {
        productService.getAll()
            .then(result => {
                setProducts(result)
            })
    }, [])

    return (
        <div className="App">
            <AuthProvider>
                <Navigation />

                <ProductContext.Provider value={{ products, createProductHandler, editProductHandler, deleteProductHandler }}>
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path='/' element={<Catalog products={products} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/products/:productID" element={<Product />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/createproduct" element={<CreateProduct />} />
                            <Route path="/products/:productID/edit" element={<EditProduct />} />
                            <Route path="/logout" element={<Logout />}></Route>
                        </Route>
                        
                    </Routes>
                </ProductContext.Provider>
            </AuthProvider>
        </div>
    );
}

export default App;
