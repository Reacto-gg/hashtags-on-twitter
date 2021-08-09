import { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'
import logo from './twitter.png';
import './App.css';
import axios from 'axios';


function App() {
    const [trends, setTrends] = useState([]);
    const [woeid, setWoeid] = useState('1');


    function gettingTrendTags() {
        axios
            .get('/api/trends', {
                params: {
                    woeid,
                }
            })
            .then(response => {
                // console.log(response.data);
                setTrends(response.data[0].trends);
            })
            .catch(error => console.log(error.message));
    }

    useEffect(() => { gettingTrendTags() }, [woeid]);


    const handle_locaton = () => {
        // console.log('Locations Triggered');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                    axios.get('/api/near_location', {
                        params: {
                            lat: position.coords.latitude,
                            long: position.coords.longitude,
                        }
                    }).then(response => {
                        setWoeid(response.data[0].woeid);

                    }).catch(error => console.log(error.message))
                },
                error => {
                    console.log(error.message);
                }
            )
        } else {
            alert("Geolocation not supported by browser");
        }
    }

    const trendLists = () => {
        return ( < ul > {
                    trends.map((trend, index) => {
                      return ( <li key = { index } >
                                  <a href = { trend.url } > { trend.name } </a>{
                                  trend.tweet_volume && ( < span className = 'tweet_volume' > { trend.tweet_volume } </span>
                                  )} </li>
                        )
                    })
            } </ul>)
    }

    return ( 
        <div className = "App" >
          <header className = "App-header" >
              <img src = { logo }className = "logo"alt = "Twitter" />
              <h2 > Trends on Twitter </h2>  
          </header> 
          <div className = "menu" >
              <select name = "trending-places" id = "" onChange = {(e) => setWoeid(e.target.value) } >
                  <option value = "1" > Worldwide </option>   
                  <option value = "832684" > USA </option>  
                  <option value = "2459115" > New York, Usa 
                  </option>  
                  <option value = "23424848" > India </option>  
                  <option value = "1105779" > Sydney, AU </option>  
              </select> 
              <div className = "location" onClick = { handle_locaton } >
                  <FaMapMarkerAlt/>
              </div>   
            </div> 
            <div className = "contents" > { trendLists() } </div> 
        </div>
    );
}

export default App;