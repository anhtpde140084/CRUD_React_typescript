
import axios from "axios";
import { BASE_URL_USER } from "../CommonURL";

/**
 * ContactUserServices
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
 * 06-07-2021          Anhtp8           Get api for user contact
 */
class ContactUserServices {
  createContact(requestValues) {
    return axios.post(
      BASE_URL_USER + "contactes",
      requestValues
    );
  }

}

export default new ContactUserServices();
