import { FaGithub } from "react-icons/fa";
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-pink-200 w-full h-fit flex flex-col md:flex-row justify-center items-center gap-5 md:justify-between px-5 py-3'>
        <div className="text-3xl font-sans font-extrabold text-amber-800">Password Manager</div>
        <ul className='flex flex-row justify-center items-center gap-7 border-t-2 pt-2 border-yellow-500 md:border-0'>
            <NavLink className={(e)=>{return e.isActive ? "text-green-800 underline" : ""}} to="/"><li className='text-2xl font-bold hover:text-[1.7rem] hover:text-blue-700'>Home</li></NavLink>
            <li className='text-2xl font-bold hover:text-[1.7rem] hover:text-blue-700'><NavLink className={(e)=>{return e.isActive ? "text-green-800 underline" : ""}} to="/about">About</NavLink></li>
            <li className='text-2xl font-bold hover:text-[1.7rem] hover:text-blue-700'><NavLink className={(e)=>{return e.isActive ? "text-green-800 underline" : ""}} to="/contact">Contact</NavLink></li>
        </ul>
        <button className="mr-3">
          <NavLink to='https://github.com/khushi-varshney'><FaGithub size={37} /></NavLink>
        </button>
    </div>
  )
}

export default Navbar
