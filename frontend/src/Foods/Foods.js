import {Button, Container, Grid, Paper, styled, Typography} from "@material-ui/core";
import {Img} from "../Restaurant/Restaurant";

export default function Foods() {

   return(
       <Container maxWidth={"md"}>
           <Paper>
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
                       </Grid>
                   </Grid>
               </Grid>

           <Grid container  spacing={2}>
               <Grid container item  spacing={2}>
                   <Grid item xs={3} > <Food></Food></Grid>
                   <Grid item xs={3} > <Food></Food></Grid>
                   <Grid item xs={3} > <Food></Food></Grid>
                   <Grid item xs={3} > <Food></Food></Grid>
               </Grid>
               <Grid container item  spacing={2}>
                   <Grid item xs={3} > <Food></Food></Grid>
                   <Grid item xs={3} > <Food></Food></Grid>
                   <Grid item xs={3} > <Food></Food></Grid>
                   <Grid item xs={3} > <Food></Food></Grid>
               </Grid>
           </Grid>
           </Paper
              >
       </Container>
   )
}

function Food(props){

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
                                    Cat Food
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                   1000 Cal
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

export {Food,Foods};