import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Swal from 'sweetalert2';
import BlogService from '../../../services/AdminService/BlogService';
import ReactHtmlParser, { processNodes, convertNodeToElement } from 'react-html-parser'
import {  Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveBlogById } from '../../../actions/blog'

/**
 * BlogDetail
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
 * 06-07-2021          Anhtp8           Detail of blog
 */
// Toast of Sweet alert 2
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

/**
 * Interface
 */
interface IBlogDetail {
    id: any,
    content: string,
    title: string,
    imgFront: string,
    tag: string,
    value: string,
    create_date: string
}

/**
 *  Main
 */
class BlogDetail extends React.Component<any, IBlogDetail> {
    constructor(props: any) {
        super(props);
        this.state = {
            //nhận giá trị id từ route bằng dòng code dưới
            id: this.props.match.params.id,
            content: "",
            title: "",
            imgFront: "",
            tag: "",
            value: "",
            create_date: ""

        }
    }

    //After render
    componentDidMount() {
      //  BlogService.getBlogById(this.state.id).then((res) => 
      this.props.retrieveBlogById(this.state.id).then(()=>
      {
            let blog = this.props.blogs;
            console.log(blog)
            this.setState({
                content: blog.content,
                title: blog.title,
                imgFront: blog.imgFront,
                tag: blog.tag,
                value: blog.content,
                create_date: blog.createDate
            });

        }).catch(() => {
            
                Toast.fire({
                    icon: 'error',
                    title: "Resouce not found!"
                })
            
        });

    }
    render() {
        return (
            <div>

                <div className="col-md-10 ml-2">
                    <Breadcrumb>
                        <Breadcrumb.Item href="">

                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                        <HomeOutlined />
                        <Link to="/admin/"><span>Blog Manage</span></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Detail</Breadcrumb.Item>
                    </Breadcrumb>
                    <article className="article main-article">
                        <header>
                            <h1> {this.state.title}</h1>
                            <ul className="details">
                                <li>Posted on {this.state.create_date}</li>
                                <li><a>{this.state.tag}</a></li>
                                <li>By <a href="#">Trần Phi Anh</a></li>
                            </ul>
                        </header>
                        <div className="main text-dark" style={{ color: 'Black' }}>
                            {ReactHtmlParser(this.state.content)}
                        </div>
                    </article>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state: any) => {
    return {
      blogs: state.blogs,
      
    };
  };
  export default connect(mapStateToProps, { retrieveBlogById  })(BlogDetail);
