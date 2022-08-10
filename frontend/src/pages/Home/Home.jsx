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
import HeaderWithSearch from "../../components/HeaderWithSearch/HeaderWithSearch";

// *Exported JSX Page Component

function Home(props) {
  return (
    <div className="Home">
      <HeaderWithSearch user={props.user} logout={props.logout}/>
      <Summary user={props.user} />
      <Recommended user={props.user} />
      <Restaurants user={props.user} />
     
    </div>
  );
}

export default Home;
