import React from 'react';
import {
  Box,
  Container,
  useColorModeValue,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  RadioGroup,
  Stack,
  Radio,
  NumberInput,
  NumberInputField,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import PredictionContext from '../../helper/PredictionContext';
import { useParams  } from 'react-router-dom';
import Loading from '../../helper/Loading';
import { CONTRACT_ADDRESS, wallet, beaconWallet } from '../../helper/tezos';
import { useWallet } from '../../helper/WalletContext';
import { char2Bytes, bytes2Char } from '@taquito/utils'

const Vote = ({ id, options }) => {
  const [request, setRequest] = React.useState({
    option: options[0],
    quantity: 0,
  });

  const buySubmit = async (e) => {
    e.preventDefault();
    const { option, quantity } = e.target.elements;

    const contract = await wallet.at(CONTRACT_ADDRESS);
	id = Number(id);

    const op = await contract.methods
      .voteOnprediction(id, option.value)
      .send()
      
	await op.confirmation(1);
    alert("Vote Registered!");  
  };

  return (
    <Tabs variant="soft-rounded" width="100%">
      <TabList>
        <Tab>Options</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <form onSubmit={buySubmit}>
            <Container
              padding={{ base: '0' }}
              display="flex"
              flexDirection="column"
            >
              <Box margin="3">
                <Text fontWeight="bold" fontSize="md">
                  Pick an option
                </Text>
                <RadioGroup
                  onChange={(e) =>
                    setRequest((request) => {
                      return {
                        ...request,
                        option: e,
                      };
                    })
                  }
                  value={request.option}
                  name="option"
                >
                  <Stack direction="column">
                    {options.map((option, i) => {
                      return (
                        <Radio key={i} value={option}>
                          <Box
                            borderWidth="1px"
                            borderColor="gray.400"
                            p="2"
                            borderRadius="2xl"
                          >
                            {option}
                          </Box>
                        </Radio>
                      );
                    })}
                  </Stack>
                </RadioGroup>
              </Box>
              <Box margin="3">
                <Button type="submit">Vote</Button>
              </Box>
            </Container>
          </form>
        </TabPanel>
        <TabPanel>Lol2</TabPanel>
      </TabPanels>
    </Tabs>
  );
};


export default function Predict() {
  
  let { id } = useParams();
  console.log( "ID ", id);
  id = id.toString();
  const { predictions } = React.useContext(PredictionContext);
  const [data, setData] = React.useState(null);
  const { connect, disconnect, activeAccount, connected } = useWallet();
  const colors = {
    bg: useColorModeValue('blue.100', 'blue.900'),
    text: useColorModeValue('blue', 'white'),
    border: useColorModeValue('purple.900', 'purple.100'),
    cardBg: useColorModeValue('blue.200', 'blue.700'),
  };

  React.useEffect(async () => {
	  
	const pkh = await wallet.pkh({ forceRefetch: true });
	console.log("Wallet",wallet._pkh);

	let flag	= " NOT VOTED for this item";
	
    const _ = await predictions.get(id).then(value => {return value});
	const contract = await wallet.at(CONTRACT_ADDRESS);
		const storage = await contract.storage();
		const snapshot = await storage.voteSnapshot.get(id).then(value => {return value});
		const snapshotList = [];
		
	
	if (wallet._pkh) {

		const voterDetails = await storage.predictVotes.get(id).then(value => {return value}); 
		if (voterDetails.valueMap.has( '"' + wallet._pkh + '"')) {
			flag = " ALREADY VOTED for this item"
		}
		 
		console.log("voterDetails", voterDetails);
		console.log("flag", flag);
		
	}
	
		
		for (let pred of snapshot.keys()) {
			if (pred != 'Total') {			  
		  snapshotList.push({ id: pred, value: (Math.round(snapshot.get(pred) * 100 / snapshot.get('Total'))).toString() }); }
		  
		  console.log(snapshotList);
		  
      }
	  
	  let volume = (snapshot.get('Total')).toString();
	  console.log("volume :", volume);

	setData({
      prediction:bytes2Char( _.news),
      key: id,
	  flag : flag,
      ref: _.pID.toString(),
	  newsRef : _.newsRef,
      pstatus: _.voteStatus,
	  quorum : _.quorumRequired.toString(),
	  result : _.finalResult,
      options: _.voteOptions,
	  snap : snapshotList,
	  Volume : volume,

      disclosure:
        "Predictor is for informational and educational purposes only. We take no custody of anyone's money or cryptocurrency. Read this <a href = 'https://medium.com/@karthi1908/predictor-d01e6c67de0e/'> article<\a> to understand how to predict. Predictor displays existing markets live on the Tezos blockchain and is a graphical user interface for both visualizing data and market trends from on-chain activity, and interacting with said smart contracts directly via your Web 3 enabled wallet.",
     });
  }, []);

  return data ? (
    <Container
      maxWidth="100vw"
      width="auto"
      bg={colors.bg}
      color={colors.text}
      height="auto"
      minH="92vh"
      display="flex"
      flexDir="column"
      justifyContent="center"
      padding="0 15% 0 15%"
    >
      <Accordion allowToggle margin="6">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1">Please Read this before making any purchases</Box>
            </AccordionButton>
          </h2>
          <AccordionPanel p="6"> "T-ORA is for informational and educational purposes only ."</AccordionPanel>
        </AccordionItem>
      </Accordion>
      
	  <Text fontSize="l"> User has {data.flag} </Text>
	  <Box
        p="6"
        maxW="max-content"
        borderWidth="1px"
        borderRadius="lg"
        borderColor={colors.border}
        overflow="hidden"
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
      >
        <Text fontSize="sm">Prediction id: {data.ref} </Text>
	<Text fontSize="sm">Ref:<a href={data.newsRef} target="_blank">  <u>{data.newsRef}  </u> </a> </Text>

        <Text
          fontSize="lg"
          fontWeight="bold"
          margin={{ base: '1', md: '1' }}
          maxWidth="lg"
          overflow="visible"
          textOverflow="clip"
        >
          {data.prediction}
        </Text>
      </Box>
      <Box
        p="3"
        maxW="max-content"
        borderWidth="1px"
        borderRadius="lg"
        borderColor={colors.border}
        overflow="hidden"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
      >
        <Box
          p="2"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          borderColor={colors.border}
          bg={colors.cardBg}
          overflow="hidden"
          display="flex"
          flexDir="column"
          margin={{ base: '0', md: '2' }}
        >
          <Text fontSize="sm">Quorum</Text>
          <Text fontSize="l">{data.quorum}</Text>
        </Box>
        <Box
          p="2"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          borderColor={colors.border}
          bg={colors.cardBg}
          overflow="hidden"
          display="flex"
          flexDir="column"
          margin={{ base: '0', md: '2' }}
        >
          <Text fontSize="sm">Status</Text>
          <Text fontSize="l">{data.pstatus}</Text>
        </Box>
		<Box
          p="2"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          borderColor={colors.border}
          bg={colors.cardBg}
          overflow="hidden"
          display="flex"
          flexDir="column"
          margin={{ base: '0', md: '2' }}
        >
          <Text fontSize="sm">Result</Text>
          <Text fontSize="l">{data.result}</Text>
        </Box>

      </Box>
	  <Text fontSize="sm">Volume :</Text>
         <Box p="2"
					maxW="sm"
					borderWidth="1px"
					borderRadius="lg"
					borderColor={colors.border}

					overflow="hidden"
					display="flex"
					flexDir="row" flexWrap="wrap">
					
		  <Box p="2"
					maxW="sm"
					borderWidth="1px"
					borderRadius="lg"
					borderColor={colors.border}
					bg={colors.cardBg}
					overflow="hidden"
					display="flex"
					flexDir="row"
					margin={{ base: '0', md: '1' }}>
		  <Text color={colors.text}>Total : &nbsp;</Text>
		  <Text color={colors.text}>{data.Volume} Votes</Text>
		  </Box>
		 
        {data.snap.map((pred, i) => {
          return (
           
				<Box p="2"
					maxW="sm"
					borderWidth="1px"
					borderRadius="lg"
					borderColor={colors.border}
					bg={colors.cardBg}
					overflow="hidden"
					display="flex"
					flexDir="row"
					margin={{ base: '0', md: '1' }}>
              <Text color={colors.text}>{pred.id} : &nbsp;</Text>
			  
			  <Text color={colors.text}>{pred.value} %</Text>
			  </Box>
   
          );
        })}
      </Box>
	  <Box
        margin="6"
        p={{ base: '2', md: '6' }}
        maxW="max-content"
        borderWidth="1px"
        borderRadius="lg"
        borderColor={colors.border}
        overflow="hidden"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
      >
        <Vote id={id} options={data.options} />
      </Box>

    </Container>
  ) : (
    <Loading />
  );
}
