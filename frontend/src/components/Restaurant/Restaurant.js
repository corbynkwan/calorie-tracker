import {Box, Button, Container, Grid, Paper, styled, Typography} from "@material-ui/core";
import { Link } from "react-router-dom";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function RestaurantCard(props){

    const openPopUp = () => {
        window.scrollTo({ top: 0, left: 0});
        document.querySelector('.item-selection-popout').style.display = 'unset';
        document.querySelector('.popout-wrapper').style.display = 'flex';
        document.querySelector('body').style.overflowY = 'hidden';
    }
    const {name,address,thumbnail,desc} = props.restaurant
    return (
        <Container maxWidth={"sm"}>
            <Paper
                sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <Container disableGutters  sx={{ width: 150, height: 128}}>
                            <div alt="complex" style={
                                {
                                    backgroundImage: `url(${thumbnail})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: "center center",
                                    width: 150,
                                    height: 128
                                }
                            }></div>
                        </Container>
                    </Grid>
                    <Grid item xs={2} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    {name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {address}
                                </Typography>
                                <Typography variant="body2" >
                                    {desc}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                    <Link to="/restaurant" style={{ textDecoration: 'none' }}>
                                        <Button>
                                            See Menu
                                        </Button>
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
export{Img}