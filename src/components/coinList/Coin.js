import styled, { css, keyframes } from 'styled-components'
import MiniChart from "./MiniChart";
import NumberFormat from "react-number-format";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
// import Icon from 'react-crypto-icons'

const updated = new Map();

const Coin = ({ coin }) => {
  const [history, setHistory] = useState([]);
  const [value, setValue] = useState(null);
  const [lastValue, setLastValue] = useState(0);

  const basePrice = coin.marketData.current_price / Math.abs(coin.marketData.market_cap_change_percentage_24h);

  const calculateActualChangePercent = () => {
    let aux = value / basePrice;

    return (coin.marketData.market_cap_change_percentage_24h) ? aux.toFixed(5) : aux.toFixed(5) * -1;
  }

  const getChangePercent = () => {
    return value ? calculateActualChangePercent() : coin.marketData.market_cap_change_percentage_24h;
  }

  const getData = async () => {
    axios.get(
      "http://localhost:8080/api/assets/getHistory?id=" + coin.id + "&vs_currency=usd&days=7", {
      headers: { "Access-Control-Allow-Origin": "*" },
      auth: { username: "sergio.bernal", password: "1234" },
    }
    ).then((res) => {
      console.log(res.data)
      setHistory(res.data);
    })
  };

  useEffect(() => {
    getData();

    const socket = SockJS('http://localhost:8080/wss');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe('/crypto/' + coin.id, (data) => {
        let json = JSON.parse(data.body);
        setValue(prevState => {
          setLastValue(prevState)
          return json.price
        })
      });
    }); 

    return () => stompClient.disconnect(() => { })
  }, []);

  let actualChange24 = getChangePercent();

  return (
    <Wrapper>
      <div>
        <div style={{ flex: 0.6 }}></div>
        <div style={{ flex: 1.4 }}>
          <NameCol>
            <CoinIcon>
              <img src={coin.marketData.image} alt={coin.id} />
            </CoinIcon>
            <div>
              <Primary>{coin.symbol}</Primary>
              <Secondary>{coin.name}</Secondary>
            </div>
          </NameCol>
        </div>
        <div style={{ flex: 2 }}>
          <Primary>
            <NumberFormat
              value={value === null ? coin.marketData.current_price : value}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              key={Math.random()}
              className={value >= lastValue ? "upAnimationContainer" : "downAnimationContainer"}
            />
          </Primary>
          <div
            style={{
              color:
                actualChange24 < 0 ? "#f0616d" : "#26ad75",
            }}
          >
            {actualChange24 > 0 && "+"}
            {actualChange24}%
          </div>
        </div>
        <div style={{ flex: 2 }}>
          <NumberFormat
            value={coin.marketData.market_cap}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </div>
        <div style={{ flex: 2 }}>
          <MiniChart history={history} />
        </div>
      </div>
    </Wrapper>
  );
};

function formatPrice(price) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export default Coin;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }

  &:hover {
    background-color: #0e0f14;
    cursor: pointer;
  }
`;

const NameCol = styled.div`
  display: flex;
  align-items: center;
`;

const CoinIcon = styled.div`
  width: 1.8rem;
  margin-right: 1rem;
`;

const Primary = styled.div`
  margin-bottom: 0.1rem;
`;

const Secondary = styled.div`
  color: #8a919e;
  font-size: 0.8rem;
`;
