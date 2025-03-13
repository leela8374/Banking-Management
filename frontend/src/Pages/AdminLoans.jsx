import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/adminLoans.css';
import axios from 'axios';

const AdminLoans = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-loans');
      setLoans(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching loans:', error);
      alert('Failed to fetch loans. Please try again later.');
    }
  };

  const approveLoan = async (id) => {
    try {
      await axios.put('http://localhost:6001/approve-loan', { id });
      alert('Loan approved!!');
      fetchLoans();
    } catch (error) {
      console.error('Error approving loan:', error);
      alert('Failed to approve loan. Please try again later.');
    }
  };

  const declineLoan = async (id) => {
    try {
      await axios.put('http://localhost:6001/decline-loan', { id });
      alert('Loan Declined!!');
      fetchLoans();
    } catch (error) {
      console.error('Error declining loan:', error);
      alert('Failed to decline loan. Please try again later.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="loans-page">
        <div className="loans">
          <h2>All loans</h2>
          <div className="loans-body">
            {loans.map((loan) => {
              return (
                <div className="loan" key={loan._id}>
                  <span>
                    <p><b>Loan type: </b>{loan.loanType}</p>
                    <p><b>Balance: </b> {loan.balance}</p>
                    <p><b>Duration: </b> {loan.duration} months</p>
                  </span>
                  <span>
                    <p><b>Nominee name: </b> {loan.nomineeName}</p>
                    <p><b>Total amount: </b> {loan.loanAmount}</p>
                    <p><b>Start Date: </b> {loan.createdDate.slice(0, 10)}</p>
                  </span>
                  <span>
                    <p><b>Customer name: </b> {loan.customerName}</p>
                    <p><b>Customer A/c id: </b>{loan.customerId}</p>
                    {loan.loanStatus === 'approved' ? (
                      <p><b>End Date: </b> {loan.endDate}</p>
                    ) : (
                      <p style={{ color: 'hsl(0, 57.90%, 96.30%)' }}>
                        <b style={{ color: 'rgb(82, 130, 151)' }}>Loan status: </b> {loan.loanStatus}
                      </p>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="loan-requests-container">
          <h3>Pending Applications</h3>
          <div className="loan-requests">
            {loans.filter((loan) => loan.loanStatus === 'pending').map((loan) => {
              return (
                <div className="loan-request" key={loan._id}>
                  <p><b>Loan type: </b>{loan.loanType}</p>
                  <p><b>Customer name: </b>{loan.customerName}</p>
                  <p><b>Customer A/c id: </b>{loan.customerId}</p>
                  <p><b>Amount: </b>{loan.loanAmount}</p>
                  <p><b>Duration: </b> {loan.duration} months</p>
                  <span>
                    <button className="btn btn-primary" onClick={() => approveLoan(loan._id)}>Approve</button>
                    <button className="btn btn-danger" onClick={() => declineLoan(loan._id)}>Decline</button>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoans;