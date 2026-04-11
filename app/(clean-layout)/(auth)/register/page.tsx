"use client"

import AuthForm from "@/app/components/AuthForm"
import AuthSplitLayout from "@/app/components/AuthSplitLayout"
import { User, Mail, Lock, Phone, Home } from "lucide-react"
import { register } from "@/actions/authenticate"

const Register = () => {
  const inputs = [
    {
      label: "First Name",
      placeholder: "Enter your first name",
      name: "firstName",
      type: "text",
      Icon: User,
    },
    {
      label: "Last Name",
      placeholder: "Enter your last name",
      name: "lastName",
      type: "text",
      Icon: User,
    },
    {
      label: "Email Address",
      placeholder: "Enter your email",
      name: "email",
      type: "email",
      Icon: Mail,
    },
    {
      label: "Phone Number",
      placeholder: "Enter your phone",
      name: "phoneNumber",
      type: "text",
      Icon: Phone,
    },
    {
      label: "Home Address",
      placeholder: "Enter your address",
      name: "address",
      type: "text",
      Icon: Home,
    },
    {
      label: "Password",
      placeholder: "Create a strong password",
      name: "password",
      type: "password",
      Icon: Lock,
    },
    {
      label: "Confirm Password",
      placeholder: "Confirm your password",
      name: "confirmPassword",
      type: "password",
      Icon: Lock,
    },
  ]

  return (
    <AuthSplitLayout>
      <AuthForm
        sectionLabel="Register"
        title="Create Account"
        description="Join our community to purchase our best products or start selling your own designs"
        inputs={inputs}
        buttonLabel="Create Account"
        actionCallback={register}
        link={{
          text: "Already have an account?",
          label: "Sign in",
          to: "/login",
        }}
      />
    </AuthSplitLayout>
  )
}

export default Register
