import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from "antd";
import 'antd/dist/antd.css';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { HeaderComponent } from './Common/HeaderComponent';
import FooterComponent from './Common/FooterComponent';
import Home from './Pages/Home';

import {BlogListUser} from './Pages/BlogList';
import { DetailBlog } from './Pages/DetailBlog';
import { About } from './Pages/About';
import  {Contact}  from './Pages/Contact';
const { Header, Content, Footer } = Layout
export const MainContentUser = (props: any) => {

    return (
        <Router>
            <Layout className="layout">
                <HeaderComponent />

                <Route path="/" exact component={Home} />
                <Route path="/home" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/blogsList" exact component={BlogListUser} />
                <Route path="/blog/view-blog/:id" exact component={DetailBlog} />
                <Route path="/contact-us" exact component={Contact}/>
                <FooterComponent />
            </Layout>
        </Router>
    );

}

