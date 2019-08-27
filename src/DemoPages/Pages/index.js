import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';



// NAVIGATION

import {LoginPage} from './LoginPage';

// Layout
import { AppHeader } from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

const Pages = ({ match }) => (
    <LoginPage />
);

export default Pages;