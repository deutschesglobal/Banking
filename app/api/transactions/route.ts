import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { amount, recipient, description, transaction_type } = body

    // Validation
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    if (!recipient) {
      return NextResponse.json({ error: "Recipient is required" }, { status: 400 })
    }

    if (!transaction_type || !["transfer", "deposit", "withdrawal", "payment"].includes(transaction_type)) {
      return NextResponse.json({ error: "Invalid transaction type" }, { status: 400 })
    }

    // Get user's primary account
    const { data: userAccount, error: accountError } = await supabase
      .from("bank_accounts")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single()

    if (accountError || !userAccount) {
      return NextResponse.json({ error: "No active account found" }, { status: 400 })
    }

    // Check balance for withdrawals and transfers
    if ((transaction_type === "withdrawal" || transaction_type === "transfer") && userAccount.balance < amount) {
      return NextResponse.json({ error: "Insufficient funds" }, { status: 400 })
    }

    // Create transaction record
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        user_id: user.id,
        from_account_id: userAccount.id,
        transaction_type,
        amount: Number.parseFloat(amount),
        description: description || `${transaction_type} transaction`,
        status: "pending",
      })
      .select()
      .single()

    if (transactionError) {
      return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      transaction,
      message: "Transaction submitted for approval",
    })
  } catch (error) {
    console.error("Transaction API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const status = searchParams.get("status")

    let query = supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data: transactions, error } = await query

    if (error) {
      return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
    }

    return NextResponse.json({ transactions })
  } catch (error) {
    console.error("Transaction fetch API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
