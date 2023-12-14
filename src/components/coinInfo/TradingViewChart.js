
import TradeViewChart from "react-crypto-chart";
import { useEffect, useState } from "react";

const TradingViewChart = ({symbol}) => {

    useEffect(() => {
    }, [])

    return (
        <TradeViewChart
            containerStyle={{
                minHeight: "300px",
                minWidth: "400px",
                marginBottom: "30px",
            }}
            pair={symbol.toUpperCase() + "USDT"}
            chartLayout={{
                layout: {
                    backgroundColor: "transparent",
                    textColor: "white",
                },
                grid: {
                    vertLines: {
                        color: "#838fa3",
                    },
                    horzLines: {
                        color: "#838fa3",
                    },
                },

                priceScale: {
                    borderColor: "#485c7b",
                },
                timeScale: {
                    borderColor: "#485c7b",
                    timeVisible: true,
                    secondsVisible: false,
                },
            }}
            candleStickConfig={{
                upColor: "red",
                borderDownColor: "transparent",
                borderUpColor: "transparent",
            }}
        />
    )
}

export default TradingViewChart;