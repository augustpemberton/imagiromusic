const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Buffer = require('buffer').Buffer
const axios = require('axios')
const qs = require('querystring')
const ColorThief = require('colorthief')

// Setup environment
require('dotenv').config()

// Create server
const app = express()
const port = 8000

// Setup server
app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

var spotifyAccessToken
var tokenExpiryDate = -1

var releases

// Update auth token

async function RefreshToken() {
    const authToken = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`, 'utf8').toString('base64')
    try {
        const config = {
            headers: { 
                Authorization: `Basic ${authToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const data = {
            grant_type: 'client_credentials'
        }

        const response = await axios.post("https://accounts.spotify.com/api/token", qs.stringify(data), config)
        spotifyAccessToken = response.data.access_token
        tokenExpiryDate = Date.now() + (response.data.expires_in * 1000)
    } catch (err) {
        console.log(err.response.data)
        process.exit()
    }

}

async function GetReleases() {
    if (Date.now() >= tokenExpiryDate) {
        await RefreshToken();
    }

    console.log(`Getting albums with token ${spotifyAccessToken}`)
    const config = {
        headers: { Authorization: `Bearer ${spotifyAccessToken}` },
        params: {
            include_groups: 'album,single'
        }
    }
    try {
        const response = await axios.get("https://api.spotify.com/v1/artists/2O8Fgh14LT9QBGfFM5q5Rb/albums", config)
        releases = await ParseReleaseResponse(response).catch(e => console.error(e))
    } catch (err) {
        console.log(err.response.data)
    }
}

async function ParseReleaseResponse(res) {
    rs = []
    for (var i=0; i<res.data.items.length; i++) {
        simple_release = res.data.items[i]

        // Get more detailed album info
        const config = {
            headers: { Authorization: `Bearer ${spotifyAccessToken}` },
        }
        const response = await axios.get(`https://api.spotify.com/v1/albums/${simple_release.id}`, config)
        var release = response.data
        console.log(release.name)

        var dominantColor = "#828953"
        try {
            rgb = await ColorThief.getColor(release.images[0].url)
            dominantColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
        } catch (err) {
            console.error(err)
        }

        r = {
            title:              release.name.toLowerCase(),
            artwork:            release.images[0].url,
            url:                release.external_urls["spotify"],
            readLink:           null,
            label:              release.copyrights[0].text,
            released:           true,
            backgroundColor:    dominantColor,
            dark:               lightOrDark(dominantColor) == "dark" ? true : false,
            txtSmall:           release.name.length > 12 ? true : false
        }

        rs.push(r)
    }
    return rs
}

// Define responses
app.get('/releases', (req, res) => {
    res.send(releases)
});

GetReleases().catch(err => console.error(err))

// Start listening
app.listen(port);


function lightOrDark(color) {

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {

    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

    r = color[1];
    g = color[2];
    b = color[3];
  } 
  else {

    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace( 
      color.length < 5 && /./g, '$&$&'
    )
             );

    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );

  // Using the HSP value, determine whether the color is light or dark
  if (hsp>127.5) {

    return 'light';
  } 
  else {

    return 'dark';
  }
}