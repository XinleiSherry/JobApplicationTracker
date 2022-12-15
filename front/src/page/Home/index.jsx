import React, { useEffect, useState } from 'react'
import Page from '../../components/Page'
import './home.css'
import {
    Input,
    Box,
    InputGroup,
    InputRightAddon,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    AlertDialogCloseButton,
    Stack,
    InputLeftAddon,
    Select,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    IconButton
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, Search2Icon, AddIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
function Home() {
    let [serchContent, setSerchContent] = useState('')
    let [delID, setDelID] = useState('');
    let [curState, setCurState] = useState('curState');
    let { userInfo } = useSelector(state => state.user)
    let [curPage, setCurPage] = useState(0);
    const [pageCount, setPageCount] = useState(0)
    let [alart, setAlart] = useState({
        state: -1,
        content: ''
    })
    const handlePageClick = (selected) => {
        setCurPage(selected - 1);
        getData(selected - 1)
    }
    let [formTitle, setFormTitle] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()

    const colorAry = ['#a5dee5', '#e0f9b5', '#fefdca', '#ffcfdf']
    const cancelRef = React.useRef()
    const cancelRef1 = React.useRef()

    let [tableData, setTableData] = useState([]);

    let [formState, setFormState] = useState({
        company: '',
        position: '',
        status: '1',
        date: '',
    })

    useEffect(() => {
        getData();
    }, [])

    const getData = (page) => {
        let data = {
            skip: page || 0,
            limit: 9,
            userid: userInfo.id,
            serch: serchContent
        }
        let xhr = new XMLHttpRequest();
        const usp = new URLSearchParams(data)
        const query = usp.toString()
        xhr.open('POST', `/applyfor/list`);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')


        xhr.send(query)
        xhr.addEventListener('load', function () {
            let { status, data, dataLength } = JSON.parse(this.response);
            if (+status === 0) {
                setTableData(data);
                setPageCount(dataLength / 9);
            }
        })
    }

    const returnState = (state) => {
        switch (+state) {
            case 1: {
                return 'Submit an application'
            }
            case 2: {
                return 'The written test'
            }
            case 3: {
                return 'The interview'
            }
            case 4: {
                return 'Admission Results'
            }
        }
    }

    return <div>
        <Box textAlign='center' fontSize='42px' fontWeight={'bold'} m='26px'>Application List</Box>
        <Box w='40%' margin='20px auto' backgroundColor={'#fefefe'} padding="16px" borderRadius={'20px'}>
            <InputGroup>
                <Input placeholder='Please enter company name' onChange={(e) => {
                    setSerchContent(e.target.value);
                }} />

                <InputRightAddon children={<Search2Icon w={6} h={6} />} style={{ cursor: 'pointer' }} onClick={() => {
                    getData();
                }} />
            </InputGroup>
        </Box>
        <AlertDialog
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            closeOnOverlayClick={false}
            onClose={() => {
                setAlart({
                    state: -1,
                    content: ''
                })
                setFormState({
                    company: '',
                    position: '',
                    status: '1',
                    date: '',
                });
                onClose();
            }}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader>{formTitle}</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    <Stack spacing={6}>
                        <InputGroup>
                            <InputLeftAddon w='100px' children='Company' />
                            <Input value={formState.company} onChange={(e) => {
                                setFormState({
                                    ...formState,
                                    company: e.target.value
                                })
                            }} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon w='100px' children='Position' />
                            <Input value={formState.position} onChange={(e) => {
                                setFormState({
                                    ...formState,
                                    position: e.target.value
                                })
                            }} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon w='100px' children='Status' />
                            <Select defaultValue={formState.status} size='md' onChange={(e) => {
                                setFormState({
                                    ...formState,
                                    status: e.target.value
                                })
                            }}>
                                <option value='1'>Submit an application</option>
                                <option value='2'>The written test</option>
                                <option value='3'>The interview</option>
                                <option value='4'>Admission Results</option>
                            </Select>
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon w='100px' children='Date' />
                            <Input
                                onChange={(e) => {
                                    setFormState({
                                        ...formState,
                                        date: e.target.value
                                    })
                                }}
                                value={formState.date}
                                placeholder="Select Date and Time"
                                size="md"
                                type="datetime-local"
                            />
                        </InputGroup>

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

                    </Stack>

                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={() => {
                        setAlart({
                            state: -1,
                            content: ''
                        })
                        setFormState({
                            company: '',
                            position: '',
                            status: '1',
                            date: '',
                        });
                        onClose();
                    }}>
                        No
                    </Button>
                    <Button colorScheme='red' ml={3} onClick={() => {
                        let { company, position, status, date } = formState;

                        if (company === '' || position === '' || status === '' || date === '') {
                            setAlart({
                                state: 1,
                                content: 'Please complete the content'
                            })
                            return;
                        }
                        let data = {
                            company,
                            position,
                            status,
                            date,
                            userid: userInfo.id,
                            id: curState
                        };
                        let xhr = new XMLHttpRequest();
                        xhr.open(`${curState === 'save' ? 'POST' : 'PUT'}`, `${curState === 'save' ? '/applyfor/add' : '/applyfor/update'}`);
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
                                getData(curPage);
                                setTimeout(() => {
                                    onClose();
                                    setAlart({
                                        state: -1,
                                        content: ''
                                    })
                                    setFormState({
                                        company: '',
                                        position: '',
                                        status: '1',
                                        date: '',
                                    });
                                }, 2500);
                            } else {
                                // error
                                setAlart({
                                    state: 1,
                                    content: msg
                                })
                            }
                        })

                    }}>
                        Yes
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>



        <AlertDialog
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef1}
            onClose={onClose1}
            isOpen={isOpen1}
            isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent>
                <AlertDialogHeader>Are you sure you want to delete it</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    This operation cannot be restored after being deleted. Therefore, exercise caution when performing this operation ! ! !
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef1} onClick={onClose1}>
                        No
                    </Button>
                    <Button colorScheme='red' ml={3} onClick={() => {
                        let xhr = new XMLHttpRequest();
                        xhr.open('delete', `/applyfor/delete?id=${delID}`);
                        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
                        xhr.send()
                        xhr.addEventListener('load', function () {
                            let { status } = JSON.parse(this.response);
                            if (+status === 0) {
                                // success
                                onClose1();
                                getData(curPage);
                            }
                        })
                    }}>
                        Yes
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>


        <Box m='0px 170px' >
            <Box display='flex' justifyContent='flex-start' flexWrap={'wrap'} >
                {tableData.map(item => {
                    return <Box position={'relative'} width={'250px'} height="250px" boxSizing="border-box" boxShadow={'2px 2px 3px 1px rgb(0 0 0 / 20%) !important'} padding="20px" margin={'20px'} backgroundColor={colorAry[item.status - 1]} borderRadius={'30px'}>
                        <Box lineHeight={'36px'}>
                            Company：<span display={'inline-block'}>{item.company}</span>
                        </Box>
                        <Box lineHeight={'36px'}>
                            Position： <span textOverflow={'clip'} display={'inline-block'}>{item.position}</span>
                        </Box>
                        <Box lineHeight={'36px'} >
                            Status： <span  >{returnState(item.status)}</span>
                        </Box>
                        <Box lineHeight={'36px'}>
                            Date：  <span  >{item.date}</span>
                        </Box>

                        <Box position={'absolute'} right="20px" bottom={'14px'}>
                            {<Stack direction='row' spacing={4} justifyContent="flex-end" marginTop={'10px'}>
                                <IconButton
                                    size={'xs'}
                                    onClick={() => {
                                        let { company, position, status, date, id } = item;
                                        setCurState(id);
                                        onOpen();
                                        setFormState({
                                            company: company,
                                            position: position,
                                            status: status,
                                            date: date,
                                        });
                                    }}
                                    colorScheme='teal'
                                    icon={<EditIcon />}
                                />
                                <IconButton
                                    size={'xs'}

                                    onClick={() => {
                                        let { id } = item;
                                        setDelID(id);
                                        onOpen1();
                                    }}
                                    colorScheme='red'
                                    icon={<DeleteIcon />}
                                />
                            </Stack>}
                        </Box>
                    </Box>
                })}


                <Box onClick={() => {
                    setCurState('save');
                    setFormTitle('Create New Appliction');
                    onOpen()
                }} width={'250px'} cursor="pointer" display="flex" justifyContent={'center'} alignItems="center" height="250px" boxSizing="border-box" boxShadow={'2px 2px 3px 1px rgb(0 0 0 / 20%) !important'} padding="20px" margin={'20px'} backgroundColor={'#f9f0f0'} borderRadius={'30px'}>
                    <AddIcon w={20} h={20} color="#787878" />
                </Box>

            </Box>
            <Box position={'fixed'} bottom="20px" right={'90px'}>
                <Page totalPage={Math.ceil(pageCount)} pageCallbackFn={handlePageClick} />
            </Box>
        </Box>

    </div>
}

export default Home
