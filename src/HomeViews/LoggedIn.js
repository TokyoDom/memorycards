import React from 'react';

function LoggedIn({ userInfo }) {

  return (
    <h1>
      Welcome {userInfo.name}
    </h1>
  );
}

export default LoggedIn;