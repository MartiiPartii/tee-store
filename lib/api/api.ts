import { redirect } from "next/navigation"

export const authFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const response = await fetch(input, init)
    console.log(response)

    if(response.status == 401) {
        redirect('/login')
    }

    return response
}