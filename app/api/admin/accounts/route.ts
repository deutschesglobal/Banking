import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()

    // Get all bank accounts with user information
    const { data: accounts, error } = await supabase
      .from("bank_accounts")
      .select(`
        *,
        profiles (
          id,
          email,
          first_name,
          last_name
        )
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching accounts:", error)
      return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 })
    }

    return NextResponse.json({ accounts })
  } catch (error) {
    console.error("Admin accounts API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { accountId, updates } = await request.json()
    const supabase = createClient()

    const { data, error } = await supabase.from("bank_accounts").update(updates).eq("id", accountId).select().single()

    if (error) {
      console.error("Error updating account:", error)
      return NextResponse.json({ error: "Failed to update account" }, { status: 500 })
    }

    return NextResponse.json({ account: data })
  } catch (error) {
    console.error("Admin account update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
