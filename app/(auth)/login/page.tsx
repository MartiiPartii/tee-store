"use client"

import AuthForm from "@/app/components/AuthForm"
import SectionContainer from "@/app/components/SectionContainer"
import { useRef, useState } from "react"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from "next/navigation";

const Login = () => {
    const email = useRef<HTMLInputElement | null>(null)
    const password = useRef<HTMLInputElement | null>(null)
    const rememberMe = useRef<HTMLInputElement | null>(null)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()



    const inputs = [
        {
            label: "Email Address",
            placeholder: "Enter your email",
            ref: email,
            type: "email",
            Icon: MailOutlineIcon
        },
        {
            label: "Password",
            placeholder: "Enter your password",
            ref: password,
            type: "password",
            Icon: LockOutlinedIcon
        }
    ]

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)

        const response = await fetch("http://localhost:3000/api/auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email?.current?.value,
                password: password?.current?.value
            })
        })

        if(response.status == 200) {
            router.push("/browse")
        }
        else {
            const data = await response.json()
            setError(data.error)
        }
    }

    return (
        <SectionContainer props={{ sx: { paddingTop: 15, paddingBottom: 12 } }}>
            <AuthForm
                title="Welcome Back"
                description="Sign in to your account to continue shopping"
                error={error}
                inputs={inputs}
                buttonLabel="Sign In"
                handleSubmit={handleSubmit}
                rememberMe={rememberMe}
                forgotPass={true}
                link={{
                    text: "Don't have an account?",
                    label: "Sign up",
                    to: "/register"
                }}
            />
        </SectionContainer>
    )
}

export default Login