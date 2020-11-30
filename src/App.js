import React,{useState,useEffect} from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';
import Map from'./Map';
import Table from './Table'

function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState("worldwide");
  const [countryInfo,setCountryInfo]=useState({});
  const [tableData,setTableData]=useState([]);
  //useEffect
  useEffect(() =>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response=>response.json())
    .then(data =>{
      setCountryInfo(data);
    })
  },[])
  useEffect(()=>{
 //async->send request to server,wait for it and do somethiong with it
 const getCountriesData=async ()=>{
   await fetch("https://disease.sh/v3/covid-19/countries")
   .then((response)=>response.json())
   .then((data)=>{
     const countries=data.map((country)=>(
      {
         name:country.country,
         value: country.countryInfo.iso2 ,
       }));

       setTableData(data);
       setCountries(countries);
   });
 };
 getCountriesData();
  },[]);

  const onCountryChange=async (event)=>{
    const countryCode=event.target.value;
    {/*console.log(countryCode);*/}
    setCountry(countryCode);

    const url=countryCode ==='worldwide'? 'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${countryCode}`;
    const a=await fetch(url)
    .then(response=>response.json())
    .then(data=>{
      setCountry(countryCode);
      setCountryInfo(data);
    });
  };

console.log("Country info",countryInfo);


  return (
    <div className="App">
    <div className="app__left">
    <div  className="app__header">
    <h1>COVID 19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select 
        variant="outlined"
        onChange={onCountryChange}
        value={country}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {/*Loop through all the countries and show a dropdown!!*/}
          {
            countries.map((country)=>(
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
          {/*<MenuItem value="worldwide">Option 1</MenuItem>
          <MenuItem value="worldwide">Option 2</MenuItem>
          <MenuItem value="worldwide">Option 3</MenuItem>
          <MenuItem value="worldwide">Option 4</MenuItem>
           <MenuItem value="worldwide">Option 5</MenuItem> */}
        </Select>
      </FormControl>
    </div>
      
  
   <div className="app__stats">
<InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
 <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
  <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
   </div>
    <Map />
    </div>
    <Card className="app__right">
      <CardContent>
   <h3>Live cases by the country</h3>
   <Table countries={tableData}/>
{/*table */}
<h3>Worldwide new cases</h3>
    {/*Graph */}
      </CardContent>
    </Card>
  </div>
  );
}

export default App;
