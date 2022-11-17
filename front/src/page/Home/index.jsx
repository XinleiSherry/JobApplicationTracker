import React, { useEffect, useState } from 'react'
import './home.css'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    TableContainer,
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
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate';
function Home() {
    let [serchContent,setSerchContent] = useState('')
    let [delID,setDelID] = useState('');
    let [curState, setCurState] = useState('curState');
    let { userInfo } = useSelector(state => state.user)
    let [curPage, setCurPage] = useState(0);
    const [pageCount, setPageCount] = useState(0)
    let [alart, setAlart] = useState({
        state: -1,
        content: ''
    })
    const handlePageClick = ({ selected }) => {
        setCurPage(selected);
        getData(selected)
    }
    let [formTitle, setFormTitle] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()


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
            limit: 5,
            userid: userInfo.id,
            serch:serchContent
        }
        let xhr = new XMLHttpRequest();
        const usp = new URLSearchParams(data)
        const query = usp.toString()
        xhr.open('get', `http://127.0.0.1:${process.env.PORT}/applyfor/list?${query}`);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')


        xhr.send()
        xhr.addEventListener('load', function () {
            let { status, data, dataLength } = JSON.parse(this.response);
            if (+status === 0) {
                setTableData(data);
                setPageCount(dataLength / 5);
            }
        })
    }

    const returnState = (state) => {
        switch (+state) {
            case 1: {
                return 'Applied'
            }
            case 2: {
                return 'OA'
            }
            case 3: {
                return 'VO'
            }
            case 4: {
                return 'Results'
            }
        }
    }

    return <div>
        <Box textAlign='center' fontSize='32px' m='60px'>Application List</Box>
        <Box w='40%' margin='0 auto'>
            <InputGroup>
                <Input placeholder='Please enter the keyword' onChange={(e)=>{
                  setSerchContent(e.target.value);  
                }} />
                <InputRightAddon children='search' style={{ cursor: 'pointer' }} onClick={()=>{
                    getData();
                }} />
            </InputGroup>
        </Box>
        <Box m='30px 170px' display={'flex'} justifyContent='flex-end'>
            <Button onClick={() => {
                setCurState('save');
                setFormTitle('Create New Appliction');
                onOpen()
            }}>+ new</Button>
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
                                <option value='1'>Applied</option>
                                <option value='2'>OA</option>
                                <option value='3'>VO</option>
                                <option value='4'>Results</option>
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
                        console.log(userInfo);

                        let data = {
                            company,
                            position,
                            status,
                            date,
                            userid: userInfo.id,
                            id: curState
                        };
                        let xhr = new XMLHttpRequest();
                        // setCurState('add');

                        xhr.open(`${curState === 'save' ? 'POST' : 'PUT'}`, `${curState === 'save' ? `http://127.0.0.1:${process.env.PORT}/applyfor/add` : `http://127.0.0.1:${process.env.PORT}/applyfor/update`}`);
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
                    <Button colorScheme='red' ml={3} onClick={()=>{
                        let xhr = new XMLHttpRequest();
                        // setCurState('add');
                        xhr.open('delete',`http://127.0.0.1:${process.env.PORT}/applyfor/delete?id=${delID}`);
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
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Company</Th>
                            <Th>Position</Th>
                            <Th >Status</Th>
                            <Th >Date</Th>
                            <Th >Operation</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {tableData.map(item => <Tr key={item.id}>
                            <Td>{item.company}</Td>
                            <Td>{item.position}</Td>
                            <Td>{returnState(item.status)}</Td>
                            <Td>{item.date}</Td>
                            <Td>
                                <Stack direction='row' spacing={4}>
                                    <IconButton
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
                                        onClick={() => {
                                            let {  id } = item;
                                            setDelID(id);
                                            onOpen1();
                                        }}
                                        colorScheme='red'
                                        icon={<DeleteIcon />}
                                    />
                                </Stack>
                            </Td>
                        </Tr>)}
                    </Tbody>
                </Table>
            </TableContainer>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </Box>

    </div>
}

export default Home
