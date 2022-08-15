import { Routes, Route } from 'react-router-dom'

import Navigation from './components/Navigation';
import Catalog from './components/Catalog';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Product from './components/Product';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navigation />

            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path='/' element={<Catalog />} />
                <Route path="/login" element={<Login />}/>
                <Route path="/products/:productID" element={<Product />} />
            </Routes>
        </div>
    );
}

export default App;
