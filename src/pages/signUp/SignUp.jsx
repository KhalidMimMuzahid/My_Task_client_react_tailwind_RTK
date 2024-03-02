/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAddUserMutation } from "../../app/services/userApi/userApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../app/features/auth/authSlice";

const SignUp = () => {
  const { user, isLoading: authIsLoading } = useSelector(
    (state) => state.auth.value
  );
  const dispatch = useDispatch();
  console.log({ user });
  const [addUser, { isLoading, data, isSuccess, isError, error }] =
    useAddUserMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleFormSubmit = async (data) => {
    // console.log({ data });
    addUser(data);
  };
  useEffect(() => {
    if (isError) toast.error(error?.data?.message);
    if (isSuccess) {
      toast(data?.message);
      localStorage.setItem("auth_token", data?.data?.token);
      const { name, email, _id } = data.data._doc;

      dispatch(setUser({ name, email, _id }));
    }
  }, [isError, isSuccess]);

  return (
    <Card color="transparent" className="flex-col items-center" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            {...register("name", {
              required: {
                value: true,
                message: "Please enter your name",
              },
              pattern: {
                value: /^(?!.*\s{2})[a-zA-Z\s]{1,20}$/,
                message:
                  "name can contain only letters, spaces, and underscores and length must be 1 to 20",
              },
            })}
            // aria-invalid={errors.name ? "true" : "false"}
            size="lg"
            placeholder="type your name here"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors?.name && (
            <span className="text-red-400 my-0 py-0">
              {errors?.name?.message}
            </span>
          )}

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
            aria-invalid={errors.email ? "true" : "false"}
            type="email"
            size="lg"
            placeholder="type your email here"
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
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~|]).{6,8}$/,
                message:
                  "Password must contain at least: one digit, one uppercase letter, one special character, and be 6 to 8 characters long.",
              },
            })}
            aria-invalid={errors.password ? "true" : "false"}
            type="password"
            size="lg"
            placeholder="type your password here"
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
          sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to="/signin" className=" text-gray-900">
            SIgn In
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default SignUp;
