import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom'
import { BranchManager } from '../components/BranchManager';
import ThemeContext from '../utils/themeContext'
import { getRepoInfo, getBranches } from '../utils/getBranches';
import { numberFormatter } from '../utils/numberFormatter';
import '../styles/manageRepo.scss'

export default function ManageRepo() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext)
  const { owner, project } = useParams()
  const [projectName, setProjectName] = useState<string>("")
  const [projectDescription, setProjectDescription] = useState<string>("")
  const [stargazersCount, setStargazersCount] = useState<string>("0");
  const [inProgressBranches, setInProgressBranches] = useState<[]>([]);
  const [inReviewBranches, setInReviewBranches] = useState<[]>([]);
  const [toMergeBranches, setToMergeBranches] = useState<[]>([]);

  const initializeBranches = (ownerName: string, projectName: string, res: any) => {
    localStorage.clear();
    localStorage.setItem("owner-project", `${ownerName},${projectName}`)
    localStorage.setItem("in-progress-branches", JSON.stringify(res))
    localStorage.setItem("in-review-branches", "")
    localStorage.setItem("to-merge-branches", "")
    setInProgressBranches(res)
  }

  useEffect(() => {
    let ownerName:string = owner!;
    let projectName:string = project!;

    getRepoInfo([ownerName, projectName])
    .then((res: any) => {
      setProjectName(res.name)
      setProjectDescription(res.description)
      setStargazersCount(numberFormatter(res.stargazers_count))
    })
    .catch(() => {
    })

    getBranches([ownerName, projectName])
    .then((res:any) => {
      let projectInfo = localStorage.getItem("owner-project")
      if(projectInfo && projectInfo.length > 0){
        let localProjectInfo = projectInfo.split(',')
        let localOwner = localProjectInfo[0]
        let localProject = localProjectInfo[1]

        if(localOwner === owner && localProject === project){
          let progressBranches: string = localStorage.getItem("in-progress-branches")!
          let reviewBranches: string = localStorage.getItem("in-review-branches")!
          let mergeBranches: string = localStorage.getItem("to-merge-branches")!
          if(progressBranches.length > 0){
            setInProgressBranches(JSON.parse(progressBranches))
          }
          if(reviewBranches.length > 0){
            setInReviewBranches(JSON.parse(reviewBranches))
          }
          if(mergeBranches.length > 0){
            setToMergeBranches(JSON.parse(mergeBranches))
          }
        } else {
          initializeBranches(ownerName, projectName, res)
        }
      } else {
        initializeBranches(ownerName, projectName, res)
      }
    })
    .catch(() => {
      console.log("could not fetch branches")
    })
  }, [owner, project])  

  const goBack = () => {
    navigate('/');
  }

  const moveLeft = (name: string, type: string) => {
    if(type === "in-review"){
      let reviewBranches:any = [...inReviewBranches];
      let progressBranches:any = [...inProgressBranches];
      let branch = reviewBranches?.find((b:any) => b.name === name)
      if(branch){
        progressBranches?.push(branch)
        let newReviewBranches = reviewBranches.filter((b: any) => b.name !== name)
        setInReviewBranches(newReviewBranches)
        setInProgressBranches(progressBranches)
        localStorage.setItem("in-review-branches", JSON.stringify(newReviewBranches))
        localStorage.setItem("in-progress-branches", JSON.stringify(progressBranches))
      }
    }
    if(type === "to-merge"){
      let reviewBranches:any = [...inReviewBranches];
      let mergeBranches:any = [...toMergeBranches];
      let branch = mergeBranches?.find((b:any) => b.name === name)
      if(branch){
        reviewBranches?.push(branch)
        let newMergeBranches = mergeBranches.filter((b: any) => b.name !== name)
        setInReviewBranches(reviewBranches)
        setToMergeBranches(newMergeBranches)
        localStorage.setItem("in-review-branches", JSON.stringify(reviewBranches))
        localStorage.setItem("to-merge-branches", JSON.stringify(newMergeBranches))
      }
    }
  }

  const moveRight = (name: string, type: string) => {
    if(type === "in-progress"){
      let progressBranches:any = [...inProgressBranches];
      let reviewBranches:any = [...inReviewBranches];
      let branch = progressBranches?.find((b:any) => b.name === name)
      if(branch){
        reviewBranches?.push(branch)
        let newProgressBranches = progressBranches.filter((b: any) => b.name !== name)
        setInProgressBranches(newProgressBranches)
        setInReviewBranches(reviewBranches)
        localStorage.setItem("in-progress-branches", JSON.stringify(newProgressBranches))
        localStorage.setItem("in-review-branches", JSON.stringify(reviewBranches))
      }
    }
    if(type === "in-review"){
      let reviewBranches:any = [...inReviewBranches];
      let mergeBranches:any = [...toMergeBranches];
      let branch = reviewBranches?.find((b:any) => b.name === name)
      if(branch){
        mergeBranches?.push(branch)
        let newReviewBranches = reviewBranches.filter((b: any) => b.name !== name)
        setInReviewBranches(newReviewBranches)
        setToMergeBranches(mergeBranches)
        localStorage.setItem("in-review-branches", JSON.stringify(newReviewBranches))
        localStorage.setItem("to-merge-branches", JSON.stringify(mergeBranches))
      }
    }
  }

  return (
    <>
      <section className='manage-section'>
        {theme === "dark" ? 
          <img className='back' onClick={goBack} src="/images/icons/arrow-back-dark.svg" alt="back" />
          :
          <img className='back' onClick={goBack} src="/images/icons/arrow-back-light.svg" alt="back" />
        }
      
        <div>
          <div className={`text-lg repo-name ${theme === "dark" ? "dark-theme-name" : "light-theme-name"}`}>{projectName}</div>
          <p className={`repo-info ${theme === "dark" ? "dark-theme-info" : "light-theme-info"}`}>
            {projectDescription}
          </p>
        </div>
        <div className='rating-info'>
          {theme === "dark" ? 
            <img src="/images/icons/rating-icon-dark.svg" alt="rating" />
            :
            <img src="/images/icons/rating-icon-light.svg" alt="rating" />
          }
          <span className={`rating-count text-xs ${theme === "dark" ? "dark-theme-rating-info" : "light-theme-rating-info"}`}>{stargazersCount}</span>
        </div>
        
        <span className={`progress-title text-xs ${theme === "dark" ? "dark-theme-title" : "light-theme-title"}`}>In progress ({inProgressBranches && inProgressBranches.length > 0 ? inProgressBranches?.length : 0})</span>
        <span className={`progress-title text-xs ${theme === "dark" ? "dark-theme-title" : "light-theme-title"}`}>Review ({inReviewBranches && inReviewBranches.length > 0 ? inReviewBranches.length : 0})</span>
        <span className={`progress-title text-xs ${theme === "dark" ? "dark-theme-title" : "light-theme-title"}`}>Ready to merge ({toMergeBranches && toMergeBranches.length > 0 ? toMergeBranches.length : 0})</span>
        
        <div className='branch-columns'>
          {inProgressBranches?.map((b : any) => <BranchManager key={b.name} name={b.name} type="in-progress" moveLeft={moveLeft} moveRight={moveRight} />)}
        </div>
        <div className='branch-columns'>
          {inReviewBranches?.map((b: any) => <BranchManager key={b.name} name={b.name} type="in-review" moveLeft={moveLeft} moveRight={moveRight} />)}
        </div>
        <div className='branch-columns'>
          {toMergeBranches?.map((b: any) => <BranchManager key={b.name} name={b.name} type="to-merge" moveLeft={moveLeft} moveRight={moveRight} />)}
        </div>
      </section>
    </>
  )
}
