import React, { useContext, useEffect } from 'react'
import ThemeContext from '../../utils/themeContext'
import { BranchButton } from '../../utils/models'

export default function BranchManager(props: BranchButton) {
    const { theme } = useContext(ThemeContext)
    return (
        <div className={`branch-manage-button ${theme === "dark" ? 'dark-theme-button' : 'light-theme-button'}`}>
            {
                theme === "dark" ?
                <img onClick={() => props.moveLeft(props.name, props.type)} className={`arrow ${props.type === "in-progress" ? "disabled" : ""}`} src="/images/icons/chevron-left-dark.svg" alt="icon"/>
                :
                <img onClick={() => props.moveLeft(props.name, props.type)} className={`arrow ${props.type === "in-progress" ? "disabled" : ""}`} src="/images/icons/chevron-left-light.svg" alt="icon"/>
            }
                {props.name}
            {
                theme === "dark" ?
                <img onClick={() => props.moveRight(props.name, props.type)} className={`arrow ${props.type === "to-merge" ? "disabled" : ""}`} src="/images/icons/chevron-right-dark.svg" alt="icon"/>
                :
                <img onClick={() => props.moveRight(props.name, props.type)} className={`arrow ${props.type === "to-merge" ? "disabled" : ""}`} src="/images/icons/chevron-right-light.svg" alt="icon"/>
            }
        </div>
    )
}
