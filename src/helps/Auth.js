
/**
 * Auth
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
 * 06-07-2021          Anhtp8           Check auth
 */
// check auth
export const isAuth = () => {
if(localStorage.getItem('user')){
    return JSON.parse(localStorage.getItem('user'));
} else{
    return false;
}
};