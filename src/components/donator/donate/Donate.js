import React, { useState } from "react";
import "./DonationForm.css";
import Pay from "./Pay";
import NavBar from "../../NavBar";
import Footer from "../../Footer";

export default function Donate() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
    console.log("Submitted:", firstName, lastName, email, amount);
  };
  const public_key = "CHAPUBK_TEST-SOd1Anrxqt8mP7SxTkz0PAK3OusVSLV0";
  const tx_ref = `${firstName}-tx-1292024`;

  return (
    <>
      <NavBar />
      <div className="donation-form">
        <h2>Make Donation</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount to Donate</label>
            <input
              type="number"
              id="amount"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          {/* <button type="submit">Donate</button> */}
          <Pay
            firstName={firstName}
            lastName={lastName}
            email={email}
            amount={amount}
            public_key={public_key}
            tx_ref={tx_ref}
          />
        </form>
      </div>
      <Footer />
    </>
  );
}
