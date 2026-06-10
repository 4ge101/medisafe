import "../styles/Home.css";

const featuredStory = {
  headline: "She Faced a Life-Threatening Crisis. Under the New Laws, Even Calls to Officials Didn't Help.",
  dek: "Women are still denied care during dangerous emergencies in states with restrictive laws. One state reformed its policy in an effort to fix that. Most others haven't tried.",
  image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
  related: [
    { age: "2 Years Ago", text: "Emergency Bans Have Delayed Medical Care. Experts Say This Mother's Death Was Preventable." },
    { age: "2 Years Ago", text: "Their States Banned the Procedure. Doctors Now Say They Can't Give Women Potentially Lifesaving Care." },
  ],
};

const gridStories = [
  {
    headline: "Lawmakers Ask Justice Watchdog to Investigate Drugs-for-Votes Scheme",
    meta: "3 Weeks Ago",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80",
  },
  {
    headline: "The Hidden Network of Shell Companies Behind the City's Biggest Land Deals",
    meta: "5 Days Ago",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  },
  {
    headline: "Federal Contracts Worth Billions Were Awarded Without Competitive Bidding",
    meta: "1 Week Ago",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
  },
];

export default function Home() {
  return (
    <div className="home">
      <hr className="home-divider" />
      <div className="home-featured">
        <div className="featured-content">
          <h1 className="featured-headline">
            <a href="/investigations">{featuredStory.headline}</a>
          </h1>
          <p className="featured-dek">{featuredStory.dek}</p>
          <hr className="home-divider-thin" />
          {featuredStory.related.map((r, i) => (
            <div key={i} className="related-story">
              <span className="clock-icon">🕐</span>
              <p className="related-story-text">
                <strong>{r.age}:</strong> {r.text}
              </p>
            </div>
          ))}
        </div>
        <div className="featured-image-wrap">
          <img src={featuredStory.image} alt="Featured story" />
        </div>
      </div>
      <hr className="home-divider" />
      <div className="home-grid">
        {gridStories.map((s, i) => (
          <div key={i} className="story-card">
            <img src={s.image} alt={s.headline} className="story-card-image" />
            <h2 className="story-card-headline">
              <a href="/news">{s.headline}</a>
            </h2>
            <div className="story-card-meta">
              <span>🕐</span>
              <span>{s.meta}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}