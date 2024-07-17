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

        // Admin
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
          path: 'cashInRequest',
          element: <CashInRequest></CashInRequest>
        },
        
      ]
    }
  ]);  