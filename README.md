# T-ORA
Decentralised Truth Oracle on Tezos


### Introduction

In an age where the internet is frequently the main source of information, news audiences are at higher risk than ever of encountering and sharing fake news. Social media like Facebook and Twitter have in-house and hire third-party fact-checkers but the amount of fake news outstrips the number of fact-checkers. The current practice of employing professional fact-checkers is not scalable and in some instances doesn't imbibe the trust in news consumers. The best alternative for a professional fact-checker is T-ORA a scalable trustless Oracle working on the principle of "Wisdom of Crowds".   

### Fake News
Wikipedia defines "Fake news" as false or misleading information presented as news. Fake news often has the aim of damaging the reputation of a person or entity or making money through advertising revenue. Identifying fake news is made more difficult by the fact that it is rapidly becoming an industry of its own, with individuals paid to write sensationalist stories and create clickbait content to increase site traffic. Disinformation, fiction masquerading as fact, and deliberate lies can be made to look legitimate and can easily reach thousands of users in a matter of minutes.
   The spread of misinformation on social media—including blatantly false political “fake news,” misleading hyper-partisan news, and other forms of inaccurate content—has become a major matter of societal concern in liberal democracies.
   
   
### Fact Checking

Fact-checking is a process that seeks to verify sometimes factual information, in order to promote the veracity and correctness of reporting. Many professional organisations like FactCheck.org and PolitiFact in the US and Full Fact in the UK are devoted to independent fact-checking of the news and social media posts. However, their scalability is the cause of concern. the recent post on Australian media explains it aptly <a href = "https://www.buzzfeed.com/cameronwilson/australia-facebook-seven-fact-checkers-17-million-users"> "Australia Has 17 Million Facebook Users And Seven Facebook Fact Checkers" </a> Another cause of concern is the reliability of fact-checkers. According to a Poynter study, 70% of Republicans and 50% of Americans overall think that fact-checkers are biased and distrust fact-checking corrections.
Hence the fact-checking need a revamp.

 
### T-ORA

  As per a recent paper published in <a href ='https://www.science.org/doi/10.1126/sciadv.abf4393'> Science Advances </a>, in judging the truthfulness of headlines, the ratings of a small, politically balanced group of laypeople closely corresponded to the ratings of professional fact-checkers. T-ORA (Truth Oracle ) is built upon the research paper where news published on social media can be verified by common people rather than a professional fact-checker. Thus T-ORA by utilising the "Wisdom of Crowd" concept in fact-checking, it aims to provide a scalable solution for checking millions of social media posts by employing thousands of common people. It provides a platform where people can request the truthfulness of a particular news or a social media post and a crowd of fact-checkers will check and vote on the veracity of the news. The outcome will be based on what 80% of the crowd is voted on the trustworthiness of the post.
  
### Mission
 
  T-ORA 's mission is to become
  
  1. Universal fact-checking oracle for verifying news on both mainstream media and social media and 
  2. Provider of Basic Income for the common people.

### Design

* Trustless Oracle – [Schelling Points](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)

### Users

#### Requestors

    1. Requestor initiates the fact-checking process 
    2. Requestor adds a reward to the fact-checking request
    3. Requestors can be individuals or news / social media organisations.
    
#### Fact Checkers

    1. Fact-checkers get registered in the platform
    2. Once they are verified, they post the stake amount 
    3. They vote on the post available on the platform to determine the veracity of the post
    4. They get paid if their vote matches the supermajority votelse they lose 20 % of the stake.
  
### How it works

T-ORA currently is integrated with Twitter API to pull the tweets for any specified user id.

1. Requestor provides the Twitter user id or post id to the T-ORA script
2. The script pulls the relevant tweets into the platform and creates a post to be voted
3. Registered Checker post the stake
4. Checkers vote on the post on the platform as Fact or Fake.
5. For each vote, some stake of the Checkers get locked
6. Voting continues till the quorum is met and till any of the options get 80% of the total votes
7. The option that gets at least 80 % of the votes is declared the final result
8. Checkers who didn't vote for the correct final outcome lose 20% of the locked stake and the remaining of locked stake is added back to the balance
9. Checkers who voted for the correct outcome get back their locked stake + some additional stake
10. Requestor can see the final result on the platform

    
### Salient feature:

1. Anti Sybil checks for Checkers
2. Tezos is used as a transaction currency
3. Highly scalable 
4. Designed for quicker and reliable results
    
    
### Future Plans:

1. Integrations with Facebook, and Reddit for pulling the results
2. Integrations with whatapp
3. Fact-checking on youtube, twitch and other podcasts
4. Fact checking main stream meadia(both print and broadcast media)
5. Posting the results back to the post as comments


### Demo site

<a href='https://tora-livid.vercel.app/'>TORA</a>
  

#### Smart Contract:

T-Ora <a href = 'https://smartpy.io/explorer.html?address=KT1EvyfVE1bLztZ6vigLHwjmZrNDr52vsNcq'> KT1EvyfVE1bLztZ6vigLHwjmZrNDr52vsNcq</a>
    
