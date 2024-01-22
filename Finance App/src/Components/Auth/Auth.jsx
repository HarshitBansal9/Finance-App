import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loggedInContext } from '../../App';


export function Auth(props) {
    const { loggedIn } = useContext(loggedInContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (loggedIn === false) {
            console.log("test")
            navigate('/Login_page');
        }
    }, [loggedIn]);

    if (!loggedIn) {
        return <></>
    }

    return (
        <>
        {props.children}
        </>
    )
}