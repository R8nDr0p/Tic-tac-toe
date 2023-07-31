import React, { useState } from "react";

function SignUp() {
  const [user, setUser] = useState(null);
  return (
    <>
      <div>
        <label htmlFor="">Sign Up</label>
        <input
          type="text"
          placeholder="First Name"
          onChange={(event) => {
            setUser({ ...user, firstName: event.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={(event) => {
            setUser({ ...user, lastName: event.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUser({ ...user, userName: event.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={(event) => {
            setUser({ ...user, passWord: event.target.value });
          }}
        />
      </div>
    </>
  );
}

export default SignUp;
