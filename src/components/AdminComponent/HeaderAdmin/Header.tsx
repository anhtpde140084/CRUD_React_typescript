import React, { Component, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/auth';
import { NavLink } from 'react-router-dom';
import AccService from '../../../services/AdminService/AccService';

/**
 * Header
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
 * 06-07-2021          Anhtp8           Common header
 */
export const Header = (props: any) => {

    const [profile, setProfile] = useState({
        id: 1,
        age: 0,
        birthday: '',
        city: '',
        country: '',
        email: '',
        name: '',
        phone: '',
        avatar: ''
    })

    useEffect(() => {
        AccService.getAccs().then((res) => {
            setProfile(res.data)
        })
    }, []
    )

    const dispatch = useDispatch()
    const logOut = () => {
        dispatch(logout())
    }
    
    return (
        <nav className="navbar navbar-expand-md navbar-light">
            <div className="collapse navbar-collapse" id="basicExampleNav5">
                <ul className="navbar-nav nav-flex-icons ml-auto">
                    <li className="nav-item avatar dropdown d-flex align-items-center">
                        <a className="nav-link dropdown-toggle" style={{color:'black', paddingRight:'59px'}} id="navbarDropdownMenuLink-55" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <img style={{ width: '30px' }} src="https://lh3.googleusercontent.com/4MCrNjoJkSahhsMcY9hHdctOuL9xUQlKhigaWlOSzSE5ZjcU2VQryIKFYuapFdQZO4TPWqxJ08AyQf03O96cwbldiZ_JBEGrNz-xZ0VnTkRyqeU2ZoywWWujHyA4t4AQRNj1cVNman1MP4FojMvvNupckW0w7MsGO643RlGhLOIb4lsGhNvk27LnG_fvgEpoURoNeYKaXQ_XsD4Gl-IHTT0gsGvHnJDIzEIgXcduW_HCUJkgfP7rVExW5b5_ToOKddAcMcUqR4JTqh8rJId3tE0VcEPFdCe35EqhXXIuCsn6nDYRt7MmHtSEGBK_bBsDhzo7FGJ-VZBeT3I848zJZcqiaMFFFjGpVndLe3ZkFjpOHGZDt8U5CbpEcD_K-36V8RabPn3CxH0wKaGdfC6Imj1fT51T50aAs2lNxy51FDUJrzPxxv4NsBgQtimr1Ef2KfhPhRCRNazBKCanW1zbkmL4WQkrMWPkoU3tPi2YsBmaPg0zsfMppBYq3hRSBrp_hPRqyMkkJyp7plb3dDULk9LuBiq8_W1_DVB-hdEPsJGDS4mCKZNDKv7Jd7nYIZXHiQlDLezK-ULa9mmEruG9HDRZsS57GKOGQ7zjBZak8y81pU1Sq49UagtsNyERf-VsE3DCR1n9xCcXTr5iBOZlf0tPR9aKYj7mM9aPV98k2VdRFvhUgzvduz4vr7pkRkTQzadwKhlgc8g5nL8y30XDFEEG3A=s439-no?authuser=0"
                                 />
                            {profile.name}
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg-right" aria-labelledby="navbarDropdownMenuLink-55">
                            <NavLink className="dropdown-item"to="/admin/profile">Profile</NavLink>
                            <NavLink onClick={logOut} className="dropdown-item" to="/login">Logout</NavLink>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );

}

export default Header;