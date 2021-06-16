import React, { Component } from "react";
import axios from "axios";
import authHeader from "./AuthHeader";
import { BASE_URL_ADMIN } from "../CommonURL";

/**
 * AccoutService
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
 * 06-07-2021          Anhtp8           Accout service
 */

class AccService {
  // get account axios
  getAccs() {
    return axios.get(BASE_URL_ADMIN + "profile", { headers: authHeader() });
  }

  // update acc
  updateAcc(acc, accId) {
    return axios.put(BASE_URL_ADMIN + "profile/" + accId, acc, {
      headers: authHeader(),
    });
  }

  // get api login
  login(acc) {
    return axios.post(BASE_URL_ADMIN + "profile/login", acc, {
      headers: authHeader(),
    });
  }

  // update avatar
  updateAvatar(acc, accId) {
    return axios.put(BASE_URL_ADMIN + "profile/" + accId, acc, {
      headers: authHeader(),
    });
  }

  // get data country
  getCountryApi() {
    return axios.get(BASE_URL_ADMIN + "profile/country", {
      headers: authHeader(),
    });
  }


  //get admin board
  getAdminBoard() {
    return axios.get("http://localhost:8080/admin/api/blogs", {
      headers: authHeader(),
    });
  }
}

export default new AccService();
