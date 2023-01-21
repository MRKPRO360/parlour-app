import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";
import SetAuthToken from "../../Utils/SetAuthToken";
import SaveDatabase from "../../Utils/SaveDatabase";
export default function Login() {
  const { login, googleLogin, logout } = useAuth();
  const navigate = useNavigate("");
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState("");

  const handleLogin = async function (data) {
    try {
      setLoginError("");
      const { email, password } = data;
      const result = await login(email, password);
      const user = result.user;

      const jwtData = await SetAuthToken(user, logout);

      if (jwtData.token) {
        navigate(from, { replace: true });
        toast.success("Successfully logged in :)", {
          duration: 2500,
        });
      }
    } catch (err) {
      console.error(err);
      setLoginError(err.message);
    }
  };

  const handleGoogleLogin = async function () {
    try {
      const result = await googleLogin();

      const user = result.user;
      const userInfo = {
        name: user.displayName,
        email: user.email,
      };

      const jwtData = await SetAuthToken(user, logout);

      if (jwtData.token) {
        await SaveDatabase(userInfo);
        navigate(from, { replace: true });
        toast.success(
          `Hey ${user.displayName} 👋, you're Successfully logged in!`,
          {
            duration: 3000,
          }
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 mx-auto space-y-6 rounded shadow-lg max-w-[400px] shadow-pink-200">
      <img className="w-32 h-12 mx-auto" src={logo} alt="parlour logo" />
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="space-y-2">
          <div className="w-full form-control">
            <label className="label" htmlFor="email">
              <span className="text-base font-semibold">Email</span>
            </label>
            <input
              id="email"
              type="email"
              className="w-full input input-bordered"
              {...register("email", { required: true })}
            />
            {errors?.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div className="w-full form-control">
            <label className="label" htmlFor="password">
              <span className="text-base font-semibold">Password</span>
            </label>
            <input
              id="password"
              type="password"
              className="w-full input input-bordered"
              {...register("password", { required: true })}
            />
            {errors?.password && (
              <span className="text-red-500">Password is required</span>
            )}

            <label className="label">
              <span className="text-base font-semibold">Forgot Password?</span>
            </label>
          </div>
        </div>
        {loginError && <span className="text-red-500">{loginError}</span>}
        <button
          className="w-full mt-5 btn-primary btn-primary-full btn-tall"
          type="submit"
        >
          Login
        </button>
      </form>
      <div className="divider">OR</div>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center w-full gap-4 btn-primary btn-primary-outline btn-tall h-[46px]"
      >
        <FcGoogle className="w-8 h-8" />
        <span>Contiue With Google</span>
      </button>
      <span className="block text-base font-semibold">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="underline decoration-2 decoration-pink-500"
        >
          Signup
        </Link>{" "}
        now
      </span>
    </div>
  );
}
