import React from "react";
import { ImSpinner9 } from "react-icons/im";

const PButton = ({ text, handleBtn, loading, className, ...rest }) => {
  return (
    <>
      {handleBtn ? (
        <button
          {...rest}
          disabled={loading}
          onClick={handleBtn}
          className={`${
            loading ? "bg-slate-300" : "bg-P-primary"
          } text-P-Black py-3 px-5 inline-block  md:text-lg text-xs ${className} rounded uppercase hover:font-semibold flex items-center justify-center`}>
          {loading ? <ImSpinner9 className="animate-spin" /> : text}
        </button>
      ) : (
        <button
          {...rest}
          disabled={loading}
          className={`${
            loading ? "bg-slate-300" : "bg-P-primary"
          } text-P-Black py-3 px-5 inline-block md:text-lg text-xs ${className} rounded uppercase hover:font-semibold flex items-center justify-center`}>
          {loading ? <ImSpinner9 className="animate-spin" /> : text}
        </button>
      )}
    </>
  );
};

export default PButton;
