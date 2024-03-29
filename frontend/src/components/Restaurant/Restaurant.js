import {Box, Button, Container, Grid, Paper, styled, makeStyles, Typography} from "@material-ui/core";
import { Link } from "react-router-dom";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function RestaurantCard(props){

    const {name,address,logo,desc,restaurant_id} = props.restaurant
    return (
        <Container maxWidth={"sm"}>
            <Paper
            style={{
                borderRadius: '10px',
                marginBottom: '25px',
                boxShadow: "rgb(28 28 28 / 15%) 0px 2px 8px",
            }}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <Container disableGutters  sx={{ width: 150, height: 128}}>
                            <div alt="complex" style={
                                {
                                    backgroundImage: `url(${logo})`,
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
                                <Typography gutterBottom variant="subtitle1" component="div" style={{fontFamily: 'Poppins'}}>
                                    <b>{name}</b>
                                </Typography>
                                <Typography variant="body2" gutterBottom style={{fontFamily: 'Poppins'}}>
                                    {address}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ cursor: 'pointer' }} variant="body2" style={{fontFamily: 'Poppins'}}>
                                    <Link to={`/restaurant?id=${restaurant_id}`} style={{ textDecoration: 'none' }}>
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