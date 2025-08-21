import { EduIntro, EduList } from "../styles/Education.styled";
import { Wrapper } from "../styles/Output.styled";

const Education: React.FC = () => {
  return (
    <Wrapper data-testid="education">
      <EduIntro>Here is my education and internship experience!</EduIntro>
      {eduBg.map(({ title, desc, bullets }) => (
        <EduList key={title}>
          <div className="title">{title}</div>
          <div className="desc">{desc}</div>
          {bullets && (
            <ul>
              {bullets.map((bullet, index) => (
                <li key={index}>• {bullet}</li>
              ))}
            </ul>
          )}
        </EduList>
      ))}
    </Wrapper>
  );
};

const eduBg = [
  {
    title: "B.Tech CSE (AI & ML)",
    desc: "Vels Institute of Science, Technology & Advanced Studies | 2022 ~ 2026",
  },
  {
    title: "Web Developer Intern 2022",
    desc: "Lumed Digitals | Chennai, India",
    bullets: [
      "Developed responsive websites using WordPress, Shopify & Webflow",
      "Translated client requirements into technical specs",
      "Optimized code reducing load times by 20%",
      "Collaborated with cross-functional teams",
    ],
  },
  {
    title: "Web Developer Intern 2023",
    desc: "Net Stack Tech | Chennai, India",
    bullets: [
      "Built scalable websites for hospital & e-commerce clients",
      "Applied SEO & performance best practices (+25% user retention)",
      "Documented technical specs & user guides",
    ],
  },
  {
    title: "Digital Marketing Intern 2024",
    desc: "Heta Institute of Technology | Chennai, India",
    bullets: [
      "Led data-driven marketing campaigns (+20% brand reach)",
      "Analyzed campaign data & prepared clear reports",
    ],
  },
];

export default Education;