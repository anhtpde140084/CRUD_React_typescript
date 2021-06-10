import React, { Component, useState, useEffect } from 'react';
import { Table, Button, Space, Breadcrumb } from 'antd';
import ContactService from '../../../services/AdminService/ContactService';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { deleteSuccess, getSomethingWrong } from '../../../constant/MessageException';

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
 * 06-07-2021          Anhtp8           list of contact
 */

export const ContactesList = (props: any) => {

    /**
     * Content of list
     */
    const columns = [

        {
            title: 'Name',
            dataIndex: 'name',
            length: '100',
            width: '15%'

        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a: any, b: any) => +new Date(a.createDate) - +new Date(b.createDate),
            width: '15%'
        },
        {
            title: 'Content',
            dataIndex: 'content',
            width: '50%'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <a href="mailto:"><Button type="primary">Contact</Button></a>
                    <Button type="dashed" onClick={() => deleteContact(record.id)} danger>Delete</Button>
                </Space>
            ),
        },
    ]
    const [contactList, setContactList] = useState([
        {
            id: 0,
            name: '',
            email: '',
            content: ''
        }
    ]);
    useEffect(() => {
        ContactService.getAllContactes().then((res) => {
            setContactList(res.data)
        })
    }, []);

    console.log(contactList)
    // comfirm before delete
    const handleDeleteConfirm = (id: number) => {
        ContactService.deleteContact(id).then((res) => {
            if (res.data === "ok") {
                setContactList(contactList.filter(
                    (contact) => contact.id !== id
                ))
                Swal.fire(
                    deleteSuccess,
                    'Record has been deleted',
                    'success'
                )
            } else {
                Swal.fire({
                    title: 'Resource not found!',
                    text: getSomethingWrong,
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Reload!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                })
            }
        }).catch((err) => {
            console.log(id)
            if (err.response) {
                console.log(err.data)
                Swal.fire({
                    title: 'Resource not found!',
                    text: getSomethingWrong,
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Reload!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                })
            }
        });
    }

    const deleteContact = (id: number) => {

        Swal.fire({
            title: 'Are you sure delete this record?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteConfirm(id)
            }
        })
    }
    return (
        <div>
            <Breadcrumb style={{ marginBottom: '70px' }}>
                <Breadcrumb.Item href="">
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                    <HomeOutlined/>
                    <Link to="/admin/"><span>Blog Manage</span></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>List Contactes</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ marginBottom: 16 }}>
                <Link to="/admin/view-contacted">
                    <Button type="primary" >
                        List Contacted
                    </Button>
                </Link>
            </div>
            <Table key="index" columns={columns} dataSource={contactList}
                pagination={{ defaultPageSize: 5, defaultCurrent: 1, total: contactList.length, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'], }}
            />
        </div>
    );
}
