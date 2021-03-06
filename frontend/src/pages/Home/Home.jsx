/*
 *Homepage
 */

// *Dependencies

/* styles */
import "./Home.css";

/* components */
import Summary from "../../components/Summary/Summary";
import Recommended from "../../components/Recommended/Recommended";
import Restaurants from "../../components/Restaurants/Restaurants";
import GoogleMap from "../../components/GoogleMap/GoogleMap";

// *Exported JSX Page Component

function Home(props) {
  return (
    <div className="Home">
      <Summary user={props.user} />
      <Recommended user={props.user} />
      <GoogleMap />
      <Restaurants user={props.user} />
     
    </div>
  );
}

export default Home;
