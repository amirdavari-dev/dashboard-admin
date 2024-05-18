import { httpService } from "@/core/http-service";
import {
  FormHookType,
  OnSubmitPropFunc,
  RegisterAction,
  RouteErrorItem,
} from "@/types/identity";
import fak from "@assets/images/fak.png";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Link,
  redirect,
  useNavigation,
  useRouteError,
  useSubmit,
} from "react-router-dom";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();
  const submitForm = useSubmit();
  const onSubmit = (data: OnSubmitPropFunc) => {
    submitForm(data, { method: "post" });
  };
  const navigation = useNavigation();
  const isSubmiting = navigation.state !== "idle";
  const routeErrors: any = useRouteError();
  return (
    <>
      <div className="text-center">
        <div>
          <img width={150} className="mx-auto" src={fak} alt="Logo" />
        </div>
        <h5 className="dark:text-slate-300">{t("login.title")}</h5>
        <p className="text-xs opacity-65 my-1 dark:text-slate-300">
          {t("login.introMessage")}
        </p>
        <p className="text-xs opacity-80 mt-3">
          <span className="dark:text-slate-300">
            {t("login.areNotRegistered")}{" "}
          </span>
          <Link className="text-blue-500 opacity-100" to="/register">
            {t("login.register")}
          </Link>
        </p>
      </div>
      <div className="mt-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="identity-box mb-2">
            <label
              className="opacity-80 text-sm dark:text-slate-100"
              htmlFor="phone"
            >
              {t("login.mobile")}
            </label>
            <input
              {...register("mobile", {
                required: t("login.validation.mobileRequired"),
                minLength: 11,
                maxLength: 11,
              })}
              className={`form-identity-input dark:bg-slate-800 dark:text-white ${
                errors.mobile && "invalid-identity"
              }`}
              autoComplete="off"
              type="text"
              id="phone"
            />
            {errors.mobile && errors.mobile.type === "required" && (
              <p className="text-xs text-rose-600 my-1">
                {(errors as FormHookType).mobile?.message}
              </p>
            )}
            {errors.mobile &&
              (errors.mobile.type === "maxLength" ||
                errors.mobile.type === "minLength") && (
                <p className="text-xs text-rose-600 my-1">
                  {t("login.validation.mobileLength")}
                </p>
              )}
          </div>
          <div className="identity-box">
            <label
              className="opacity-80 text-sm dark:text-slate-100"
              htmlFor="pass"
            >
              {t("login.password")}
            </label>
            <input
              {...register("password", {
                required: t("login.validation.passwordRequired"),
              })}
              className={`form-identity-input dark:bg-slate-800 dark:text-white ${
                errors.password && "invalid-identity"
              }`}
              autoComplete="off"
              type="password"
              id="pass"
            />
            {errors.password && errors.password.type === "required" && (
              <p className="text-xs text-rose-600 my-1">
                {(errors as FormHookType).password?.message}
              </p>
            )}
          </div>
          <div className="text-center mb-2 mt-5">
            <button
              disabled={isSubmiting}
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md text-sm hover:bg-slate-700 transition-all"
            >
              {isSubmiting ? t("login.signinin") : t("login.signin")}
            </button>
          </div>
          {routeErrors && (
            <div className="text-center p-2">
              {routeErrors.response?.data.map((index : number,error: RouteErrorItem) => {
                return (
                  <p key={index} className="text-rose-500 text-xs p-2 rounded-md">
                    <span>{t("login.validation.titleError")} : </span>
                    <span>{t(`login.validation.${error.code}`)}</span>
                  </p>
                );
              })}
            </div>
          )}
        </form>
      </div>
    </>
  );
};
export default Login;
export const LoginAction = async ({ request }: RegisterAction) => {
  // const now = new Date();
  // let expireDay = now.setTime(now.getTime() + 2 * 24 * 60 * 60 * 1000);
  // document.cookie = `token = amir ; path= / ; expires = ${expireDay}`;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post("/Users/login", data);
  if (response.status === 200) {
    localStorage.setItem("token", response?.data.token);
    return redirect('/')
  }
};
