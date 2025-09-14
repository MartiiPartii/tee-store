"use client"

import AuthForm from "@/app/components/AuthForm"
import SectionContainer from "@/app/components/SectionContainer"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { register } from "@/actions/authenticate";

const Register = () => {
    const inputs = [
        {
            label: "First Name",
            placeholder: "Enter your first name",
            name: "firstName",
            type: "text",
            Icon: PersonOutlineOutlinedIcon
        },
        {
            label: "Last Name",
            placeholder: "Enter your last name",
            name: "lastName",
            type: "text",
            Icon: PersonOutlineOutlinedIcon
        },
        {
            label: "Email Address",
            placeholder: "Enter your email",
            name: "email",
            type: "email",
            Icon: MailOutlineIcon
        },
        {
            label: "Phone Number",
            placeholder: "Enter your phone",
            name: "phoneNumber",
            type: "text",
            Icon: PhoneInTalkOutlinedIcon
        },
        {
            label: "Home Address",
            placeholder: "Enter your address",
            name: "address",
            type: "text",
            Icon: HomeOutlinedIcon
        },
        {
            label: "Password",
            placeholder: "Create a strong password",
            name: "password",
            type: "password",
            Icon: LockOutlinedIcon
        },
        {
            label: "Confirm Password",
            placeholder: "Confirm your password",
            name: "confirmPassword",
            type: "password",
            Icon: LockOutlinedIcon
        },
    ]

    return (
        <SectionContainer props={{ sx: { paddingTop: 15, paddingBottom: 12 } }}>
            <AuthForm
                title="Create Account"
                description="Join our community to purchase our best products or start selling your own designs"
                inputs={inputs}
                buttonLabel="Create Account"
                actionCallback={register}
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