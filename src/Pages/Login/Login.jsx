import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Shared/Components/Logo";
import PButton from "../../Shared/Components/PButton";
import Container from "../../Shared/Container/Container";
import { handleAxiosResponseError } from "../../Util/Hooks/useAxiosSecure";
import usePContext from "../../Util/Hooks/usePContext";
import flag from "../../assets/Images/flag.png";
import { useLoginMutation } from "../../redux/Api/AuthApi/AuthApi";
import { setUser } from "../../redux/Features/Auth/authSlice";

// export const checkMatchAnyDevice = (userDevices, currentDevice) => {
//   let matched = false;
//   for (let device of userDevices) {
//     if (device.deviceInfo === currentDevice) {
//       matched = true;
//       break;
//     }
//   }
//   return matched;
// };

const Login = () => {
  const [show, setShow] = useState();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const { authReresh, setAuthReresh, setLoggedUser } = usePContext();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
  const handlePin = (e) => {
    const value = e.target.value;

    if (/^\d{0,6}$/.test(value)) {
      setPin(value);
    }
  };

  // handlePhone
  const handlePhone = (e) => {
    const value = e.target.value;

    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    } else {
      toast.error("মোবাইল নাম্বার ১০ ডিজিট এর হতে হবে.");
    }
  };

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const deviceInfo = navigator.userAgent;
    const userData = {
      phone: `+39${phone}`,
      pin: Number(pin),
      deviceInfo,
    };

    // Register
    try {
      setLoading(true);
      // api req for login user
      const getUser = await login(userData);

      if (getUser?.data?.success) {
        // user and token found
        const user = getUser.data.data?.user;
        const token = getUser.data.data?.token;
        toast.success(getUser.data.message);
        // set token
        dispatch(setUser({ token }));
        // setTokenToLocalStorage(token);
        // setAuthReresh(!authReresh);
        setLoggedUser(user);
        navigate("/dashboard");
      }
      if (getUser?.error) {
        toast.error(getUser.error.data.message);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleAxiosResponseError(error);
    }
    setLoading(false);
  };

  return (
    <div
      className="py-20"
      style={{
        backgroundImage: `url(https://i.ibb.co/Ssv60tX/bg-2.jpg)`,
      }}>
      <Container>
        <h1 className="text-3xl text-center text-white mb-10">
          Log in to your account!
        </h1>
        <div className="flex justify-center">
          <div className="w-[500px] p-10 bg-white">
            <form
              onSubmit={handleLogin}
              className="flex flex-col w-full gap-5 ">
              <div className="flex justify-center">
                <Logo />
              </div>
              <div className="flex items-center  justify-between gap-2 border-b-2 border-P-primary">
                <img src={flag} alt="" className="w-5" />
                <span className="inline-block ">+39</span>
                <input
                  type="Phone"
                  className="p-2 outline-none flex-1"
                  required
                  onChange={handlePhone}
                  value={phone}
                  name="Phone"
                  placeholder="Your Phone number"
                />
              </div>
              <input
                type={show ? "text" : "password"}
                required
                onChange={handlePin}
                value={pin}
                name="pin"
                className="p-2 outline-none border-b-2 border-P-primary"
                placeholder="Your Pin"
              />
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id="show"
                  onChange={(e) => setShow(e.target.checked)}
                />
                <label htmlFor="show">Show Pin</label>
              </div>
              <div>
                <a
                  href={`tel:+39 320 608 8871`}
                  className="text-blue-700 font-light cursor-pointer inline-block">
                  Forgot Pin..? contact us: +39 320 608 8871
                </a>
              </div>
              <PButton loading={loading} type="submit" text={"Log in"} />
            </form>

            <p className="mt-5">
              Don't Have Account ?{" "}
              <Link to={"/register"} className="text-blue-700 ">
                {" "}
                Register Now.
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
