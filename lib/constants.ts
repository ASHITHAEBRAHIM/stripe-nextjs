export const constants = {
  paymentLinks: {
    product1:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_eVaeVNd3b2We92g144"
        : "",
    product2:
      process.env.NODE_ENV === "development"
        ? " https://buy.stripe.com/test_4gw7tlfbj40i2DS3cd"
        : "",
    product3:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_fZe7tl5AJ9kCemA002"
        : "",
    product4:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_bIY3d53sBaoGfqE28b"
        : "",
  },
};
