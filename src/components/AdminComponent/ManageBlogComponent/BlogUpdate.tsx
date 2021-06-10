import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Breadcrumb } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import BlogService from '../../../services/AdminService/BlogService';
import axios from 'axios';
import Swal from 'sweetalert2';
import { regexTag, regexLink, regexName1 } from '../../../constant/RegexConst';
import { input_error, title_err, tag_err, link_err } from '../../../constant/MessageValid';
import { resouceNotFound, findSomething } from '../../../constant/MessageException';
import { Link } from 'react-router-dom';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { updateBLogDetail } from '../../../actions/blog';
/**
 * BlogUpdate
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
 * 06-07-2021          Anhtp8           Update blog
 */
// sweet alert 2 ================
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})
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
// ================================================================

/**
 * Interface
 */
interface IBlog {
    id: any,
    content: string,
    title: string,
    imgFront: string,
    tag: string,
    value: string,
    title_error: string,
    tag_error: string,
    img_error: string,
    content_error: string
}

 class BlogUpdate extends React.Component<any, IBlog> {

    /**
     * 
     * @param props 
     * Constructor default
     */
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
            title_error: '',
            tag_error: '',
            img_error: '',
            content_error: ''
        }
    }

    // valid
    validate = () => {

        // call state es6 syntax
        var { title, tag, imgFront, content } = this.state
        // create vari to check
        let title_error = '';
        let tag_error = '';
        let img_error = '';
        let content_error = '';

        // titile check valid
        if (title === '') {
            title_error = input_error;
        } else if (title.length > 200 || !regexName1.exec(title)) {
            title_error = title_err;
        }

        // tag check valid
        if (tag === '') {
            tag_error = input_error;
        } else {
            if (tag.length <= 3 || tag.length > 11 || !tag.includes('#') || !regexTag.exec(tag)) {
                tag_error = tag_err;
            }
        }

        // img check valid
        if (!regexLink.exec(imgFront)) {
            img_error = link_err;
        }

        if (content === '') {
            content_error = input_error;
        }

        if (title_error || tag_error || img_error || content_error) {
            this.setState({ title_error, tag_error, img_error, content_error });
            return false;
        }

        return true;
    }

    // update blog 
    saveBlog = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        let blogChange = {
            content: this.state.content,
            title: this.state.title,
            imgFront: this.state.imgFront,
            tag: this.state.tag
        };
        const isValid = this.validate();
        if (isValid) {
           this.props.updateBLogDetail(this.state.id, blogChange)
           .then(() => {
                this.props.history.push("/admin/");
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 2000
                })
            }).catch((err:any) => {
                if (err.response) {
                    Toast.fire({
                        icon: 'error',
                        title: findSomething
                    })
                } else if (err.request) {
                    Toast.fire({
                        icon: 'error',
                        title: err.message
                    })
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: err.message
                    })
                }
            });
        }

    };

    // useEffect
    componentDidMount() {

        BlogService.getBlogById(this.state.id).then((res) => {
            let blog = res.data;
            console.log("blogg" + blog.title)
            this.setState({
                content: "",
                title: blog.title,
                imgFront: blog.imgFront,
                tag: blog.tag,
                value: blog.content
            });

        }).catch((err) => {

            if (err.response) {
                Toast.fire({
                    icon: 'error',
                    title: resouceNotFound
                })
            } else if (err.request) {
                Toast.fire({
                    icon: 'error',
                    title: err.message
                })
            } else {
                Toast.fire({
                    icon: 'error',
                    title: err.message
                })
            }
        });

    }
    // handle when content at editor change
    handleEditorChange = (e: any) => {
        e.preventDefault();
        console.log(
            'Content was updated:',
            e.target.getContent(),

        );
        this.setState({
            content: e.target.getContent()

        })
    }

    // upload image
    handleUpdload = async (e: any) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0])
        data.append('upload_preset', 'upload_image')
        await axios({
            method: 'post',
            url: 'https://api.cloudinary.com/v1_1/df66mvytc/image/upload',
            data: data,

        }).then((res) => {
            const file = res.data.secure_url
            this.setState({
                imgFront: file
            })
            Toast.fire({
                icon: 'success',
                title: "Upload successfull!"
            })
        }).catch((err) => {
            Toast.fire({
                icon: 'error',
                title: "Can not upload this file!!"
            })
        })

    }
    // when input field change
    handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let target = e.target as HTMLInputElement;
        this.setState({
            [target.name]: target.value
        } as any);
        console.log(this.state.id)
    }
    // return list blog
    cancel() {
        var { title, tag, imgFront, content } = this.state

        if (title !== '' || tag !== '' || imgFront !== '' || content !== '') {
            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "If you cancel, your content will be keep but not change!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, leave it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    this.props.history.push("/admin/blogs");
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your change will be here :)',
                        'error'
                    )
                }
            })
        } else {
            this.props.history.push("/admin/blogs");
        }

    }

    // render ================================================================
    public render() {
        const { value, content, title, imgFront, tag } = this.state
        console.log(title)
        return (

            <div >
                <Breadcrumb style={{ marginBottom: '70px' }}>
                    <Breadcrumb.Item href="">
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <HomeOutlined />
                        <Link to="/admin/"><span>Blog Manage</span></Link>

                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Blog Update</Breadcrumb.Item>
                </Breadcrumb>
                <form onSubmit={this.saveBlog}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label ">Title:</label>
                        <div className="col-sm-10">
                            <input style={{ width: '410px' }} name="title" id="title" className="form-control" value={this.state.title} onChange={(e) => this.handleInputChanges(e)} />
                            <div style={{ fontSize: '15px', paddingLeft: '10px', color: 'red' }}>
                                {this.state.title_error}
                            </div>
                        </div>
                    </div>
                    <div className="form-group row pt-3">
                        <label className="col-sm-2 col-form-label ">Tag:</label>
                        <div className="col-sm-5">
                            <input style={{ width: '410px' }} name="tag" id="tag" className="form-control" value={this.state.tag} placeholder="Example: #name_tag" onChange={(e) => this.handleInputChanges(e)} />
                            <div style={{ fontSize: '15px', paddingLeft: '10px', color: 'red' }}>
                                {this.state.tag_error}
                            </div>
                        </div>
                    </div>
                    <div className="form-group row pt-3">
                        <label className="col-sm-2 col-form-label ">Image Title:</label>
                        <div className="col-sm-10">
                            <div className="row">
                                <div className="col">
                                    <input
                                        placeholder=""
                                        name="imgFront"
                                        className="form-control"
                                        value={this.state.imgFront}
                                        onChange={(e) => this.handleInputChanges(e)}
                                    />
                                    <div style={{ fontSize: '15px', paddingLeft: '10px', color: 'red' }}>
                                        {this.state.img_error}
                                    </div>
                                </div>
                                <div className="col">

                                    <input type="file" name="files" style={{
                                        border: '0',
                                        clip: 'react(0 0 0 0)',
                                        overflow: 'hidden',
                                    }} onChange={(e) => this.handleUpdload(e)} />

                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="">
                        <Editor
                            value={value}
                            onInit={(evt, editor) => {
                                this.setState({
                                    content: (editor.getContent())
                                })
                            }}
                            onEditorChange={(newValue, editor) => {
                                this.setState({
                                    value: newValue,
                                    content: (editor.getContent({ format: 'text' }))
                                })

                            }}
                            apiKey="ln5ejajrfyw595bk6dna3ko9otjsr3avcb4hhv1pz033ooy0"
                            init={{
                                height: 500,
                                plugins: [
                                    'advlist autolink link image lists charmap print preview hr anchor pagebreak',
                                    'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                                    'table emoticons template paste help'
                                ],
                                toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
                                    'bullist numlist outdent indent | link image | print preview media fullpage | ' +
                                    'forecolor backcolor emoticons | help',
                                menu: {
                                    favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' }
                                }
                                , menubar: 'favs file edit view insert format tools table help'

                            }}
                            onChange={this.handleEditorChange}
                        />
                        <div style={{ fontSize: '15px', paddingLeft: '10px', color: 'red' }}>
                            {this.state.content_error}
                        </div>
                    </div>
                    <div className="form-group row pt-5">
                        <div className="col-sm-10">
                            <button type="button" style={{ marginRight: "10px" }} onClick={this.cancel.bind(this)} className="btn btn-danger">Cancel</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>

                    </div>
                </form>



            </div >


        );
    }
}
export default connect(null, { updateBLogDetail })(BlogUpdate);