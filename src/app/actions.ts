'use server'
import { createClient } from '@/utils/supabase/server'
import { v4 as uuidv4 } from 'uuid'
import { revalidatePath } from 'next/cache'

export async function sendMoneyAction(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const recipientId = formData.get('recipient_id') as string
  const amountCents = Math.round(parseFloat(formData.get('amount') as string) * 100)
  const note = formData.get('note') as string

  const { error } = await supabase.rpc('transfer_money', {
    p_sender_id: user.id,
    p_recipient_id: recipientId,
    p_amount_cents: amountCents,
    p_note: note,
    p_idempotency_key: uuidv4()
  })

  if (error) throw new Error(error.message)
  revalidatePath('/dashboard')
  return { success: true }
}
