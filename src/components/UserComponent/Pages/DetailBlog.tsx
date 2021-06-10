import React, { Component, useState, useEffect } from 'react';
import { HeaderComponent } from '../Common/HeaderComponent';
import FooterComponent from '../Common/FooterComponent';
import { Layout } from "antd";
import UserServices from '../../../services/UserService/UserServices';
import ReactHtmlParser, { processNodes, convertNodeToElement } from 'react-html-parser'
import { CommentComponent } from './CommentComponent'

const { Header, Content, Footer } = Layout;


/**
 * DetailLlog
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
interface IPropsMatchAndHistory {
    match: any,
    history: History
}

/**
 * 
 * @param props 
 * main
 */
export const DetailBlog = (props: IPropsMatchAndHistory) => {

    /**
     * set state
     */
    const [blog, setBlog] = useState({
        id: props.match.params.id,
        title: '',
        content: '',
        createDate: '',
        tag: '',
    }
    );

    /**
     * fetch after render
     */
    useEffect(() => {
        UserServices.getBlogDetail(blog.id).then((res) => {
            setBlog(res.data);
        })
    }, []);
    
    
    /**
     * return
     */
    return (
        <Layout className="layout">
            <HeaderComponent />
            <div>
                <div className="container">
                    <header className="blog-header py-3">

                    </header>                

                    <main role="main" className="container">
                        <div className="row">
                            <div className="col-md-8 blog-main">

                                <article className="blog-post">
                                    <h1 className="blog-post-title">{blog.title}</h1>
                                    <p style={{color:'gray'}} className="blog-post-meta">{blog.createDate} by <a href="#">Tran Phi Anh</a></p>
                                    <div style={{color:'black'}}>
                                    { ReactHtmlParser(blog.content) }
                                    </div>
                                </article>

                            </div>

                            <aside className="col-md-4 blog-sidebar">
                                <div className="position-sticky" style={{ top: '2em' }}>
                                    <div className="p-4 mb-3 bg-light rounded">
                                        <h4 className="fst-italic">About</h4>
                                        <p className="mb-0" style={{ color: 'gray' }}>To know more about author, just follow him by link below</p>
                                    </div>



                                    <div className="p-4">
                                        <h4 className="fst-italic">Social Media</h4>
                                        <ol className="list-unstyled">
                                            <li><a href="#">GitHub</a></li>
                                            <li><a href="#">Twitter</a></li>
                                            <li><a href="#">Facebook</a></li>
                                        </ol>
                                    </div>
                                </div>
                            </aside>
                        </div>

                    </main>
                </div>
            </div>
            <CommentComponent id_Blog = {blog.id}/>
            <FooterComponent />
        </Layout>
    );

}

