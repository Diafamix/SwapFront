import styled from "styled-components";
import NavBar from "../navbar/Navbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import axios from "axios";
import MiniChart from "../coinList/MiniChart";
import { useParams } from "react-router";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import TradingViewChart from "./TradingViewChart";

const CoinInfo = () => {
  const [metadata, setMetadata] = useState(null);
  const { coin } = useParams();
  const [price, setPrice] = useState(0.0);

  console.log(coin);

  useEffect(() => {
    fetchGrahp();
  }, []);

  console.log(price);
  const fetchGrahp = () => {
    axios
      .get("http://localhost:8080/api/assets/" + coin, {
        headers: { "Access-Control-Allow-Origin": "*" },
        auth: { username: "Front-admin", password: "1234" },
      })
      .then((data) => {
        console.log(data);
        setMetadata(data.data.data);
      });
  };

  const imgStyle = { height: 40, width: 40 };
  console.log(metadata);

  if (metadata === null) {
    return null;
  }

  return (
    <>
      <NavBar></NavBar>
      <Wrapper>
        <TitleContainer>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FirstTitleContainer>
                <img src={metadata.image} style={imgStyle} />
                <Typography
                  variant="h4"
                  display="block"
                  style={{
                    color: "white",
                    marginLeft: "20px",
                    marginTop: "1px",
                    fontWeight: "bold",
                  }}
                >
                  {metadata.name}
                </Typography>
                <SymbolContainer>
                  <Typography
                    variant="body1"
                    display="block"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginTop: "12px",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  >
                    {metadata.symbol.toUpperCase()}
                  </Typography>
                </SymbolContainer>
              </FirstTitleContainer>
            </Grid>
          </Grid>
        </TitleContainer>

        <SecondPart>
          <ChartContainer>
            <Typography
              variant="h5"
              display="block"
              style={{ color: "white", fontWeight: "bold" }}
            >
              {metadata.name} to USD Chart
            </Typography>
            <ActualChartContainer>
              <TradingViewChart symbol={metadata.symbol} />
              {/* <MiniChart history={history} /> */}
            </ActualChartContainer>
          </ChartContainer>

          <DescriptionContainer>
            <Typography
              variant="h5"
              display="block"
              style={{ color: "white", fontWeight: "bold" }}
            >
              What Is {metadata.name} ({metadata.symbol.toUpperCase()})?
            </Typography>

            <Typography
              variant="body1"
              style={{
                color: "#8a919e",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: metadata.description }} />
            </Typography>
          </DescriptionContainer>
        </SecondPart>
      </Wrapper>
    </>
  );
};

export default CoinInfo;

const Wrapper = styled.div`
  padding-left: 80px;
  padding-right: 80px;
  margin-top: 10px;
`;

const TitleContainer = styled.div`
  margin-left: 60px;
  margin-right: 60px;
  color: white;
`;

const FirstTitleContainer = styled.div`
  display: flex;
  margin-top: 70px;
`;

const SecondTitleContainer = styled.div`
  display: flex;
`;

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`;

const SymbolContainer = styled.div`
  margin-left: 15px;
  border-radius: 20px;
  text-align: center;
  background-color: #495057;
`;

const SecondPart = styled.div`
  background-color: #181a20;
  border-top-left-radius: 80px;
  border-top-right-radius: 80px;
  margin-top: 30px;
  margin-top: 80px;
  padding-top: 1px;
  padding-bottom: 100px;
`;

const NegativeContainer = styled.div`
  display: flex;
  margin-left: 15px;
  border-radius: 20px;
  text-align: center;
  background-color: #ea3943;
`;

const PositiveContainer = styled.div`
  display: flex;
  margin-left: 15px;
  border-radius: 20px;
  text-align: center;
  background-color: #16c784; ;
`;

const ChartContainer = styled.div`
  margin-top: 60px;
  margin-left: 60px;
  margin-right: 60px;
`;

const DescriptionContainer = styled.div`
  margin-top: 60px;
  margin-left: 60px;
  margin-right: 60px;
`;

const ActualChartContainer = styled.div`
  border: 1px solid #282b2f;
  margin-top: 30px;
  padding: 1rem 2rem;
`;
