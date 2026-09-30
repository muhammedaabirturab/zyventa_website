/**
 * Payment methods offered at checkout.
 *
 * No online payment provider has been connected yet, so orders are placed as
 * Cash on Delivery and stored with paymentStatus "UNPAID".
 *
 * HOW TO ADD AN ONLINE PAYMENT GATEWAY (Razorpay, Stripe, PayU, ...):
 *   1. Add the provider's keys to .env (never commit them) and .env.example.
 *   2. Add a method below, e.g. { id: "ONLINE", label: "Pay online", ... }.
 *   3. In placeOrder (src/app/(store)/checkout/actions.ts), after the order is
 *      created, create a payment session with the provider for `order.total`
 *      and return its redirect URL / client token instead of the confirmation URL.
 *   4. Add a webhook route (e.g. src/app/api/payments/webhook/route.ts) that
 *      verifies the provider's signature and sets the order's paymentStatus
 *      to "PAID" (and status to "CONFIRMED").
 * Never mark an order as paid based on a redirect from the browser alone.
 */
export const paymentMethods = [
  {
    id: "COD",
    label: "Cash on delivery",
    description: "Pay when your order is delivered to your door.",
    enabled: true,
  },
] as const;

export type PaymentMethodId = (typeof paymentMethods)[number]["id"];

export const paymentMethodLabels: Record<string, string> = Object.fromEntries(
  paymentMethods.map((m) => [m.id, m.label]),
);
