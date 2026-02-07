import { useState } from "react";
import CTA from "../CTA";

export default function PaymentCard({ printerDetails, onPaymentComplete }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Sri Lanka"
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  /**
   * CORRECT PAYMENT FLOW (3-Tier Architecture)
   * 1. Frontend validates & collects data
   * 2. Backend creates order + generates hash
   * 3. Frontend starts PayHere payment using backend response
   */
  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setErrors({});

    try {
      // STEP 1: Request payment details from backend
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          printerId: printerDetails?.id,
          customer: formData
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create payment");
      }

      const paymentData = await response.json();

      // STEP 2: Start PayHere payment using backend-generated data
      window.payhere.startPayment({
        sandbox: true,
        merchant_id: paymentData.merchant_id,
        order_id: paymentData.order_id,
        items: paymentData.items,
        amount: paymentData.amount,
        currency: "LKR",
        hash: paymentData.hash,

        return_url: window.location.href,
        cancel_url: window.location.href,
        notify_url: paymentData.notify_url,

        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country
      });

      // STEP 3: PayHere event listeners (UI feedback only)
      window.payhere.onCompleted = function (orderId) {
        setIsProcessing(false);
        if (onPaymentComplete) {
          onPaymentComplete({ success: true, orderId });
        }
      };

      window.payhere.onDismissed = function () {
        setIsProcessing(false);
      };

      window.payhere.onError = function () {
        setIsProcessing(false);
        setErrors({ payment: "Payment failed. Please try again." });
      };

    } catch (err) {
      setIsProcessing(false);
      setErrors({ payment: err.message || "Something went wrong" });
    }
  };

  return (
    <>
      <section style={styles.container}>
        <h1 style={styles.title}>Complete Your Order</h1>
        <p style={styles.subtitle}>Secure payment powered by PayHere</p>

        <div style={styles.layout}>
          {/* Order Summary */}
          <div style={styles.summarySection}>
            <div style={styles.summaryCard}>
              <h2 className="section-title" style={styles.sectionTitle}>Order Summary</h2>

              <div style={styles.summaryItem}>
                <div style={styles.itemDetails}>
                  <h3 style={styles.itemTitle}>{printerDetails?.name || "3D Printing Service"}</h3>
                  <p style={styles.itemDescription}>
                    {printerDetails?.description || "Professional 3D printing for your model"}
                  </p>
                </div>
              </div>

              <div style={styles.priceBreakdown}>
                <div style={styles.priceRow}>
                  <span>Printing Cost</span>
                  <span>LKR {printerDetails?.price || "5,000.00"}</span>
                </div>
                <div style={styles.priceRow}>
                  <span>Platform Fee</span>
                  <span>Included</span>
                </div>
                <div style={styles.priceRowTotal}>
                  <span>Total</span>
                  <span style={styles.totalAmount}>LKR {printerDetails?.price || "5,000.00"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div style={styles.formSection}>
            <div style={styles.formCard}>
              <h2 className="section-title" style={styles.sectionTitle}>Billing Information</h2>

              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>First Name</label>
                  <input name="firstName" value={formData.firstName} onChange={handleInputChange} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Last Name</label>
                  <input name="lastName" value={formData.lastName} onChange={handleInputChange} style={styles.input} />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input name="email" value={formData.email} onChange={handleInputChange} style={styles.input} />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone</label>
                <input name="phone" value={formData.phone} onChange={handleInputChange} style={styles.input} />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Address</label>
                <input name="address" value={formData.address} onChange={handleInputChange} style={styles.input} />
              </div>

              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>City</label>
                  <input name="city" value={formData.city} onChange={handleInputChange} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Country</label>
                  <select name="country" value={formData.country} onChange={handleInputChange} style={styles.input}>
                    <option value="Sri Lanka">Sri Lanka</option>
                  </select>
                </div>
              </div>

              {errors.payment && <p style={styles.errorMessage}>{errors.payment}</p>}

              <div style={styles.paymentActions}>
                <CTA
                  text={isProcessing ? "Processing..." : "Pay with PayHere"}
                  onClick={() => {
                    setShowPayment(true);
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }, 100);
                  }}

                  disabled={isProcessing}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const styles = {
  container: { maxWidth: "1400px", margin: "2rem auto", padding: "0 20px" },
  title: { fontSize: "32px", marginBottom: "10px", color: "#00f5ff", textAlign: "center" },
  subtitle: { color: "#94a3b8", marginBottom: "40px", textAlign: "center" },
  layout: { display: "grid", gridTemplateColumns: "450px 1fr", gap: "2rem" },
  summarySection: { position: "sticky", top: "2rem" },
  summaryCard: { background: "rgba(255,255,255,0.02)", border: "1px solid #334155", borderRadius: "16px", padding: "24px" },
  sectionTitle: { fontSize: "1.5rem", marginBottom: "1.5rem" },
  summaryItem: { marginBottom: "24px" },
  itemDetails: {},
  itemTitle: { fontSize: "18px", color: "#e2e8f0" },
  itemDescription: { fontSize: "14px", color: "#94a3b8" },
  priceBreakdown: { borderTop: "1px solid #334155", paddingTop: "16px" },
  priceRow: { display: "flex", justifyContent: "space-between", padding: "12px 0", color: "#94a3b8" },
  priceRowTotal: { display: "flex", justifyContent: "space-between", borderTop: "1px solid #334155", marginTop: "8px", paddingTop: "16px", color: "#e2e8f0" },
  totalAmount: { color: "#00f5ff", fontSize: "24px" },
  formSection: {},
  formCard: { background: "rgba(255,255,255,0.02)", border: "1px solid #334155", borderRadius: "16px", padding: "32px" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  formGroup: { marginBottom: "20px" },
  label: { display: "block", marginBottom: "8px", color: "#e2e8f0" },
  input: { width: "100%", padding: "12px", background: "rgba(15,23,42,0.6)", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0" },
  errorMessage: { color: "#ef4444", textAlign: "center" },
  paymentActions: { marginTop: "24px", display: "flex", justifyContent: "center" }
};
