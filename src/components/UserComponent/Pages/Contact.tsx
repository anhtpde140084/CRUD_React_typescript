import React, { useState, useEffect } from 'react';
import { HeaderComponent } from '../Common/HeaderComponent';
import { Layout } from "antd";
import '../../../styles/UserStyle/contact.css'
import { Form, Input, Select, Button } from 'antd';
import FooterComponent from '../Common/FooterComponent';
import ContactUserServices from '../../../services/UserService/ContactUserServices';
import Swal from 'sweetalert2';
import { regexEmail, regexLink, regexName } from '../../../constant/RegexConst';
import { name_error, email_error, input_error } from '../../../constant/MessageValid'

const { Option } = Select
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 11000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

/**
 * Contact
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



export const Contact = (props: any) => {


    /**
     * set title page
     */
    useEffect(() => {
        document.title = 'Contact'
    });

    const [isOther, setIsOther] = useState(false);
    /**
     * 
     * @returns 
     */
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };


    const createContact = (value: any) => {

        ContactUserServices.createContact(value).then((res) => {
            if (res.data === 'ok') {
                
                Swal.fire({
                    title: 'Sent Successful!',
                    text: 'Thanks for your contact!',
                    imageUrl: 'https://www.english-learning.net/wp-content/uploads/2018/03/Thank-you.jpg',
                    imageWidth: 400,
                    imageHeight: 200,
                })
                form.setFieldsValue({
                    name: '',
                    content: '',
                    email: '',
                    message: ''
                })
            } else {
                Swal.fire({
                    title: "Send fail!",
                    text: "Your email already send, please wait for our contact! If there is an urgent matter, please contact us by phone.",
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK!'
                }).then((result) => {

                })
            }

        })
    }
    /**
     * 
     * @param object contact Thread
     */
    const onFinish = (object: any) => {
        let values = ({
            name: form.getFieldValue('name'),
            email: form.getFieldValue('email'),
            content: form.getFieldValue('message')
        })

        // check click selection
        if (isOther) {
            // if user click other select. 
            Toast.fire({
                icon: 'success',
                title: 'Sending...'
            })
            console.log(values);
            createContact(values);

        } else {
            // check if user not click other select. Put default
            Toast.fire({
                icon: 'success',
                title: 'Sending...'
            })
            createContact(object)
        }
    };

    const [form] = Form.useForm();

    const onChangeOther = (value: string) => {
        switch (value) {
            case 'other':
                setIsOther(true)
                return;
            default: setIsOther(false)
                return
        }
    };

    // return =================================
    return (

        <Layout className="layout">

            <HeaderComponent />
            <div className="container">

                <div className="contact-form">
                    <header className="header">
                        <h1 className="h1">Contact us</h1>
                    </header>
                    <div id="form">
                        <div className="fish" id="fish"></div>
                        <div className="fish" id="fish2"></div>
                        <Form form={form} onFinish={onFinish} {...layout} id="waterform" name="nest-messages" >
                            <div className="formgroup" >
                                <Form.Item name="name" label="Name" rules={[{ required: true, message: input_error }, { max: 30, message: name_error }]}>
                                    <Input maxLength={35} />
                                </Form.Item>
                            </div>
                            <div className="formgroup" >
                                <Form.Item name='email' label="Email" rules={[{ required: true, message: input_error }, { type: `email`, pattern: new RegExp(regexEmail), message: email_error }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="formgroup" >
                                <Form.Item name='content' label="Purpose" rules={[{ required: true, message: 'Please choose one option!' }]}>
                                    <Select onChange={onChangeOther}
                                        placeholder="Select a option and change input text above"
                                        allowClear
                                    >
                                        <Option value="advertising">Contact advertising</Option>
                                        <Option value="post">Contact post</Option>
                                        <Option value="recruitment">Contact recruitment</Option>
                                        <Option value="other">Other</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="formgroup" >
                                <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, currentValues) => prevValues.content !== currentValues.content}
                                >
                                    {({ getFieldValue }) =>
                                        getFieldValue('content') === 'other' ? (
                                            <Form.Item
                                                name="message"
                                                label="Message"

                                                rules={[{ required: true, message: input_error }, { max: 100, message: 'Content must be 100 characters!' }]}
                                            >
                                                <Input.TextArea maxLength={105} />
                                            </Form.Item>
                                        ) : null
                                    }
                                </Form.Item>
                            </div>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 17 }}>
                                <Button type="primary" htmlType="submit">
                                    Send Request
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
            <FooterComponent />

        </Layout>
    );

}

