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

function getFaviconUrl(url) {
  const faviconUrl = new URL("https://icons2.mavii.com/");
  const { origin } = new URL(url);

  faviconUrl.searchParams.set("url", origin);
  faviconUrl.searchParams.set("size", "96");

  return faviconUrl.toString();
}

function getShortTitle(title) {
  // Split by common delimiters and return shorter segment
  const segments = title.split(/[·|]/);
  const shortestSegment = segments.reduce((shortest, segment) => {
    return segment.length < shortest.length ? segment : shortest;
  });

  return shortestSegment.trim();
}

function getHostname(url) {
  let { hostname } = new URL(url);

  hostname = hostname.replace("www.", "");
  hostname = hostname.split(".").slice(0, -1).join(".");

  return hostname;
}
