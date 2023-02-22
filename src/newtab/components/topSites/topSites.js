import { useState, useEffect } from "react";
import TopSitesItem from "./topSitesItem";
import "./topSites.scss";

export default function TopSitesList({ topSites }) {
  const [sites, setSites] = useState(null);

  useEffect(() => {
    chrome.topSites.get((data) => {
      setSites(data.slice(0, 6));
    });
  }, []);

  return (
    <div className="topSitesList">
      {sites && sites.map((site) => <TopSitesItem site={site} />)}
    </div>
  );
}
