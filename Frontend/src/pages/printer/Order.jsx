import React, { useState } from "react";
import PaymentCard from "../components/PaymentCard";
import CTA from "../components/CTA";

export default function OrderPage() {
  const [showPayment, setShowPayment] = useState(false);

  const printerDetails = {
    id: "PRN-001",
    name: "High Quality PLA Print",
    description: "Layer height 0.2mm • PLA material",
    price: "5000.00"
  };

  return (
    <div style={{ padding: "40px" }}>
      {/* Order info */}
      <h1 style={{ color: "#e2e8f0" }}>Your Order</h1>
      <p style={{ color: "#94a3b8" }}>
        Review your order and proceed to payment
      </p>

      {/* CTA Button */}
      {!showPayment && (
        <CTA
          text="Proceed to Payment"
          variant="primary"
          onClick={() => setShowPayment(true)}
        />
      )}

      {/* Payment Panel */}
      {showPayment && (
        <PaymentCard
          printerDetails={printerDetails}
          onPaymentComplete={(result) => {
            console.log("Payment result:", result);
            // navigate to success page / show confirmation
          }}
        />
      )}
    </div>
  );
}
