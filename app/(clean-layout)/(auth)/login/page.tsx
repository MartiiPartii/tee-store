"use client"

import AuthForm from "@/app/components/AuthForm"
import AuthSplitLayout from "@/app/components/AuthSplitLayout"
import { Mail, Lock } from "lucide-react"
import { login } from "@/actions/authenticate"

const Login = () => {
  const inputs = [
    {
      label: "Email Address",
      placeholder: "Enter your email",
      name: "email",
      type: "email",
      Icon: Mail,
    },
    {
      label: "Password",
      placeholder: "Enter your password",
      name: "password",
      type: "password",
      Icon: Lock,
    },
  ]

  return (
    <AuthSplitLayout>
      <AuthForm
        sectionLabel="Sign in"
        title="Welcome Back"
        description="Sign in to your account to continue shopping"
        inputs={inputs}
        buttonLabel="Sign In"
        actionCallback={login}
        link={{
          text: "Don't have an account?",
          label: "Sign up",
          to: "/register",
        }}
      />
    </AuthSplitLayout>
  )
}

export default Login
