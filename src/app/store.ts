import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../pages/auth/authSlice';
import HomeReducer from '../pages/home/state/homeSlice';
import userReducer from '../pages/user/profileSlice';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import { useDispatch } from 'react-redux';
import ChatReducer from '../pages/chat/state/chatSlice';

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage
//   // whitelist: ['home', 'auth', 'chat', 'user']
// };

const rootReducer = combineReducers({
  auth: AuthReducer,
  home: HomeReducer,
  chat: ChatReducer,
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
