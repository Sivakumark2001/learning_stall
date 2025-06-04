import ProblemCard from "../components/ProblemCard";
import "../css/homePage.css";
import problems from "../problems/problemData.json"; // Import the JSON data

const HomePage = () => {
  return (
    <div className="home-page">
      <h3>Problems</h3>
      <div className="problem-list">
        {problems.map((problem, idx) => (
            <ProblemCard problem={problem} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
