import React from "react";
import {Route, Switch} from "react-router-dom";
import Signin from "./User components/Signin";
import Signup from "./User components/Signup";
import home from "./User components/home";
import ForgotPassword from "./User components/ForgotPassword";
import ResetPassword from "./User components/ResetPassword";

const MainRouter = () => (
    <div>
        <Switch>
            <Route exact path="/home" component={home} />
            <Route exact path = "/signin" component={Signin} />
            <Route exact path = "/signup" component={Signup} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
        </Switch>
    </div>
);

export default MainRouter;