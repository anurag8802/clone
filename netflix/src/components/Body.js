import React from 'react';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './Login';
import Browse from './Browse';

const Body = () => {
  <div className='overflow-x-hidden no-scrollbar'></div>
  const appRouter = createBrowserRouter([
    {
    path: "/",
    element: <Login/>,
    errorElement: <div>Not Found</div>
  },
  {
    path: "/browse",
    element:<Browse/>
  }
])
  return (
    <div>
      <RouterProvider router = {appRouter} />
    </div>
  )
}

export default Body
