import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminSession = cookieStore.get("admin_session")

    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    let query = supabase
      .from("transactions")
      .select(`
        *,
        profiles!transactions_user_id_fkey (first_name, last_name, email)
      `)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data: transactions, error } = await query

    if (error) {
      return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
    }

    return NextResponse.json({ transactions })
  } catch (error) {
    console.error("Admin transaction fetch API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminSession = cookieStore.get("admin_session")

    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()
    const body = await request.json()
    const { transaction_id, status, admin_notes } = body

    if (!transaction_id || !status || !["approved", "declined"].includes(status)) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    // Get transaction details
    const { data: transaction, error: fetchError } = await supabase
      .from("transactions")
      .select(`
        *,
        bank_accounts!transactions_from_account_id_fkey (*)
      `)
      .eq("id", transaction_id)
      .single()

    if (fetchError || !transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    if (transaction.status !== "pending") {
      return NextResponse.json({ error: "Transaction already processed" }, { status: 400 })
    }

    // Update transaction status
    const { error: updateError } = await supabase
      .from("transactions")
      .update({
        status,
        admin_notes: admin_notes || null,
        processed_at: new Date().toISOString(),
      })
      .eq("id", transaction_id)

    if (updateError) {
      return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 })
    }

    // If approved, update account balance
    if (status === "approved" && transaction.bank_accounts) {
      const account = transaction.bank_accounts
      let balanceChange = 0

      switch (transaction.transaction_type) {
        case "deposit":
          balanceChange = transaction.amount
          break
        case "withdrawal":
          balanceChange = -transaction.amount
          break
        case "transfer":
          balanceChange = -transaction.amount
          break
        default:
          balanceChange = 0
      }

      if (balanceChange !== 0) {
        const { error: balanceError } = await supabase
          .from("bank_accounts")
          .update({
            balance: account.balance + balanceChange,
            updated_at: new Date().toISOString(),
          })
          .eq("id", account.id)

        if (balanceError) {
          console.error("Balance update error:", balanceError)
          // Note: Transaction status is already updated, but balance update failed
          // In a production system, you might want to implement compensation logic
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Transaction ${status} successfully`,
    })
  } catch (error) {
    console.error("Admin transaction update API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
