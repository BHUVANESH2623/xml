import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home"
import './app.scss'
import HelpGuide from "./HelpGuide";
// import { XmlViewer } from "./XmlViewer";

function App() {
  const Layout=()=>{
    return (
      <>
        <Navbar/>
        <Outlet/>
      </>
    );
  }

  const router=createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/help',
          element:<HelpGuide/>
        },
        {
          path:'*',
          element:<p>Page not found</p>
        }
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;