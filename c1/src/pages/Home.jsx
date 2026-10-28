import { Banner, Profile, Portfolio, Gallery } from "../components/Sections";
import Articles from "../components/Articles";
import Tutorials from "../components/Tutorials";

function Home() {
  return (
    <>
      <Banner />
      <Profile />
      <Portfolio />
      <Gallery />
      <Articles />
      <Tutorials />
    </>
  );
}

export default Home;