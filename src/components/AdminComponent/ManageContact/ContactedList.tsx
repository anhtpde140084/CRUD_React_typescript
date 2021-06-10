import React, { Component, useState, useEffect } from 'react';
import { Table, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import ContactService from '../../../services/AdminService/ContactService';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

/**
 * ContactList
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
 * 06-07-2021          Anhtp8           List contacter who was resolve
 */
export const ContactedList = (props: any) => {

    const columns = [

        {
            title: 'Name',
            dataIndex: 'name',
            length: '100',
            width: '25%'

        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '25%'
        },
        {
            title: 'Content',
            dataIndex: 'content',
            width: '50%'
        },

    ]
    // set list for contactes
    const [contactList, setContactList] = useState([]);
    // get after render
    useEffect(() => {
        ContactService.getAllContacted().then((res) => {
            setContactList(res.data)
        })
    }, []);
    return (
        <div>
            <Breadcrumb style={{ marginBottom: '70px' }}>
                <Breadcrumb.Item href="">
                    <HomeOutlined/>
                    <Link to="/admin/"><span>Blog Manage</span></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                    <Link to="/admin/view-contactes/"><span>List Contactes</span></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>List Contacted</Breadcrumb.Item>
            </Breadcrumb>
            <Table key="index" columns={columns} dataSource={contactList}
                pagination={{ defaultPageSize: 5, defaultCurrent: 1, total: contactList.length, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'], }}
            />
        </div>
    );
}
