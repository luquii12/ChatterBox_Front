import { Route, Routes } from "react-router"
import Footer from "./layout/Footer"
import Header from "./layout/Header"
import LoginSignup from "./layout/LoginSignup"
import Sidebar from "./components/Sidebar"
import Layout from "./layout/Layout"
import Card from "./components/Card"
import Home from "./layout/Home"



function App() {

  return (
 <Routes>
<Route path="/" element={<Layout/>}>
  <Route index element={<Home/>}/>

</Route>

 </Routes>

  )
}

export default App
