"use client"

import AuthForm from "@/app/components/AuthForm"
import SectionContainer from "@/app/components/SectionContainer"
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
    <SectionContainer
      props={{ className: "pb-24 pt-[120px]" }}
    >
      <AuthForm
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
    </SectionContainer>
  )
}

export default Login
