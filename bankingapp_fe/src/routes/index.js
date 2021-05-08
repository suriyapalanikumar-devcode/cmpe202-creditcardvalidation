import ClosingAccount from "../components/ClosingAccount";
import ManualRefund from "../components/ManualRefund";
import AddingAccount from "../components/AddingAccount";

const routes=[
    {
        path:"/CloseAccount",
        component: ClosingAccount,
        title: "Close Account"
    },
    {
        path:"/ManualRefund",
        component: ManualRefund,
        title: "Manual Refund"
    },
    {
        path:"/AddingAccount",
        component: AddingAccount,
        title: "Add New Account"
    },
];

export default routes;