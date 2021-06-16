import { RETRIEVE_USER, UPDATE_USER } from "../actions/type";


const initialState = [];

// switch for each action
function userReducer(users = [], action) {
    const { type, payload } = action;
  
    switch (type) {
  
      case RETRIEVE_USER:
        return payload;
  
      case UPDATE_USER:
        return users.map((user) => {
          if (user.id === payload.id) {
            return {
              ...user,
              ...payload,
            };
          } else {
            return user;
          }
        });
  
      default:
        return users;
    }
  };
  
  export default userReducer;