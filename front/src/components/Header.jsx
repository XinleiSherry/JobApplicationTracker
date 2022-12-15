import React, { useEffect, useState } from 'react'
import {
    Box, Button, Avatar, useDisclosure, Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input, InputGroup, FormControl,
    FormErrorMessage,
    FormHelperText,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUserInfo } from '../store/features/user/userSlice'

function Header() {
    let navigate = useNavigate();

    let [alart, setAlart] = useState({
        state: -1,
        content: ''
    })

    let { userInfo } = useSelector(state => state.user);
    useEffect(() => {
        if (!userInfo) return;
        let { userName, password, email } = userInfo;
        setUserName(userName)
        setEmail(email)
    }, [userInfo])
    let [userName, setUserName] = useState('')
    let [email, setEmail] = useState('')

    const userNameError = userName === ''
    const emailError = email === ''

    const dispatch = useDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    return <Box w='100%' p='20px' display='flex' alignItems='center' backgroundColor='#6ea2dc' justifyContent='space-between' borderBottomColor='facebook.500'>
        <Box boxSizing="border-box" color='#f5f5f5' >
            <Box fontSize='4xl' fontWeight='bold'>Job  Application Tracker</Box>
            <Box fontSize='xl' >This is a website for job seekers to track their job application records.</Box>
        </Box>
        <Box>
            {userInfo === null ? null : <Avatar style={{ cursor: 'pointer' }} ref={btnRef} colorScheme='teal' onClick={onOpen} />}
        </Box>

        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>User Information Details</DrawerHeader>

                <DrawerBody>
                    <FormControl isInvalid={userNameError}>
                        <Text mb='8px'>User Name</Text>
                        <Input disabled value={userName} type='tel' placeholder='User Name' onChange={({ target }) => {
                            let { value } = target;
                            setUserName(value);
                        }} />
                        {!userNameError ? (
                            <FormHelperText>
                                Please enter the user name.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>User name is required.</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={emailError}>
                        <Text mb='8px'>Email</Text>
                        <InputGroup >

                            <Input value={email} type='tel' placeholder='Email' onChange={({ target }) => {
                                let { value } = target;
                                setEmail(value);
                            }} />
                        </InputGroup>
                        {!emailError ? (
                            <FormHelperText>
                                Please enter your Email.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        )}
                    </FormControl>

                    <Alert status='error' style={{ display: alart.state === 1 ? 'flex' : 'none' }}>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>This operation failed</AlertTitle>
                            <AlertDescription>{alart.content}</AlertDescription>
                        </Box>
                    </Alert>
                    <Alert status='success' style={{ display: alart.state === 0 ? 'flex' : 'none' }}>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>This operation succeeded</AlertTitle>
                            <AlertDescription>{alart.content}</AlertDescription>
                        </Box>
                    </Alert>
                </DrawerBody>

                <Button colorScheme='red' m={3} onClick={() => {
                    // onClose();
                    let data = {
                        id: userInfo.id
                    };
                    let xhr = new XMLHttpRequest();
                    xhr.open('delete', `/user/delete`);
                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
                    const usp = new URLSearchParams(data)
                    const query = usp.toString()
                    xhr.send(query)
                    xhr.addEventListener('load', function () {
                        let { status, msg } = JSON.parse(this.response);
                        if (+status === 0) {
                            // success
                            setAlart({
                                state: 0,
                                content: msg
                            })

                            setTimeout(() => {
                                onClose();
                                setAlart({
                                    state: -1,
                                    content: ''
                                })
                                dispatch(addUserInfo(null))
                                navigate('/');
                            }, 2000);
                        } else {
                            // error
                            setAlart({
                                state: 1,
                                content: msg
                            })
                        }
                    })

                }}>
                    Delete
                </Button>
                <Button colorScheme='blue' m={3} onClick={() => {
                    if (userName === '' || email === '') {
                        return;
                    }

                    let data = {
                        userName,
                        email,
                        id: userInfo.id
                    };
                    let xhr = new XMLHttpRequest();
                    xhr.open('put', `/user/update`);
                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
                    const usp = new URLSearchParams(data)
                    const query = usp.toString()
                    xhr.send(query)
                    xhr.addEventListener('load', function () {
                        let { status, msg } = JSON.parse(this.response);
                        if (+status === 0) {
                            // success
                            dispatch(addUserInfo({ ...userInfo, email: email }))
                            setAlart({
                                state: 0,
                                content: msg
                            })

                            setTimeout(() => {
                                setAlart({
                                    state: -1,
                                    content: ''
                                })

                            }, 2000);
                        } else {
                            // error
                            setAlart({
                                state: 1,
                                content: msg
                            })
                        }
                    })
                }}>Save</Button>
                <Button variant='outline' m={3} onClick={() => {
                    setAlart({
                        state: -1,
                        content: ''
                    })
                    dispatch(addUserInfo(null))
                    navigate('/');
                    onClose();
                }}>
                    Log out
                </Button>
                <Button variant='outline' m={3} onClick={onClose}>
                    Cancel
                </Button>
            </DrawerContent>
        </Drawer>

    </Box>
}

export default Header
