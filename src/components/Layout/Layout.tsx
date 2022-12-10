import React, { useContext, ReactNode } from 'react'
import ThemeContext from '../../utils/themeContext'

interface Props {
    children?: ReactNode
}

export default function Layout({children}: Props) {
    const { theme } = useContext(ThemeContext)
    const bg = theme == "dark"
    ? "body {background-color: #151515; color: #F2F2F2;}"
    : "body {background-color: #FFFFFF; color: #151515;}"
    return (
        <>
            <style>{bg}</style>
            {children}
        </>
    )
}
