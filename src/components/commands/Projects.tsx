import { useContext, useEffect } from "react";
import {
  checkRedirect,
  getCurrentCmdArry,
  isArgInvalid,
} from "../../utils/funcs";
import {
  ProjectContainer,
  ProjectDesc,
  ProjectsIntro,
  ProjectTitle,
} from "../styles/Projects.styled";
import { termContext } from "../Terminal";
import Usage from "../Usage";

const Projects: React.FC = () => {
  const { arg, history, rerender } = useContext(termContext);
  const currentCommand = getCurrentCmdArry(history);

  useEffect(() => {
    if (checkRedirect(rerender, currentCommand, "projects")) {
      projects.forEach(({ id, url }) => {
        if (id === parseInt(arg[1], 10)) window.open(url, "_blank");
      });
    }
  }, [arg, rerender, currentCommand]);

  const checkArg = () =>
    isArgInvalid(arg, "go", projects.map(p => p.id.toString())) ? (
      <Usage cmd="projects" />
    ) : null;

  return arg.length > 0 && arg.length <= 2 ? (
    checkArg()
  ) : (
    <div data-testid="projects">
      <ProjectsIntro>
        “Talk is cheap. Show me the code.” <br />
        Here are some of my noteworthy GitHub repos:
      </ProjectsIntro>
      {projects.map(({ id, title, desc }) => (
        <ProjectContainer key={id}>
          <ProjectTitle>{`${id}. ${title}`}</ProjectTitle>
          <ProjectDesc>{desc}</ProjectDesc>
        </ProjectContainer>
      ))}
      <Usage cmd="projects" marginY />
    </div>
  );
};

const projects = [
  {
    id: 1,
    title: "Gif-app",
    desc: "A TypeScript application for creating and managing GIFs.",
    url: "https://github.com/nitheeshdr/Gif-app",
  },
  {
    id: 2,
    title: "chat-bot-streamlit",
    desc: "A Python-based chatbot application built with Streamlit.",
    url: "https://github.com/nitheeshdr/chat-bot-streamlit",
  },
  {
    id: 3,
    title: "Player-Score-Analyzer",
    desc: "A Python tool for analyzing player scores in games.",
    url: "https://github.com/nitheeshdr/Player-Score-Analyzer",
  },
  {
    id: 4,
    title: "Simple-Realtime-Chat-WebApp",
    desc: "A real-time chat application built with TypeScript.",
    url: "https://github.com/nitheeshdr/Simple-Realtime-Chat-WebApp",
  },
  {
    id: 5,
    title: "MedScan",
    desc: "A Flask and React application for scanning medical prescriptions.",
    url: "https://github.com/nitheeshdr/MedScan",
  },
  {
    id: 6,
    title: "HealthBridge",
    desc: "An AI/ML project for health-related predictions.",
    url: "https://github.com/nitheeshdr/HealthBridge",
  },
  {
    id: 7,
    title: "MultiLang-Translator",
    desc: "A JavaScript application for translating between multiple languages.",
    url: "https://github.com/nitheeshdr/MultiLang-Translator",
  },
  {
    id: 8,
    title: "SetupsWorks",
    desc: "A freelance agency website showcasing web development services.",
    url: "https://github.com/nitheeshdr/SetupsWorks",
  },
  {
    id: 9,
    title: "NumberThaanKaasu",
    desc: "A short film project exploring themes of money and choices.",
    url: "https://github.com/nitheeshdr/NumberThaanKaasu",
  },
  {
    id: 10,
    title: "Ai-Course",
    desc: "A JavaScript-based course project on Artificial Intelligence.",
    url: "https://github.com/nitheeshdr/Ai-Course",
  },
  {
    id: 11,
    title: "react-movie-search",
    desc: "A JavaScript application for searching movies using React.",
    url: "https://github.com/nitheeshdr/react-movie-search",
  },
];

export default Projects;