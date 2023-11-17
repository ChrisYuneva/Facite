import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LoginPage from './pages/loginPage/loginPage.tsx';
import RegisterPage from './pages/registerPage/registerPage.tsx';

import './firebase';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
);
