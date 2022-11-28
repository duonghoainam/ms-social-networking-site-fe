import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../pages/Auth/authSlice';
import chatSlice from '../pages/Chat/ChatSlice';
import HomeReducer from '../pages/Home/homeSlice';
import userReducer from '../pages/User/profileSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch } from 'react-redux';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'chat', 'user']
};

// export const store = configureStore({
//   reducer: {
//     auth: AuthReducer,
//     home: HomeReducer,
//     chat: chatSlice.reducer,
//     user: userReducer,
//   },
// });

const rootReducer = combineReducers({
  auth: AuthReducer,
  home: HomeReducer,
  chat: chatSlice.reducer,
  user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
