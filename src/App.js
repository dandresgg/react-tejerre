import './App.css';
import './css/btn.css';
import React from 'react';
import './css/img.css'
import {
    Routes,
    Route,
} from "react-router-dom";
import Replacements from './views/replacements';
import Auth from './views/auth';
import ProfileDetails from './views/profile-detail';
import Contact from './views/contact';
import Cart from './views/cart';
import {MenuOptions} from './parts/menu';

export const App = () => {
    return (
        <div className="App">
            <header className="App-header mayus">
                <h3>TejeRepuestos</h3>
            </header>
            <div className="d-flex space-b">
                <div className='container-left bg-main'>
                    <MenuOptions />
                </div>
                <div className='container center'>
                    <Routes>
                        <Route path='/perfil' caseSensitive={false} element={<Auth />} />
                        <Route path='/repuestos' caseSensitive={false} element={<Replacements />} />
                        <Route path='/contacto' caseSensitive={false} element={<Contact />} />
                        <Route path='/carro' caseSensitive={false} element={<Cart />} />
                        <Route path='/perfil/detalles' caseSensitive={false} element={<ProfileDetails />} />
                    </Routes>
                </div>
            </div>
            <div className='App-footer'>
                Copyright © 2022 TejeRepuestos
            </div>
        </div>
    );
}
