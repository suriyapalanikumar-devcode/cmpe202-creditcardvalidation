
function ExistingPayments({ getPaymentsData }) {
  return (
    <div >
      {getPaymentsData.map((payment) => (
        <div className="task">
        <br></br>
        <h2 className="h2clr"> Title: {payment.paymentTitle}</h2>
        <h3 > Payee Name: {payment.payeeName}</h3>
          <h3> Amount: {payment.amount}</h3>
          <br></br>
        </div>
        ))}
    </div>
  );
}

export default ExistingPayments;
