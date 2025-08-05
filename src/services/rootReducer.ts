import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import authReducer from './slices/authSlice';
import profileOrdersReducer from './slices/profileOrdersSlice';
import orderReducer from './slices/orderSlice';
import feedsReducer from './slices/feedsSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  auth: authReducer,
  profileOrders: profileOrdersReducer,
  order: orderReducer,
  feeds: feedsReducer
});

export default rootReducer;
