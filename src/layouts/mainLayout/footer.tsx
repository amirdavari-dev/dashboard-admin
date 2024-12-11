import { useTranslation } from "react-i18next"

const Footer =()=>{
  const {t}= useTranslation()
    return(
        <footer className="mt-auto w-full fixed bottom-0 bg-white dark:bg-slate-800 p-1 border-t border-slate-300 shadow-xl dark:border-slate-500">
          <div>
            <p className="dark:text-white text-slate-600 text-sm text-center lg:text-start px-2">
              {t("azpo")}
            </p>
          </div>
        </footer>
    )
}
export default Footer