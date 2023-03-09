import React from 'react'

export default function ArtistSearchResult({artist, selectArtist}) {

    function handleSelection(){
        selectArtist(artist)
    }
    return (
        <div 
            className="d-flex m-2 align-items-center" 
            style={{cursor: "pointer"}}
            onClick={handleSelection}
        >
            <img 
                src={artist.picture} 
                style={{height: '128px', width: '128px'}} 
            />
            <div className="m1-3">
                <h3>{artist.name}</h3>
            </div>
        </div>
    )
}
