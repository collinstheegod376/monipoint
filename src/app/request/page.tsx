'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RequestMoney() {
  const [payer, setPayer] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    alert('Request sent successfully! (This is a UI placeholder as per instructions)')
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen bg-surface px-container-margin pt-12">
      <header className="flex justify-between items-center mb-8 relative z-10">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors text-on-surface-variant">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-label-md text-on-surface-variant uppercase tracking-widest">Request Money</h1>
        <div className="w-10 h-10"></div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full bg-white border border-surface-container shadow-[0_8px_30px_rgba(0,122,255,0.04)] rounded-2xl p-6 flex flex-col slide-up-fade relative overflow-hidden z-10 mb-6">
        <div className="mb-4 relative z-10">
          <label className="block text-sm font-medium mb-2 text-on-surface">Payer User ID</label>
          <input required type="text" value={payer} onChange={e => setPayer(e.target.value)} className="w-full p-4 rounded-xl border border-outline-variant bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Enter payer UUID" />
        </div>

        <div className="mb-4 relative z-10">
          <label className="block text-sm font-medium mb-2 text-on-surface">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-xl">$</span>
            <input required type="number" step="0.01" min="1" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-4 pl-8 rounded-xl border border-outline-variant bg-white text-2xl font-bold text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="0.00" />
          </div>
        </div>

        <div className="mb-6 relative z-10">
          <label className="block text-sm font-medium mb-2 text-on-surface">Note</label>
          <div className="relative">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-secondary text-lg">edit_note</span>
             <input type="text" value={note} onChange={e => setNote(e.target.value)} className="w-full p-4 pl-12 rounded-xl border border-outline-variant bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="What's this for?" />
          </div>
        </div>

        <button type="submit" className="w-full h-14 bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2">
          <span className="text-[16px] font-semibold">Send Request</span>
        </button>
      </form>
    </main>
  )
}
