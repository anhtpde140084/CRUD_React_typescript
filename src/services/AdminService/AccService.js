import React, { Component } from 'react';
import axios from 'axios';
import authHeader from './AuthHeader';
import { BASE_URL_ADMIN } from '../CommonURL';


class BlogService{

getAccs(){
    return axios.get(BASE_URL_ADMIN +'profile', { headers: authHeader() });
}


updateAcc(acc, accId){
    return axios.put(BASE_URL_ADMIN + 'profile/' + accId, acc, { headers: authHeader() });
}


login(acc){
    return axios.post(BASE_URL_ADMIN + 'profile/login',acc, { headers: authHeader() })
}

updateAvatar(acc, accId){
    return axios.put(BASE_URL_ADMIN + 'profile/' + accId, acc, { headers: authHeader() });
}

getCountryApi(){
    return axios.get(BASE_URL_ADMIN + 'profile/country', { headers: authHeader() });
}


getAdminBoard() {
    return axios.get('http://localhost:8080/admin/api/blogs', { headers: authHeader() });
  }

}

export default new BlogService()
