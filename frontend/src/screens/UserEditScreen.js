/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser} from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_UPDATE_RESET } from '../constants/userConsts'

const UserEditScreen = ({ match, history }) => {
    
    const userId = match.params.id

    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        isAdmin: false,
        isDeputy: false
    })

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    
    const updateUserST = useSelector(state => state.updateUser)
    const { loading:updateLoading , error:updateError, success } = updateUserST

    useEffect(() => {
        
        if (!userInfo) {
            history.push('/login')
        }
        if (success) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/users')
        }else{if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setRegisterInfo({
                ...registerInfo,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isDeputy :user.isDeputy
            })
        }}
        
    },[dispatch, history, userId, userInfo,user,success])

    const changeHandler = (e) => {
        setRegisterInfo({...registerInfo,message:null})
        setRegisterInfo({...registerInfo,[e.target.name]:e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({
            _id: userId,
            name: registerInfo.name || user.name,
            email: registerInfo.email || user.email,
            isAdmin: registerInfo.isAdmin,
            isDeputy: registerInfo.isDeputy ,
            
        }))        

    }
    return (
        <>
            <Link to='/admin/users' className='btn btn-light my-3'>
                Go Back
            </Link>
        <FormContainer>
            <h1>Edit User</h1>
            {updateLoading && <Loader/>}
                {updateError && <Message variant='danger'>{updateError}</Message>}
            {loading ? <Loader /> : error
                    ? <Message variant='danger'>{error}</Message>
                    :(<Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        name='name'
                        value={registerInfo.name}       
                        onChange={changeHandler}
                        
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        name='email'
                        value={registerInfo.email}    
                        onChange={changeHandler}
                        
                    >
                    </Form.Control>
                    </Form.Group>
                        
                    <Form.Group controlId='isadmin'>
                        <Form.Check
                            type='checkbox'
                            label='is Admin'
                            name='isAdmin'
                            checked={registerInfo.isAdmin}
                            onChange={
                                (e) => {
                                    setRegisterInfo({ ...registerInfo, isAdmin: e.target.checked })
                                }}
                            
                        >
                        </Form.Check>
                        </Form.Group>
                        <Form.Group controlId='isdeputy'>
                        <Form.Check
                            type='checkbox'
                            label='is Deputy'
                            name='isDeputy'
                            checked={registerInfo.isDeputy}    
                            onChange={
                                (e) => {
                                    setRegisterInfo({ ...registerInfo, isDeputy: e.target.checked })
                                }}
                            
                        >
                        </Form.Check>
                    </Form.Group>
                
                <br />
                <Button
                    type='submit'
                    variant='primary'
                >
                   Update
                </Button>
            </Form>)
            }
            </FormContainer>
        </>
    )
}

export default UserEditScreen
