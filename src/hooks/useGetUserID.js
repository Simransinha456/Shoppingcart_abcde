import React from 'react';

function useGetUserID() {
  const userID = window.localStorage.getItem("userID");

  return (
    <div>
      useGetUserID: {userID}
    </div>
  );
}

export default useGetUserID;
