const articles = [
  {
    id: 1,
    title: "React OR Vue",
    description: "A comparison of two popular frontend frameworks.",
    author: "Ishpreet",
    rating: 5,
    image: "/gallery1.png"
  },
  {
    id: 2,
    title: "NodeJS",
    description: "Getting started with server-side JavaScript.",
    author: "Ishpreet",
    rating: 5,
    image: "/gallery2.png"
  },
  {
    id: 3,
    title: "React Hooks",
    description: "Understanding useState and useEffect.",
    author: "Ishpreet",
    rating: 5,
    image: "/gallery3.png"
  }
];

function ArticleCard({ article }) {
  return (
    <div className="card">
      <img src={article.image} alt={article.title} className="card-image" />
      <h3 className="card-title">{article.title}</h3>
      <p className="card-description">{article.description}</p>
      <p className="card-rating">★ {article.rating} &nbsp; {article.author}</p>
    </div>
  );
}

function Articles() {
  return (
    <section className="articles-section">
      <h2 className="section-heading">Featured Articles</h2>
      <div className="card-grid">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <button className="see-all-button">See all articles</button>
    </section>
  );
}

export default Articles;