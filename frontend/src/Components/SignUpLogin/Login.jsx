import {
  Anchor,
  Button,
  Checkbox,
  LoadingOverlay,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../../Services/FormValidation";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import {
  errorNotification,
  successNotification,
} from "../../Services/NotificationService";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slices/UserSlice";
import { setJwt } from "../../Slices/JwtSlice";
import { loginUser } from "../../Services/AuthService";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const dispatch = useDispatch();
  const form = {
    email: "",
    password: "",
  };
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState(form);
  const [formError, setFormError] = useState(form);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormError({ ...formError, [event.target.name]: "" });
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    let valid = true;
    let newFormError = {};
    for (let key in data) {
      newFormError[key] = loginValidation(key, data[key]);
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    if (valid) {
      setLoading(true);
      loginUser(data)
        .then((res) => {
          successNotification("Login Successful", "Welcome back!");
          const decoded = jwtDecode(res.jwt);
          dispatch(setUser({ ...decoded, email: decoded.sub }));
          // Setting the token makes PublicRoute redirect to the user's start page
          dispatch(setJwt(res.jwt));
        })
        .catch((err) => {
          console.log(err);
          errorNotification(
            "Login Failed",
            err.response?.data?.errorMessage ||
              "Could not reach the server. Please try again in a minute."
          );
          setLoading(false);
        });
    }
  };

  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ type: "bars" }}
      />
      {/* <div  className="w-1/2 sm-mx:w-full px-20 bs-mx:px-10 md-mx:px-5 flex flex-col gap-3 justify-center"> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-1/2 sm-mx:w-full px-20 bs-mx:px-10 md-mx:px-5 flex flex-col gap-3 justify-center"
      >
        <h1 className="text-2xl font-semibold text-mine-shaft-50">Login</h1>
        <TextInput
          value={data.email}
          error={formError.email}
          name="email"
          onChange={handleChange}
          leftSection={<IconAt size={16} />}
          label="Email"
          withAsterisk
          placeholder="Your email"
          autoComplete="email"
        />
        <PasswordInput
          value={data.password}
          error={formError.password}
          name="password"
          onChange={handleChange}
          leftSection={<IconLock size={16} />}
          label="Password"
          withAsterisk
          placeholder="Password"
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={open}
          className="self-end text-sm text-mine-shaft-300 hover:text-mine-shaft-50 hover:underline"
        >
          Forgot password?
        </button>
        <Button
          type="submit"
          loading={loading}
          variant="filled"
          fullWidth
        >
          Login
        </Button>
        <div className="text-center sm-mx:text-sm xs-mx:text-xs text-mine-shaft-300">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-bright-sun-400 font-medium hover:underline"
            onClick={() => {
              navigate("/signup");
              setFormError(form);
              setData(form);
            }}
          >
            Sign up
          </button>
        </div>
      </form>
      <ResetPassword opened={opened} close={close} />
    </>
  );
};

export default Login;
