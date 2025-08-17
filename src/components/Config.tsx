"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { alreadyHaveAdmin, createAdmin, checkEnv } from "@/utils/config";

import { Check, Loader2 } from "lucide-react"

export default function Config() {
  const [errors, setErrors] = useState<string[]>([])
  const [step, setStep] = useState(0);
  const [hasAdmin, setHasAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function fillErrors() {
      setErrors(await checkEnv())
    };
    fillErrors();
  }, []);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
    if (step === 2) {
      router.push("/dashboard");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    createAdmin(username as string, password as string)
      .then(() => {
        setLoading(false);
        alert("Admin user created successfully");
        setHasAdmin(true);
      })
      .catch((error) => {
        setLoading(false);
        alert(`Error creating admin user: ${error.message}`);
      });
  };

  useEffect(() => {
    const checkAdmin = async () => {
      setHasAdmin(await alreadyHaveAdmin());
    };
    checkAdmin();
  }, []);

  return (
    <div className="config-container">
      <div className="steps">
        <div className={`step-1 ${step < 1 ? "" : "checked"}`}>
            {step < 1 ? "1" : (<Check />)}
        </div>
        <hr className="border-plume1 border-2 w-10" />
        <div className={`step-2 ${step < 2 ? "" : "checked"}`}>
            {step < 2 ? "2" : (<Check />)}
        </div>
        <hr className="border-plume1 border-2 w-10" />
        <div className={`step-3 ${step < 3 ? "" : "checked"}`}>
            {step < 3 ? "3" : (<Check />)}
        </div>
      </div>
      <div className="step">
        {step === 0 && (
          <div>
            <h2>Step 1: Check Environment Variables</h2>
            <p>Ensure the following environment variables are set:</p>
            <ul>
              {errors.length > 0 ? (
                errors.map((error, index) => <li key={index} className="text-plume12 font-semibold">{error}</li>)
              ) : (
                <li className="text-plume14">All required environment variables are set, you can proceed to the next step.</li>
              )}
            </ul>
          </div>
        )}
        {step === 1 && (
          <div>
            <h2>Step 2: Create the admin user</h2>
            <p>Fill in the details below to create the admin user:</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
              </div>
              <button type="submit" className="button-primary flex items-center justify-center w-full mt-5" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : "Create Admin User"}
              </button>
            </form>
            {hasAdmin ? (
              <p className="text-plume14">You already have an admin user.</p>
            ) : ""}
          </div>
        )}
        {step > 1 && (
          <div>
            <h2>Configuration is complete</h2>
            <p>Press the “Finish” button to be redirected to the dashboard</p>
          </div>
        )}
      </div>
      <div className="actions">
        <button onClick={() => setStep(step - 1)} disabled={step === 0}>
          Back
        </button>
        <button onClick={handleNext} disabled={step === 3 || (step === 1 && !hasAdmin) || (step === 0 && errors.length > 0)}>
            {step > 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  )
}