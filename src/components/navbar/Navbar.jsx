import {
  Navbar as Nav,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../app/features/auth/authSlice";
function NavList() {
  const { user } = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {user?.email ? (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link to="/task" className="">
              Task
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
            onClick={() => {
              dispatch(removeUser());
            }}
          >
            <span className="">Log Out</span>
          </Typography>
        </>
      ) : (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link to="/signup" className="">
              SIgn Up
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link to="/signin" className="">
              Sign In
            </Link>
          </Typography>
        </>
      )}
    </ul>
  );
}

const Navbar = () => {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <Nav className="mx-auto  px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to="/" className="mr-4 cursor-pointer py-1.5">
          <Typography as="span" variant="h6">
            My Task
          </Typography>
        </Link>

        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Nav>
  );
};

export default Navbar;
