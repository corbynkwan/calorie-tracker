import * as React from "react";
import { Paper} from "@mui/material";
import Header from "../Header";
import Footer from "../Footer";
import CustomFoodGrid from "./CustomFoodGrid";
export default function CustomFoodPage() {
  return (
    <>
      <Header />
       <Paper
        sx={{
          p: 2,
          minWidth: 600,
        }}
      >
        <CustomFoodGrid />
      </Paper>
       <Footer />
    </>
  );
}
