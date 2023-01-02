// import { useState } from 'react';

export default function useUser() {
    const userString = localStorage.getItem('username');
    console.log('userString: ');
    console.log('looking for this', userString);

    const targetUser = JSON.parse(userString);

    return targetUser;

    // const getUser = () => {
    //     const userString = localStorage.getItem('username');
    //     console.log('userString: ');
    //     console.log(userString);

    //     const targetUser = JSON.parse(userString);
    //     console.log('userToken');
    //     console.log(userString);

    //     return targetUser?.user;
    // };

    // const [user, setUser] = useState(getUser());

    // const saveUser = (targetUser) => {
    //     console.log('saveUser');
    //     console.log(targetUser);
    //     localStorage.setItem('user', JSON.stringify(targetUser));
    //     setUser(targetUser.User);
    // };

    // return {
    //     setUser: saveUser,
    //     user,
    // };
}
