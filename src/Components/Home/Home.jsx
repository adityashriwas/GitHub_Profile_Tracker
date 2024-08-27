import React, { useState } from 'react'
import Repos from '../Repos/Repos';
import Loader from '../Loader/Loader';

function Home() {

    let [inputValue, setInputValue] = useState('');
    let [username, setUsername] = useState('username')
    let [type, setType] = useState('GitHub')
    let [email, setEmail] = useState('email@example.com')
    let [profilepic, setProfilepic] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
    let [userID, setUserID] = useState('userID')
    let [followers, setFollowers] = useState(0)
    let [following, setFollowing] = useState(0)
    let [created_at, setCreated_at] = useState('yy-mm-dd')
    let [updated_at, setUpdated_at] = useState('yy-mm-dd')
    let [bio, setBio] = useState('bio')
    let [html_url, setHtml_url] = useState('view profile')
    let [location, setLocation] = useState('location')
    let [twitter_username, setTwitter_username] = useState('twitter')
    let [public_repos, setPublic_repos] = useState(0)
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState('Blog')

    let API = "https://api.github.com/users/"

    let data



    async function getuserdata() {
        if (inputValue === "") {
            setError("Please enter UserId")
        }
        else {
            setLoading(true);
            try {
                let response = await fetch(API + inputValue)
                if (!response.ok) {
                    throw new Error('User not found or API request failed.');
                }
                data = await response.json();
                console.log(data.name);
                setUsername(data.name || 'Not available');
                setProfilepic(data.avatar_url || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
                setUserID(data.login || 'Not available');
                setFollowers(data.followers || 0);
                setFollowing(data.following || 0);
                setCreated_at(data.created_at || 'Not available');
                setUpdated_at(data.updated_at || 'Not available');
                setBio(data.bio || 'Not available');
                setHtml_url(data.html_url || 'Not available');
                setLocation(data.location || 'Not available');
                setTwitter_username(data.twitter_username || 'Not available');
                setPublic_repos(data.public_repos || 0);
                setEmail(data.email || 'Not available')
                setType(data.type || 'Not available')
                setError(null);
                setBlog(data.blog)
            } catch (error) {
                console.error(error.message);
                setError('Inavlid Username or User Not exist!');
            } finally {
                setLoading(false);
            }
        }
    }

    return (

        <>
            <div className='home mt-[10vh] mb-[10vh] min-h-screen'>
                <div className="serchbar max-w-4xl m-auto my-[5vh] px-6 z-99">
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" value={inputValue} onKeyUp={(e) => { if (e.key === 'Enter') getuserdata() }} onChange={(e) => setInputValue(e.target.value)} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search User Profile..." required />
                        <button
                            onClick={getuserdata}
                            
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Search
                        </button>
                    </div>
                </div>


                {error && <p className="text-red-500 text-center">{error}</p>}
                {loading ? <Loader /> : (<main className='flex justify-around flex-wrap gap-4' >
                    <div className="profilecard overflow-hidden">
                        <div class="text-gray-300 rounded-lg text-sm w-[350px] bg-[#161b22] border border-[#3f3f46]">
                            <div class="w-full flex flex-row space-x-3 p-4">
                                <img
                                    class="rounded-2xl border-zinc-700 w-20 h-20"
                                    alt="avatar"
                                    src={profilepic}
                                />
                                <div class="w-full text-gray-500">
                                    <p class="w-[200px] text-lg space-x-1 inline-block overflow-hidden whitespace-nowrap text-ellipsis">
                                        <span class="text-gray-100">{username}</span><span class="font-extralight"></span>
                                    </p>
                                    <p><a className='font-extrabold' href={html_url}>{userID}</a></p>
                                </div>
                            </div>
                            <div class="w-full border-b border-[#3f3f46]"></div>
                            <div class="w-full flex flex-row space-x-4 p-4 text-gray-500 text-sm">
                                <p class="flex items-center space-x-1">
                                    <a class="hover:text-blue-500 flex items-center space-x-1"
                                        href="#"><svg text="muted" aria-hidden="true" height="16"
                                            viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" fill="currentColor">
                                            <path
                                                d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z">
                                            </path>
                                        </svg><span>{followers}</span><span> follower </span></a><span class="text-gray-100"> · </span><a
                                            class="hover:text-blue-500" href="#">{following} following</a>
                                </p>
                            </div>
                            <div class="w-full border-b border-[#3f3f46]"></div>
                            <div class="w-full flex-col space-y-1 p-4 text-gray-500 text-sm">
                                <div class="flex items-center space-x-1">
                                    <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" fill="currentColor" aria-hidden="true">
                                        <path
                                            d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z">
                                        </path>
                                    </svg>
                                    <p class="text-gray-100">{location}</p>
                                </div>
                                
                                <div class="flex items-center space-x-1 overflow-hidden">
                                <svg aria-hidden="true" fill='white' height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-link">
                                    <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path>
                                </svg>
                                    <a href={blog} class="text-gray-100">{blog}</a>
                                </div>

                                

                                <div v-if="infos.twitter_username" class="flex items-center space-x-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 273.5 222.3" width="16" height="16">
                                        <path
                                            d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1"
                                            fill="currentColor"></path>
                                    </svg>
                                    <a class="text-gray-100 hover:text-blue-500" href="#">{twitter_username}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profiledescription">
                        <div className="flex items-center justify-center">
                            <table className="min-w-full rounded-lg text-sm w-[350px] bg-[#161b22] border border-[#3f3f46]">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 font-bold text-white">TAG</th>
                                        <th className="px-6 py-3 text-white">DETAILS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-white">Username</td>
                                        <td className="px-6 py-4 text-white">{username}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-white">Account type</td>
                                        <td className="px-6 py-4 text-white">{type}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-white">Created at</td>
                                        <td className="px-6 py-4 text-white">{created_at.split("T")[0]}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-white">Updated at</td>
                                        <td className="px-6 py-4 text-white">{updated_at.split("T")[0]}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-white">Bio</td>
                                        <td className="px-6 py-4 text-white">{bio}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-white">Email</td>
                                        <td className="px-6 py-4 text-white">{email}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-white">Public repositories</td>
                                        <td className="px-6 py-4 text-white">{public_repos}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-white">Profile</td>
                                        <td className="px-6 py-4 text-white"><a href={html_url}>view profile</a></td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-white">Followers</td>
                                        <td className="px-6 py-4 text-white">{followers}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-white">Following</td>
                                        <td className="px-6 py-4 text-white">{following}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
                )}
                <Repos inputValue={inputValue} />

            </div>
        </>
    )
}

export default Home