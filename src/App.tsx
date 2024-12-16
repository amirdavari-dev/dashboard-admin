import { RouterProvider } from "react-router-dom"
import Router from "./router"
import './core/i18n'
import AOS from "aos";
import { useAppContext } from "./contexts/app/app-context"
import { useEffect } from "react"
import "react-toastify/dist/ReactToastify.css"
import {ToastContainer} from "react-toastify"
const App = () => {
  const {theme} = useAppContext()
  useEffect(()=>{
    const htmlTag = document.documentElement!
    htmlTag.setAttribute('class',theme === 'dark' ? "dark" : "")
    theme === 'dark' && (
      document.body.setAttribute('class', 'dark:bg-slate-800')
    )
  },[theme]) 
  useEffect(()=>{
    AOS.init()
  },[])
  return (
    <div className="font-iranyekan">
      <RouterProvider router={Router} />
      <ToastContainer className="font-iranyekan" position="bottom-left" />
    </div>
  )
}

export default App
