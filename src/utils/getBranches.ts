export function getBranches<T>(urlParams: Array<string>): Promise<T> {
    return fetch(`https://api.github.com/repos/${urlParams[0]}/${urlParams[1]}/branches`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json() 
    })
}

export function getRepoInfo<T>(urlParams: Array<string>): Promise<T> {
  return fetch(` https://api.github.com/repos/${urlParams[0]}/${urlParams[1]}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() 
  })
}
