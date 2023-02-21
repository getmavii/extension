export default function TopSitesList({ site }) {
  return (
    <a href={site.url} className="topSitesItem">
      <div className="favicon">
        <img src={getFaviconUrl(site.url)} width="36" height="36" />
      </div>

      <div className="title">{getHostName(site.url)}</div>
    </a>
  );
}

function getFaviconUrl(url) {
  const faviconUrl = new URL(chrome.runtime.getURL("/_favicon/"));

  faviconUrl.searchParams.set("pageUrl", url);
  faviconUrl.searchParams.set("size", "36");

  return faviconUrl.toString();
}

function getHostName(url) {
  const hostName = new URL(url).hostname;

  return hostName.replace("www.", "");
}
