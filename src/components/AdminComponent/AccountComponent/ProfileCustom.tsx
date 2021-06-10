import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar, Form, Input, Button, Select, Modal, Breadcrumb } from 'antd';
import {HomeOutlined, UserOutlined } from '@ant-design/icons';
import AccService from '../../../services/AdminService/AccService';
import { History } from 'history';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import axios from "axios";
import '../../../styles/profile.css'
import { regexEmail, regexName, regexBirthday, regexPhone } from '../../../constant/RegexConst';
import { phone_error, email_error, input_error, name_error, birthday_error } from '../../../constant/MessageValid';

/**
 * ProfileCustom.tsx
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
 * 06-07-2021          Anhtp8           Modify information account
 */
// create vari
const { Option } = Select;


// ===================

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
interface IPropsMatchAndHistory {
    match: any,
    history: History
}
export const ProfileCustom = (props: IPropsMatchAndHistory) => {

    const [profile, setProfile] = useState({
        id: 1,
        age: 0,
        birthday: '',
        city: '',
        country: '',
        email: '',
        name: '',
        phone: '',
        avatar: ''
    })

    const [avatarImg, setAvatarImg] = useState('');

    const [countryData, setCuntryData] = useState([
        {
            id: 0,
            name: ''
        }
    ]);
    // layout form
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    // ===========


    // useState create status
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cityData, setCityData] = useState('')
    const [form] = Form.useForm();




    {/** show modal */ }
    const showModal = () => {
        setVisible(true)
    };
    {/** submitform */ }
    const onFinish = (values: any) => {
        console.log(values);
        AccService.updateAcc(values, 1).then((res) => {
            handleOk()
            props.history.push("/admin/profile");
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 2000
            })

            setProfile(values)
        }).catch((error) => {
            console.warn('Not good man :(');
        })

        const calculate_age = (dob1: Date) => {
            var today = new Date();
            var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
            var age_now = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age_now--;
            }
            console.log(age_now);
            return age_now;
        }

    };
    {/** like componentdidmount */ }
    useEffect(() => {
        AccService.getAccs().then((res) => {
            setProfile(res.data)
        })
    }, []
    )

    useEffect(() => {
        AccService.getCountryApi().then((res) => {
            setCuntryData(res.data)
        })

    }, []);

    console.log(countryData)
    {/** handle modal cancel with form */ }
    const handleCancel = () => {
        setVisible(false)
    }


    {/** handle modal ok with form */ }
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisible(false)
        });

    };

    const cancel = () => {
        props.history.push("/admin/");
    }

    {/** set data into form */ }
    form.setFieldsValue(profile);


    const elmCountries = countryData.map((country, index) => {
        return <Option value={country.name}>{country.name}</Option>
    })

    const handleUpdload = async (e: any) => { /*async thực hiện bất đồng bộ và
        sẽ return bất kỳ giá trị nào đặt trong hàm */
        const files = e.target.files;
        const data = new FormData(); // call this one because no button submit
        data.append('file', files[0]) //FormData.append(name, value) => tên data, giá trị của data
        data.append('upload_preset', 'upload_image')
        const res = await axios({
            // await đặt trước 1 promise axios
            // đợi axios thực hiện xong thi mới thực hiện async 
            method: 'post',
            url: 'https://api.cloudinary.com/v1_1/df66mvytc/image/upload', // api at cloudinary save image
            data: data
        }).then((res) => {
            const file = res.data.secure_url
            form.setFieldsValue({
                avatar: file
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

    return (

        <div>
            <Breadcrumb style={{ marginBottom: '70px' }}>
                <Breadcrumb.Item href="">

                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                    <HomeOutlined/>
                    <Link to="/admin/"><span>Blog Manage</span></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Profile</Breadcrumb.Item>
            </Breadcrumb>
            <Row justify="center">
                <Col span={6}><Avatar shape="square" size={200} icon={<UserOutlined />} src={profile.avatar} />

                </Col>
                <Col span={8}>

                    <Form labelAlign="left" {...layout} form={form} name="control-hooks" >
                        <Form.Item name="name" label="Full Name" >
                            <Input style={{ border: 'none' }} />
                        </Form.Item>
                        <Form.Item name="birthday" label="Birthday" >
                            <Input style={{ border: 'none' }} />
                        </Form.Item>
                        <Form.Item name="email" label="Email"

                        >
                            <Input style={{ border: 'none' }} />

                        </Form.Item>
                        <Form.Item name="phone" label="Phone" >
                            <Input style={{ border: 'none' }} />
                        </Form.Item>
                        <Form.Item name="country" label="Country" >
                            <Input style={{ border: 'none' }} />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="button" onClick={showModal}  >
                                Update
                            </Button>

                        </Form.Item>
                    </Form>
                </Col>
            </Row>

            <Modal
                visible={visible}
                title="Title"
                onOk={handleOk}

                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" form="myForm" htmlType="submit" loading={loading}>
                        Submit
                    </Button>,

                ]}
            >
                <Form labelAlign="left" id="myForm"  {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item name="name" label="Full Name" rules={[{ required: true, message: input_error },
                    { pattern: new RegExp(regexName), message: "Name must be string!" }, { max: 30, message: name_error }]}>
                        <Input maxLength={35} />
                    </Form.Item>
                    <Form.Item name="birthday" label="Birthday" rules={[{ required: true, message: input_error }, { pattern: new RegExp(regexBirthday), message: birthday_error }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email"

                        rules={[{ required: true, message: input_error }, { type: `email`, pattern: new RegExp(regexEmail), message: email_error }]}
                    >
                        <Input />

                    </Form.Item>
                    <Form.Item name="phone" label="Phone" rules={[{ required: true, message: input_error }, { pattern: new RegExp(regexPhone), message: phone_error }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="country" label="Country" rules={[{ required: true, message: input_error }]}>
                        <Select>
                            {elmCountries}
                        </Select>
                    </Form.Item>

                    <Form.Item name="avatar" label="Avatar" rules={[{ required: true, message: input_error }]}>
                        <input style={{
                            border: 'none',
                            width: '200px',
                            overflow: 'hidden'
                        }} type="file" onChange={(e) => handleUpdload(e)} />
                        <Input type="hidden" />
                    </Form.Item>


                </Form>
            </Modal>
        </div>
    )
}


