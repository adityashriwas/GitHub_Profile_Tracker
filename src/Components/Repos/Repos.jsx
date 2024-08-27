import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

function Repos({ inputValue }) {
  let [repoerror, setRepoError] = useState(null);
  let [repodata, setRepodata] = useState([]);
  let [loading, setLoading] = useState(false);

  async function getRepos() {
    if (inputValue === "") {
      setRepoError("Please enter UserId");
    } else {
      setLoading(true);
      let url = `https://api.github.com/users/${inputValue}/repos`;
      try {
        let reporesponse = await fetch(url);
        if (!reporesponse.ok) {
          throw new Error('Repositories not found or user request failed.');
        }
        const data = await reporesponse.json();
        setRepodata(data);
        setRepoError(null);
      } catch (error) {
        console.error(error);
        setRepoError('Repositories not found or user request failed.');
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    setRepodata([])
  }, [inputValue])


  return (
    <>
      <div className="h-auto p-[5vh] flex flex-col justify-center #1D1D2F">
        <button onClick={getRepos} className="text-white mx-auto my-4 min-w-72 max-w-72 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Watch Repositories
        </button>
        {repoerror && <p className="text-red-500 text-center mt-4">{repoerror}</p>}
        {loading ? <Loader /> :
          (<div className='flex flex-wrap justify-evenly'>
            {
              repodata.map((repo) => (
                <a href={repo.html_url} key={repo.id} className="w-72 mx-1 my-1 bg-slate-900 border rounded-lg border-gray-700 p-5 shadow hover:bg-gray-700 delay-100 duration-200">
                  <div>
                    <p className="flex gap-2 overflow-x-hidden">
                      <span className='font-semibold'>{repo.full_name || "Not Set"}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-3 truncate ">
                      {repo.description || "Description not provided"}<br />
                      {repo.language || "Language not provided"}
                    </p>
                  </div>
                </a>
              ))
            }
          </div>)}
      </div>
    </>
  );
}

export default Repos;
