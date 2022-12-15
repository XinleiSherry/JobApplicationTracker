import React, { useState } from 'react'
import {
    Input, InputGroup, InputLeftAddon, Stack, Button, FormControl,
    FormErrorMessage,
    FormHelperText,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
    InputRightElement
} from '@chakra-ui/react';

import { LinkIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom';
import md5 from 'md5';
import { addUserInfo } from '../../store/features/user/userSlice'
import { useDispatch } from 'react-redux';


function Login() {
    let dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    let [userName, setUserName] = useState('')
    let [password, setPassword] = useState('')

    const userNameError = userName === ''
    const passwordError = password === ''
    let [alart, setAlart] = useState({
        state: -1,
        content: ''
    })
    let reset = () => {
        setUserName('');
        setPassword('');
    }
    return <Stack transform="scale(1.1)" spacing={6} w="30%" margin='0 auto' boxShadow={'4px 4px 10px 1px rgb(0 0 0 / 20%)'} borderRadius="30px" style={{ marginTop: '120px' }} padding="30px" backgroundColor='#FFF'>
        <FormControl isInvalid={userNameError} >

            <Box textAlign='center' marginBottom="20px" fontWeight='bold' fontSize='2xl'>
                Login
            </Box>

            <InputGroup boxShadow="2px 2px 3px 1px rgb(0 0 0 / 20%) !import" borderRadius="6px">
                <InputLeftAddon children='UserName:' w='110px' />
                <Input value={userName} type='tel' placeholder='User Name' onChange={({ target }) => {
                    let { value } = target;
                    setUserName(value);
                }} />
            </InputGroup>
            {!userNameError ? (
                <FormHelperText>
                    Please enter the user name.
                </FormHelperText>
            ) : (
                <FormErrorMessage>User name is required.</FormErrorMessage>
            )}
        </FormControl>
        <FormControl isInvalid={passwordError} >
            <InputGroup boxShadow="2px 2px 3px 1px rgb(0 0 0 / 20%)" borderRadius="6px">
                <InputLeftAddon children='Password:' w='110px' />
                <Input value={password} type={show ? 'text' : 'password'} placeholder='Password' onChange={({ target }) => {
                    let { value } = target;
                    setPassword(value);
                }} />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            {!passwordError ? (
                <FormHelperText>
                    Please enter your password.
                </FormHelperText>
            ) : (
                <FormErrorMessage>Password is required.</FormErrorMessage>
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
        <Button colorScheme='teal' size='md' onClick={() => {
            if (userName === '' || password === '') {
                return;
            }
            let data = {
                userName,
                password: md5(password),
            };
            let xhr = new XMLHttpRequest();
            xhr.open('POST', `/login/login`);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
            const usp = new URLSearchParams(data)
            const query = usp.toString()
            xhr.send(query)
            xhr.addEventListener('load', function () {
                let { status, msg, userInfo } = JSON.parse(this.response);
                if (+status === 0) {
                    // success
                    setAlart({
                        state: 0,
                        content: msg
                    })
                    dispatch(addUserInfo(userInfo))
                    setTimeout(() => {
                        setAlart({
                            state: -1,
                            content: ''
                        })
                        reset();
                        navigate('/home');
                    }, 1000);
                } else {
                    // error
                    setAlart({
                        state: 1,
                        content: msg
                    })
                }
            })
        }}>Login</Button>

        <Box>
            <Link to='/registered' style={{ fontWeight: "bold" }}><LinkIcon w={7} height={7} color="#6ea2dc" />  Don't you have an account yet? Go ahead and sign up for one !</Link>
        </Box>

    </Stack>
}

export default Login
