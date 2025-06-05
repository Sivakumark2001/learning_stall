import Particles from "react-tsparticles";

const ParticleBackground = () => (
  <Particles
    id="tsparticles"
    options={{
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: "transparent" }, // Make background transparent
      particles: {
        number: { value: 60, density: { enable: true, area: 900 } },
        color: { value: ["#00eaff", "#1976d2", "#00ffb3"] },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: { min: 2, max: 5 } },
        move: {
          enable: true,
          speed: 1.2,
          direction: "none",
          outModes: { default: "out" }
        },
        links: {
          enable: true,
          color: "#1976d2",
          distance: 120,
          opacity: 0.3,
          width: 1
        }
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          onClick: { enable: true, mode: "push" }
        },
        modes: {
          repulse: { distance: 80, duration: 0.4 },
          push: { quantity: 4 }
        }
      }
    }}
  />
);

export default ParticleBackground;