import { useEffect, useState } from "react";
import axios from 'axios';
import { Countries } from './Countries';

const COUNTRY_URL = 'https://studies.cs.helsinki.fi/restcountries/'

const Filter =  ({onFilter}) => {
  return (
    <form>
      <div>find countries <input onChange={onFilter}/></div>
    </form> 
  )}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [onFilter, setOnFilter] = useState('');

  const filter = (e) => {
    setOnFilter(e.target.value);
  }

  useEffect(() => {
    axios.get(`${COUNTRY_URL}/api/all`).then( (res) => {
      setCountries(res.data)
    })
  },[])


  const matchedCountries = countries.filter(country => country.name.common.toLowerCase().includes(onFilter.toLowerCase()))
  console.log("MatchedCountries",matchedCountries);
  return(
    <>
        <Filter onFilter={filter} />
        <Countries countries={matchedCountries} setShow={setOnFilter}/>
    </>
  )
} 

export default App;