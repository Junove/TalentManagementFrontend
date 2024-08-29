import React, { useContext } from 'react';
import { LoginContext } from '../Login/LoginContext';
import ManagerProfile from '../Manager/ManagerProfile';
import CandidateProfile from '../Candidate/CandidateProfile';

const ProfileWrapper = () => {
  const { user } = useContext(LoginContext);

  if (user.type === 'hiring_manager') {
    return <ManagerProfile />;
  } else if (user.type === 'candidate') {
    return <CandidateProfile />;
  } else {
    return <div>Invalid user type</div>;
  }
};

export default ProfileWrapper;
