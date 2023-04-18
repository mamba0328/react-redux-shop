import { combineReducers } from "redux";
import confirmModal from './confirmModalReducer';
import deleteModal from './deleteModalReducer';
import products from "./productsReducer";
import pendingProduct from "./pendingProdactReducer";
import favorite from "./favoriteReducer";
import cart from "./cartReducer";
import burgerMenu from './burgerReducer'
import user from './authReducer'
import { loader } from "./loaderReducer";
import history from "./historyReducer";
export const rootReducer = combineReducers({ confirmModal, deleteModal, products, pendingProduct, favorite, cart, burgerMenu, user, loader, history })