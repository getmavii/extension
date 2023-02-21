import "./assets/css/app.scss";
import TopSitesList from "./components/topSites/list";
import SearchBox from "./components/searchBox";

export function App() {
  return (
    <div className="content">
      <h1>Mavii</h1>
      <SearchBox placeholder="Search the web" />
      <TopSitesList />
    </div>
  );
}
