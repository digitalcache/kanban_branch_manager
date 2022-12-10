import { createContext } from 'react'

const ThemeContext = createContext({
    theme: "dark",
    setTheme: (value: string) => {}
})

export default ThemeContext