# 🤖 spotify-playlist-backend
[![Backend Service Push](https://github.com/The-Bug-Busters/spotify-playlist-backend/actions/workflows/main.yml/badge.svg)](https://github.com/The-Bug-Busters/spotify-playlist-backend/actions/workflows/main.yml)

This repository and Docker image contains the backend service used for our 
[**Spotify Playlist Web App**](https://github.com/The-Bug-Busters/spotify-playlist-web-app)
which is the result of an exam assignment at the DHBW university in Friedrichshafen, Germany.

## 🛠️ How it works & Usage
Its only purpose is to deliver information from the Spotify Web API to the client. This means,
this package is just being used as a dockerized microservice, running on our AWS EC2 instance.

To use it, run:
```
npm run start
```

Please notice, that **two environment variables are needed!**
* `SPOTIFY_CLIENT_ID` contains the Client ID which you can get from the Spotify Application Dashboard
* `SPOTIFY_CLIENT_SECRET` is the secret key which you can also obtain from the dashboard

The docker image is pulled inside an Ansible playbook and runs
on an EC2 instance on AWS that was previously created automatically. 
With *traefik*, it is able to receive external requests. 
We also use Cloudflare and its DNS proxy for SSL encryption to allow secure requests via HTTPS.

## 👷 Authors
* [Gary Lude](https://github.com/Kiodok)
* [Lars Strölin](https://github.com/M4RD3K)
* [Julian Yaman](https://github.com/julianYaman)