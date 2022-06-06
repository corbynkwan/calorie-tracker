import {Box, Button, Container, Grid, Paper, styled, Typography} from "@material-ui/core";
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function RestaurantCard(){


    return (
        <Container maxWidth={"md"}>
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
                        <Container disableGutters  sx={{ width: 128, height: 128}}>
                            <Img alt="complex" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/220px-VAN_CAT.png" />
                        </Container>
                    </Grid>
                    <Grid item xs={2} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    Cat Restaurant
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    address..
                                </Typography>
                                <Typography variant="body2" >
                                    Description&map...
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                    <Button>
                                        Add Item
                                    </Button>
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