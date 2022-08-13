import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import { char2Bytes, bytes2Char } from '@taquito/utils'
import React from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useWallet } from '../../helper/WalletContext';
import { CONTRACT_ADDRESS, Tezos} from '../../helper/tezos';
import Loading from '../../helper/Loading';



export default function AddNewPoll() {
  const [num, setNum] = React.useState(0);
  // const { connected, connect, activeAccount } = useWallet();
  const [options, setOptions] = React.useState({});
  const needle = require('needle');
  const token = 'AAAAAAAAAAAAAAAAAAAAAB5FRAEAAAAAWAGGw86azAmXCI67ZS3mYAwWBWQ%3DR4MDWRt4l6d5MLtrQ3Gai04U3qVItjbDOc0qdZ7zpNZ73ExSTJ';
  const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";
  
  async function getRequest() {

    // Edit query parameters below
    // specify a search query, and any additional fields that are required
    // by default, only the Tweet ID and text fields are returned
    const params = {
        'query': 'from:BBCBreaking',
        'max_results': '10'
    }

    const res = await needle('get', endpointUrl, params, {
		mode: 'no-cors',
        
        headers: {
			
			"User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer AAAAAAAAAAAAAAAAAAAAAB5FRAEAAAAAWAGGw86azAmXCI67ZS3mYAwWBWQ%3DR4MDWRt4l6d5MLtrQ3Gai04U3qVItjbDOc0qdZ7zpNZ73ExSTJ`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}


  const submit = async (e) => {
    e.preventDefault();
	const Tezos = new TezosToolkit('https://ghostnet.smartpy.io');
	const response ='';

    Tezos.setProvider({ signer: await InMemorySigner.fromSecretKey('edskRdeh1WthCEKQoq13Zm3uw7q3iUjWCPcb4j6a5SQMPH2RKPBM5Hdeu9eJ4ccjSbkSpAC4x2XDVdXM8U9z41RQT127SwLLq4') });

    try {
        // Make request
        response = await getRequest();
        console.dir(response, {
            depth: null
        });
	   console.log("reponse:" ,response);

    } catch (e) {
        console.log("error", e);
        	
    }
	
	
	console.log(response);
	
	const { prediction, resultRef, start, end } = e.target.elements;
	const wallet1 = Tezos.wallet;
	

    const contract = await wallet1.at(CONTRACT_ADDRESS);
	console.log("contract", contract);
	let enNews = char2Bytes(news.value) 
	
    const op = await contract.methods.addpredictions(
        enNews,
        newsRef.value,
        quorum.value,
		rewards.value,
		"Twitter",
        Object.keys(options).map((key) => options[key]),
       
      )
      .send();
	await op.confirmation(1);
    alert("Poll Created!");
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Add New Poll</Button>
      </PopoverTrigger>
      <PopoverContent padding="4">
        <form onSubmit={submit}>
          <FormControl>
            <FormLabel htmlFor="news">News</FormLabel>
            <Input name="news" id="news"></Input>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="newsRef">News Reference</FormLabel>
            <Input name="newsRef" id="newsRef"></Input>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="quorum">Quorum Required</FormLabel>
            <Input type="number" name="quorum" id="quorum"></Input>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="end">Rewards</FormLabel>
            <Input type="number" name="rewards" id="rewards"></Input>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="number_options">Number of Options</FormLabel>
            <Input
              onChange={(e) => {
                console.log(e);
                setNum(parseInt(e.target.value) || 0);
              }}
              name="number_options"
              id="number_options"
              type="number"
            ></Input>
          </FormControl>
          {[...Array(num).keys()].map((i) => {
            return (
              <FormControl>
                <FormLabel htmlFor={'option_' + i}>Option {i}</FormLabel>
                <Input
                  onChange={(e) =>
                    setOptions((options) => {
                      var opt = options;
                      opt[`option_${i}`] = e.target.value;
                      return opt;
                    })
                  }
                  name={`option_${i}`}
                  id={`option_${i}`}
                ></Input>
              </FormControl>
            );
          })}
          <Button type="submit">Submit</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
