
import axios from "axios";
import authHeader from "./AuthHeader";
import { BASE_URL_ADMIN } from "../CommonURL";
/**
 * ContactSerivce
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
 * 06-07-2021          Anhtp8           Get api for contact
 */
class ContactService {


  getAllContactes() {
    return axios.get(BASE_URL_ADMIN + "contactes", { headers: authHeader() });
  }

  getAllContacted() {
    return axios.get(BASE_URL_ADMIN + "contacted", { headers: authHeader() });
  }

  deleteContact(idContact) {
    return axios.put(BASE_URL_ADMIN + 'deleteContact/' +idContact, { headers: authHeader()});
  }

}


export default new ContactService();
