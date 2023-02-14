import '../styles/residentInfo.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ResidentInfo = ({ url }) => {

    const [character, setCharacter] = useState({});
    const [statu, setStatu] = useState('');
    useEffect(() => {
        axios.get(url).then(res => {
            setCharacter(res.data);
            setStatu( res.data.status )
        })
    }, [])


    return (
        <div className='characterBox'>
            <figure>
                <div className='status'>
                    <span className={`circle ${ statu }`}></span>
                    <span> {character.status} </span>
                </div>
                <img src={character.image} />
                <span className='name'> {character.name} </span>
            </figure>

            <div className='characterInfo'>
                
                <span> Specie: { character.species }</span>
                <span> Origen: {character.origin?.name}</span>
                <span> Episodes: {character.episode?.length} </span>
            </div>
        </div>
    );
};

export default ResidentInfo;