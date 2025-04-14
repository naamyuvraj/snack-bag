// supabase/functions/create-order/index.ts
import { serve } from "https://deno.land/std/http/server.ts";
import Razorpay from "npm:razorpay";

serve(async (req) => {
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

    return new Response(JSON.stringify(order), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
});
