import {Button, Container, Grid, Paper, styled, Typography} from "@material-ui/core";
import {Img} from "../../components/Restaurant/Restaurant";

function getCalories(calories) {
    if(calories)
        return (
            <Typography variant="body2" gutterBottom>
                {calories} Cals
            </Typography>
        );
    else
        return(
            <Typography variant="body2" gutterBottom>
                Missing Calorie Data
            </Typography>
        )
}

export function Food(props){
    const {name,calories,thumbnail,from} = props.food
    return (
            <Paper>
                <Grid container direction={"column"}>
                    <Grid item>
                        <Container disableGutters>
                        <div alt="complex" style={
                            {
                                backgroundImage: `url(${thumbnail})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: "center center",
                                width: '100%',
                                height: 200
                            }
                        }></div>
                        </Container>
                    </Grid >
                        <Grid container item xs={12} direction="column" spacing={2} alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                   {name}
                                </Typography>
                                {getCalories(calories)}
                                <Typography variant="body2" >
                                    {from}
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