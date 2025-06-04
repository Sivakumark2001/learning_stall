import "./ProblemCard.css";
import { FaFolderOpen } from "react-icons/fa";
import { motion } from "framer-motion";

const ProblemCard = ({ problem }) => {
  // Extract YouTube video ID if videoUrl is provided
  let videoEmbedUrl = null;
  if (problem.videoUrl) {
    const match = problem.videoUrl.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
    );
    if (match) {
      videoEmbedUrl = `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  return (
    <motion.div
      key={problem.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="problem-item"
    >
      <div className="problem-card">
        <h3>
          <FaFolderOpen style={{ marginRight: 8, color: "#1a237e" }} />
          #{problem.id} {problem.title}
        </h3>
        <p>{problem.description}</p>
        <a href={problem.link} target="_blank" rel="noopener noreferrer">
          View Solution
        </a>
        <p>
          Difficulty: <b>{problem.difficulty}</b>
        </p>
        {videoEmbedUrl && (
          <div className="problem-video">
            <iframe
              width="320"
              height="180"
              src={videoEmbedUrl}
              title="Problem Solution Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProblemCard;