import { truncate } from "lodash-es";

export default function TopSitesList({ site }) {
  return (
    <a href={site.url} className="topSitesItem" title={site.title}>
      <div className="favicon">
        <img src={getFaviconUrl(site.url)} width="48" height="48" />
      </div>

      <div className="title">{getShortTitle(site.title)}</div>
    </a>
  );
}

function getFaviconUrl(url, size = 96) {
  const faviconUrl = new URL("https://icons2.mavii.com/");
  const { origin } = new URL(url);

  faviconUrl.searchParams.set("url", origin);
  faviconUrl.searchParams.set("size", size);

  return faviconUrl.toString();
}

function getShortTitle(title) {
  let shortTitle = title.split(/[·|]/).reduce((shortest, segment) => {
    return segment.length < shortest.length ? segment : shortest;
  });

  shortTitle = shortTitle.trim();
  shortTitle = truncate(shortTitle, {
    length: 14,
    separator: /[\s,\.—\/]/,
    omission: "",
  });

  // Trim punctuation from the end of the title
  shortTitle = shortTitle.replace(/[\s,\.—\/]+$/, "");

  return shortTitle;
}

function getHostname(url) {
  let { hostname } = new URL(url);

  hostname = hostname.replace("www.", "");
  hostname = hostname.split(".").slice(0, -1).join(".");

  return hostname;
}
