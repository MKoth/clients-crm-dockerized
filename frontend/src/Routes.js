import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PrivateRoute from './PrivateRoute';
import LoginRoute from './LoginRoute';
import setInterceptors from './interceptors';
import { LeftSidebar, PresentationLayout } from "./layout-blueprints";
import { userActions } from './actions/UserActions';
import { connect } from "react-redux";

const Login = lazy(() => import("./pages/Login"));
const Registration = lazy(() => import("./pages/Registration"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Company = lazy(() => import("./pages/Company"));
const Sales = lazy(() => import("./pages/Sales"));
const Statuses = lazy(() => import("./pages/Statuses"));
const Users = lazy(() => import("./pages/Users"));
const Services = lazy(() => import("./pages/Services"));
const Customers = lazy(() => import("./pages/Customers"));
const StaffAll = lazy(() => import("./pages/StaffAll"));
const Widget = lazy(() => import("./pages/Widget"));
const Payment = lazy(() => import("./pages/Payment"));
const Communication = lazy(() => import("./pages/Communication"));
const UserAddEdit = lazy(() => import("./pages/UserAddEdit"));
const GroupAddEdit = lazy(() => import("./pages/GroupAddEdit"));
const CategoryAddEdit = lazy(() => import("./pages/CategoryAddEdit"));
const ServiceAddEdit = lazy(() => import("./pages/ServiceAddEdit"));
const StaffAddEdit = lazy(() => import("./pages/StaffAddEdit"));

setInterceptors();
const Routes = (props) => {
  console.log('config routes');
  const location = useLocation();
  const { dispatch } = props;
  useEffect(() => {
    console.log(props);
    if(localStorage.getItem('key')&&props.user&&!props.user.id){
      dispatch(userActions.getMe());
    }
  });

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <AnimatePresence>
      <Suspense
        fallback={
          <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
            <div className="w-50 mx-auto">Loading...</div>
          </div>
        }
      >
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path={["/login"]}>
            <PresentationLayout>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <LoginRoute path="/login" component={Login} />
                </motion.div>
              </Switch>
            </PresentationLayout>
          </Route>
          <Route path={["/registration"]}>
            <PresentationLayout>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Route path="/registration" component={Registration} />
                </motion.div>
              </Switch>
            </PresentationLayout>
          </Route>
          <Route path={["/dashboard/company"]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute path="/dashboard/company" component={Company} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={["/dashboard/users"]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute path="/dashboard/users" component={Users} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={["/dashboard/user/:user_id"]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute path="/dashboard/user/:user_id" component={UserAddEdit} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={["/dashboard/group/:group_id"]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute path="/dashboard/group/:group_id" component={GroupAddEdit} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={["/dashboard/staff/:staff_id"]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute path="/dashboard/staff/:staff_id" component={StaffAddEdit} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={["/dashboard/staff"]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute path="/dashboard/staff" component={StaffAll} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={["/dashboard/sales"]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute path="/dashboard/sales" component={Sales} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={["/dashboard/statuses"]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute path="/dashboard/statuses" component={Statuses} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={["/dashboard/services"]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute path="/dashboard/services" component={Services} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={["/dashboard/category/:category_id"]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute path="/dashboard/category/:category_id" component={CategoryAddEdit} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={["/dashboard/service/:service_id"]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute path="/dashboard/service/:service_id" component={ServiceAddEdit} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={["/dashboard/customers"]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute path="/dashboard/customers" component={Customers} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={["/dashboard/widget"]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute path="/dashboard/widget" component={Widget} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={["/dashboard/communication"]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute path="/dashboard/communication" component={Communication} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={["/dashboard/payment"]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute path="/dashboard/payment" component={Payment} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={["/dashboard"]}>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute path="/dashboard" component={Dashboard} />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    </AnimatePresence>
  );
};

const mapStateToProps = state => ({
  user: state.user.user,
  company: state.company.company
});

//const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps)(Routes);
