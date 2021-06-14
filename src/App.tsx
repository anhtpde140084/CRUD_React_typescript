import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import LoginComponent from './components/LoginComponent';
import { MainDashBoard } from './components/AdminComponent/ManageBlogComponent/MainDashBoard';
import BlogDetail from './components/AdminComponent/ManageBlogComponent/BlogDetail';
import BlogList from './components/AdminComponent/ManageBlogComponent/BlogList';
import BlogUpdate from './components/AdminComponent/ManageBlogComponent/BlogUpdate';
import BlogPost from './components/AdminComponent/ManageBlogComponent/BlogPost';
import { ProfileCustom } from './components/AdminComponent/AccountComponent/ProfileCustom'
import AdminRoute from './route/AdminRoute';
import Home from './components/UserComponent/Pages/Home';
import BlogListUser from './components/UserComponent/Pages/BlogList';
import { DetailBlog } from './components/UserComponent/Pages/DetailBlog';
import { About } from './components/UserComponent/Pages/About';
import { ContactesList } from './components/AdminComponent/ManageContact/ContactesList';
import { ContactedList } from './components/AdminComponent/ManageContact/ContactedList';
import {Contact} from './components/UserComponent/Pages/Contact';
function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" exact component={LoginComponent} />
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/blogsList" exact component={BlogListUser} />
          <Route path="/blog/view-blog/:id" exact component={DetailBlog} />
          <Route path="/contact-us" exact component={Contact}/> 
          
          <MainDashBoard>
            <AdminRoute path="/admin/" exact component={BlogList}></AdminRoute>
            <AdminRoute path="/admin/blogs" exact component={BlogList} />
            <AdminRoute path="/admin/add-blog/_add" exact component={BlogPost}></AdminRoute>
            <AdminRoute path="/admin/update-blog/:id" exact component={BlogUpdate} />
            <AdminRoute path="/admin/profile" exact component={ProfileCustom} />
            <AdminRoute path="/admin/update-profile/:id" exact component={ProfileCustom} />
            <AdminRoute path="/admin/view-blog/:id" exact component={BlogDetail} />
            <AdminRoute path="/admin/view-contactes" exact component={ContactesList} />
            <AdminRoute path="/admin/view-contacted" exact component={ContactedList} />

          </MainDashBoard>
          {/* {login && <Route path="/admin/" component={MainDashBoard} />}
          {/**nếu login = true return maindashboard */}
          {/* {login === false && <Route path="/admin/" component={LoginComponent} />} */} */
        </Switch>



      </Router>
    </div >
  );
}

export default App;

