import React, { useEffect, useState } from 'react';
import { HeaderComponent } from '../Common/HeaderComponent';
import FooterComponent from '../Common/FooterComponent';
import { Layout } from "antd";
import UserServices from '../../../services/UserService/UserServices';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { List, Avatar, Space, Input, BackTop } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../../../actions/userInterface';
import { AppDispatch, RootState } from '../../../store';
const { Header, Content, Footer } = Layout;
const { Search } = Input;

/**
 * BlogList
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

export const BlogListUser = (props: IPropsMatchAndHistory) => {

    const [blogs, setBlogs] = useState([{
        id: 0,
        title: '',
        imgFront: '',
        viewer: 0
    }])

    const [blogSearch, setBlogSearch] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [isSearch, setIsSearch] = useState(false)
    const [loading, setIsLoading] = useState(false)
    
    const blogList = useSelector((state: RootState) => state.blogs);

    const dispatch: AppDispatch = useDispatch();


    /**
     * fetch after render
     */
    useEffect(() => {
        document.title = 'Blogs'
        // UserServices.getAllBlog().then((res) => {
        //     setBlogs(res.data)
        //     setTotalPage(res.data.length)
        // })
        dispatch(getBlogs())
       
    }, [])

    useEffect(() => {
        if (blogList) {
            setBlogs(blogList);
            setTotalPage(blogList.length)
        }    
    }, [blogList]);
    /**
     * 
     * @param id 
     * view detail blog
     */


    const history = useHistory();

    const viewBlog = (id: number) => {

        UserServices.getBlogById(id).then((res) => {
            console.log(res.data)
            history.push(`/blog/view-blog/${id}`);
        }).catch((err) => {
            console.log(err);
        })

    };

    /**
     * 
     * @param values 
     * Search event
     */
    const onsearch = (values: string) => {
        if (values === '') {
            setIsSearch(false)
            setIsLoading(false)
        } else {
            setIsLoading(true)
            UserServices.searchAny(values).then((res) => {
                console.log(res.data)
                setBlogSearch(res.data)
                setIsSearch(true)
                setTotalPage(res.data.length)

            })
        }
    }

    /** 
     * Render
     */
    const IconText = ({ icon, text }: any) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );
    return (
        <Layout className="layout">
            <BackTop />
            <HeaderComponent />
            <div>
                <div className="container">
                    <header className="blog-header py-3">

                    </header>
                    <div className="nav-scroller py-1 mb-2">
                    </div>

                    <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark" style={{
                        backgroundImage: "url('https://papers.ch/wp-content/uploads/newbackground.jpg')", backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}>
                        <div className="col-md-6 px-0">
                            <h1 className="display-4 font-italic">My blog page </h1>
                            <p className="lead my-3" style={{ color: 'gray' }}>Here's a blog about anything I know. And the things I learned at the University about what was most interesting during this time.</p>
                            <p className="lead mb-0"><a href="#" className="text-white font-weight-bold">Continue reading...</a></p>
                        </div>
                    </div>

                    <main role="main" className="container">
                        <div className="row">
                            <div className="col-md-8 blog-main">

                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    pagination={{
                                        position: 'bottom',
                                        onChange: page => {
                                            console.log(page);
                                        },
                                        defaultPageSize: 4,
                                        total: totalPage, showSizeChanger: true,
                                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                        pageSizeOptions: ['4', '8', '12', '16', '20']


                                    }}
                                    dataSource={isSearch === false ? blogs : blogSearch}

                                    renderItem={item => (
                                        <List.Item
                                            key={item.id}
                                            actions={[
                                                <IconText icon={EyeOutlined} text={item.viewer} key="list-vertical-star-o" />,
                                                //<IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                                // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                            ]}
                                            extra={
                                                <img
                                                    width={150}
                                                    alt="logo"
                                                    src={item.imgFront}
                                                />
                                            }
                                        >
                                            <List.Item.Meta
                                                avatar={<Avatar src="https://cdn5.vectorstock.com/i/1000x1000/64/04/pen-bird-wing-blog-vector-20666404.jpg" />}
                                                title={<a
                                                    onClick={() => viewBlog(item.id)}
                                                >{item.title}</a>}
                                                description={"Click to read continue..."}
                                            />
                                        </List.Item>
                                    )}
                                />

                            </div>

                            <aside className="col-md-4 blog-sidebar">
                                <div className="position-sticky" style={{ marginBottom: '10px' }}>
                                    <Search placeholder="Input search text - Blogs" enterButton="Search" size="large" loading={loading} onChange={e => onsearch(e.target.value)} />
                                    <p style={{ color: 'black', marginTop: '20px', paddingLeft: '10px' }}>( Example: -Tag: skill, java, life...
                                        <b /> - Title: anything )
                                    </p>
                                </div>
                                <div className="position-sticky" style={{ top: '2em', marginTop: '40px' }}>
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
            <FooterComponent />
        </Layout>
    );
}
