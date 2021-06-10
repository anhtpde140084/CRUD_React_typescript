import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route, Switch, NavLink,Link } from 'react-router-dom';
import { isAuth } from '../../../helps/Auth';
const { Header } = Layout;

/**
 * HeaderComponent
 *
 * Version 1.0
 *
 * Date: 06-07-2021
 *
 * Copyright
 *
 * Modification Logs:
 * DATE                 AUTHOR          DESCRIPTION
 * -----------------------------------------------------------------------
 * 06-07-2021          Anhtp8           Header common
 */
export const HeaderComponent = () => {

    return (
        <Header  >
        
            <Menu theme="dark" style={isAuth()?{paddingLeft: '65%'}: {paddingLeft: '70%'}} mode="horizontal" defaultSelectedKeys={['1']}>
            {isAuth() && <Menu.Item style={{backgroundColor:'green'}}><Link to="/admin">Dashboard</Link></Menu.Item>}
                <Menu.Item ><Link to="/">Home</Link></Menu.Item>
                <Menu.Item><Link to="/about">About</Link></Menu.Item>
                <Menu.Item ><Link to="/blogsList">Blog</Link></Menu.Item>
                <Menu.Item ><Link to="/contact-us">Contact</Link></Menu.Item>
               
            </Menu>
        </Header >
    );
}
