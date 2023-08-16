import { combineReducers } from "redux";
// import confirmModal from './confirmModalReducer';
// import deleteModal from './deleteModalReducer';
import products from "./productsReducer";
// import pendingProduct from "./pendingProdactReducer";
import favorite from "./favoriteReducer";
import cart from "./cartReducer";
// import burgerMenu from './burgerReducer'
import user from './authReducer'
import { loader } from "./loaderReducer";
import history from "./historyReducer";
import userInfo from "./userInfoReducer";

export const rootReducer = combineReducers({ products, favorite, cart, user, loader, history, userInfo, })