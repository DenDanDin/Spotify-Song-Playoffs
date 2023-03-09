import React, {useState, useEffect} from 'react'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios'
import useAuth from './useAuth'

const spotifyApi = new SpotifyWebApi({
    clientId: "6463990fb32c4b6183d50216d53ceff0",
})

export default function TestComponent({code}) {

    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])

    function selectArtist(artist){
        setSearch("")
        setSearchResults([])
    }

    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return
        
        let cancel = false
        spotifyApi.searchArtists(search)
            .then(res => {
                if(cancel) return
                setSearchResults(res.body.artists.items.map(artist => {
                    return{
                        name: artist.name
                    }
                }))
            })
        return () => cancel = true
    }, [search, accessToken])

    return(
        <>
            <Container className=" d-flex flex-column py-2" style={{height: "100vh"}}>
                <Form.Control 
                type="search" 
                placeholder="Search Songs/Artists" 
                value={search} 
                onChange={e => setSearch(e.target.value)}
                />
                <div>Search Results</div>
                {searchResults.map(artist => {
                    return(
                        <div>
                            <h1>Name: {artist.name}</h1>
                        </div>
                    )
                })}
            </Container>
        </>
    )
}
