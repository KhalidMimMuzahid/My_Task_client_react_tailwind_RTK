import { Card, Input, Typography, Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../app/services/userApi/userApi";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { setIsLoading, setUser } from "../../app/features/auth/authSlice";

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/task";

  const dispatch = useDispatch();

  const [loginUser, { isLoading, data, isSuccess, isError, error }] =
    useLoginUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleFormSubmit = async (data) => {
    // console.log({ data });
    dispatch(setIsLoading(true));
    loginUser(data);
  };
  useEffect(() => {
    if (isError) toast.error(error?.data?.message);
    if (isSuccess) {
      console.log({ data });
      toast(data?.message);
      localStorage.setItem("auth_token", data?.data?.token);
      const { name, email, _id } = data.data.user;
      dispatch(setUser({ name, email, _id }));
      navigate(from, { replace: true });
    }
  }, [isError, isSuccess]);
  return (
    <Card color="transparent" className="flex-col items-center" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign In
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            {...register("email", {
              required: {
                value: true,
                message: "Please enter your email",
              },
            })}
            size="lg"
            placeholder="enter your email"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors?.email && (
            <span className="text-red-400 my-0 py-0">
              {errors?.email?.message}
            </span>
          )}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            {...register("password", {
              required: {
                value: true,
                message: "Please enter Password",
              },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long.",
              },
              maxLength: {
                value: 8,
                message: "Password must be at most 8 characters long.",
              },
            })}
            type="password"
            size="lg"
            placeholder="enter password"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors?.password && (
            <span className="text-red-400 my-0 py-0">
              {errors?.password?.message}
            </span>
          )}
        </div>
        <Button disabled={isLoading} type="submit" className="mt-6" fullWidth>
          sign In
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          New to Excel BD? {` `}
          <Link to="/signup" className=" text-gray-900">
            SIgn Up
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default SignIn;
