import React, { Component } from 'react';
import { HeaderComponent } from '../Common/HeaderComponent';
import { Layout, Menu, Breadcrumb, Spin } from "antd";
import { RouteComponentProps } from 'react-router-dom';
import '../../../styles/UserStyle/contact.css'
import { Form, Input, InputNumber, Button } from 'antd';
import FooterComponent from '../Common/FooterComponent';
import ContactUserServices from '../../../services/UserService/ContactUserServices';
import Swal from 'sweetalert2';
import { regexEmail, regexLink, regexName } from '../../../constant/RegexConst';
import { name_error, email_error, input_error } from '../../../constant/MessageValid'
interface IContact {
    name: string,
    email: string,
    content: string,
    loading: boolean,
    name_err: string,
    email_err: string,
    content_err: string,


}
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

export default class Contact extends React.Component<RouteComponentProps<any>, IContact> {

    /**
     * 
     * @param props 
     * Constuctor
     */
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            email: '',
            content: '',
            loading: false,
            name_err: '',
            email_err: '',
            content_err: '',

        }
    }
    layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };


    /**
     * 
     * @param e 
     * Change input html value to state
     */
    handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let target = e.target as HTMLInputElement;
        this.setState({
            [target.name]: target.value
        } as any);

    }

    /**
     * 
     * @param e 
     * Save event
     */
    save = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        let contactThread = {
            name: this.state.name,
            email: this.state.email,
            content: this.state.content,
        };
        console.log(contactThread)
        const isValid = this.validate()
        if (isValid) {
            this.setState({ name_err: '', email_err: '', content_err: '' });
            Toast.fire({
                icon: 'success',
                title: 'Sending...'
            })
            ContactUserServices.createContact(contactThread).then((res) => {
                Swal.fire({
                    title: 'Sent Successful!',
                    text: 'Thanks for your contact!',
                    imageUrl: 'https://www.english-learning.net/wp-content/uploads/2018/03/Thank-you.jpg',
                    imageWidth: 400,
                    imageHeight: 200,
                })
            })
            let target = e.target as HTMLInputElement;
            this.setState({
                [target.name]: ''
            } as any);
        }
    }

    /**
     * 
     * @param e 
     * set state for text area
     */
    handleChange(e: any) {
        e.preventDefault();
        let target = e.target as HTMLInputElement;
        this.setState({
            content: e.target.value
        })
    }
    
    /**
     * 
     * @returns 
     * valid form
     */
    validate = () => {
        // call state es6 syntax
        var { name, email, content } = this.state
        // create vari to check
        let name_err = '';
        let email_err = '';
        let content_err = '';

        // name check valid
        if (name === '') {
            name_err = input_error;
        } else if (name.length > 30 || !regexName.exec(name)) {
            name_err = name_error;
        }

        if (email === '') {
            email_err = input_error
            if (!regexEmail.exec(email)) {
                email_err = email_error;
            }
        }

        // img check valid
        if (content === '') {
            content_err = input_error;
        }
        else if (content.length > 200) {
            content_err = "Message must be smaller than 200 characters!";
        }


        if (name_err || email_err || content_err) {
            this.setState({ name_err, email_err, content_err });
            return false;
        }

        return true;
    }

    /**
     * set title page
     */
    componentDidMount() {
        document.title = 'Contact'
    }
    
    /**
     * 
     * @returns 
     */
    render() {
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

                            <form id="waterform" onSubmit={this.save}>

                                <div className="formgroup" id="name-form">
                                    <label className="label">Your name*</label>
                                    <input type="text" className="input" id="name" name="name" onChange={(e) => this.handleInputChanges(e)} />
                                </div>
                                <div style={{ fontSize: '15px', paddingLeft: '10px', color: 'red' }}>
                                    {this.state.name_err}
                                </div>
                                <div className="formgroup" id="email-form">
                                    <label className="label"  >Your e-mail*</label>
                                    <input type="email" className="input" id="email" name="email" onChange={(e) => this.handleInputChanges(e)} />
                                </div>
                                <div style={{ fontSize: '15px', paddingLeft: '10px', color: 'red' }}>
                                    {this.state.email_err}
                                </div>

                                <div className="formgroup" id="message-form">
                                    <label className="label">Your message</label>
                                    <textarea id="message" onChange={(e) => this.handleChange(e)} className="textarea" name="content"></textarea>
                                </div>
                                <div style={{ fontSize: '15px', paddingLeft: '10px', color: 'red' }}>
                                    {this.state.content_err}
                                </div>
                                <input type="submit" className="Sub" value="Send your message!" />
                            </form>
                        </div>


                    </div>
                </div>
                <FooterComponent />

            </Layout>
        );

    }
}
