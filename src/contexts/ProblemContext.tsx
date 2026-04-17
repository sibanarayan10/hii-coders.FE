import { createContext, useState } from 'react';

type Theme = 'Dark' | 'Light';

interface IProblemContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ProblemContext = createContext<IProblemContextProps | null>(null);

export default function ThemeProvider({ children }: { children: any }) {
  // const [time,setTimer]=
  const [theme, setTheme] = useState<Theme>('Light');

  const toggleTheme = () => setTheme((prev) => (prev === 'Light' ? 'Dark' : 'Light'));

  return (
    <ProblemContext.Provider value={{ theme, toggleTheme }}>{children}</ProblemContext.Provider>
  );
}

//we can have the timer
//we can have the solution of the problem
//we can have the solution user have written till now
//we can have the user selected language
//we can have all the detail related to the problem and solution

//in this way we can have a centralize solution
