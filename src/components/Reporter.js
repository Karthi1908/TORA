import React from 'react';
import { Box, Container, Text, useColorModeValue, HStack, } from '@chakra-ui/react';
//import { useHistory } from 'react-router-dom';
import { ContractProvider, CONTRACT_ADDRESS } from '../helper/tezos';

export default function Reporter() {
   const [reporters, setReporters] = React.useState(null);
   const [reportersArray, setReportersArray] = React.useState([]);
   const updateReporters = (trans, transArray) => {
    setReporters(trans);
    setReportersArray(transArray);
   };
   //const history = useHistory();
   const colors = {
    bg: useColorModeValue('pink.100', 'pink.900'),
    text: useColorModeValue('black', 'white'),
  };
  
  React.useEffect(() => {
    ContractProvider.at(CONTRACT_ADDRESS).then(async (contract) => {
      const storage = await contract.storage();
      const reporters = storage.reporters;
	  const crossRef = storage.crossRef;
	  console.log(crossRef);
      const transList = [];
      for (let trans of crossRef.values()) {
		await reporters.get(trans).then(value => { transList.push({ id: trans, value }) });
      }
      updateReporters(reporters, transList);
    });
  }, []);

  return (
    <Container
      width="auto"
      maxWidth="1000vw"
      bg={colors.bg}
      height="auto"
      maxHeight="1000vh"
      padding="10vh"
    >
	    <HStack spacing={8} alignItems={'center'}>
          <Box></Box>
        </HStack>
        <Text color={colors.text}> <b>Fact Checker Details </b></Text>
		<Box
              display="flex"
              maxWidth="1500px"
			  flexDirection="row"
              //border="1px solid"
              borderRadius="5px"
              padding="1px"
              margin="1px"
            >
			<Box display="flex" flexDirection="row" flexWrap="wrap" margin="5px"  maxWidth="350px" minWidth="350px">
				<Text color={colors.text} fontWeight="bold">Wallet : </Text>
			</Box>
			<Box display="flex" flexDirection="row" flexWrap="wrap" margin="5px" maxWidth="150px" minWidth="150px">
				<Text color={colors.text} fontWeight="bold">User ID : </Text>
			</Box>
			<Box display="flex" flexDirection="row" flexWrap="wrap" margin="5px"  maxWidth="150px" minWidth="150px">
				<Text color={colors.text} fontWeight="bold">Balance : </Text>
			</Box>
			<Box display="flex" flexDirection="row" flexWrap="wrap" margin="5px"  maxWidth="150px" minWidth="150px">
				<Text color={colors.text}fontWeight="bold">Locked Amount: </Text>
			</Box>
			<Box display="flex" flexDirection="row" flexWrap="wrap" margin="5px"  maxWidth="125px" minWidth="125px">
				<Text color={colors.text}fontWeight="bold">Correct Votes : </Text>
			</Box>
			<Box display="flex" flexDirection="row" flexWrap="wrap" margin="5px"  maxWidth="125px" minWidth="125px">
				<Text color={colors.text}fontWeight="bold">Incorrect Votes </Text>
			</Box>
			<Box display="flex" flexDirection="row" flexWrap="wrap" margin="5px"  maxWidth="125px" minWidth="125px">
				<Text color={colors.text}fontWeight="bold">Rep Score : </Text>
			</Box>
		</Box>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {reportersArray.map((reporter, i) => {
          return (
            <Box
              key={i}
              //onClick={() => history.push(reporter.id)}
              display="flex"
              maxWidth="1500px"
			  flexDirection="row"
              //border="1px solid"
              borderRadius="5px"
              padding="1px"
              margin="1px"
            >
			 <Box display="flex" flexDirection="row" flexWrap="wrap" margin="5px" maxWidth="350px" minWidth="350px">
				
				<Text color={colors.text}>{reporter.id}</Text>
			  </Box>
			 <Box display="flex" flexDirection="row" flexWrap="wrap" margin="5px" maxWidth="150px" minWidth="150px" >
				
				<Text color={colors.text}>{reporter.value.name}</Text>
			  </Box>
			 <Box display="flex" flexDirection="row" flexWrap="wrap" margin="5px" maxWidth="150px" minWidth="150px" >
				
				<Text color={colors.text}>{reporter.value.balance.toString()}</Text>
			  </Box>
			  <Box display="flex" flexDirection="row" flexWrap="wrap" margin="5px" maxWidth="150px" minWidth="150px">
				
				<Text color={colors.text}>{reporter.value.lockedAmount.toString()}</Text>
			  </Box>
			  <Box display="flex" flexDirection="row" flexWrap="wrap" margin="5px" maxWidth="125px" minWidth="125px">
				
				<Text color={colors.text}>{reporter.value.correctVotes.toString()}</Text>
			  </Box>
			  <Box display="flex" flexDirection="row" flexWrap="wrap" margin="5px" maxWidth="125px" minWidth="125px">
				
				<Text color={colors.text}>{reporter.value.wrongVotes.toString()}</Text>
			  </Box>
			  
			  <Box display="flex" flexDirection="row" flexWrap="wrap" margin="5px" maxWidth="125px" minWidth="125px">
			
				<Text color={colors.text}>{reporter.value.reputation.toString()} </Text>
			  </Box>
			  
			
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}
