import { FaTimes } from "react-icons/fa";

function ExistingPayments({ getPaymentsData }) {
  return (
    <div >
      {getPaymentsData.map((payment) => (
        <div className="task">
        <br></br>
          <h2 className="h2clr"> Payee Name: {payment.payeeName} <FaTimes
          style={{ color: "black", cursor: "pointer"}}
          
        /></h2>
        
          <h3> Amount: ${ `${payment.amount}`}</h3>
          <h3> Auto-payment Date: {payment.nextDueDate}</h3>
         
          <br></br>
        </div>
        ))}
    </div>
  );
}

export default ExistingPayments;
