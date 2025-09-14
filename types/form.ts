import { SvgIconProps } from '@mui/material/SvgIcon';

export interface InputProps {
    label: string,
    placeholder: string,
    defaultValue?: string,
    name?: string,
    step?: number,
    type: string,
    required?: boolean,
    multiline?: boolean,
    rows?: number,
    Icon?: React.ComponentType<SvgIconProps> | null
}

export interface FormProps {
    title: string,
    description: string,
    inputs: InputProps[],
    buttonLabel: string,
    actionCallback: (prevState: any, formData: FormData) => any,
    link: {
        text: string,
        label: string,
        to: string
    }
}