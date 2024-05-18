import {
  FormHookType,
  FormIdentityData,
  RegisterAction,
  RouteErrorItem,
} from "../../../types/identity";
import fak from "@assets/images/fak.png"
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
  useRouteError,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { httpService } from "@/core/http-service";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // translation
  const { t } = useTranslation();
  const submitForm = useSubmit();
  const onSubmit = (data: FormIdentityData) => {
    const { confirmPassword, ...userData } = data;
    submitForm(userData, { method: "post" });
  };
  const navigation = useNavigation();
  const isSubmiting = navigation.state !== "idle";
  const isSuccessOprationMain: unknown | boolean = useActionData();
  const [isSuccessOpration, setIsSuccessOpration] = useState<boolean>(false);
  useEffect(() => {
    setIsSuccessOpration(
      typeof isSuccessOprationMain === "boolean" && isSuccessOprationMain
    );
  }, [isSuccessOprationMain]);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccessOpration) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [isSuccessOpration]);
  const routeErrors: any = useRouteError();
  return (
    <>
      <div className="text-center">
        <div>
          <img width={150} className="mx-auto" src={fak} alt="Logo"  />
        </div>
        <h5 className="dark:text-slate-300">{t("register.title")}</h5>
        <p className="text-xs opacity-65 my-1 dark:text-slate-300">
          {t("register.introMessage")}
        </p>
        <p className="dark:text-slate-300 text-xs opacity-80 mt-3">
          <span>{t("register.alreadyRegistered")} </span>
          <Link className="text-blue-500 opacity-100" to="/login">
            {t("register.signin")}
          </Link>
        </p>
      </div>
      <div className="mt-3 p-2 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="identity-box mb-2">
            <label className="opacity-80 text-sm dark:text-slate-100 mb-1" htmlFor="phone">
              {t("register.mobile")}
            </label>
            <input
              {...register("mobile", {
                required: t("register.validation.mobileRequired"),
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
                  {t("register.validation.mobileLength")}
                </p>
              )}
          </div>
          <div className="identity-box">
            <label className="opacity-80 text-sm dark:text-slate-100 mb-1" htmlFor="pass">
              {t("register.password")}
            </label>
            <input
              {...register("password", {
                required: t("register.validation.passwordRequired"),
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
          <div className="identity-box">
            <label className="opacity-80 text-sm dark:text-slate-100" htmlFor="pass-rpt">
              {t("register.repeatPassword")}
            </label>
            <input
              {...register("confirmPassword", {
                required: t("register.validation.repeatPasswordRequired"),
                validate: (value: string) => {
                  if (watch("password") !== value) {
                    return t("register.validation.notMatching");
                  }
                },
              })}
              className={`form-identity-input dark:bg-slate-800 dark:text-white ${
                errors.confirmPassword && "invalid-identity"
              }`}
              autoComplete="off"
              type="password"
              id="pass-rpt"
            />
            {errors.confirmPassword &&
              errors.confirmPassword.type === "required" && (
                <p className="text-xs text-rose-600 my-1">
                  {(errors as FormHookType).confirmPassword?.message}
                </p>
              )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <p className="text-xs text-rose-600 my-1">
                  {(errors as FormHookType).confirmPassword?.message}
                </p>
              )}
          </div>
          <div className="text-center mb-2 mt-5">
            <button
              type="submit"
              disabled={isSubmiting}
              className="bg-blue-500 text-white p-2 rounded-md text-sm hover:bg-slate-700 transition-all"
            >
              {isSubmiting ? t("register.saving") : t("register.register")}
            </button>
          </div>
          {isSuccessOpration && (
            <div className="text-center p-2 ">
              <p className="text-green-600 text-xs p-2 bg-green-200 rounded-md">
                {t("register.successOperation")}
              </p>
            </div>
          )}
          {routeErrors && (
            <div className="text-center p-2">
              {routeErrors.response?.data.map((index : number,error: RouteErrorItem) => {
                return (
                  <p key={index} className="text-rose-500 text-xs p-2 rounded-md">
                    <span>{t("register.validation.titleError")}</span>
                    <span>{t(`register.validation.${error.code}`)}</span>
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
export default Register;
export const registerAction = async ({ request }: RegisterAction) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post("/Users", data);
  return response.status === 200;
};
