const tutorials = [
  {
    id: 1,
    title: "JS6",
    description: "Learn the basics of modern JavaScript.",
    username: "ishpreet_dev",
    rating: 5,
    image: "/gallery4.jpg"
  },
  {
    id: 2,
    title: "React Router",
    description: "Learn how to handle navigation in React.",
    username: "ishpreet_dev",
    rating: 5,
    image: "/gallery5.jpg"
  },
  {
    id: 3,
    title: "Express",
    description: "Build a backend server with ExpressJS.",
    username: "ishpreet_dev",
    rating: 4.9,
    image: "/gallery6.jpg"
  }
];

function TutorialCard({ tutorial }) {
  return (
    <div className="card">
      <img src={tutorial.image} alt={tutorial.title} className="card-image" />
      <h3 className="card-title">{tutorial.title}</h3>
      <p className="card-description">{tutorial.description}</p>
      <p className="card-rating">★ {tutorial.rating} &nbsp; {tutorial.username}</p>
    </div>
  );
}

function Tutorials() {
  return (
    <section className="tutorials-section">
      <h2 className="section-heading">Featured Tutorials</h2>
      <div className="card-grid">
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>
      <button className="see-all-button">See all tutorials</button>
    </section>
  );
}

export default Tutorials;