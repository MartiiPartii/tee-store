import { SvgIconProps } from '@mui/material/SvgIcon';

export interface InputProps {
    label: string,
    placeholder: string,
    ref: React.RefObject<HTMLInputElement | null>,
    type: string,
    Icon: React.ComponentType<SvgIconProps>
}

export interface FormProps {
    title: string,
    description: string,
    error: string | null,
    inputs: InputProps[],
    rememberMe?: React.RefObject<HTMLInputElement | null>,
    forgotPass?: boolean,
    buttonLabel: string,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    link: {
        text: string,
        label: string,
        to: string
    }
}