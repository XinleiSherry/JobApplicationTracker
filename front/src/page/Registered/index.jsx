import React, { useState } from 'react'
import {
    Input, InputGroup, InputLeftAddon, Stack, Button, FormControl,
    FormErrorMessage,
    FormHelperText,
    InputRightElement,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom';
import md5 from 'md5';

function Login() {

    let navigate = useNavigate();

    let [alart, setAlart] = useState({
        state: -1,
        content: ''
    })


    let [userName, setUserName] = useState('')
    let [password, setPassword] = useState('')
    let [email, setEmail] = useState('')
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const userNameError = userName === ''
    const passwordError = password === ''
    const emailError = email === ''

    let reset = () => {
        setUserName('');
        setPassword('');
        setEmail('');
    }
    return <Stack transform="scale(1.1)" spacing={6} w="30%" margin='0 auto' style={{ marginTop: '120px' }} boxShadow={'4px 4px 10px 1px rgb(0 0 0 / 20%)'} borderRadius="30px" padding="30px" backgroundColor='#FFF'>
        <FormControl isInvalid={userNameError}>
            <Box textAlign='center' marginBottom="20px" fontWeight='bold' fontSize='2xl'>
                Registration
            </Box>
            <InputGroup>
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
            <InputGroup>
                <InputLeftAddon children='Password:' w='110px' />
                <Input type={show ? 'text' : 'password'} value={password} placeholder='Password' onChange={({ target }) => {
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
        <FormControl isInvalid={emailError}>

            <InputGroup >
                <InputLeftAddon children='Email:' w='110px' />
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
        <Button colorScheme='teal' size='md' onClick={() => {
            if (userName === '' || password === '' || email === '') {
                return;
            }
            let data = {
                userName,
                password: md5(password),
                email
            };
            let xhr = new XMLHttpRequest();
            // edited
            xhr.open('POST', `/user/add`);
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
                        content: 'Registration succeeded !  This will jump to the login page ...'
                    })
                    setTimeout(() => {
                        setAlart({
                            state: -1,
                            content: ''
                        })
                        reset();
                        navigate('/');
                    }, 2500);
                } else {
                    // error
                    setAlart({
                        state: 1,
                        content: msg
                    })
                }
            })
            // reset();
        }}>Registration</Button>
        <Link to='/' style={{ fontWeight: "bold" }}>
            <ArrowForwardIcon w={7} h={7} color="#6ea2dc" />
            Return to Login !
        </Link>
    </Stack>
}

export default Login
