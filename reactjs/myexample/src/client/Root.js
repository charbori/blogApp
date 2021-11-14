import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { history } from '@/lib';
import App from '@/shared/App';
import { CookiesProvider } from 'react-cookie';
//import App from 'shared/NewApp';

const Root = () => (
    <CookiesProvider>
        <BrowserRouter history={history}>
            <App/>
        </BrowserRouter>
    </CookiesProvider>
);

export default Root;
