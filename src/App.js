import React from 'react';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import Register from './Components/LoginRegisterPage/Register';
import Login from './Components/LoginRegisterPage/Login';
import MainPageProject from "./Components/MainPageProject/MainPageProject";
import CreatePost from "./Components/MainPageProject/CreatePost/CreatePost";
import EditPostPage from "./Components/MainPageProject/EditPostPage/EditPostPage";
import Read from "./Components/MainPageProject/Read/Read";
import Delete from "./Components/MainPageProject/Delete/Delete";
import CreateCategory from "./Components/MainPageProject/Category/CreateCategory";
import CategoryDelete from "./Components/MainPageProject/Category/CategoryDelete";
import MyPostsPage from './Components/MyPage/MyPosts';


 export default function App(){
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <MainPageProject/>
        },
        {
            path: '/posts',
            element: <MainPageProject/>
        },
        {
            path: '/posts/:categoryId',
            element: <MainPageProject/>
        },
        {
            path: '/create_posts',
            element: <CreatePost/>
        },
        {
            path: '/posts/edit/:postId',
            element: <EditPostPage/>
        },
        {
            path: '/posts/read/:postId',
            element: <Read/>
        },
        {
            path: '/posts/delete/:postId',
            element: <Delete/>
        },
        {
            path: '/posts/deletecategory/:postId',
            element: <CategoryDelete/>
        },
        {
            path: '/posts/createcategory',
            element: <CreateCategory/>
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/register',
            element: <Register/>
        },
        {
            path: '/myposts',
            element: <MyPostsPage/>
        }
    ]);
    
    return (
        <RouterProvider router={routes}/>
    );
};