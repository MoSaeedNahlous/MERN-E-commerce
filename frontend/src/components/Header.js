import React from 'react'
import {
    Container,
    Nav,
    Navbar,
    NavDropdown
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions';
import { Route } from 'react-router';
import SearchBox from './SearchBox';

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        //TODO:update info in navbar
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container className="px-0">
                    <LinkContainer to='/'>
                        <Navbar.Brand >MERN E-Commerce</Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({ history }) => <SearchBox history={history} />} />
                        <Nav className="ms-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i> Cart
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ?
                                (
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                            <NavDropdown.Item>
                                               Your Balance : ${userInfo.balance}
                                            </NavDropdown.Item>
                                        
                                            <NavDropdown.Item onClick={logoutHandler}>
                                                Logout
                                            </NavDropdown.Item>
                                        
                                    </NavDropdown>
                                )
                                :
                                
                                    <LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className="fas fa-user"></i> Sign In
                                </Nav.Link>
                                    </LinkContainer>
                                    
                            }
                            {
                                userInfo && userInfo.isDeputy &&
                                (
                                    <NavDropdown title='Deputy' id='deputyMenu'>
                                        <LinkContainer to='/deputy/addbalance'>
                                            <NavDropdown.Item>
                                                Add Balance
                                            </NavDropdown.Item>
                                        </LinkContainer>                                     
                                    </NavDropdown>
                                )
                            }
                            {
                                userInfo && userInfo.isAdmin &&
                                (
                                    <NavDropdown title='Admin' id='adminMenu'>
                                        <LinkContainer to='/admin/users'>
                                            <NavDropdown.Item>
                                                Users
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/products'>
                                            <NavDropdown.Item>
                                                Products
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                         <LinkContainer to='/admin/orders'>
                                            <NavDropdown.Item>
                                                Orders
                                            </NavDropdown.Item>
                                        </LinkContainer>                                        
                                    </NavDropdown>
                                )
                            }
                                
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
