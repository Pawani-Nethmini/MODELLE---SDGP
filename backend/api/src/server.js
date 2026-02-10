// import app from "./app.js";

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Payment service running on port ${PORT}`);
// });

import dotenv from "dotenv";
dotenv.config(); 

import app from "./app.js";

const PORT = process.env.PORT || 5000;

console.log("ENV CHECK:", {
  MERCHANT_ID: process.env.PAYHERE_MERCHANT_ID,
  SECRET: process.env.PAYHERE_MERCHANT_SECRET
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
