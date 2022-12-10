import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router";
import { Logo } from '../components/Logo'
import ThemeContext from '../utils/themeContext'
import { getRepoInfo } from '../utils/getBranches';
import '../styles/addRepo.scss'

export default function AddRepo() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext)
  const [URLValue, setURLValue] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function openProject(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true) // loader in button
    
    // get input values
    if(URLValue.includes("github.com")){
      let url = new URL(URLValue)
      let pathParams: any[] = url.pathname.split('/')
      let pathParamsValues:Array<string> = []
      pathParams.forEach((p) => {
        if(p.length > 0){
          pathParamsValues.push(p)
        }
      })
      // call get api
      getRepoInfo(pathParamsValues)
      .then(() => {
        setIsLoading(false)
        navigate(`/manage/${pathParamsValues[0]}/${pathParamsValues[1]}`);
        setShowError(false)
      })
      .catch(() => {
        setIsLoading(false)
        setShowError(true)
      })
    } else {
      setIsLoading(false)
      setShowError(true)
    }
  }

  return (
    <main>
      <Logo />
      <div>
        <h1 id="h1" className='text-lg'>Start by pasting the repository URL.</h1>
        <form onSubmit={openProject}>
          <div className='input-content'>
            
            <input 
              className={`url ${theme === "dark" ? "dark-theme-url" : "light-theme-url"}`} 
              type="url" 
              value={URLValue}
              onChange={(e) => setURLValue(e.target.value)}
              required 
              placeholder='https://github.com/codesandbox/sandpack'>
            </input>

            <button 
              className={`submit text-md ${theme === "dark" ? "dark-theme-submit" : "light-theme-submit"}`} 
              type="submit">
                {isLoading ? 'Loading...' : 'Submit'}
            </button>
          
          </div>
          {showError && <div className={`error text-md ${theme === "dark" ? "dark-theme-error" : "light-theme-error"}`}>Oops! Something went wrong. Try again.</div>}
        </form>
      </div>
    </main>
  )
}
