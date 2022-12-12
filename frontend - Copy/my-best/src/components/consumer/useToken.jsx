// import { useState } from 'react';

export default function useToken() {
    const tokenString = localStorage.getItem('token');
    console.log('tokenString: ');
    console.log(tokenString);

    // console.log('looking for this', tokenString);

    // const userToken = JSON.parse(tokenString);
    // console.log('userToken');
    // console.log(userToken);

    return { tokenString };

    // const getToken = () => {
    //     const tokenString = localStorage.getItem('token');
    //     console.log('tokenString: ');
    //     console.log(tokenString);

    //     console.log('looking for this', tokenString);

    //     // const userToken = JSON.parse(tokenString);
    //     // console.log('userToken');
    //     // console.log(userToken);

    //     return tokenString;
    // };

    // const [token, setToken] = useState(getToken());

    // const saveToken = (userToken) => {
    //     console.log('saveToken');
    //     console.log(userToken);
    //     localStorage.setItem('token', JSON.stringify(userToken));
    //     setToken(userToken.token);
    // };

    // return {
    //     setToken: saveToken,
    //     token,
    // };
}
