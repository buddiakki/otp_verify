// Payment.js

import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { addDoc, collection, db } from "./firebase"; // Importing addDoc and collection

const PAYPAL_CLIENT_ID =
  "AUL-X3Qgw7pDiaWaoih8P8gO8u3RgqxsdAv8lv4P2zC2xYNxRv3MU62w-I6xHT3VLdA-dT-WiQ6Ku8R7";

const Payment = () => {
  const handleTransaction = async (details) => {
    try {
      const transactionsRef = collection(db, "transactions");
      const newTransaction = await addDoc(transactionsRef, details);
      console.log("Transaction saved with ID: ", newTransaction.id);
    } catch (error) {
      console.error("Error saving transaction: ", error);
    }
  };

  return (
    <div
      style={{
        borderRadius: "20px",
        background: "#f8f8f8", // Corrected typo here
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)", // Added valid boxShadow value
        border: "1px solid #f8f8f8",
        padding: "100px",
      }}
    >
      <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <center>
            <h1>Payments</h1>
          </center>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "100.00",
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(function (details) {
                alert(
                  "Transaction completed by " + details.payer.name.given_name
                );
                handleTransaction(details); // Save transaction details to Firebase
              });
            }}
          />
        </div>
      </PayPalScriptProvider>
    </div>
  );
};

export default Payment;
