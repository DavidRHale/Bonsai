import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

import { CREATE_BONSAI_ROUTE } from '../../app/layout/appRoutes';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;

  return (
    <nav className='navbar navbar-dark bg-dark'>
      <NavLink exact to='/' className='navbar-brand'>
        <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
        Bonsai App
      </NavLink>
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <NavLink to='/bonsai' className='nav-link'>
            Bonsai
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to={CREATE_BONSAI_ROUTE} className='nav-link'>
            Add a Bonsai
          </NavLink>
        </li>
      </ul>
      {user && <button className='btn btn-outline-secondary nav-item' onClick={logout}>Log Out</button>}
    </nav >
  );
};

export default observer(NavBar);
