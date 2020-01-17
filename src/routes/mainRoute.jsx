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
import PaymentConfirmation from '../pages/paymentConfirmation';
import DisplayAllUser from '../pages/adminAllUser';
import DisplayAllBook from '../pages/adminAllBook';
import DisplayAllCart from '../pages/adminAllCart';
import DisplayAllPayment from '../pages/adminAllPayment';
import NotMatch from '../pages/notMatch';
import Error401 from '../pages/error401Pages';
import Error403 from '../pages/error403Pages';
import Error404 from '../pages/error404Pages';
import Error422 from '../pages/error422Pages';
import Error500 from '../pages/error500Pages';
import AboutUs from '../pages/aboutPage';
import RuleInUs from '../pages/rulePage';
import HelpPage from '../pages/helpPage';
import ContactUs from '../pages/contactUs';
import PromoPage from '../pages/promoDiscount';

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
                    <Route path='/category' component={CategoryBook} />
                    <Route exact path='/payment' component={PaymentConfirmation} />
                    <Route exact path='/users' component={DisplayAllUser} />
                    <Route exact path='/books' component={DisplayAllBook} />
                    <Route exact path='/carts' component={DisplayAllCart} />
                    <Route exact path='/payments' component={DisplayAllPayment} />
                    <Route exact path='/401' component={Error401} />
                    <Route exact path='/403' component={Error403} />
                    <Route exact path='/404' component={Error404} />
                    <Route exact path='/422' component={Error422} />
                    <Route exact path='/500' component={Error500} />
                    <Route exact path='/about' component={AboutUs} />
                    <Route exact path='/rule' component={RuleInUs} />
                    <Route exact path='/help' component={HelpPage} />
                    <Route exact path='/contact' component={ContactUs} />
                    <Route exact path='/discount' component={PromoPage} />
                    <Route component={NotMatch} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default MainRoute;