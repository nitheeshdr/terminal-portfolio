import {
  Cmd,
  HeroContainer,
  Link,
  PreImg,
  PreName,
  PreNameMobile,
  PreWrapper,
  Seperator,
} from "../styles/Welcome.styled";
import logo from '../styles/logo.png'

const Welcome: React.FC = () => {
  return (
    <HeroContainer data-testid="welcome">
      <div className="info-section">
        <PreName>
{`
 _   _ _ _   _                    _       ____    ____  
 | \\ | (_) |_| |__   ___  ___  ___| |__   |  _ \\  |  _ \\ 
 |  \\| | | __| '_ \\ / _ \\/ _ \\/ __| '_ \\  | | | | | |_) |
 | |\\  | | |_| | | |  __/  __/\\__ \\ | | | | |_| | |  _ < 
 |_| \\_|_|\\__|_| |_|\\___|\\___||___/_| |_| |____/  |_| \\_\\
`}
        </PreName>
        <PreWrapper>
          <PreNameMobile>
{`
 _   _  _  _    _                       _      
| \\ | |(_)| |_ | |__    ___   ___  ___ | |__   
|  \\| || || __|| '_ \\  / _ \\ / _ \\/ __|| '_ \\  
| |\\  || || |_ | | | ||  __/|  __/\\__ \\| | | | 
|_|_\\_||_|_\\__||_| |_|\\___| \\___||___/|_| |_| 
  _ \\  |  _ \\                                
 | | | | |_) |                               
 | |_| | |  _ <                                
 |____/  |_| \\_\\                               
`}
          </PreNameMobile>
        </PreWrapper>
        <div>Welcome to my terminal portfolio. (Version 1.0)</div>
        <div>
          For a list of available commands, type `<Cmd>help</Cmd>`.
        </div>
      </div>
      <div className="illu-section">
        <PreImg>
          <img width="350" src={logo} alt="Company logo" />
        </PreImg>
      </div>
    </HeroContainer>
  );
};

export default Welcome;