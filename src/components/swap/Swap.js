/* eslint-disable */

import NavBar from "../navbar/Navbar"
import Sidebar from "../portfolio/Sidebar"
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import colorSharp from "./../../assets/img/color-sharp.png";
import CoinSelectorPopUp from "./CoinSelector"
import Typography from '@mui/material/Typography';
import axios from "axios";
import { FixedSizeList } from 'react-window';
import { Navigate } from "react-router-dom"
import { FormHelperText } from "@mui/material";

const Swap = () => {

    const [firstCoin, setFirstCoin] = useState()
    const [quantity, setQuantity] = useState(0.0)
    const [secondCoin, setSecondCoin] = useState()
    const [value, setValue] = useState({ loading: false, value: '0.0' })
    const [openPopUp, setOpenPopUp] = useState({ open: false, who: '' })
    const [timeID, setTimeID] = useState()
    const [status, setStatus] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        calculateValue()
    }, [firstCoin, secondCoin, quantity])

    const handleChange = (e) => {
        clearTimeout(timeID)

        let value = e.target.value
        console.log("value is: " + value)
        if (value <= 0 || value === '') {
            setValue({ loading: false, value: '0.0' })
            setQuantity('0.0')
            return;
        }

        let id = setTimeout(() => {
            setQuantity(value)
        }, 500);

        setTimeID(id);
    }

    const handleSelectButton = (e, who) => {
        setOpenPopUp({ open: true, who: who });
    }

    const popUpCallback = (e) => {

        if (e === undefined || e === null) {        // X is pressed
            setOpenPopUp({ open: false, who: '' });
            return;
        }

        let coin = e.coin;
        let who = e.who;

        setOpenPopUp({ open: false, who: '' }); // First disable open
        console.log(coin)

        who === 'first' ? setFirstCoin(coin) : setSecondCoin(coin)
    }

    const calculateValue = () => {
        if (firstCoin === undefined || secondCoin === undefined) return;
        if (quantity <= 0) return;

        axios.get("http://localhost:8080/api/tools/convert", {
            headers: { 'Access-Control-Allow-Origin': '*' },
            auth: { username: sessionStorage.getItem("username"), password: sessionStorage.getItem("password") },
            params: { from: firstCoin.id, to: secondCoin.id, amount: quantity }
        }).then((response) => {
            console.log(response)
            setValue({ loading: false, value: response.data.data.price.toFixed(10) })
        }).catch((e) => console.log(e));
    }

    const selectCoinFunction = (who) => {
        let innerCoin = who === 'first' ? firstCoin : secondCoin;

        if (innerCoin === undefined || innerCoin === null)
            return (
                <SelectCoinButton onClick={e => handleSelectButton(e, who)}>
                    Select token
                    <AiOutlineDown size={16} />
                </SelectCoinButton>
            )

        return (
            <SelectedCoinButton onClick={e => handleSelectButton(e, who)}>
                <img src={innerCoin.marketData.image} alt={innerCoin.id} style={{ height: 25, width: 25 }} />
                <TypoMargins>
                    <Typography variant="body1" display="block" style={{ color: 'white' }}>{innerCoin.symbol}</Typography>
                </TypoMargins>
                <AiOutlineDown size={16} />
            </SelectedCoinButton>
        )
    }

    const swapNowHandler = () => {
        if (firstCoin === undefined || secondCoin === undefined) return;
        if (quantity <= 0 || value <= 0) return;

        axios.post("http://localhost:8080/api/trade", null, {
            headers: { 'Access-Control-Allow-Origin': '*' },
            auth: { username: sessionStorage.getItem("username"), password: sessionStorage.getItem("password") },
            params: { from: firstCoin.id, to: secondCoin.id, amount: quantity }
        })
            .then((data) => {
                console.log(data)
                console.log(data.data.status.error_message)

                if (data.data.status.error_message.length > 0) {
                    settingError(data.data.status.error_message)
                } else {
                    setFirstCoin(undefined)
                    setSecondCoin(undefined)
                    setQuantity(0)
                    setStatus(true)
                }
            }).catch((e) => settingError(e));
    }

    const settingError = (msg) => {
        setError(msg)
        setTimeout(() => {
            setError(undefined)
        }, 5000);
    }

    if (sessionStorage.getItem("username") === null) {
        return <Navigate to="/"></Navigate>
    }

    if (status === true)
        return <Navigate to="/portfolio" />

    return (
        <>
            <img className="background-image-left" src={colorSharp} alt="Image" />
            <NavBar></NavBar>
            <Wrapper>
                <Sidebar />
                <Container>
                    <InnerContainer>
                        <SwapContainer>
                            <TitleContainer>
                                <Title>Swap</Title>
                                <InnerSwapContainer>
                                    <FirstSwap>
                                        <SwapsInnerContainer>
                                            <SwapInput
                                                placeholder='0.0'
                                                onChange={e => handleChange(e)}
                                            />
                                            {selectCoinFunction('first')}
                                        </SwapsInnerContainer>
                                    </FirstSwap>
                                    <SecondSwap>
                                        <SwapsInnerContainer>
                                            <SwapInput
                                                placeholder='0.0'
                                                readOnly
                                                value={value.value}
                                            />
                                            {selectCoinFunction('second')}
                                        </SwapsInnerContainer>
                                    </SecondSwap>
                                    {!error ? null : <FormHelperText error>{error}</FormHelperText>}
                                    <SwapButton onClick={swapNowHandler}>
                                        Swap Now
                                    </SwapButton>
                                </InnerSwapContainer>
                            </TitleContainer>
                        </SwapContainer>
                    </InnerContainer>
                </Container>
            </Wrapper>
            <CoinSelectorPopUp
                open={openPopUp.open}
                who={openPopUp.who}
                selected={[
                    ((firstCoin === undefined) ? undefined : firstCoin.id),
                    ((secondCoin === undefined) ? undefined : secondCoin.id)]
                }
                callback={popUpCallback}
            />
        </>
    )
}

export default Swap

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 100%;
  margin-top: 130px;x
`

const Container = styled.div`
    margin-top: 30px;
    height: 400px;
    width: 1200px;
`

const InnerContainer = styled.div`
    margin-left: 240px;
    margin-right; 350px;
    margin-top: 50px;
    margin-bottom: 50px;
`

const SwapContainer = styled.div`
    background-color: rgb(25, 27, 31);
    width: 480px;
    min-height: 300px;
    border-radius: 20px;
    border: 1px solid transparent;
    box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px;
`

const TitleContainer = styled.div`
    padding: 1rem 1.25rem 0.5rem;
    width: 100%;
    color: white;
`

const Title = styled.h5`
    color: #8a919e;
    font-size: 1.2rem;
`

const InnerSwapContainer = styled.div`
    padding: 8px;
`

const FirstSwap = styled.div`
    width: 100%;
    height: 75px;
    background-color: rgb(33, 36, 41);
    border-radius: 20px;
    transition: transform 450ms ease 0s;
    border: 0.2px solid transparent;
    
    &:hover {
        border: 0.2px solid gray;
    }
`

const SecondSwap = styled.div`
    margin-top: 10px;
    width: 100%;
    height: 75px;
    background-color: rgb(33, 36, 41);
    border-radius: 20px;
    border-width: 4px;
    order-style: solid;
    transition: transform 450ms ease 0s;
    border: 0.2px solid transparent;
    
    &:hover {
        border: 0.2px solid gray;
    }

`

const SwapButton = styled.button`
    margin-top: 15px;
    color: rgb(80, 144, 234);
    border-radius: 20px;
    background-color: rgba(21, 61, 111, 0.44);
    height: 50px;
    width: 100%;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    vertical-align: middle;
    box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px;
    transition: transform 2s ease 2s;

    &:hover {
        background-color: rgba(21, 61, 111, 0.36);
      }

`

const SwapsInnerContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    -moz-box-align: center;
    align-items: center;
    -moz-box-pack: justify;
    justify-content: space-between; 
    padding: 1rem;
`

const SwapInput = styled.input`
    background: transparent;
    border: none;
    border-radius: 3px;
    font-size: 26px;
    width: 250px;
`

const SelectCoinButton = styled.button`
    background-color: rgb(33, 114, 229);
    border-radius: 20px;
    font-size: 18px;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    width: 150px;
    height: 38px;
    transition: transform 2s ease 2s;

    &:hover {
        background-color: rgb(33, 114, 229, 0.8);
      }
`

const SelectedCoinButton = styled.button`
    background-color: rgb(44, 47, 54);
    display: inline-flex;
    align-items: center;
    border-radius: 20px;
    font-size: 18px;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    width: 100px;
    height: 38px;
    transition: transform 2s ease 2s;

    &:hover {
        background-color: rgb(64, 68, 79);
      }
`

const TypoMargins = styled.div`
      margin-left: 5px;
      margin-right: 5px;
`

const CoinButton = styled.button`
    background-color: rgb(44, 47, 54);
    border-radius: 20px
`
