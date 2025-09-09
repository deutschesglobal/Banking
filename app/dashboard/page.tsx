import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import DashboardClient from "./dashboard-client"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Fetch user profile and bank account data
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  const { data: bankAccounts } = await supabase.from("bank_accounts").select("*").eq("user_id", data.user.id)

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <DashboardClient
      user={data.user}
      profile={profile}
      bankAccounts={bankAccounts || []}
      transactions={transactions || []}
    />
  )
}
