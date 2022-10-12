import React from 'react';
import { Box, Container, Text, useColorModeValue, Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel, } from '@chakra-ui/react';
import PredictionContext from '../../helper/PredictionContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { predictionsArray } = React.useContext(PredictionContext);
  const history = useNavigate();
  const colors = {
    bg: useColorModeValue('blue.100', 'blue.900'),
    text: useColorModeValue('blue', 'white'),
  };
  console.log(predictionsArray);
  const inProgressArray = predictionsArray.filter(function(prediction)
				{ return prediction.voteStatus == "Ongoing"; });
  const completedArray = predictionsArray.filter(function(prediction)
				{ return prediction.voteStatus != "Ongoing"; });

  return (
    <Container
      width="auto"
      maxWidth="100vw"
      bg={colors.bg}
      height="auto"
      maxHeight="1000vh"
      padding="5vh"
    >

	  		<Box display="flex" flexDirection="column" flexWrap="wrap">
        		<Text color={colors.text}> <b>Current Posts </b></Text>
	  		<Box display="flex" flexDirection="row" flexWrap="wrap">
        			{inProgressArray.map((pred, i) => {
          				return (
           					 <Box
              						key={i}
              						onClick={() => history('/predict/' + pred.id)}
              						display="flex"
              						maxWidth="300px"
              						border="1px solid"
			  				borderColor="purple.400"
              						borderRadius="20px"
			  				flexDirection="row"
              						padding="20px"
              						margin="5px"
           					 >
							<Box display="flex" flexDirection="column" flexWrap="wrap">
              							<Text color={colors.text}> <b>ID </b>: {pred.pID}</Text>
			  					<Text color='orange'>  {pred.news} </Text>			  
			  					<Text color={colors.text}><b>Status </b>: {pred.voteStatus}</Text>
			  				</Box>
            					</Box>
          				);
        			})}
			</Box>
		 	<Text color={colors.text}> <b>Completed Posts </b></Text>
		 	<Box display="flex" flexDirection="row" flexWrap="wrap">
				{completedArray.map((pred, i) => {
          				return (
            					<Box
              						key={i}
             	 					onClick={() => history('/predict/' + pred.id)}
              						display="flex"
              						maxWidth="300px"
              						border="1px solid"
			  				borderColor="purple.400"
			  				flexDirection="row"
              						borderRadius="20px"
              						padding="20px"
              						margin="5px"
            					>
							<Box display="flex" flexDirection="column" flexWrap="wrap">
              							<Text color={colors.text}> <b>ID </b>: {pred.pID}</Text>
			  					<Text color='orange'>  {pred.news} </Text>			  
			  					<Text color={colors.text}><b>Status </b>:{pred.voteStatus}</Text>
								<Text color='orange'><b>Crowd Decision </b>:{pred.finalResult}</Text>
			  				</Box>
            					</Box>
          				);
        			})}
			</Box>
      		</Box>
    </Container>
  );
}
