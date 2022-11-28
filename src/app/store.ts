import { combineReducers, configureStore } from '@reduxjs/toolkit';
import chatSlice from '../pages/Chat/ChatSlice';
import HomeReducer from '../pages/Home/state/homeSlice';
import userReducer from '../pages/User/profileSlice';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import { useDispatch } from 'react-redux';
import LoginReducer from '../pages/Login/loginSlice';
import RegisterReducer from '../pages/Register/registerSlice';

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage
//   // whitelist: ['home', 'auth', 'chat', 'user']
// };

const rootReducer = combineReducers({
  login: LoginReducer,
  register: RegisterReducer,
  home: HomeReducer,
  chat: chatSlice.reducer,
  user: userReducer
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

// export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
