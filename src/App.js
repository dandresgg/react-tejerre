import './App.css';
import './css/btn.css';
import React, {useState, useEffect} from 'react';
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
import Create from './views/create';
import Blog from './views/blog';
import {MenuOptions} from './parts/menu';
import CartDetails from './views/cart-details';
import {useCookies} from "react-cookie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";


export const App = () => {
    const [cartCookie, setCartCookie] = useCookies(['cart-items'])
    const [itemsCart, setItemsCart] = useState([]);
    const [counter, setCounter] = useState(0)
    const [menu, setMenu] = useState(true)
    const [content, setContent] = useState(true)
    const [miniScreen, setMiniScreen] = useState('not_mini');

    useEffect(() => {
        setItemsCart(cartCookie['cart-items'])
        if (cartCookie['cart-items']) {
            let sumCount = cartCookie['cart-items'].reduce((a, c) => a + c.qty, 0)
            setCounter(sumCount)
        } else {
            setItemsCart([])
        }
        const screen = window.innerWidth
        if (screen < 1024) {
            setMenu(false)
        }
    }, [])

    const setNewItem = (item) => {
        const exist = itemsCart.find((x) => x.id === item.id);
        if (exist) {
            setItemsCart(
                itemsCart.map((x) =>
                    x.id === item.id ? {...exist, qty: exist.qty + 1} : x
                )
            );
        } else {
            setItemsCart([...itemsCart, {...item, qty: 1}]);
        }
        setCartCookie('cart-items', itemsCart, {sameSite: 'none', secure: true, path: '/'})
        let sumCount = itemsCart.reduce((a, c) => a + c.qty, 0)
        setCounter(sumCount)
    }

    const removeItem = (item) => {
        const exist = itemsCart.find((x) => x.id === item.id);
        if (exist.qty === 0) {
            setItemsCart(itemsCart.filter((x) => x.id === item.id));
        } else {
            setItemsCart(
                itemsCart.map((x) =>
                    x.id === item.id ? {...exist, qty: exist.qty - 1} : x)
            );
        }
        setCartCookie('cart-items', itemsCart, {sameSite: 'none', secure: true, path: '/'})
        let sumCount = itemsCart.reduce((a, c) => a + c.qty, 0)
        setCounter(sumCount)
    };
    const deleteItem = (item) => {
        const exist = itemsCart.find((x) => x.id === item.id);
        if (exist) {
            setItemsCart(
                itemsCart.map((x) =>
                    x.id === item.id ? {...exist, qty: exist.qty - exist.qty} : x
                )
            );
            setCartCookie('cart-items', itemsCart, {sameSite: 'none', secure: true, path: '/'})
            let sumCount = itemsCart.reduce((a, c) => a + c.qty, 0)
            setCounter(sumCount)
        }
    }
    const showMenu = () => {
        setMenu(true);
        setContent(false);
        setMiniScreen('mini_screen');
    }

    return (
        <div className="App">
            <header className="App-header mayus bg-main">
                <div className='bg-title-nav'>
                    <FontAwesomeIcon icon={faBars} onClick={() => showMenu()} /> :
                    <h1></h1>
                </div>
            </header>
            <div className="d-flex space-b">
                {!menu ?
                    <div className='container-left' id='menu-l'>
                        <MenuOptions counter={counter} miniScreen={miniScreen}
                            setMenu={setMenu} setContent={setContent} />
                    </div> :
                    <div className='container-left show' id='menu-l'>
                        <MenuOptions counter={counter} miniScreen={miniScreen}
                            setMenu={setMenu} setContent={setContent} />
                    </div>
                }
                {content ?
                    <div className='container center'>
                        <Routes>
                            <Route path='/perfil' caseSensitive={false} element={<Auth />} />
                            <Route path='/repuestos' caseSensitive={false} element={
                                <Replacements itemsCart={itemsCart}
                                    setNewItem={setNewItem}
                                    deleteItem={deleteItem}
                                    removeItem={removeItem} />
                            } />
                            <Route path='/contacto' caseSensitive={false} element={<Contact />} />
                            <Route path='/carro' caseSensitive={false} element={<Cart />} />
                            <Route path='/blog' caseSensitive={false} element={<Blog />} />
                            <Route path='/crear' caseSensitive={false} element={<Create />} />
                            <Route path='/perfil/detalles' caseSensitive={false}
                                element={<ProfileDetails />} />
                            <Route path='/cart/detalles' caseSensitive={false}
                                element={
                                    <CartDetails cartCookie={cartCookie}
                                        counter={counter}
                                        itemsCart={itemsCart}
                                        deleteItem={deleteItem}
                                        setNewItem={setNewItem}
                                        removeItem={removeItem} />
                                }
                            />
                        </Routes>
                    </div> :
                    null
                }
            </div >
            < div className='App-footer bg-main'>
                <h6 className='bg-title-nav m-0'>Copyright © 2022 TejeRepuestos</h6>
            </div>
        </div>
    );
}
