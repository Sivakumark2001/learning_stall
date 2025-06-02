import ProblemCard from "../components/ProblemCard";
import { motion } from "framer-motion";
import "../css/homePage.css";
import problems from "../problems/problemData.json"; // Import the JSON data

const HomePage = () => {
  return (
    <div className="home-page">
      <h3>Problems</h3>
      <div className="problem-list">
        {problems.map((problem, idx) => (
          <motion.div
            key={problem.id || idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="problem-item"
          >
            <ProblemCard problem={problem} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
