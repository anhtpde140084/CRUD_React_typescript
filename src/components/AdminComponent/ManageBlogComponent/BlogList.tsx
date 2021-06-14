import * as React from 'react';
import BlogServices from '../../../services/AdminService/BlogService';
import { RouteComponentProps } from 'react-router-dom';
import 'jquery/dist/jquery.min.js';
import Swal from 'sweetalert2';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Table, Space, Button, Image, Input, Breadcrumb, Tooltip } from 'antd';
import { getSomethingWrong, resouceNotFound } from '../../../constant/MessageException';
import { deleteSuccess } from '../../../constant/MessageException';
import { connect } from 'react-redux';
import { deleteBlog, findBlogByTitle, retrieveBlog } from '../../../actions/blog'

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
//Sweet alert 2 =======================================================
const { Search } = Input;
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
interface IBlogs {
  // whole data blogs
  blogs: any[];
  // pagination 
  totalPage: number,
  // set which one will show data
  isSearch: any,
  // set data has been found
  dataSearch: any[]
  , currentPage: any
}

/**
 * Main
 */
class BlogList extends React.Component<any, IBlogs>{

  /**
   * 
   * @param props 
   * Constructor default
   */
  constructor(props: any) {
    super(props);
    this.state = {
      blogs: [{
      }],
      totalPage: 0,
      isSearch: false,
      dataSearch: [],
      currentPage: 1
    }

  }

  // set data for table
  columns = [
    {
      title: 'Image Title',
      key: 'index',
      dataIndex: 'index',
      render: (text: any, record: any) => (
        // text: any, record: any, index :any) => (
        // index
        <Image
          width={60}
          src={record.imgFront}
        />
      ),
      width: '10%'
    },
    {
      title: 'Title',
      // compare first charac
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
      dataIndex: 'title',
      length: '100',
      width: '50%',
      render: (text: any, record: any) => (
        <Tooltip title="Click to view detail">
          <a onClick={() => this.viewBlog(record.id)}> {record.title}</a>
        </Tooltip>

      ),

    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      sorter: (a: any, b: any) => +new Date(a.createDate) - +new Date(b.createDate),
      width: '15%'
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      width: "5%"
    },
    {
      title: 'Viewer',
      dataIndex: 'viewer',
      width: '5%'
    },
    {
      title: <Space><Search  placeholder="Search By Title" onChange={e => this.onsearch(e.target.value)}

        type="primary" style={{ width: 270 }} />
      </Space>,
      dataIndex: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => this.editBlog(record.id)} >Update <i style={{ marginLeft: '4px' }} className="far fa-edit"></i> </Button>
          <Button type="primary" onClick={() => this.deleteBlog(record.id)} danger> Delete <i style={{ marginLeft: '4px' }} className="far fa-trash-alt"></i></Button>
          <Button type="default" danger onClick={() => this.viewBlog(record.id)} >View</Button>
        </Space>
      ),
    },
  ]


  // onssert folow onchange
  onsearch(values: string) {
    
    if (values === '') {
      this.setState({
        // set default to fetch whole data
        totalPage: this.state.blogs.length,
        isSearch: false
      });
    } else {
      this.props.findBlogByTitle(values).then(()=>{
       this.setState({
         dataSearch: this.props.blogs,
         isSearch: true,
         totalPage: this.state.dataSearch.length
       
       })
      })
      // BlogServices.getBlogByTitle(values).then((res) => {
      //   console.log(res.data)
        // this.setState({
        //   dataSearch: res.data,
        //   isSearch: true,
        //   totalPage: res.data.length
      //   })
      // })

    }
  }

  // view blgo link
  public viewBlog(id: number) {
    BlogServices.getBlogById(id).then((res) => {
      this.props.history.push(`/admin/view-blog/${id}`);
    }).catch((err) => {
      Swal.fire({
        title: resouceNotFound,
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
    })
  };

  // delete blog
  public handleDeleteConfirm(id: number) {
    BlogServices.deleteBlog(id).then((res) => {
      console.log(res.data);
      if (res.data === 'ok') {
        console.log(res.data);
        this.setState({
          blogs: this.state.blogs.filter(
            (employee) => employee.id !== id
          )
        })
        Swal.fire(
          deleteSuccess,
          'Record has been deleted.',
          'success'
        )
      } else {
        Swal.fire({
          title: resouceNotFound,
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
      if (err.response) {
        console.log(err.response.message)
        Swal.fire({
          title: resouceNotFound,
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

  /**
   * 
   * @param id 
   * Delete to confirm
   */
  deleteBlog(id: number) {
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
        this.handleDeleteConfirm(id)
      }
    })
  }

  // edit blog
  public editBlog = (id: number) => {
    BlogServices.getBlogById(id).then((res) => {
      this.props.history.push(`/admin/update-blog/${id}`);
    }).catch((err) => {
      Swal.fire({
        title: resouceNotFound,
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
    })
  }

  // fetch data after render run
  componentDidMount() {
    // BlogServices.getBlogs().then((res) => {
    //   this.setState({
    //     blogs: res.data,
    //     totalPage: res.data.length
    //   });
    // });
    this.props.retrieveBlog().then(()=>{
      this.setState({
        blogs: this.props.blogs,
        totalPage: this.props.blogs.length
      })
    })
    console.log(this.state.blogs)
  }

  // handle when input change
  handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    let target = e.target as HTMLInputElement;
  }

  /**
   * 
   * @param current 
   * @param type 
   * @param originalElement 
   * set previous for pagination
   */
  itemRender(current: any, type: any, originalElement: any) {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      <a>Next</a>;
    }
    return originalElement;
  }
  // ===================== RENDER ==================================================

  render() {
    return (
      <div>
        <Breadcrumb style={{ marginBottom: '70px' }}>
          <Breadcrumb.Item href="">

          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <HomeOutlined />
            <span >Blog Manage</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Table key="index" columns={this.columns} dataSource={this.state.isSearch === false ? this.state.blogs : this.state.dataSearch}
          pagination={{
            itemRender: this.itemRender, showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            defaultPageSize: 5, total: this.state.totalPage, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'],
          }}
        />
      </div >
    )
  }

}
const mapStateToProps = (state: any) => {
  return {
    blogs: state.blogs,
    
  };
};
export default connect(mapStateToProps, { deleteBlog, findBlogByTitle, retrieveBlog })(BlogList);