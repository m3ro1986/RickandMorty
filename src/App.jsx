import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css';
import ResidentInfo from './components/ResidentInfo';

function App() {

    const [search, setSearch] = useState(() => { return Math.floor(Math.random() * 126) })
    const [listLocation, setListLocation] = useState([]);
    const [allLocation, setAllLocation] = useState([]);
    const [location, setLocation] = useState({});
    const [dimension, setDimension] = useState('');

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/location/${search}`)
            .then(res => setLocation(res.data))

    }, [search])

    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/location')
            .then(res => setAllLocation(res.data.results))
        getListLocation()
    }, [])

    const changeLocation = () => {
        setSearch(dimension);
    }

    const getListLocation = () => {
        setListLocation(() => allLocation.map(e => e.name))
    }

    return (
        <div className="App">
            <header></header>
            <main>
                <h1>Rick and Morty Wiki</h1>
                <div>
                    <input
                        type="text"
                        value={dimension}
                        placeholder='type a location id'
                        onChange={e => {
                            setDimension(e.target.value);
                        }}
                    />
                    <button onClick={changeLocation}>Search</button>
                </div>

                <div className='dimensionInfo'>
                    <h2> {location.name} </h2>
                    <ul className='locationInfo'>
                        <li> <span>type:</span>  {location.type} </li>
                        <li> <span>dimension:</span>  {location.dimension} </li>
                        <li> <span>#residents:</span>  {location.residents?.length} </li>
                    </ul>
                </div>

                <h2>Residents: location #{search}</h2>
                <div className='residents'>

                    {
                        location.residents?.map(e => (
                            <ResidentInfo key={e} url={e} />
                        ))
                    }
                </div>

            </main>
            <footer>
                <p>Create with ❤ By Mero</p>
            </footer>
        </div>
    )
}

export default App
