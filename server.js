import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { GraphQLClient, gql } from 'graphql-request';
import dotenv from 'dotenv';
import Twitter from 'twitter-v2';
import { TwitterApi } from 'twitter-api-v2';
dotenv.config();


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

var tweetURLNormalized = "https://twitter.com/EnsarKreka/status/1478765711375978496";
const tweetID = tweetURLNormalized.split('/').slice(-1)[0];
console.log('[TweetID] = ', tweetID);

// const client = new TwitterApi({
//   appKey: process.env.twitter_appKey,
//   appSecret: process.env.twitter_appSecret,
//   accessToken: process.env.twitter_accessToken,
//   accessSecret: process.env.twitter_accessSecret,
// });
// client.v2.singleTweet(tweetID, {
//   'tweet.fields': [
//     'test#abc',
//   ],
// }).then((val) => {
//   console.log('[Tweet Val]', val)
// }).catch((err) => {
//   console.log('[Tweet Err]', err)
// })

console.log('[Env] = ', process.env.twitter_appKey);
const client = new Twitter({
  consumer_key: process.env.twitter_appKey,
  consumer_secret: process.env.twitter_appSecret,
  access_token_key: process.env.twitter_accessToken,
  access_token_secret: process.env.twitter_accessSecret,
});

try {
  const { data } = await client.get('tweets', { ids: '1478765711375978496' });
  console.log('[Twitter  data ] = ', data);
} catch (err) {
  console.log('[Error ] = ', err);
}

// node server running
app.listen(process.env.PORT || 3001, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});