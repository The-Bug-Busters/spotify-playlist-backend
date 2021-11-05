const express = require('express')
const cors = require('cors')
const axios = require('axios').default
const url = require('url')
url.URLSearchParams = URLSearchParams
const base64 = require('base-64')
const SpotifyWebApi = require('spotify-web-api-node')

const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)


const app = express()

app.use(cors());

const spotifyCredentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
}

let spotifyApi = new SpotifyWebApi(spotifyCredentials);

let token;
let expire_date;

async function authorization_access(){
    const params = new URLSearchParams({ grant_type: 'client_credentials' });
    const authString = 'Basic ' + base64.encode(spotifyCredentials.clientId + ':' + spotifyCredentials.clientSecret);

    try {
        const request = await axios.post('https://accounts.spotify.com/api/token', params.toString(),
            {
                headers: {
                    'Authorization': authString
                }
            })

        return request.data; // GET ACCESS TOKEN

    } catch (error) {
        return error.response.data;
    }

}


app.get('/', (req, res) => {
    res.send({message: "No Content here"});
});

app.get('/searchsong/:query', async (req, res) => {

    let query = req.params.query

    console.log("Incoming request with query:", query)

    if (!token) {
        console.log("New Token generated")
        let retrieval = await authorization_access()
        token = retrieval.access_token
        expire_date = dayjs().add(1, 'hour')
        console.log("Expire date set to", expire_date)
    }

    console.log("Token expires in " + expire_date.diff(dayjs(), 'minute')  + " minutes")

    if (expire_date.diff(dayjs(), 'minute') < 5) {
        console.log("New Token generated since old one was close to be expired")
        let retrieval = await authorization_access()
        token = retrieval.access_token
        expire_date = dayjs().add(1, 'hour')
        console.log("Expire date set to", expire_date)
    }

    spotifyApi.setAccessToken(token)
    spotifyApi.searchTracks(query).then(function(data) {
        res.send(data);
    })
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
});