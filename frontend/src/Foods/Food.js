import {Button, Container, Grid, Paper, styled, Typography} from "@material-ui/core";
import {Img} from "../Restaurant/Restaurant";

export function Food(props){
    const {name,calories} = props.food
    return (
            <Paper>
                <Grid container direction={"column"}>
                    <Grid item>
                        <Container disableGutters>
                            <Img alt="complex" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Cat_and_Cat_Foods.jpg/580px-Cat_and_Cat_Foods.jpg" />
                        </Container>
                    </Grid >
                        <Grid container item xs={12} direction="column" spacing={2} alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                   {name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                   {calories}
                                </Typography>
                                <Typography variant="body2" >
                                    My fat cat love it.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                    <Button >
                                        Add this item
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>

                </Grid>
            </Paper>
    )

}