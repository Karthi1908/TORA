import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';

  async function getRequest() {

    // Edit query parameters below
    // specify a search query, and any additional fields that are required
    // by default, only the Tweet ID and text fields are returned
    const params = {
        'query': 'from:BBCBreaking',
        'tweet.fields': 'author_id',
		 'max_results': '100'
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

(async () => {

    try {
        // Make request
        const response = await getRequest();
        console.dir(response, {
            depth: null
        });
		AddNewPoll(response.data[1].text,response.data[1].id);

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();



 async function AddNewPoll(news, newsRef) {
	 

  const Tezos = new TezosToolkit('https://ithacanet.smartpy.io');  
  const CONTRACT_ADDRESS = 'KT19xpAYhNdeXmuUz25MvonNjmPVNfq2aB2Z'; 
  Tezos.setProvider({ signer: await InMemorySigner.fromSecretKey('edskRdeh1WthCEKQoq13Zm3uw7q3iUjWCPcb4j6a5SQMPH2RKPBM5Hdeu9eJ4ccjSbkSpAC4x2XDVdXM8U9z41RQT127SwLLq4') });
  const wallet1 = Tezos.wallet;
  const contract = await wallet1.at(CONTRACT_ADDRESS);
  console.log("contract", contract);
  console.log("news :" , news);
  console.log("newsref :", newsRef);
  const op = await contract.methods.addpredictions(
        news,
        newsRef,
        10,
		0,
        ["FACT" , "FAKE"]
       
      )
      .send();
	await op.confirmation(1);
    console.log("Poll Created!");


    
};
