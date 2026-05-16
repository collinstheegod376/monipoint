'use client'
import { useState } from 'react'
import { sendMoneyAction } from '@/app/actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SendMoney() {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('recipient_id', recipient)
    formData.append('amount', amount)
    formData.append('note', note)

    try {
      await sendMoneyAction(formData)
      alert('Payment successful!')
      router.push('/dashboard')
    } catch (err: any) {
      alert(err.message)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-surface px-container-margin pt-12">
      <header className="flex justify-between items-center mb-8 relative z-10">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors text-on-surface-variant">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-label-md text-on-surface-variant uppercase tracking-widest">Review Transfer</h1>
        <div className="w-10 h-10"></div>
      </header>

      <div className="max-w-md mx-auto w-full relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary-fixed rounded-full blur-[80px] opacity-30 pointer-events-none"></div>
        
        <form onSubmit={handleSubmit} className="w-full bg-surface-container-lowest/80 backdrop-blur-xl border border-surface-container shadow-[0_8px_30px_rgba(0,88,188,0.04)] rounded-2xl p-6 flex flex-col slide-up-fade relative overflow-hidden z-10 mb-6">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-fixed/20 to-transparent pointer-events-none"></div>
          
          <div className="mb-4 relative z-10">
            <label className="block text-sm font-medium mb-2 text-on-surface">Recipient User ID</label>
            <input required type="text" value={recipient} onChange={e => setRecipient(e.target.value)} className="w-full p-4 rounded-xl border border-outline-variant bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Enter recipient UUID" />
          </div>

          <div className="mb-4 relative z-10">
            <label className="block text-sm font-medium mb-2 text-on-surface">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-xl">$</span>
              <input required type="number" step="0.01" min="1" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-4 pl-8 rounded-xl border border-outline-variant bg-white text-2xl font-bold text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="0.00" />
            </div>
          </div>

          <div className="mb-2 relative z-10">
            <label className="block text-sm font-medium mb-2 text-on-surface">Note</label>
            <div className="relative">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-secondary text-lg">edit_note</span>
               <input type="text" value={note} onChange={e => setNote(e.target.value)} className="w-full p-4 pl-12 rounded-xl border border-outline-variant bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="What's this for?" />
            </div>
          </div>
          
          <div className="mt-8 border-t border-surface-container pt-4">
             <div className="flex justify-between items-center py-2">
                <span className="font-body-md text-on-surface-variant">Fee</span>
                <span className="font-label-md text-primary">Free</span>
             </div>
             <div className="flex justify-between items-center py-2">
                <span className="font-headline-md text-lg text-on-surface">Total</span>
                <span className="font-headline-md text-lg text-on-surface">${amount || '0.00'}</span>
             </div>
          </div>
        </form>

        <div className="fixed bottom-0 left-0 w-full px-container-margin pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-4 bg-gradient-to-t from-surface via-surface to-transparent z-40">
          <div className="max-w-md mx-auto w-full relative">
            <div className="flex justify-center items-center gap-1 mb-3 text-secondary">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span className="font-label-sm">Secure 256-bit Encrypted Transfer</span>
            </div>
            <button disabled={loading} onClick={handleSubmit} className="w-full h-14 bg-gradient-to-r from-primary to-[#004bb3] text-on-primary font-label-md rounded-2xl shadow-[0_4px_14px_rgba(0,88,188,0.25)] hover:shadow-[0_6px_20px_rgba(0,88,188,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 group">
              {loading ? (
                 <><span className="material-symbols-outlined animate-spin">progress_activity</span> <span className="text-[16px] font-semibold">Processing...</span></>
              ) : (
                 <><span className="text-[16px] font-semibold">Confirm Payment</span> <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span></>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
