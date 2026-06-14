import { useState, useEffect } from "preact/hooks";
import "../styles/Home.css";

const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

const FALLBACK_IMG = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80";

type Article = {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: { name: string };
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&max=7&apikey=${GNEWS_API_KEY}`)
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((data) => {
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        } else {
          setError("No articles returned.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("failed");
        setLoading(false);
      });
  }, []);

  const featured = articles[0];
  const related = articles.slice(1, 3);
  const grid = articles.slice(3, 7);

  if (loading) {
    return (
      <div className="home">
        <div className="home-loading">
          <div className="loading-bar" />
          <p>Loading latest news…</p>
        </div>
      </div>
    );
  }

  if (error || articles.length === 0) {
    return (
      <div className="home">
        <div className="home-error">
          <p>Could not load news. Please add your GNews API key in <code>Home.tsx</code>.<br />
          Get a free key at <a href="https://gnews.io" target="_blank" rel="noreferrer">gnews.io</a></p>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <hr className="home-divider" />
      <div className="home-featured">
        <div className="featured-content">
          <span className="featured-source">{featured.source.name}</span>
          <h1 className="featured-headline">
            <a href={featured.url} target="_blank" rel="noreferrer">{featured.title}</a>
          </h1>
          <p className="featured-dek">{featured.description}</p>
          <hr className="home-divider-thin" />
          {related.map((r, i) => (
            <div key={i} className="related-story">
              <span className="clock-icon">🕐</span>
              <p className="related-story-text">
                <strong>{timeAgo(r.publishedAt)}:</strong>{" "}
                <a href={r.url} target="_blank" rel="noreferrer">{r.title}</a>
              </p>
            </div>
          ))}
        </div>
        <div className="featured-image-wrap">
          <img src={featured.image || FALLBACK_IMG} alt={featured.title} onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }} />
        </div>
      </div>
      <hr className="home-divider" />
      <div className="home-grid">
        {grid.map((s, i) => (
          <div key={i} className="story-card">
            <a href={s.url} target="_blank" rel="noreferrer">
              <img
                src={s.image || FALLBACK_IMG}
                alt={s.title}
                className="story-card-image"
                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
              />
            </a>
            <span className="story-card-source">{s.source.name}</span>
            <h2 className="story-card-headline">
              <a href={s.url} target="_blank" rel="noreferrer">{s.title}</a>
            </h2>
            <div className="story-card-meta">
              <span>🕐</span>
              <span>{timeAgo(s.publishedAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}