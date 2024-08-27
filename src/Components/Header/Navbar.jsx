import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const closeNavbar = () => {
        setIsOpen(false);
    };

    return (
        <>
            <nav className='sticky top-0 w-full p-2 bg-white/20 backdrop-blur-md shadow-md flex justify-between items-center z-1100'>
                <h1 className='text-xl'><img src="GitHubProfileTracker.png" className="h-12 rounded-xl" alt="GitHubProfileFinder" /></h1>
            </nav>

            <div onClick={toggleOpen} className={`hamburger ${isOpen ? 'open' : ''}`} id="hamburger">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>

            <div className={`navbar fixed top-0 right-0 w-[250px] h-[100%] bg-[rgba(190,175,175,0.387)] backdrop-blur-sm transform transition-transform duration-300 ease-in-out z-[1000] pt-[100px] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} id="navbar">
                <NavLink to='/' className={({ isActive }) => `${isActive ? "bg-[#1D1D2F]" : "text-white"} block px-5 py-2.5 text-[20px] no-underline transition-colors duration-300 hover:bg-[#918e8e]`} onClick={closeNavbar}>Home</NavLink>
                <NavLink to='/about' className={({ isActive }) => `${isActive ? "bg-[#1D1D2F]" : "text-white"} block px-5 py-2.5 text-[20px] no-underline transition-colors duration-300 hover:bg-[#918e8e]`} onClick={closeNavbar}>About</NavLink>
                <a href='https://github.com/AdityaShriwas18/GitHub_Profile_Tracker' className='block px-5 py-2.5 text-[20px] text-white no-underline transition-colors duration-300 hover:bg-[#918e8e]' onClick={closeNavbar}>GitHub</a>
            </div>
        </>
    );
}

export default Navbar;
