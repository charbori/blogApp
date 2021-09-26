import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { history } from '@/lib';
import App from '@/shared/App';
//import App from 'shared/NewApp';

const Root = () => (
    <BrowserRouter history={history}>
    <App/>
    </BrowserRouter>
);

export default Root;
