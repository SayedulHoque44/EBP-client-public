import React from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Shared/Components/Logo";
import PButton from "../../Shared/Components/PButton";
import Container from "../../Shared/Container/Container";
import usePContext from "../../Util/Hooks/usePContext";
const ForgotPass = () => {
  const { loading, resetPassword, setLoading } = usePContext();
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    //
    resetPassword(email)
      .then((res) => {
        toast.success("Check your email for reset password!");
        setLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };
  return (
    <div
      className="py-20"
      style={{
        backgroundImage: `url(https://fastwpdemo.com/newwp/drivega/wp-content/uploads/2021/06/bg-2.jpg)`,
      }}>
      <Container>
        <h1 className="text-3xl text-center text-white mb-10">
          Enter your email to reset!
        </h1>
        <div className="flex justify-center">
          <div className="w-[500px] p-10 bg-white">
            <form
              onSubmit={handleReset}
              className="flex flex-col w-full gap-5 ">
              <div className="flex justify-center">
                <Logo />
              </div>
              <input
                type="email"
                className="p-2 border-2 border-P-primary"
                required
                name="email"
                placeholder="Enter Email"
              />
              <PButton loading={loading} type="submit" text={"Reset"} />
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

export default ForgotPass;
