// import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { AiOutlineSearch } from 'react-icons/ai';
// import { FaMoon, FaSun } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleTheme } from '../redux/theme/themeSlice';
// import { signoutSuccess } from '../redux/user/userSlice';
// import { useEffect, useState } from 'react';

// export default function Header() {
//   const path = useLocation().pathname;
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { currentUser } = useSelector((state) => state.user);
//   const { theme } = useSelector((state) => state.theme);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     if (searchTermFromUrl) {
//       setSearchTerm(searchTermFromUrl);
//     }
//   }, [location.search]);

//   const handleSignout = async () => {
//     try {
//       const res = await fetch('https://medium-blog-2025.onrender.com/api/user/signout', {
//         method: 'POST',
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         console.log(data.message);
//       } else {
//         dispatch(signoutSuccess());
//         navigate('/sign-in')
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   // const handleSubmit = (e) => {
//   //   // e.preventDefault();
//   //   setSearchTerm(e.target.value)
//   //   const urlParams = new URLSearchParams(location.search);
//   //   urlParams.set('searchTerm', searchTerm);
//   //   const searchQuery = urlParams.toString();
//   //   navigate(`/search?${searchQuery}`);
//   // };
  
//   let typingTimer;
//   const handleChange = (e) => {
//     setSearchTerm(e.target.value);
  
//     // Clear the previous timer if user is still typing
//     clearTimeout(typingTimer);
  
//     typingTimer = setTimeout(() => {
//       const urlParams = new URLSearchParams();
//       urlParams.set('searchTerm', e.target.value);
//       navigate(`/search?${urlParams.toString()}`);
//     }, 1500); // Wait 500ms after typing stops before triggering search
//   };

//   return (
//     <Navbar className='border-b-2 website_font'>
//       <Link
//         to='/'
//         className='self-center whitespace-nowrap text-sm sm:text-xl  dark:text-white'
//       >
//         <span className='px-2 py-1 title_color'>
//             Medium Blog Post
//         </span>
        
//       </Link>
//       {/* <form onSubmit={handleSubmit}>
//         <TextInput
//           type='text'
//           placeholder='Search...'
//           rightIcon={AiOutlineSearch}
//           className='hidden lg:inline'
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </form> */}

//     <form>
//     <TextInput
//       type='text'
//       placeholder='Search...'
//       rightIcon={AiOutlineSearch}
//       className='hidden lg:inline'
//       value={searchTerm}
//       onChange={handleChange} // Trigger search on typing
//     />
//       </form>
//       <Button className='w-12 h-10 lg:hidden' color='gray' pill>
//         <AiOutlineSearch />
//       </Button>
//       <div className='flex gap-2 md:order-2'>
//         {/* <Button
//           className='w-12 h-10 hidden sm:inline'
//           color='gray'
//           pill
//           onClick={() => dispatch(toggleTheme())}
//         >
//           {theme === 'light' ? <FaSun /> : <FaMoon />}
//         </Button> */}
//         {currentUser ? (
//           <Dropdown
//             arrowIcon={false}
//             inline
//             label={
//               <Avatar alt='user' img={currentUser.profilePicture} rounded />
//             }
//           >
//             <Dropdown.Header>
//               <span className='block text-sm'>@{currentUser.username}</span>
//               <span className='block text-sm font-medium truncate'>
//                 {currentUser.email}
//               </span>
//             </Dropdown.Header>
//             <Link to={'/dashboard?tab=profile'}>
//               <Dropdown.Item>Profile</Dropdown.Item>
//             </Link>
//             <Dropdown.Divider />
//             <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
//           </Dropdown>
//         ) : (
//           <Link to='/sign-in'>
//             <Button gradientDuoTone='purpleToBlue' outline>
//               Sign In
//             </Button>
//           </Link>
//         )}
//         <Navbar.Toggle />
//       </div>
//       <Navbar.Collapse>
//         <Navbar.Link active={path === '/'} as={'div'}>
//           <Link to='/'>Home</Link>
//         </Navbar.Link>
//         <Navbar.Link active={path === '/about'} as={'div'}>
//           <Link to='/about'>About</Link>
//         </Navbar.Link>
//         <Navbar.Link active={path === '/projects'} as={'div'}>
//           {/* <Link to='/projects'>Projects</Link> */}
//         </Navbar.Link>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// }


// 8th May 2025

import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('https://medium-blog-2025.onrender.com/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate('/sign-in');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  let typingTimer;
  const handleChange = (e) => {
    setSearchTerm(e.target.value);

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      const urlParams = new URLSearchParams();
      urlParams.set('searchTerm', e.target.value);
      navigate(`/search?${urlParams.toString()}`);
    }, 1500);
  };

  return (
    <Navbar className='border-b-2 website_font'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl dark:text-white'
      >
        <span className='px-2 py-1 title_color'>Medium Blog Post</span>
      </Link>

      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={handleChange}
        />
      </form>

      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>

      <div className='flex gap-2 md:order-2'>
        {/* Optional: Dark mode toggle button */}
        {/* <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button> */}

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          path !== '/sign-in' && (
            <Link to='/sign-in'>
              <Button gradientDuoTone='purpleToBlue' outline>
                Sign In
              </Button>
            </Link>
          )
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          {/* <Link to='/projects'>Projects</Link> */}
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
