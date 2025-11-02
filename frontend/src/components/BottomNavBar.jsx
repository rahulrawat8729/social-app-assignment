import React, { useState, useContext } from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function BottomNavBar() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => navigate('/')} />
        <BottomNavigationAction label="Social" icon={<GroupsIcon />} onClick={() => navigate('/')} />
        <BottomNavigationAction label="Logout" icon={<LogoutIcon />} onClick={handleLogout} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNavBar;