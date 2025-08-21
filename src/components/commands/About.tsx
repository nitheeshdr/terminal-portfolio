import {
  AboutWrapper,
  HighlightAlt,
  HighlightSpan,
} from "../styles/About.styled";

const About: React.FC = () => {
  return (
    <AboutWrapper data-testid="about" className="relative py-24 px-8 max-w-5xl mx-auto text-center">
  <h2 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight">
    Hi, I’m <HighlightSpan className="text-indigo-600">Nitheesh D R</HighlightSpan>
  </h2>
  <p className="text-xl md:text-2xl font-medium text-gray-800 mb-10 leading-relaxed">
    A <HighlightAlt className="text-pink-500">Web & UI/UX Designer, Filmmaker, and Digital Marketer</HighlightAlt> 
    based in Chennai, India.
  </p>
  <p className="text-lg md:text-xl text-gray-600 leading-8 max-w-3xl mx-auto">
    I create modern, user-focused digital experiences by blending clean design, interactive 
    interfaces, and scalable web technologies. My work ranges from building hospital and 
    e-commerce platforms to developing WordPress plugins and AI-driven solutions. Beyond 
    the web, I explore visual storytelling through filmmaking, bringing unique narratives 
    to life with creativity and technical precision.  
    <br /><br />
    With nearly a decade of experience, I love turning complex ideas into simple, elegant, 
    and impactful solutions that inspire and connect with people.
  </p>
</AboutWrapper>
  );
};

export default About;
