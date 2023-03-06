import React, {useState, useEffect} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios'
import useAuth from './useAuth'

const spotifyApi = new SpotifyWebApi({
    clientId: "6463990fb32c4b6183d50216d53ceff0",
})

export default function TestComponent({code}) {

    const accessToken = useAuth(code)

    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    return(
        <div>{code}</div>
    )
}
