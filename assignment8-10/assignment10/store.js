import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import jobReducer from './jobSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';


if (response.ok) {
  const data = await response.json();
  localStorage.setItem('userType', data.type); 
  alert('Login successful!');
  window.location.href = 'index.html';  
} else {
  alert('Login failed!');
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['job', 'user']  
};

const rootReducer = {
  job: jobReducer,
  user: userReducer  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
