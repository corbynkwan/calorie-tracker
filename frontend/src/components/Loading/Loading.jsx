import "./Loading.css";
import loadingImg from "../../assets/images/alpha_loading.svg";

export default function Loading() {
  return (
    <section className="loading">
      <img src={loadingImg} alt="the application is loading, please wait..."></img>
    </section>
  );
}
