"use client";
import { useState } from "react";
export default function Signup() {
  const [s, setS] = useState("");
  async function go(e) { e.preventDefault(); setS("...");
    const r = await fetch("/api/subscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: e.target.email.value }) });
    setS(r.ok ? "You're on the list." : "That didn't go through. Try again."); }
  return (<form className="signup" onSubmit={go}>
    <label>One email a week: new Texas listings, stage openings, incentive news. No spam.</label>
    <div><input name="email" type="email" required placeholder="you@company.com" /><button>Sign up</button></div>
    <small>{s}</small></form>);
}
