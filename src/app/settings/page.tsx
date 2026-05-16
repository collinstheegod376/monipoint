import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function Settings() {
  return (
    <main className="min-h-screen bg-surface px-container-margin pt-12">
      <header className="flex justify-between items-center mb-8 relative z-10">
        <Link href="/profile" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors text-on-surface-variant">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="font-label-md text-on-surface-variant uppercase tracking-widest">Settings</h1>
        <div className="w-10 h-10"></div>
      </header>

      <div className="max-w-md mx-auto w-full space-y-4 slide-up-fade">
        <div className="bg-white rounded-xl shadow-sm border border-surface-container p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <span className="material-symbols-outlined text-secondary">payments</span>
             <span className="font-medium">Currency</span>
          </div>
          <select className="bg-surface-container-low border-0 rounded-lg text-sm px-3 py-1 font-medium text-on-surface outline-none">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="NGN">NGN (₦)</option>
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-surface-container p-4 flex justify-between items-center cursor-pointer hover:bg-surface-container-lowest transition-colors">
          <div className="flex items-center gap-3">
             <span className="material-symbols-outlined text-secondary">add_card</span>
             <span className="font-medium">Add Balance (Simulate)</span>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
        </div>

        <div className="bg-error-container/20 rounded-xl shadow-sm border border-error-container p-4 flex justify-between items-center cursor-pointer hover:bg-error-container/30 transition-colors mt-8">
          <div className="flex items-center gap-3 text-error">
             <span className="material-symbols-outlined">delete_forever</span>
             <span className="font-medium">Delete Account</span>
          </div>
        </div>
      </div>
    </main>
  )
}
