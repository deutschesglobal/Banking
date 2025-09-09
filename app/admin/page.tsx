import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import AdminDashboardClient from "./admin-dashboard-client"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get("admin_session")

  if (!adminSession) {
    redirect("/")
  }

  // Use service role for admin operations
  const supabase = await createClient()

  // Fetch all users and their profiles
  const { data: profiles } = await supabase.from("profiles").select(`
    *,
    bank_accounts (*)
  `)

  // Fetch all transactions
  const { data: transactions } = await supabase
    .from("transactions")
    .select(`
    *,
    profiles!transactions_user_id_fkey (first_name, last_name, email)
  `)
    .order("created_at", { ascending: false })

  // Fetch all bank accounts
  const { data: bankAccounts } = await supabase.from("bank_accounts").select(`
    *,
    profiles!bank_accounts_user_id_fkey (first_name, last_name, email)
  `)

  return (
    <AdminDashboardClient
      profiles={profiles || []}
      transactions={transactions || []}
      bankAccounts={bankAccounts || []}
    />
  )
}
