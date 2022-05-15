# T-ORA
Decentralised Truth Oracle on Tezos


### Introduction

In an age where the internet is frequently the main source of information, news audiences are at higher risk than ever of encountering and sharing fake news. The social media agent like Facebook and Twitter has in-house and hire third party fact checkers but the amount of fake news for outstrip the number of fact checkers. Current practice of employing professional fact checkers is not scalable and in some instances doesnt imbibe the trust in news consumer. The best alternative for professional fact checker is T-ORA a scalable trustless Oracle working on the principle of "Wisdom of Crowds".   

### Fake News
Wikipedia defines "Fake news" as false or misleading information presented as news.Fake news often has the aim of damaging the reputation of a person or entity or making money through advertising revenue. Identifying fake news is made more difficult by the fact that it is rapidly becoming an industry of its own, with individuals paid to write sensationalist stories and create clickbait content to increase site traffic. Disinformation, fiction masquerading as fact, and deliberate lies can be made to look legitimate and can easily reach thousands of users in a matter of minutes.
   The spread of misinformation on social media—including blatantly false political “fake news,” misleading hyper-partisan news, and other forms of inaccurate content—has become a major matter of societal concern in the liberal democracies.
   
   
### Fact Checking

Fact-checking is a process that seeks to verify sometimes factual information, in order to promote the veracity and correctness of reporting. Many professional organisations like FactCheck.org and PolitiFact in the US, and Full Fact in the UK are devoted to independet fact checking of the news and social media posts. However their scalability is cause of concern. the recent post on Australia media explain it aptly <a href = "https://www.buzzfeed.com/cameronwilson/australia-facebook-seven-fact-checkers-17-million-users"> "Australia Has 17 Million Facebook Users And Seven Facebook Fact Checkers" </a> Antoher cause of concern is the realiability of fact checkers. According to a Poynter study, 70% of Republicans and 50% of Americans overall think that fact-checkers are biased and distrust fact-checking corrections.
Hence the fact checking need a revamp.

 
### T-ORA

  As per a recent paper published in <a href ='https://www.science.org/doi/10.1126/sciadv.abf4393'> Science Advances </a>, in judging the truthfulness of headlines, the ratings of a small, politically balanced group of laypeople closely corresponded to the ratings of professional fact-checkers. T-ORA (Truth Oracle ) is built upon the research paper where news published on social media can be verified by common people rather than a professional fact-checker. Thus T-ORA by utilising the "Wisdom of Crowd" concept in fact-checking, it aims to provide a scalable solution for checking millions of social media posts by employing thousands of common people. It proivdes a platform where people can request the thruthfulness of a particular news or a social media post and corwd of fact checkers will check and vote on the veracity of the news. The outcome will be based on what 80% of crowd is voted on trust worthiness of post.
  
### Mission
 
  T-ORA 's mission is to become
  
  1. Universal fact-checking oracle for verifying news on both mainstream media and social media and 
  2. Provider of Basic Income for the common people.

### Design

* Trustless Oracle – [Schelling Points](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)

### Users

#### Requestors

    1. Requestor initiates the fact checking process 
    2. Requestor adds reward to the fact checking request
    3. Requestor can be individuals or news / social media organisation.
    
#### Fact Checkers

    1. Fact checkers get register in the platform
    2. Once they are verified , they post stake amount 
    3. They vote on the post available on the paltform to determine the veracity of the post
    4. They get paid if their vote matches the supermajority votelse they lose 20 % of the stake.
  
### How it works

T-ORA currently is integrated with Twitter API to pull the tweets for any specified user id.

1. Requestor provides the twitter user id or post id to T-ORA script
2. The script pulls the relevant tweets into the platform and create a post to be voted
3. Registered Checker post the stake
4. Checkers vote on the post on the platform as Fact or Fake.
5. For each vote, some stake of the Checkers get locked
6. Voting continues till the quorum is met and till any of the options get 80% of the total votes
7. The option that gets atleast 80 % of the votes is declared the final result
8. Checkers who didnt vote on the finale result lose 20% of the locked stake and remaining of locked stake is added back to the balance
9. Checkers who voted for the final result get back their locked stake + some additional stake
10. Requestor can see the final result on the platform

    
### Salient feature:

1. Anti Sybil checks for Checkers
2. Tezos is used as transaction currency
3. Highly scalable 
4. Designed for quicker and relaible results
    
    
### Future Plans:

1. Integrations with Facebook , Reddit for pulling the results
2. Posting the results back to the post as comments


### Demo site

<a href='https://tora-livid.vercel.app/'>TORA</a>
  

#### Smart Contract:

T-Ora <a href = 'https://smartpy.io/explorer.html?address=KT1EvyfVE1bLztZ6vigLHwjmZrNDr52vsNcq'> KT1EvyfVE1bLztZ6vigLHwjmZrNDr52vsNcq</a>
    
