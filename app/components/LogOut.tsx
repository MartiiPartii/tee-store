"use client"

import { LogOut as LogOutIcon } from "lucide-react"
import { logOut } from "@/actions/authenticate"
import { useState } from "react"
import Loader from "./Loader"
import { Button } from "@/components/ui/button"

const LogOut = () => {
  const [loading, setLoading] = useState(false)

  const handleLogOut = async () => {
    setLoading(true)
    await logOut()
    setLoading(false)
  }

  return (
    <>
      {loading && <Loader />}
      <Button variant="default" size="sm" type="button" onClick={handleLogOut}>
        <LogOutIcon className="size-4" />
        LogOut
      </Button>
    </>
  )
}

export default LogOut
