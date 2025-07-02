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
          successNotification(
            "Login Successful",
            "Redirecting to home page..."
          );
          dispatch(setJwt(res.jwt));
          const decoded = jwtDecode(res.jwt);
          dispatch(setUser({ ...decoded, email: decoded.sub }));
          setTimeout(() => {
            navigate("/");
          }, 4000);
        })
        .catch((err) => {
          console.log(err);
          errorNotification("Login Failed", err.response.data.errorMessage);
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
        loaderProps={{ color: "blue", type: "bars" }}
      />
      {/* <div  className="w-1/2 sm-mx:w-full px-20 bs-mx:px-10 md-mx:px-5 flex flex-col gap-3 justify-center"> */}
      <div className="w-1/2 sm-mx:w-full px-20 bs-mx:px-10 md-mx:px-5 flex flex-col gap-3 justify-center bg-white p-8 rounded-lg">
        <div className="text-2xl font-semibold text-black-950">Login</div>
        <TextInput
          value={data.email}
          error={formError.email}
          name="email"
          onChange={handleChange}
          leftSection={<IconAt size={16} />}
          label="Email"
          withAsterisk
          placeholder="Your email"
          className="text-black-950" // Added black text color
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
          className="text-black-950" // Added black text color
        />
        <Button
          loading={loading}
          onClick={handleSubmit}
          autoContrast
          variant="filled"
          color="blue" // Changed button color to blue
          fullWidth
        >
          Login
        </Button>
        <div className="text-center sm-mx:text-sm xs-mx:text-xs text-black-800">
          {" "}
          Don't have an account?
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => {
              navigate("/signup");
              setFormError(form);
              setData(form);
            }}
          >
            SignUp
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
