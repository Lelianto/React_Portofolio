import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'unistore/react';
import { store } from '../store';
import Homepage from '../pages/index';
import LoginPage from '../pages/login';
import Profile from '../pages/profileUser';
import BookDetail from '../pages/bookDetail';
import Cart from '../pages/cartDetail';
import UserSellBookPage from '../pages/userSellBook';

const MainRoute = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    {/* PAGES ROUTING */}
                    <Route exact path="/" component={Homepage} />
                    <Route exact path='/login' component={LoginPage} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/bookdetail' component={BookDetail} />
                    <Route exact path='/cart' component={Cart} />
                    <Route exact path='/sell' component={UserSellBookPage} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default MainRoute;