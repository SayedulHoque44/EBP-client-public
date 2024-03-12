import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { TiInfo } from "react-icons/ti";
import "react-phone-number-input/style.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Shared/Components/Logo";
import PButton from "../../Shared/Components/PButton";
import Container from "../../Shared/Container/Container";
import bg2 from "../../assets/Images/bg-2.jpg";
import flag from "../../assets/Images/flag.png";
import { useRegisterMutation } from "../../redux/Api/AuthApi/AuthApi";

const Register = () => {
  const [show, setShow] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pin, setPin] = useState("");
  const [cPin, setCpin] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [registration] = useRegisterMutation();

  // handlePin
  const handlePin = (e) => {
    const value = e.target.value;

    if (/^[1-9]\d{0,5}$|^$/.test(value)) {
      if (!/(\d)\1{3,}/.test(value)) {
        setPin(value);
      } else {
        toast.error("দুর্বল পিন প্রযোজ্য নয়, আবার পিন দিয়ে চেষ্টা করুন।");
      }
    } else {
      toast.error("পিন মিনিমাম ৪-৬ সংখ্যা এর হতে হবে।");
    }
  };
  // handlePin
  const handleCPin = (e) => {
    const value = e.target.value;

    if (/^\d{0,6}$/.test(value)) {
      setCpin(value);
    } else {
      toast.error("পিন মিনিমাম ৪-৬ সংখ্যা এর হতে হবে।");
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

  // handleSubmit -- Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    // const email = form.email.value.toLowerCase();

    const name = form.name.value;
    const city = form.city.value;

    // phone check
    if (phone.length < 10) {
      toast.error("মোবাইল নাম্বার ১০ ডিজিট এর হতে হবে.");
      return;
    }

    //Check Pin
    if (pin.length < 4) {
      toast.error("পিন মিনিমাম ৪-৬ ডিজিটের হতে হবে.");
      return;
    }
    if (pin !== cPin) {
      toast.error("পিন দুটি একই হতে হবে। দয়াকরে আবার চেক করুন.");
      return;
    }
    const userData = {
      name,
      phone: `+39${phone}`,
      city,
      pin: Number(pin),
    };

    // Register
    const registerUser = await registration(userData);

    if (registerUser?.data?.success) {
      toast.success(registerUser.data.message);
      navigate("/login");
    } else if (registerUser?.error) {
      toast.success(registerUser.error.data.message);
    }
    setLoading(false);
  };

  return (
    <div
      className="py-20"
      style={{
        backgroundImage: `url(${bg2})`,
      }}>
      <Container>
        <h1 className="text-3xl text-center text-white mb-10">
          Please Register a account!
        </h1>

        <div className="flex justify-center">
          <div className="w-[500px] p-10 bg-white">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full gap-5 ">
              <div className="flex flex-col justify-center items-center">
                <Logo />
                <p className="text-center mt-1 text-warning font-semibold text-sm ">
                  <TiInfo className="inline text-4xl" /> আপনার ইনফরমেশনগুলো
                  ভালোভাবে ছেক করে দিবেন, এগুলা খুবই গুরুত্বপূর্ণ, সঠিক নাম্বার
                  না দিলে আপনাকে বাতিল করা হবে।
                </p>
              </div>
              <input
                type="text"
                className="p-2 outline-none border-b-2 border-P-primary"
                required
                name="name"
                placeholder="Your Full Name"
              />
              <div className="flex  border-b-2 border-P-primary items-center justify-between gap-2">
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
              {error && (
                <p className="text-error">আপনাকে ইতালি নাম্বার দিতে হবে।</p>
              )}
              <input
                type="text"
                className="p-2 outline-none border-b-2 border-P-primary"
                required
                name="city"
                placeholder="Your City"
              />
              {/* </div> */}
              <input
                type={show ? "text" : "password"}
                required
                name="pin"
                onChange={handlePin}
                value={pin}
                className="p-2 outline-none border-b-2 border-P-primary "
                placeholder="New Pin"
              />
              <input
                type={show ? "text" : "password"}
                required
                name="Cpin"
                onChange={handleCPin}
                value={cPin}
                className="p-2 outline-none border-b-2 border-P-primary"
                placeholder="Confirm Pin"
              />
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  id="show"
                  onChange={(e) => setShow(e.target.checked)}
                />
                <label htmlFor="show">Show Pin</label>
              </div>
              <PButton loading={loading} type="submit" text={"Submit"} />
            </form>

            <p className="mt-5">
              Already Have Account ?{" "}
              <Link to={"/login"} className="text-blue-700">
                {" "}
                Login Now.
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
