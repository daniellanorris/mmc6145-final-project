import React from "react";
import { ObFormsLogin } from "./ObFormsLogin";
import { ObFormsPassword } from "./ObFormsPassword";
import { ObFormsUsername } from "./ObFormsUsername";


export const LoginSignup = ({ className, OBFormsLoginPropertyDefaultClassName }) => {
  return (
    <div className={`login-signup ${className}`}>
      <div className="rectangle" />
      <div className="overlap-group">
        <img className="img" alt="Rectangle" src="rectangle-3.png" />
        <ObFormsUsername className="OB-forms-username-instance" property1="default" />
      </div>
      <ObFormsPassword className="OB-forms-password-instance" property1="default" />
      <ObFormsLogin className={OBFormsLoginPropertyDefaultClassName} property1="default" />
      <div className="howdy-do-your-thang">howdy! do your thang.</div>
    </div>
  );
};