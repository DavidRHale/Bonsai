import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

import { CREATE_BONSAI_ROUTE } from '../../app/layout/appRoutes';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <NavLink exact to='/' className='navbar-brand'>
        <i className='fas fa-tree' style={{ marginRight: '10px' }}></i>
        Bonsai App
      </NavLink>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNav'
        aria-controls='navbarNav'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNav'>
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
      </div>
      {user && (
        <button className='btn btn-outline-secondary nav-item' onClick={logout}>
          Log Out
        </button>
      )}
    </nav>
  );
};

export default observer(NavBar);
