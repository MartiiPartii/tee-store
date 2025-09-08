"use client"

import AuthForm from "@/app/components/AuthForm"
import SectionContainer from "@/app/components/SectionContainer"
import { useRef, useState } from "react"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useRouter } from "next/navigation";

const Register = () => {
    const firstName = useRef<HTMLInputElement | null>(null)
    const lastName = useRef<HTMLInputElement | null>(null)
    const email = useRef<HTMLInputElement | null>(null)
    const password = useRef<HTMLInputElement | null>(null)
    const phone = useRef<HTMLInputElement | null>(null)
    const address = useRef<HTMLInputElement | null>(null)
    const confirmPassword = useRef<HTMLInputElement | null>(null)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()



    const inputs = [
        {
            label: "First Name",
            placeholder: "Enter your first name",
            ref: firstName,
            type: "text",
            Icon: PersonOutlineOutlinedIcon
        },
        {
            label: "Last Name",
            placeholder: "Enter your last name",
            ref: lastName,
            type: "text",
            Icon: PersonOutlineOutlinedIcon
        },
        {
            label: "Email Address",
            placeholder: "Enter your email",
            ref: email,
            type: "email",
            Icon: MailOutlineIcon
        },
        {
            label: "Phone Number",
            placeholder: "Enter your phone",
            ref: phone,
            type: "text",
            Icon: PhoneInTalkOutlinedIcon
        },
        {
            label: "Home Address",
            placeholder: "Enter your address",
            ref: address,
            type: "text",
            Icon: HomeOutlinedIcon
        },
        {
            label: "Password",
            placeholder: "Create a strong password",
            ref: password,
            type: "password",
            Icon: LockOutlinedIcon
        },
        {
            label: "Confirm Password",
            placeholder: "Confirm your password",
            ref: confirmPassword,
            type: "password",
            Icon: LockOutlinedIcon
        },
    ]

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)

        const response = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName?.current?.value,
                lastName: lastName?.current?.value,
                email: email?.current?.value,
                phoneNumber: phone?.current?.value,
                address: address?.current?.value,
                password: password?.current?.value,
                confirmPassword: confirmPassword?.current?.value
            })
        })

        if(response.status == 201) {
            router.push("/verify")
        }
        else {
            const data = await response.json()
            setError(data.error)
        }
    }

    return (
        <SectionContainer props={{ sx: { paddingTop: 15, paddingBottom: 12 } }}>
            <AuthForm
                title="Create Account"
                description="Join our community to purchase our best products or start selling your own designs"
                error={error}
                inputs={inputs}
                buttonLabel="Create Account"
                handleSubmit={handleSubmit}
                link={{
                    text: "Already have an account?",
                    label: "Sign in",
                    to: "/login"
                }}
            />
        </SectionContainer>
    )
}

export default Register