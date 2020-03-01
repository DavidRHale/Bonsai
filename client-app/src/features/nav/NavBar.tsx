import React, { useContext } from 'react'
import { Menu, Container, Button, Image, Dropdown } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink, Link } from 'react-router-dom';

import { CREATE_BONSAI_ROUTE } from '../../app/layout/appRoutes';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;

  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header as={NavLink} exact to='/'>
            <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
            Bonsai App
          </Menu.Item>
          <Menu.Item name='Bonsai' as={NavLink} to='/bonsai' />
          <Menu.Item>
            <Button positive content="Add a Bonsai" as={NavLink} to={CREATE_BONSAI_ROUTE} />
          </Menu.Item>
          {user && (
            <Menu.Item position='right'>
              <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
              <Dropdown pointing='top left' text={user.displayName}>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/profile/username`} text='My profile' icon='user' />
                  <Dropdown.Item onClick={logout} text='Log Out' icon='power' />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          )}
        </Container>
      </Menu>
    </div>
  )
};

export default observer(NavBar);
