import tweepy
import configparser
import pandas as pd
import sys

# read configs
config = configparser.ConfigParser()
config.read('config.ini')

api_key = config['twitter']['api_key']
api_key_secret = config['twitter']['api_key_secret']

access_token = config['twitter']['access_token']
access_token_secret = config['twitter']['access_token_secret']

# authentication
auth = tweepy.OAuthHandler(api_key, api_key_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

# create DataFrame
columns = ['Time', 'delim', 'User', 'delim1', 'Tweet', 'delim2', 'TweetID']
data = []



# user tweets
#user = 'BBCBreaking'
user = 'BBCBreaking'
limit=5
user = sys.argv[1]
limit = sys.argv[2]

print(sys.argv)
users = ['BBCBreaking', 'XTZNews']
user_ids = []

tweets = api.user_timeline(screen_name=user, count=limit, tweet_mode='extended')

# BBC tweets
for user in users:
    user_ids.append(api.get_user(screen_name=user).id)

# for tweet in tweets:
#     data.append([tweet.user.screen_name, tweet.full_text])

# get tweets from timeline and store them to .csv
# public_tweets = get_user(screen_name=user).id

for tweet in tweets:
    #print(tweet)
    #print('=======================================================================================================================================')
    data.append([tweet.created_at, '||', tweet.user.screen_name, '||', tweet.full_text, '||', tweet.id])

df = pd.DataFrame(data, columns=columns)
df = df.replace('\n',' ', regex=True)

df.to_csv('tweets.csv', header=False, index=False)
print(df)
