import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    UserOutlined,
    PhoneOutlined
} from '@ant-design/icons';

import '../../../styles/Sider.css';
import Header from '../HeaderAdmin/Header';
import AccService from '../../../services/AdminService/AccService';

/**
 * MainDashBorad
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
 * 06-07-2021          Anhtp8
 */
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const MainDashBoard = (props: any) => {

    /**
     * Set state
     */
    const [collapsed, setCollapsed] = useState(false)
    const history = useHistory()
    const [isLogin, setIsLogin] = useState(false);
    const onCollapse = (collapsed: any) => {
        console.log(collapsed);
        setCollapsed(collapsed)
    };

    /**
     * fetch after render
     */
    useEffect(() => {
        AccService.getAdminBoard().then((res) => {
            setIsLogin(true);
        }).catch(() => {

        })
    });

    /**
     * Check if was login => can not return login page
     */
    if (isLogin === false) {
        <Redirect to="/login" />
    }
    
    return (
        <div>
                <Layout style={{ minHeight: '110vh' }}>
                    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} >
                        <div className="logo" >
                        </div>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item style={{ backgroundColor: '#0c960e', marginTop: '10px' }} key="1" icon={<PieChartOutlined />}>
                                Dashboard
                            </Menu.Item>
                            <Menu.Item key="2" icon={<DesktopOutlined />}>
                            <Link to="/" >Redirect Home</Link>
                            </Menu.Item>

                            <Menu.Item key="3" icon={<PhoneOutlined />}>
                            <Link to="/admin/view-contactes" >View Contactes</Link>
                            </Menu.Item>
                            <Menu.Item key="sub1" icon={<UserOutlined />}>

                                <Link to="/admin/profile" >User Profile</Link>
                            </Menu.Item>
                            <SubMenu key="sub2" icon={<FileOutlined />} title="Manage Blog">
                                <Menu.Item key="6"><Link to="/admin/" >Blog Manage</Link></Menu.Item>

                                <Menu.Item key="8"><Link to="/admin/add-blog/_add" > Add Blog</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header />
                        <Content style={{ margin: '0 16px' }}>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                {props.children}
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Create by <a target="_blank" style={{textDecoration: 'underline'}} href="https://www.facebook.com/Anhtpde140084/">Trần Phi Anh</a> at FIN3 </Footer>
                    </Layout>
                </Layout>

        </div>


    )

}




