'use strict';

const output = document.getElementById('output');

const users = [
    { id: 1, name: 'Sara', email: 'sara@example.com', isAdmin: false },
    { id: 2, name: 'Alex', email: 'alex@example.com', isAdmin: true },
    { id: 3, name: 'Kim', email: 'kim@example.com', isAdmin: false }
];

const getUser = userId => {

    const user = users.find(u => u.id === userId);

    if(!user){
        throw new Error('Gebruiker niet gevonden');
    }

    return user.name;
};

const checkAdminRights = userId => {

    const user = users.find(u => u.id === userId);

    return user ? user.isAdmin : false;
};

const formatEmail = email => {

    const match = email.match(/^(.+)@/);

    if(!match){
        throw new Error('Email fout');
    }

    return match[1].toUpperCase() + '@' + email.split('@')[1];
};

const processUsers = () => {

    console.table(users);

    for(let i = 1; i <= users.length; i++){

        try{

            debugger;

            const user = getUser(i);

            const isAdmin = checkAdminRights(i);

            const formattedEmail =
                formatEmail(users[i - 1].email);

            output.innerHTML += `
                <p>
                    ✅ ${user} - ${formattedEmail}
                </p>
            `;

        } catch(error){

            console.error(error.message);

            output.innerHTML += `
                <p>
                    ❌ ${error.message}
                </p>
            `;
        }
    }
};

processUsers();
