const express = require('express')
const cors = require('cors')
const axios = require('axios').default
const url = require('url')
url.URLSearchParams = URLSearchParams
const base64 = require('base-64')
const SpotifyWebApi = require('spotify-web-api-node')

const app = express()

app.use(cors());

const spotifyCredentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
}

let spotifyApi = new SpotifyWebApi(spotifyCredentials);

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

        let response = request.data;
        return response.access_token; // GET ACCESS TOKEN

    } catch (error) {
        return error.response.data;
    }

}


app.get('/', (req, res) => {
    res.send({message: "No Content here"});
});

app.get('/searchsong/:query', async (req, res) => {

    let query = req.params.query

    let token = await authorization_access()

    spotifyApi.setAccessToken(token)
    spotifyApi.searchTracks(query).then(function(data) {
        res.send(data);
    })
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
});