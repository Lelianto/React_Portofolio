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
import UserUpdatingBook from '../pages/userUpdatingBook';
import ExpeditionDetail from '../pages/expeditionDetail';
import SearchBook from '../pages/searchBook';
import CategoryBook from '../pages/categoryBook';

const MainRoute = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    {/* PAGES ROUTING */}
                    <Route exact path="/" component={Homepage} />
                    <Route exact path='/login' component={LoginPage} />
                    <Route exact path='/profile' component={Profile} />
                    <Route path='/bookdetail/:id' component={BookDetail} />
                    <Route exact path='/cart' component={Cart} />
                    <Route exact path='/sell' component={UserSellBookPage} />
                    <Route exact path='/updateproduct' component={UserUpdatingBook} />
                    <Route exact path='/expedition' component={ExpeditionDetail} />
                    <Route exact path='/search' component={SearchBook} />
                    <Route exact path='/category' component={CategoryBook} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default MainRoute;