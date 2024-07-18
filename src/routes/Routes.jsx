import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";
import DashboardLayout from "../layout/DashboardLayout";
import UserHome from "../dashboard/user/UserHome";
import UserRequest from "../dashboard/admin/UserRequest";
import AgentRequest from "../dashboard/admin/AgentRequest";
import SendMoney from "../dashboard/user/SendMoney";
import CashIn from "../dashboard/user/CashIn";
import CashInRequest from "../dashboard/agent/CashInRequest";
import CashOut from "../dashboard/user/CashOut";
import CashOutRequest from "../dashboard/agent/CashOutRequest";
import AdminHome from "../dashboard/admin/AdminHome";
import AgentHome from "../dashboard/agent/AgentHome";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path : '/',
            element: <Login></Login>
        },
        {
            path : '/register',
            element: <Registration></Registration>
        },
      ]
    },
    {
      path: 'dashboard',
      element: <DashboardLayout></DashboardLayout>,
      children:[
        // User
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
        {
          path: 'sendMoney',
          element: <SendMoney></SendMoney>
        },
        {
          path: 'cashIn',
          element: <CashIn></CashIn>
        },
        {
          path: 'cashOut',
          element: <CashOut></CashOut>
        },

        // Admin
        {
          path: 'adminHome',
          element: <AdminHome></AdminHome>
        },
        {
          path: 'userRequest',
          element: <UserRequest></UserRequest>
        },
        {
          path: 'agentRequest',
          element: <AgentRequest></AgentRequest>
        },

        // Agent
        {
          path: 'agentHome',
          element: <AgentHome></AgentHome>
        },
        {
          path: 'cashInRequest',
          element: <CashInRequest></CashInRequest>
        },
        {
          path: 'cashOutRequest',
          element: <CashOutRequest></CashOutRequest>
        },
        
      ]
    }
  ]);  