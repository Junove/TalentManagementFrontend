import React, { createContext, useState, useContext } from 'react';

const LoginContext = createContext(null);

const LoginProvider = ({ children }) => {
  
  let tempLoggedIn = false;
  let tempUser = {}
  let tempUsername = "";

  let savedUserString = localStorage.getItem("user");
  if(savedUserString !== null){
    tempLoggedIn = true;
    tempUser = JSON.parse(savedUserString);
    tempUsername = tempUser.username;
  }

  const [isLoggedIn, setIsLoggedIn] = useState(tempLoggedIn);
  const [username, setUsername] = useState(tempUsername);
  const [user, setUser] = useState(tempUser);

  const login = (user) => {
    setIsLoggedIn(true);
    setUsername(user.username);
    setUser(user);
    localStorage.setItem("user",JSON.stringify(user));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUser({});
    localStorage.removeItem("user");
  };

  // restore from localStorage
  const value = { isLoggedIn, user, username, login, logout };


  return (
    <LoginContext.Provider value={value}>  
      {children}
    </LoginContext.Provider>  
  );
};

export { LoginContext, LoginProvider };

