import React, {useState, useEffect} from 'react'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios'
import useAuth from './useAuth'
import ArtistSearchResult from './ArtistSearchResult'

const spotifyApi = new SpotifyWebApi({
    clientId: "6463990fb32c4b6183d50216d53ceff0",
})

export default function TestComponent({code}) {

    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [artist, setArtist] = useState()

    function selectArtist(artist){
        setArtist(artist)
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
                setSearchResults(res.body.artists.items.map(item => {
                    const smallestImage = item.images.reduce((smallest, image) => {
                        if(image.height < smallest.height) return image
                        return smallest
                      }, item.images[0])

                    return{
                        name: item.name,
                        picture: smallestImage.url
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
                <div className="flex-grow-1 my-2" style={{overflowY: "auto"}}>
                    {searchResults.map(artist => (
                        <ArtistSearchResult artist={artist} selectArtist={selectArtist} />
                    ))}
                </div>
            </Container>
        </>
    )
}
