import {Box, Button, Container, Grid, Paper, styled, Typography} from "@material-ui/core";

export default function ItemSelectionComponent() {
   return(
       <Grid container direction={"column"}>
           <Grid container direction={"row"}>
               <Grid item xs={3} spacing={1}> <ItemCard></ItemCard></Grid>
               <Grid item xs={3} spacing={1}> <ItemCard></ItemCard></Grid>
               <Grid item xs={3} spacing={1}> <ItemCard></ItemCard></Grid>
               <Grid item xs={3} spacing={1}> <ItemCard></ItemCard></Grid>
           </Grid>
           <Grid container direction={"row"}>
               <Grid item xs={3} spacing={1}> <ItemCard></ItemCard></Grid>
               <Grid item xs={3} spacing={1}> <ItemCard></ItemCard></Grid>
               <Grid item xs={3} spacing={1}> <ItemCard></ItemCard></Grid>
               <Grid item xs={3} spacing={1}> <ItemCard></ItemCard></Grid>
           </Grid>
       </Grid>

   )
}

function ItemCard(){
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    return (
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
                <Grid item direction={"column"}>
                    <Grid item>
                        <Container disableGutters  sx={{ width: 128, height: 128}}>
                            <Img alt="complex" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/220px-VAN_CAT.png" />
                        </Container>
                    </Grid>
                        <Grid item xs container direction="column" spacing={2}>
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
                                    <Button>
                                        Add Item
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>

                </Grid>
            </Paper>
    )

}

export {ItemCard,ItemSelectionComponent};