import React, { Component } from 'react';
import { Layout} from 'antd';

const { Footer } = Layout;

/**
 * FooterComponent
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
 * 06-07-2021          Anhtp8           Page common
 */
class FooterComponent extends Component {
    render() {
        return (
            <Footer style={{ textAlign: 'center', textDecoration: 'underline'}}>Ant Design ©2018 Created by Ant UED</Footer>
        );
    }
}

export default FooterComponent;