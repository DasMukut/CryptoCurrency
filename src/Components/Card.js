
import React, {useState, useEffect} from "react"
import axios from "axios";
import Coin from "./Coin"
import "../App.css"


function Card() {
  const [coins, setCoins]=useState([]);
  const [search, setSearch]= useState("");
  useEffect(()=>{
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=fals
    e`).then(res=>{
      setCoins(res.data);
    }).catch(error=>{
      console.log(error)
    })
  },[])

  const handleChange=(e)=>{
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(val=>{
    return val.name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="coin-app">
       <div className='coin-search'>
           <h1 className='coin-text'>Search a Currency</h1>
          <form>
            <input type="text" placeholder='Search'
             onChange={handleChange}
             className='coin-input'/>
          </form>
       </div>
       {
        filteredCoins.map(val=>{
          return (
            <Coin key={val.id}
              image={val.image}
              price={val.current_price}
              name={val.name}
              symbol={val.symbol} 
              volume={val.total_volume}
              marketcap={val.market_cap} 
              priceChange={val.price_change_percentage_24h}
              />
          )
        })
       }
    </div>
  );
}

export default Card;