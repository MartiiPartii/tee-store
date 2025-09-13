import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    revalidatePath("/", "layout")
    const cookieStore = await cookies()
    cookieStore.delete("token");
    
    return NextResponse.json(
        { message: "Log out successful." },
        { status: 200 }
    )
}