import { Link, useLocation } from 'react-router-dom';
import { Home, Heart } from 'react-feather';

const Header = () => {
  const pathname = useLocation().pathname;

  return (
    <header className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-20'>
      <div className='flex m-auto justify-between h-full items-center max-w-screen-sm px-8 sm:px-4 text-zinc-200'>
        <h1 className='text-lg sm:text-2xl font-thin'> <i> Random Recipe Generator </i> </h1>
        <nav className='flex gap-5 text-lg'>
          <Link to='/'>
            <Home className={`h-6 w-6 sm:h-8 sm:w-8 fill-none stroke-zinc-200 ${pathname === '/' ? 'stroke-[2.5]' : 'stroke-[1.0]'}`} />
          </Link>
          <Link to='/favorites'>
            <Heart className={`h-6 w-6 sm:h-8 sm:w-8 fill-none stroke-zinc-200 ${pathname === '/favorites' ? 'stroke-[2.5]' : 'stroke-[1.0]'}`} />
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
