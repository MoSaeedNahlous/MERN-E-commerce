import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'

const UsersListScreen = () => {

    const dispatch = useDispatch()

    const usersList = useSelector(state => state.usersList)
    const { users, error, loading } = usersList
    
    useEffect(() => {

        dispatch(getUsers())
        
    }, [dispatch])

    const deleteHandler = () => {
        
    }

    return (
        <>
            <h1>Users</h1>
            {
                loading?
                    <Loader /> :
                    error ?
                        <Message variant='danger'>{error}</Message> :
                        (
                            <Table
                                striped
                                bordered
                                hover
                                responsive
                                className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th>DEPUTY</th>
                                    <th>Balance</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>
                                                <a href={`mailto:${user.email}`}>
                                                    {user.email}
                                                </a>
                                            </td>
                                            <td>
                                                {
                                                    user.isAdmin
                                                        ? <i class="fas fa-check"
                                                        style={{color:'lime'}}></i>
                                                        :<i
                                                            className="fas fa-times"
                                                            style={{color:'red'}}
                                                        ></i>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    user.isDeputy
                                                        ?<i class="fas fa-check"
                                                        style={{color:'lime'}}></i>
                                                        :<i
                                                            className="fas fa-times"
                                                            style={{color:'red'}}
                                                        ></i>
                                                }
                                            </td>
                                             <td>${user.balance}</td>
                                            <td>
                                                <LinkContainer to={`/users/${user._id}/edit`}>
                                                <Button
                                                    variant='light'
                                                    className='btn-sm'
                                                >
                                                    <i className="fas fa-edit"></i>
                                                    </Button>
                                                </LinkContainer>
                                                    <Button
                                                    variant='danger'
                                                    className='btn-sm'
                                                    onClick={deleteHandler(user._id)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                    </Button>
                                                
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                    </Table>
                        )
                    }
        </>
    )
}

export default UsersListScreen
