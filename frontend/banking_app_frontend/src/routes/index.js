import NewAccount from "../components/NewAccount";
import ClosingAccount from "../components/ClosingAccount";
import ManualRefund from "../components/ManualRefund";
import ExistingUserAccount from "../components/ExistingUserAccount";
import AddingAccount from "../components/AddingAccount";
const routes=[
    {
        path:"/AddAccount",
        component: AddingAccount,
        title: "Add New Account"
    },
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
        path:"/ExistingUserAccount",
        component: ExistingUserAccount,
        title: "ExistingUserAccount"
    }
];

export default routes;