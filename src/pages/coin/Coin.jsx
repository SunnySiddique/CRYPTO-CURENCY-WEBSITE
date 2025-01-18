import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LineChart from "../../components/lineChart/LineChart";
import { useCoinData } from "../../context/CoinContext";
import "./Coin.css";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null); // Initialize as null
  const [historicalData, setHistoricalData] = useState(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(true);

  const { currency } = useCoinData();

  const fetchCoinData = async () => {
    try {
      setIsLoading(true);
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-kBJ2sozNLx3zRgXTCLdj2WPx",
        },
      };

      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );
      const data = await res.json();
      setCoinData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHistoricalData = async () => {
    setIsLoading(true);
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-kBJ2sozNLx3zRgXTCLdj2WPx",
        },
      };

      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      );
      const data = await res.json();
      setHistoricalData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (isLoading) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  if (!coinData) {
    return <div>Error: Unable to fetch coin data.</div>;
  }

  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image.large} alt={coinData.name} />
        <p>
          <b>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </b>
        </p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>

      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>
            {currency.symbol}{" "}
            {coinData.market_data.current_price[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>
            {currency.symbol}{" "}
            {coinData.market_data.market_cap[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hour High</li>
          <li>
            {currency.symbol}{" "}
            {coinData.market_data.high_24h[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hour Low</li>
          <li>
            {currency.symbol}{" "}
            {coinData.market_data.low_24h[currency.name].toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
