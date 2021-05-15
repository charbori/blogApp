import React from 'react';

function Profile({ user }) {
    const { email, password, name } = user || {}
    return (
        <div>
            <h1>LoginForm</h1>
            <dt>Email</dt>
            <dd>{email}</dd>
            <dt>password</dt>
            <dd>{password}</dd>
            <dt>name</dt>
            <dd>{name}</dd>
        </div>
    )
}

export default Profile;
