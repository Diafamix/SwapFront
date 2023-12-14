import { Dialog } from "@material-ui/core"
import styled from 'styled-components'
import List from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState, useEffect } from "react";
import axios from "axios";
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { withStyles } from "@material-ui/core/styles";
import { ImCross } from 'react-icons/im'

const CoinSelector = ({ open, who, selected, callback }) => {
    const [coins, setCoins] = useState();

    const fetchCoins = () => {
        axios.get("http://localhost:8080/api/markets", {
            headers: { 'Access-Control-Allow-Origin': '*', },
            auth: { username: sessionStorage.getItem("username"), password: sessionStorage.getItem("password") }
        }).then((response) => {
            setCoins(response.data.data)
        }).catch((e) => console.log(e));
    }

    useEffect(() => {
        if (open === false) return // If is not open, doesn't make sense to fetch data
        fetchCoins()
    }, [open])

    const paperProps = ({ style: { backgroundColor: 'transparent' } })
    const imgStyle = { position: 'absolute', top: 15, left: 20, height: 25, width: 25 };
    const ListItem = withStyles({
        root: {
          "&:hover": {
            backgroundColor: "rgb(44, 47, 54)",
            color: "white",
            "& .MuiListItemIcon-root": {
              color: "white"
            }
          }
        },
        selected: {}
      })(MuiListItem);

    return (
        <>
            <Dialog open={open} PaperProps={paperProps}>
                <Wrapper>
                    <TitleContainer>
                        <Typography variant="body1" display="block" style={{ color: '#8a919e' }}>Select a token</Typography>
                        <ImCross onClick={() => callback(null)} size={15} style={{ position: 'absolute', right: 30, top: 25, cursor: 'pointer' }}/>
                    </TitleContainer>
                    <Divider></Divider>
                    {(coins === null || coins === undefined) ? <LinearProgress /> :
                        <List dense={true} sx={{ maxHeight: '420px', overflow: 'auto' }}>
                            {coins.map(coin => (
                                <ListItem  style={{cursor: 'pointer'}} onClick={(e) => callback({coin: coin, who: who})}>
                                    <ListItemIcon>
                                        <img src={coin.marketData.image} alt={coin.name} style={imgStyle} />
                                    </ListItemIcon>
                                    <ListItemText
                                        disableTypography
                                        primary={<Typography variant="body2" display="block" style={{ color: 'white' }}>{coin.name}</Typography>}
                                        secondary={<Typography variant="caption" display="block" style={{ color: '#8a919e' }}>{coin.symbol}</Typography>}
                                    />
                                </ListItem>
                            ))
                            }
                        </List>
                    }
                </Wrapper>
            </Dialog>
        </>
    )

}

export default CoinSelector;

const Wrapper = styled.div`
    background-color: rgb(25, 27, 31);
    border: 1px solid rgb(33, 36, 41);
    max-height: 100%;
    width: 420px;
    border-radius: 20px;
`

const TitleContainer = styled.div`
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 15px;
    height: 30px;
    color: white;
    align-items: flex-start;
    display: flex;
    justifyContent: space-between;
    space-between-
    flex-direction: row;
`

const Title = styled.h5`
    color: #8a919e;
`

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`;