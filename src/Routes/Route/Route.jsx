import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import Main from "../../Layout/Main/Main";
import Blog from "../../Pages/Blog/Blog";
import AllBuyer from "../../Pages/Dashboard/AdminRoute/AllBuyer";
import AllSeller from "../../Pages/Dashboard/AdminRoute/AllSeller/AllSeller";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import Payment from "../../Pages/Dashboard/Dashboard/Payment/Payment";
import MyOrders from "../../Pages/Dashboard/MyOrder/MyOrders";
import Reports from "../../Pages/Dashboard/Rports/Reports";
import AddProduct from "../../Pages/Dashboard/SellerRoute/AddProduct/AddProduct";
import MyProduct from "../../Pages/Dashboard/SellerRoute/Myproduct/MyProduct";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Login/Register";
import MainProduct from "../../Pages/Products/MainProduct/MainProduct";
import Report from "../../Pages/Report/Report";

import Errorpage from "../../Pages/shared/ErrorPage/Errorpage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <Errorpage></Errorpage>,
        children: [

            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>,

            },
            {
                path: '/products/:category',
                element: <PrivateRoute><MainProduct></MainProduct></PrivateRoute>,
                loader: ({ params }) => fetch(`https://resale-server-ten.vercel.app/products/${params.category}`)
            },
            {
                path: '/blog',
                element: <Blog></Blog>,
            }

        ]
    },
    {
        path: '/dashboard',
        errorElement: <Errorpage></Errorpage>,
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/allseller',
                element: <AllSeller></AllSeller>
            },
            {
                path: '/dashboard/allbuyer',
                element: <AllBuyer></AllBuyer>
            },
            {
                path: '/dashboard/addproduct',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/myproduct/:email',
                element: <MyProduct></MyProduct>,
                loader: ({ params }) => fetch(`https://resale-server-ten.vercel.app/dashboard/myproduct/${params.email}`)
            },
            {
                path: '/dashboard/myorder',
                element: <MyOrders></MyOrders>,

            },
            {
                path: '/dashboard/payment/:id',
                // element: <AdminRoute><Payment></Payment></AdminRoute>,
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://resale-server-ten.vercel.app/orders/${params.id}`)
            },
            {
                path: '/dashboard/report/:id',
                element: <PrivateRoute><Report></Report></PrivateRoute>,
                loader: ({ params }) => fetch(`https://resale-server-ten.vercel.app/product/${params.id}`)
            },
            {
                path: '/dashboard/reported',
                element: <PrivateRoute><Reports></Reports></PrivateRoute>,

            },
        ]
    }

])