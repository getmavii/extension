import "./assets/css/app.scss";
import TopSites from "./components/topSites/topSites";
import SearchBox from "./components/searchBox/searchBox";

export function App() {
  const logoUrl = new URL("./assets/images/logo.svg", import.meta.url);

  return (
    <div className="content">
      <img src={logoUrl} alt="Mavii logo" className="logo" />
      <SearchBox placeholder="Search the web" />
      <TopSites />
    </div>
  );
}
