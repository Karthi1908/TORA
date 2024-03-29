import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Flex,
  HStack,
  Container,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Input,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useWallet } from '../helper/WalletContext';
import { ContractProvider, CONTRACT_ADDRESS, TOKEN_ADDRESS, wallet,Tezos } from '../helper/tezos';
import { TezosToolkit, MichelCodecPacker, compose } from '@taquito/taquito';
import Loading from '../helper/Loading';

const Whitelist = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const submit = async (e) => {
    e.preventDefault();
    const {userId} = e.target.elements;
    const contract = await wallet.at(CONTRACT_ADDRESS);
	console.log(userId.value);
    const opp = await contract.methods.addReporters(userId.value).send({amount : 10});
	await opp.confirmation(1);
    alert("Registration Completed!");  
	
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Register</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalBody>
            <form onSubmit={submit}>
              <FormControl>
                <Input
                  required
                  type="string"
                  name="userId"
                  placeholder="User ID"
                ></Input>
              </FormControl>
              <Button type="submit">Register</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const Deposit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const submit = async (e) => {
    e.preventDefault();
    const {amt} = e.target.elements;
    const contract = await wallet.at(CONTRACT_ADDRESS);
	console.log(amt.value);
    const op = await contract.methods.processDeposit().send({amount : amt.value});
	await op.confirmation(1);
    alert("Deposit Completed!");  
	
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Deposit</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deposit</ModalHeader>
          <ModalBody>
            <form onSubmit={submit}>
              <FormControl>
                <Input
                  required
                  type="number"
                  name="amt"
                  placeholder="Amount in Tez"
                ></Input>
              </FormControl>
              <Button type="submit">Submit</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};


const Redeem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const submit = async (e) => {
    e.preventDefault();
    const {amount } = e.target.elements;
    console.log( amount.value);
    const contract = await wallet.at(CONTRACT_ADDRESS);


    const op = await contract.methods
      .processPayment(amount.value)
      .send();
	await op.confirmation(1);
    alert("Redemption Completed!");  
	
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Redeem</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Redeem </ModalHeader>
          <ModalBody>
            <form onSubmit={submit}>
              <FormControl>
                <Input
                  required
                  type="number"
                  name="amount"
                  placeholder="Amount"
                />
              </FormControl>
              <Button type="submit">Redeem</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};




export default function Header({ links = [] }) {
  const history = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connect, disconnect, activeAccount, connected } = useWallet();
  const { colorMode, toggleColorMode } = useColorMode();
  

  return (
    <Box
      color={useColorModeValue('purple', 'white')}
      bg={useColorModeValue('purple.100', 'purple.900')}
      px={4}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack spacing={8} alignItems={'center'}>
          <Box>
		  </Box>
        </HStack>
        <Text fontSize="3xl" colorScheme="Orange" fontWeight="bold">
          T-ORA
        </Text>
        <Flex alignItems={'center'}>
          <IconButton
            marginRight="10px"
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
          />
          <Box display={{ base: 'none', md: 'flex' }}>
            {!connected ? (
              <Button onClick={connect}>Connect Wallet</Button>
            ) : (
              <Menu>
                <MenuButton as={Button} cursor={'pointer'} minW={0}>
                  <Text
                    maxW="300px"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {activeAccount?.address}
                  </Text>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => history('/mypreds')}>
                    My Predictions
                  </MenuItem>
					<Whitelist />
                  <MenuItem onClick={disconnect}>Disconnect</MenuItem>
				  
		  <Deposit />
                  <Redeem />
		  <PortfolioDetails activeAccount={activeAccount}/>
				  
                </MenuList>
              </Menu>
            )}
          </Box>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {!connected ? (
              <Button onClick={connect}>Connect Wallet</Button>
            ) : (
              <Menu>
                <MenuButton as={Button} cursor={'pointer'} minW={0}>
                  <Text
                    maxW="300px"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {activeAccount?.address}
                  </Text>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => history('/mypreds')}>
                    My Predictions
                  </MenuItem>

                  <MenuItem onClick={disconnect}>Disconnect</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}


const PortfolioDetails = (activeAccount) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const colors = {
    bg: useColorModeValue('purple.100', 'purple.700'),
    text: useColorModeValue('blue', 'white'),  };
  
	//const { connect, disconnect, activeAccount, connected } = useWallet();
	const [data, setData] = React.useState(null);
	let portfolio = {};
	console.log(activeAccount);
	console.log("conn");
	
	React.useEffect( async () => {

    ContractProvider.at(CONTRACT_ADDRESS).then(async (contract) => {
		//if (!connected) {
			//await connect();
			//console.log("connected");
		//}
		console.log("connected1");
		if (activeAccount) {
			
			console.log(activeAccount);
			console.log(activeAccount.activeAccount.address);
			let address = activeAccount.activeAccount.address;
			console.log("address ", address);
			const storage  = await contract.storage();
			console.log(portfolio);
			portfolio = await storage.reporters.get(address)
					.then(value => { return ({name : value.name, balance : value.balance.toString(), lockedAmount : value.lockedAmount.toString()})})
					.catch(value => { return ({name : "Not Registered" , balance : 0, lockedAmount : 0})});
			console.log(portfolio);		

			};
			
	console.log(portfolio);
	setData(portfolio);
	
		

    });
	},[activeAccount]);

	return data ?(
	<>
      <MenuItem onClick={onOpen}>Account Details </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Account Details</ModalHeader>
          <ModalBody>
	
			<Text color={colors.text}> <b> Portfolio </b> </Text>
			
        		
				
					
						<Box
							
							display="flex"
							maxWidth="400px"
							flexDirection="column"
							border="0px solid"
							borderRadius="15px"
							padding="5px"
							margin="5px"
						>
								<Text color={colors.text}>User id &emsp; &emsp; &emsp; &nbsp;&nbsp;: &nbsp; {data.name} </Text>
								<Text color={colors.text}>Balance &emsp;  &emsp; &emsp; &nbsp;: &nbsp;{data.balance} mutez</Text>
								<Text color={colors.text}>Locked Amount   &nbsp; : &nbsp;{data.lockedAmount} mutez</Text>
								
						</Box>
	         
                

             
		
			</ModalBody>
        </ModalContent>
      </Modal>
    </>
 
  ):(
    <Loading />
  );
};

const Redeem1 = (tokenID) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
	console.log("tokenId", tokenID.tokenID.toString());
	const colors = {
    bg: useColorModeValue('purple.300', 'purple.600'),
    text: useColorModeValue('purple', 'white'),}
  const submit = async (e) => {
    e.preventDefault();
    const { amount } = e.target.elements;
    console.log(tokenID.tokenID, amount.value);
    const contract = await wallet.at(CONTRACT_ADDRESS);

    await contract.methods
      .redeemTokens(amount.value, tokenID.tokenID)
      .send();
  };

  return (
     
      <Popover returnFocusOnClose={false} placement="right" closeOnBlur={false}>
      <PopoverTrigger>
        <Button bg={colors.bg} textColor={colors.text}>
          Redeem
        </Button>
      </PopoverTrigger>
      <PopoverContent textColor={colors.text}>
        <PopoverHeader fontWeight="semibold">
          Redeem Token
        </PopoverHeader>
        <PopoverBody>
            <form onSubmit={submit}>
             <FormControl>
            <FormLabel htmlFor="tokenID">Token Id : {tokenID.tokenID.toString()} </FormLabel>
            
          </FormControl>
              <FormControl>
                <Input
                  required
                  type="number"
                  name="amount"
                  placeholder="Amount"
                />
              </FormControl>
              <Button type="submit">Redeem</Button>
            </form>
       </PopoverBody>
      </PopoverContent>
    </Popover>
  
  );
};

	
	
