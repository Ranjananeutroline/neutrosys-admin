// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import authReducer from './reducers/auth'; // Create this reducer
import bookingReducer from './reducers/appointment';
import serviceReducer from "./reducers/service"
import offerReducer from './reducers/offer';
import announcementReducer from './reducers/announcement';
const persistConfig = {
  key: 'persist-store',
  storage
}
const rootReducer = combineReducers({
  auth: authReducer,
  appointment: bookingReducer,
  offer:offerReducer,
  announcement:announcementReducer,
  service:serviceReducer
  // Other reducers can be added here
});
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Define initial state here
const initialState = {
  auth: { /* initial auth state */ },
  appointment: { /* initial appointment state */ },
  offer: { /* initial offer state */ },
  announcement: { /* initial announcement state */ },
  service: { /* initial service state */ },
  // Add other initial states if needed
};

const store = createStore(persistedReducer, initialState, applyMiddleware(thunkMiddleware));
export const persistor = persistStore(store)

export default store;