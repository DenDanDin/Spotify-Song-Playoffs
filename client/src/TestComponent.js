import React, {useState, useEffect} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios'
import useAuth from './useAuth'

const spotifyApi = new SpotifyWebApi({
    clientId: "6463990fb32c4b6183d50216d53ceff0",
})

export default function TestComponent({code}) {

    const accessToken = useAuth(code)
    const [userPlaylists, setUserPlaylists] = useState([])

    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)

        spotifyApi.getUserPlaylists()
            .then(res => {
                setUserPlaylists(res.body.items.map(item => {
                    return{
                        name: item.name,
                        description: item.description,
                        id: item.id
                    }
                }))
            })
    }, [accessToken])

    // useEffect(() => {
    //     if(!accessToken) return

        
    // })

    return(
        <>
            <div>USER PLAYLISTS</div>
            {userPlaylists.map(playlist => {
                return(
                    <div>
                        <h1>Name: {playlist.name}</h1>
                        <h2>Description: {playlist.description}</h2>
                        <h3>Id: {playlist.id}</h3>
                    </div>
                )
            })}
        </>
    )
}
