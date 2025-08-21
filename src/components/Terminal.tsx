import React, { createContext, useCallback, useEffect, useRef, useState } from "react";
import _ from "lodash";
import Output from "./Output";
import TermInfo from "./TermInfo";
import {
  CmdNotFound,
  Empty,
  Form,
  Hints,
  Input,
  MobileBr,
  MobileSpan,
  Wrapper,
} from "./styles/Terminal.styled";
import { argTab } from "../utils/funcs";

type Command = {
  cmd: string;
  desc: string;
  tab: number;
}[];

export const commands: Command = [
  { cmd: "about", desc: "about Sat Naing", tab: 8 },
  { cmd: "clear", desc: "clear the terminal", tab: 8 },
  { cmd: "echo", desc: "print out anything", tab: 9 },
{ cmd: "education", desc: "my education and internship experience", tab: 4 },
  { cmd: "email", desc: "send an email to me", tab: 8 },
  { cmd: "gui", desc: "go to my portfolio in GUI", tab: 10 },
  { cmd: "help", desc: "check available commands", tab: 9 },
  { cmd: "history", desc: "view command history", tab: 6 },
  { cmd: "projects", desc: "view projects that I've coded", tab: 5 },
  { cmd: "pwd", desc: "print current working directory", tab: 10 },
  { cmd: "socials", desc: "check out my social accounts", tab: 6 },
  { cmd: "themes", desc: "check available themes", tab: 7 },
  { cmd: "welcome", desc: "display hero section", tab: 6 },
  { cmd: "whoami", desc: "about current user", tab: 7 },
];

type Term = {
  arg: string[];
  history: string[];
  rerender: boolean;
  index: number;
  clearHistory?: () => void;
};

export const termContext = createContext<Term>({
  arg: [],
  history: [],
  rerender: false,
  index: 0,
});

const Terminal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>(["welcome"]);
  const [rerender, setRerender] = useState(false);
  const [hints, setHints] = useState<string[]>([]);
  const [pointer, setPointer] = useState(-1);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    setRerender(false);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setCmdHistory([inputVal.trim(), ...cmdHistory]);
      setInputVal("");
      setRerender(true);
      setHints([]);
      setPointer(-1);
    }
  };

  const clearHistory = () => {
    setCmdHistory([]);
    setHints([]);
  };

  // Focus input on click
  const handleDivClick = () => inputRef.current?.focus();

  useEffect(() => {
    document.addEventListener("click", handleDivClick);
    return () => document.removeEventListener("click", handleDivClick);
  }, []);

  // Focus input on mount / rerender
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputVal, pointer]);

  // Keyboard navigation & tab autocomplete
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const ctrlI = e.ctrlKey && e.key.toLowerCase() === "i";
    const ctrlL = e.ctrlKey && e.key.toLowerCase() === "l";

    // Tab or Ctrl+I autocomplete
    if (e.key === "Tab" || ctrlI) {
      e.preventDefault();
      if (!inputVal) return;

      let hintsCmds = commands.filter(({ cmd }) => _.startsWith(cmd, inputVal)).map(c => c.cmd);
      const returnedHints = argTab(inputVal, setInputVal, setHints, hintsCmds);
      hintsCmds = returnedHints ? [...hintsCmds, ...returnedHints] : hintsCmds;

      if (hintsCmds.length > 1) setHints(hintsCmds);
      else if (hintsCmds.length === 1) {
        const parts = _.split(inputVal, " ");
        setInputVal(parts.length > 1 ? `${parts[0]} ${parts[1]} ${hintsCmds[0]}` : hintsCmds[0]);
        setHints([]);
      }
    }

    // Ctrl+L clears terminal
    if (ctrlL) {
      e.preventDefault();
      clearHistory();
    }

    // ArrowUp: previous command
    if (e.key === "ArrowUp") {
      if (pointer + 1 < cmdHistory.length) {
        setPointer(prev => prev + 1);
        setInputVal(cmdHistory[pointer + 1] || "");
      }
    }

    // ArrowDown: next command
    if (e.key === "ArrowDown") {
      if (pointer > 0) {
        setPointer(prev => prev - 1);
        setInputVal(cmdHistory[pointer - 1] || "");
      } else {
        setPointer(-1);
        setInputVal("");
      }
    }
  };

  return (
    <Wrapper data-testid="terminal-wrapper" ref={containerRef}>
      {hints.length > 1 && hints.map(hCmd => <Hints key={hCmd}>{hCmd}</Hints>)}
      <Form onSubmit={handleSubmit}>
        <label htmlFor="terminal-input">
          <TermInfo /> <MobileBr />
          <MobileSpan>&#62;</MobileSpan>
        </label>
        <Input
          id="terminal-input"
          title="terminal-input"
          type="text"
          autoComplete="off"
          spellCheck="false"
          autoFocus
          autoCapitalize="off"
          ref={inputRef}
          value={inputVal}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </Form>

      {cmdHistory.map((cmdH, index) => {
        const commandArray = _.split(_.trim(cmdH), " ");
        const validCommand = _.find(commands, { cmd: commandArray[0] });
        const contextValue = {
          arg: _.drop(commandArray),
          history: cmdHistory,
          rerender,
          index,
          clearHistory,
        };
        return (
          <div key={_.uniqueId(`${cmdH}_`)}>
            <div>
              <TermInfo />
              <MobileBr />
              <MobileSpan>&#62;</MobileSpan>
              <span data-testid="input-command">{cmdH}</span>
            </div>
            {validCommand ? (
              <termContext.Provider value={contextValue}>
                <Output index={index} cmd={commandArray[0]} />
              </termContext.Provider>
            ) : cmdH === "" ? (
              <Empty />
            ) : (
              <CmdNotFound data-testid={`not-found-${index}`}>
                command not found: {cmdH}
              </CmdNotFound>
            )}
          </div>
        );
      })}
    </Wrapper>
  );
};

export default Terminal;