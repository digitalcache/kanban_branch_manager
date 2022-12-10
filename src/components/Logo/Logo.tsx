import React, { useContext } from 'react'
import ThemeContext from '../../utils/themeContext'

export default function Logo() {
    const { theme, setTheme } = useContext(ThemeContext)
    const bg = theme == "dark"
      ? "body {background-color: #151515; color: #F2F2F2;}"
      : "body {background-color: #FFFFFF; color: #151515;}"

    const changeTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }
    return (
        <>
            {
                theme === "dark" ?
                <img className='logo' onClick={changeTheme} src="images/icons/logo-black.svg" alt="icon"/>
                :
                <img className='logo' onClick={changeTheme} src="images/icons/logo-white.svg" alt="icon"/>
            }
        </>
    )
}
