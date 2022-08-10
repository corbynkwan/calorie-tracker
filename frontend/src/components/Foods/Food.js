import {Button, Container, Grid, Paper, styled, Typography} from "@material-ui/core";
import {Img} from "../../components/Restaurant/Restaurant";
import {postUserLog} from "../../store/userSlice";
import {useDispatch} from "react-redux";
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
    console.log(props.food)
    const {name,calories,protein,carbs,fat,thumbnail,from} = props.food
    const dispatch = useDispatch();

    return (
            <Paper style={{borderRadius: '15px', boxShadow: `boxShadow: "rgb(28 28 28 / 15%) 0px 2px 8px`}}>
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
                                height: 200,
                                borderRadius: '15px 15px 0px 0px'
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
                                    <Button onClick={(event) => {dispatch(postUserLog({name,calories,fat,carbs,protein}));alert("Food added!")}}>
                                        Add this item
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>

                </Grid>
            </Paper>
    )

}