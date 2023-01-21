import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";
import SetAuthToken from "../../Utils/SetAuthToken";
import SaveDatabase from "../../Utils/SaveDatabase";
export default function Signup() {
  const [signupError, setSignupError] = useState("");
  const { signup, googleLogin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async function (data) {
    try {
      setSignupError("");
      const { name, email, password } = data;
      const result = await signup(email, password, name);
      const user = result.user;
      const userInfo = {
        name,
        email,
      };
      const jwtData = await SetAuthToken(user, logout);

      await SaveDatabase(userInfo);

      if (jwtData.token) {
        navigate(from, { replace: true });
        toast.success(`Hey ${user.displayName} 👋, your account is created!`, {
          duration: 3000,
        });
      }
    } catch (err) {
      console.error(err);
      setSignupError(err.message);
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
        navigate("/");
        toast.success(
          `Hey ${result.user.displayName} 👋, your account is created!`,
          {
            duration: 2500,
          }
        );
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="p-4 mx-auto space-y-6 rounded shadow-lg max-w-[400px] shadow-pink-200 mb-10">
      <img className="w-32 h-12 mx-auto" src={logo} alt="parlour logo" />
      <form onSubmit={handleSubmit(handleSignup)}>
        <div className="space-y-2">
          <div className="w-full form-control">
            <label className="label" htmlFor="name">
              <span className="text-base font-semibold">Full Name</span>
            </label>
            <input
              id="name"
              type="text"
              className="w-full input input-bordered"
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}

          <div className="w-full form-control">
            <label className="label">
              <span className="text-base font-semibold" htmlFor="email">
                Email
              </span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full input input-bordered"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div className="w-full form-control">
            <label className="label" htmlFor="password">
              <span className="text-base font-semibold">Password</span>
            </label>
            <input
              type="password"
              id="password"
              className="w-full input input-bordered"
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or long",
                },
                pattern: {
                  value:
                    /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*[0-9]))(?=(.*[!@#$%^&*()\-__+.]))/,
                  message:
                    "Password must contain at least one upper,lower,number and a special chracter",
                },
                required: "Password is required",
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
        </div>
        {signupError && <span className="text-red-500">{signupError}</span>}
        <button
          className="w-full mt-5 btn-primary btn-primary-full btn-tall"
          type="submit"
        >
          Signup
        </button>
      </form>
      <div className="divider">OR</div>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center w-full gap-4 btn-primary btn-primary-outline  btn-tall h-[46px]"
      >
        <FcGoogle className="w-8 h-8" />
        <span>Contiue With Google</span>
      </button>
      <span className="block text-base font-semibold">
        Already have an account?{" "}
        <Link
          to="/login"
          className="underline decoration-2 decoration-pink-500"
        >
          Login
        </Link>{" "}
        instead
      </span>
    </div>
  );
}
