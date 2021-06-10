
import axios from "axios";
import { BASE_URL_USER } from "../CommonURL";

class ContactUserServices {
  createContact(requestValues) {
    return axios.post(
      BASE_URL_USER + "contactes",
      requestValues
    );
  }

}

export default new ContactUserServices();
