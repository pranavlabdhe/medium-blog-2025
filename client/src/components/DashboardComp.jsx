// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPostsByUserId } from '../redux/postActions/postAction';
// import { HiDocumentText, HiArrowNarrowUp } from 'react-icons/hi';
// import { Button, Table } from 'flowbite-react';
// import { Link } from 'react-router-dom';

// export default function DashboardComp() {
//   const [users, setUsers] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalComments, setTotalComments] = useState(0);
//   const [lastMonthUsers, setLastMonthUsers] = useState(0);
//   const [lastMonthComments, setLastMonthComments] = useState(0);
//   const [lastMonthPosts, setLastMonthPosts] = useState(0);
//   const [totalPosts, setTotalPosts] = useState(0);
//   const [posts, setPosts] = useState([]);
  
//   const dispatch = useDispatch();
//   const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userRes = await fetch('https://medium-blog-2025.onrender.com/api/user/getusers?limit=5');
//         const userData = await userRes.json();
//         if (userRes.ok) {
//           setUsers(userData.users);
//           setTotalUsers(userData.totalUsers);
//           setLastMonthUsers(userData.lastMonthUsers);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     const fetchPostsData = async () => {
//       try {
//         const postsRes = await fetch('https://medium-blog-2025.onrender.com/api/post/posts/' + currentUser._id);
//         const postsData = await postsRes.json();
//         if (postsRes.ok) {
//           setPosts(postsData);
//           setTotalPosts(postsData.length);
//           // Calculate last month posts count if needed
//           // const lastMonthPostsCount = postsData.filter(post => /* filter posts by last month condition */).length;
//           // setLastMonthPosts(lastMonthPostsCount);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     const fetchCommentsData = async () => {
//       try {
//         const commentsRes = await fetch('https://medium-blog-2025.onrender.com/api/comment/getcomments?limit=5');
//         const commentsData = await commentsRes.json();
//         if (commentsRes.ok) {
//           setComments(commentsData.comments);
//           setTotalComments(commentsData.totalComments);
//           setLastMonthComments(commentsData.lastMonthComments);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     if (currentUser) {
//       dispatch(fetchPostsByUserId(currentUser._id));
//     }
//     else

//     fetchUserData();
//     fetchPostsData();
//     fetchCommentsData();
//   }, [currentUser, dispatch]);

//   return (
//     <div className='p-3 md:mx-auto'>
//       <div className='flex-wrap flex gap-4 justify-center'>
//         <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
//           <div className='flex justify-between'>
//             <div className=''>
//               <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
//               <p className='text-2xl'>{totalPosts}</p>
//             </div>
//             <HiDocumentText className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
//           </div>
//           <div className='flex  gap-2 text-sm'>
//             <span className='text-green-500 flex items-center'>
//               <HiArrowNarrowUp />
//               {lastMonthPosts}
//             </span>
//             <div className='text-gray-500'>Last month</div>
//           </div>
//         </div>
//       </div>
//       <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
//         <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
//           <div className='flex justify-between  p-3 text-sm font-semibold'>
//             <h1 className='text-center p-2'>Recent posts</h1>
//             <Button outline gradientDuoTone='purpleToPink'>
//               <Link to={'/dashboard?tab=posts'}>See all</Link>
//             </Button>
//           </div>
//           <Table hoverable>
//             <Table.Head>
//               <Table.HeadCell>Post image</Table.HeadCell>
//               <Table.HeadCell>Post Title</Table.HeadCell>
//               <Table.HeadCell>Category</Table.HeadCell>
//             </Table.Head>
//             {posts &&
//               posts.map((post) => (
//                 <Table.Body key={post._id} className='divide-y'>
//                   <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
//                     <Table.Cell>
//                       <img
//                         src={post.image}
//                         alt='user'
//                         className='w-14 h-10 rounded-md bg-gray-500'
//                       />
//                     </Table.Cell>
//                     <Table.Cell className='w-96'>{post.title}</Table.Cell>
//                     <Table.Cell className='w-5'>{post.category}</Table.Cell>
//                   </Table.Row>
//                 </Table.Body>
//               ))}
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPostsByUserId } from '../redux/postActions/postAction';
// import { fetchPostsByAdmin } from '../redux/postActions/AdminActions';
// import { HiDocumentText, HiArrowNarrowUp } from 'react-icons/hi';
// import { Button, Table } from 'flowbite-react';
// import { Link } from 'react-router-dom';

// export default function DashboardComp() {
//   const [posts, setPosts] = useState([]);
//   const dispatch = useDispatch();
//   const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (currentUser) {
//           if (currentUser.isAdmin) {
//             const response = await fetch('https://medium-blog-2025.onrender.com/api/post/adminposts');
//             const data = await response.json();
//             if (response.ok) {
//               setPosts(data);
//             }
//           } else {
//             const response = await fetch(`https://medium-blog-2025.onrender.com/api/post/posts/${currentUser._id}`);
//             const data = await response.json();
//             if (response.ok) {
//             setPosts(data)
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchData();
//   }, [currentUser, dispatch]);

//   return (
//     <div className='p-3 md:mx-auto'>
//       <div className='flex-wrap flex gap-4 justify-center'>
//         <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
//           <div className='flex justify-between'>
//             <div className=''>
//               <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
//               <p className='text-2xl'>{posts.length}</p>
//             </div>
//             <HiDocumentText className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
//           </div>
//           <div className='flex  gap-2 text-sm'>
//             <span className='text-green-500 flex items-center'>
//               <HiArrowNarrowUp />
//               {/* You can calculate last month's posts count if needed */}
//             </span>
//             <div className='text-gray-500'>Last month</div>
//           </div>
//         </div>
//       </div>
//       <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
//         <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
//           <div className='flex justify-between  p-3 text-sm font-semibold'>
//             <h1 className='text-center p-2'>Recent posts</h1>
//             <Button outline gradientDuoTone='purpleToPink'>
//               <Link to={'/dashboard?tab=posts'}>See all</Link>
//             </Button>
//           </div>
//           <Table hoverable>
//             <Table.Head>
//               <Table.HeadCell>Post image</Table.HeadCell>
//               <Table.HeadCell>Post Title</Table.HeadCell>
//               <Table.HeadCell>Category</Table.HeadCell>
//             </Table.Head>
//             <Table.Body>
//               {posts.map((post) => (
//                 <Table.Row key={post._id}>
//                   <Table.Cell>
//                     <img src={post.image} alt="Post" className="w-14 h-10 rounded-md bg-gray-500" />
//                   </Table.Cell>
//                   <Table.Cell>{post.title}</Table.Cell>
//                   <Table.Cell>{post.category}</Table.Cell>
//                 </Table.Row>
//               ))}
//             </Table.Body>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }

// 8th May 2025


import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiDocumentText, HiArrowNarrowUp } from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          let fetchedPosts = [];
          if (currentUser.isAdmin) {
            const response = await fetch('https://medium-blog-2025.onrender.com/api/post/adminposts');
            const data = await response.json();
            if (response.ok) {
              fetchedPosts = Array.isArray(data) ? data : data.posts || [];
            }
          } else {
            const response = await fetch(`https://medium-blog-2025.onrender.com/api/post/posts/${currentUser._id}`);
            const data = await response.json();
            if (response.ok) {
              fetchedPosts = Array.isArray(data) ? data : data.posts || [];
            }
          }

          // ✅ Sort posts by updatedAt descending
          fetchedPosts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          setPosts(fetchedPosts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [currentUser, dispatch]);

  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex-wrap flex gap-4 justify-center'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
              <p className='text-2xl'>{posts.length}</p>
            </div>
            <HiDocumentText className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {/* You can calculate last month's posts count if needed */}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent posts</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=posts'}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {posts.map((post) => (
                <Table.Row key={post._id}>
                  <Table.Cell>
                    <img
                      src={post.image}
                      alt='Post'
                      className='w-14 h-10 rounded-md bg-gray-500'
                    />
                  </Table.Cell>
                  <Table.Cell>{post.title}</Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}