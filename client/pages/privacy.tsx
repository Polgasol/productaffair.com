import React, { useEffect } from "react";
import { privacyPolicy } from "../public/static/policy";

const privacy = () => {
  useEffect(() => {
    const element = privacyPolicy();
    document.body.appendChild(element);

    return () => {
      document.body.removeChild(element);
    };
  }, []);
};

export default privacy;
