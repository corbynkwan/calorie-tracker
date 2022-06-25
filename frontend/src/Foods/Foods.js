import {Button, Container, Grid, Paper, styled, Typography} from "@material-ui/core";
import {Img} from "../Restaurant/Restaurant";
import {Food} from "./Food"
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
           </Paper>
       </Container>
   )
}



export {Foods};