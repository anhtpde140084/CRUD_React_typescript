import React, { Component, useState, useEffect } from 'react';
import '../../../styles/UserStyle/about.css'
import { Layout } from "antd";

import { HeaderComponent } from '../Common/HeaderComponent';
import FooterComponent from '../Common/FooterComponent';
import UserServices from '../../../services/UserService/UserServices';
const { Header, Content, Footer } = Layout;

/**
 * About
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
export const About = (props: any) => {

    /**
     * Set state
     */
    const [infor, setInfor] = useState(
        {
            age: 0,
            birthday: '',
            country: '',
            email: '',
            name: '',
            phone: '',
            avatar: ''
        }
    );

    /**
     * Fetch after render
     */
    useEffect(() => {
        document.title = 'About'
        UserServices.getAccs().then((res) => {
            setInfor(res.data)
        })
    }, []);

    /**
     * Return
     */

    return (
        <Layout className="layout">
            <HeaderComponent />
            <section id="about" className="about" style={{ marginTop: '60px' }}>
                <div className="container">

                    <div className="section-title">
                        <h1 style={{ color: 'black' }}>About</h1>
                        <p style={{ color: 'black', fontSize: '15px' }}>  Hi there, I'm Trần Phi Anh 👋.  I’m currently working on FPT University
                            I’m currently learning everything.
                            I’m looking to collaborate with React Java Developer.
                            Ask me about anything, I am happy to help;
                            Fun fact: I love to play guitar / piano / music / travel</p>
                    </div>
                    
                    <div className="row mt-5">
                        <div className="col-lg-4" data-aos="fade-right">
                            <img src={infor.avatar} className="img-fluid" alt="" />
                        </div>
                        <div className="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
                            <h3>UI/UX Designer &amp; Web Developer.</h3>
                            <p className="font-italic" style={{color:'black'}}>
                                I have been interested in exploring machines and technology when I was a child, and I started to learn more about software, programming. Although my knowledge is not much, I learn quickly and always look for new things because creativity is my strength.
                            </p>
                            <div className="row">
                                <div className="col-lg-6">
                                    <ul>

                                        <li><i className="icofont-rounded-right"></i> <strong>Website:</strong> https://www.satdevelop.com/</li>
                                        <li><i className="icofont-rounded-right"></i> <strong>Phone:</strong> {infor.phone}</li>
                                        <li><i className="icofont-rounded-right"></i> <strong>Country:</strong> {infor.country}</li>
                                    </ul>
                                </div>
                                <div className="col-lg-6">
                                    <ul>
                                        <li><i className="icofont-rounded-right"></i> <strong>Birthday:</strong> {infor.birthday}</li>
                                        <li><i className="icofont-rounded-right"></i> <strong>Degree:</strong> University</li>
                                        <li><i className="icofont-rounded-right"></i> <strong>E-mail:</strong> {infor.email} </li>
                                    </ul>
                                </div>
                            </div>
                            <p style={{color:'gray'}}>
                                Officiis eligendi itaque labore et dolorum mollitia officiis optio vero. Quisquam sunt adipisci omnis et ut. Nulla accusantium dolor incidunt officia tempore. Et eius omnis.
                                Cupiditate ut dicta maxime officiis quidem quia. Sed et consectetur qui quia repellendus itaque neque. Aliquid amet quidem ut quaerat cupiditate. Ab et eum qui repellendus omnis culpa magni laudantium dolores.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <FooterComponent />
        </Layout>
    );

}

