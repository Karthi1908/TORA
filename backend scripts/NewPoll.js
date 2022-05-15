import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';




import * as fs from 'fs';
const data = fs.readFileSync('tweets.csv','utf8');
console.log(data);
const arr = data.toString().replace(/\r\n/g,'\n').split('\n');

    for(let i of arr) {
        //console.log(i);
		
		var splits = i.split(",||,")
		//console.log(splits[1]);
		//console.log(splits[2]);
		
		if ( (splits[1] != null) && (splits[2] != null)){
			let news = splits[2];
			let ref = 'https://twitter.com/' + splits[1] + '/status/' + splits[3]
			
			AddNewPoll(news,ref)
			await delay(30000);
		}
		
    }
function delay(ms) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

 
 async function AddNewPoll(news, newsRef) {
	 

  const Tezos = new TezosToolkit('https://ithacanet.smartpy.io');  
  const CONTRACT_ADDRESS = 'KT19xpAYhNdeXmuUz25MvonNjmPVNfq2aB2Z'; 
  Tezos.setProvider({ signer: await InMemorySigner.fromSecretKey('edskRdeh1WthCEKQoq13Zm3uw7q3iUjWCPcb4j6a5SQMPH2RKPBM5Hdeu9eJ4ccjSbkSpAC4x2XDVdXM8U9z41RQT127SwLLq4') });
  const wallet1 = Tezos.wallet;
  const contract = await wallet1.at(CONTRACT_ADDRESS);
  //console.log("contract", contract);
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
