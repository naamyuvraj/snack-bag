// supabase/functions/create-order/index.ts
import { serve } from "https://deno.land/std/http/server.ts";
import Razorpay from "npm:razorpay";

serve(async (req) => {
  // Handle preflight (OPTIONS) request
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*", // Or your frontend domain
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const { amount, currency = "INR" } = await req.json();

    const razorpay = new Razorpay({
      key_id: Deno.env.get("RAZORPAY_KEY_ID")!,
      key_secret: Deno.env.get("RAZORPAY_KEY_SECRET")!,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
    });
    console.log("Created Razorpay order:", order);
    console.log("Razorpay order ID:");
    return new Response(JSON.stringify(order), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization", // Or your frontend domain
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Or your frontend domain
      },
    });
  }
});
