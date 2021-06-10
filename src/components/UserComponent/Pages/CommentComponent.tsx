import React, { Component, useState, useEffect } from 'react';
import UserServices from '../../../services/UserService/UserServices';
import '../../../styles/UserStyle/comment.css';
import { List, Avatar } from 'antd';
import {
	Form,
	Input, Button, Pagination
} from 'antd';
import { isAuth } from '../../../helps/Auth';
import { email_error, input_error, name_error, title_err } from '../../../constant/MessageValid';
import { regexEmail, regexName } from '../../../constant/RegexConst';

/**
 * CommentComponent
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
export const CommentComponent = (props: any) => {
	const [comment, setComment] = useState([{
		idBlog: '',
		author: "",
		blogEntity: '',
		comment: "",
		dateComment: "",
		email: '',
		timeComment: ""
	}]);

	// set show and total for slice data
	const [show, setShow] = useState([]);
	const [totalPage, setTotal] = useState(0);


	useEffect(() => {
		UserServices.getComment(props.id_Blog).then((res) => {
			setComment(res.data.slice(0, 5))
			setShow(res.data)
			setTotal(res.data.length)
			console.log(res.data)
		}).catch((err) => {
			console.log('data not found!');
		})
	}, []);

	// es6 foreach comment
	const listCmt = comment.map((comment, index) => {
		return (<div className="be-comment">
			<div className="be-img-comment">
				<a href="#">
					<img src={comment.author === 'Admin' ? 'https://c8.alamy.com/comp/R5YAEG/gear-and-the-word-admin-3d-illustration-R5YAEG.jpg' : "https://bootdey.com/img/Content/avatar/avatar1.png"} alt="" className="be-ava-comment" />
				</a>
			</div>
			<div className="be-comment-content">
				<span className="be-comment-name">
					<a href="blog-detail-2.html" style={comment.author === 'Admin' ?
						{ color: 'red', fontWeight: 'bold' } : { color: 'black' }}>{comment.author}</a>
				</span>
				<span className="be-comment-time">
					<i className="fa fa-clock-o"></i>
					{comment.dateComment} at {comment.timeComment}
				</span>
				<p className="be-comment-text text-dark">
					{comment.comment}
				</p>
			</div>
		</div>)
	})

	// antd support
	const onFinish = (values: any) => {
		console.log(props.id_Blog)
		console.log(values);
		var commentNew = comment;
		UserServices.postComment(values).then((res) => {
			window.location.reload()
		}).catch((err) => {
			console.log('not ok!')
		})
	};

	// get form to set id of blog hidden
	const [form] = Form.useForm();

	form.setFieldsValue({
		idBlog: props.id_Blog
	})
	// set if admin is login
	if (isAuth()) {
		form.setFieldsValue({
			author: 'Admin'
		})
	}

	// config pagination custom
	const changePage = (page: any, pageSize: any) => {
		let start = (page - 1) * pageSize;
		let end = page * pageSize;
		setComment(show.slice(start, end))
	}

	return (
		<div className="container">
			<div className="be-comment-block">
				<Form className="form-block" form={form} onFinish={onFinish}>
					{isAuth() === false &&
						<div className="row">
							<div className="col-xs-12 col-sm-6">
								<Form.Item rules={[{ required: true, message: input_error },
								{ pattern: new RegExp(regexName), message: "Name must be string!" }, { max: 30, message: name_error }]}
									className="form-group forminput fl_icon" name="author">
									<Input maxLength={35} className="form-input inputComment" placeholder="Your name" />
								</Form.Item>
							</div>
							<div className="col-xs-12 col-sm-6 fl_icon">
								<Form.Item rules={[{ required: true, message: input_error },
								{ pattern: new RegExp(regexEmail), message: email_error }]}
									className="form-group forminput fl_icon" name="phone">
									<Input className="form-input inputComment" placeholder="Your email" />
								</Form.Item>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Form.Item rules={[{ required: true, message: input_error },
								{ max: 200, message: title_err }]}
									className="form-group forminput" style={{ width: '970px' }} name="comment">
									<Input.TextArea maxLength={200} className="form-input inputComment textarea" placeholder="Your text"></Input.TextArea>
								</Form.Item>
							</div>

						</div>}
					{isAuth() &&
						<div className="row">
							<Form.Item className="form-group forminput fl_icon" name="author">
								<Input type="hidden" className="form-input inputComment" placeholder="Your name" />
							</Form.Item>
							<div className="col-xs-12 col-sm-6">
								<Form.Item rules={[{ required: true, message: input_error },
								{ max: 200, message: title_err }]}
									className="form-group forminput" style={{ width: '970px' }} name="comment">
									<Input.TextArea maxLength={201} className="form-input inputComment textarea" placeholder="Your text"></Input.TextArea>
								</Form.Item>
							</div>
						</div>
					}
					<Form.Item className="form-group forminput" style={{ width: '970px' }} name="idBlog">
						<Input type="hidden"></Input>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="btn btn-primary pull-right">submit</Button>
					</Form.Item>

				</Form>


				<h1 className="comments-title">Comments ({totalPage})</h1>
				{listCmt}

			</div>
			<div style={{ textAlign: 'center' }}>
				<Pagination defaultPageSize={5}
					showSizeChanger={true}
					pageSizeOptions={['5', '10', '15']}
					onChange={changePage}
					defaultCurrent={1} total={totalPage} />
			</div>
		</div>
	);
}
