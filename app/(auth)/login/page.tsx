"use client"

import AuthForm from "@/app/components/AuthForm"
import SectionContainer from "@/app/components/SectionContainer"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from "@/actions/authenticate";

const Login = () => {
    const inputs = [
        {
            label: "Email Address",
            placeholder: "Enter your email",
            name: "email",
            type: "email",
            Icon: MailOutlineIcon
        },
        {
            label: "Password",
            placeholder: "Enter your password",
            name: "password",
            type: "password",
            Icon: LockOutlinedIcon
        }
    ]

    return (
        <SectionContainer props={{ sx: { paddingTop: 15, paddingBottom: 12 } }}>
            <AuthForm
                title="Welcome Back"
                description="Sign in to your account to continue shopping"
                inputs={inputs}
                buttonLabel="Sign In"
                actionCallback={login}
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