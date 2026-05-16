import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Dashboard() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('users').select('*').eq('user_id', user.id).single()
  const { data: txns } = await supabase.from('transactions')
    .select('*, sender:users!sender_id(full_name), recipient:users!recipient_id(full_name)')
    .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
    .order('created_at', { ascending: false }).limit(10)

  return (
    <main className="min-h-screen bg-background pb-24 md:pb-0 font-body-md text-on-background">
      <header className="fixed md:sticky top-0 w-full z-40 bg-surface/80 backdrop-blur-xl shadow-sm h-16 flex items-center justify-between px-container-margin transition-all">
        <Link href="/profile" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-surface-variant overflow-hidden flex-shrink-0 group-hover:border-primary transition-colors">
            {profile?.avatar_url ? <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-surface-variant flex items-center justify-center text-on-surface-variant"><span className="material-symbols-outlined">person</span></div>}
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wide">Total Balance</span>
            <span className="font-headline-md text-primary font-bold">${((profile?.balance || 0) / 100).toFixed(2)}</span>
          </div>
        </Link>
        <Link href="/notifications" className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high relative transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <div className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></div>
        </Link>
      </header>

      <div className="pt-20 md:pt-6 px-container-margin max-w-4xl mx-auto flex flex-col gap-stack-lg">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/send" className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,122,255,0.08)] p-6 flex flex-col justify-between min-h-[160px] relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
            <div>
              <h2 className="font-body-lg font-semibold mb-1 text-on-surface">Send Money</h2>
              <p className="font-body-md text-on-surface-variant mb-6">Quick and secure transfers.</p>
            </div>
            <div className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-label-md rounded-full h-14 flex items-center justify-center gap-2 shadow-sm">
              <span className="material-symbols-outlined">send</span> Send Now
            </div>
          </Link>

          <Link href="/request" className="bg-surface-container-lowest rounded-xl shadow-[0_8px_30px_rgba(0,122,255,0.08)] p-6 flex flex-col justify-between min-h-[160px] group hover:-translate-y-1 transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-body-lg font-semibold mb-1 text-on-surface">Request</h2>
                <p className="font-body-md text-on-surface-variant">Ask friends for cash.</p>
              </div>
              <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined fill">payments</span>
              </div>
            </div>
            <div className="w-full mt-4 bg-surface-container-high text-on-surface font-label-md rounded-full h-12 flex items-center justify-center group-hover:bg-surface-variant transition-colors">
              Create Request
            </div>
          </Link>
        </section>

        <section className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,122,255,0.05)] p-4 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-body-md font-semibold text-on-surface">Recent Activity</h3>
            <button className="font-label-md text-primary hover:text-primary-container transition-colors">See All</button>
          </div>
          <div className="space-y-4">
            {txns?.length === 0 ? (
               <p className="text-sm text-on-surface-variant text-center py-4">No recent activity.</p>
            ) : txns?.map(txn => {
              const isSender = txn.sender_id === user.id;
              return (
                <div key={txn.txn_id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSender ? 'bg-secondary-container text-on-secondary-container' : 'bg-primary-container/20 text-primary-container'}`}>
                      <span className="material-symbols-outlined text-sm">{isSender ? 'arrow_upward' : 'arrow_downward'}</span>
                    </div>
                    <div>
                      <p className="font-label-md text-on-surface">{isSender ? `To ${txn.recipient?.full_name || 'Someone'}` : `From ${txn.sender?.full_name || 'Someone'}`}</p>
                      <p className="font-label-sm text-on-surface-variant font-normal">{new Date(txn.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`font-label-md font-semibold ${isSender ? 'text-on-surface' : 'text-primary'}`}>
                    {isSender ? '-' : '+'}${((txn.amount_cents) / 100).toFixed(2)}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      </div>
      
      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-surface/80 backdrop-blur-xl shadow-lg rounded-t-xl">
        <Link href="/dashboard" className="flex flex-col items-center justify-center text-primary font-bold">
          <span className="material-symbols-outlined fill">home</span><span className="font-label-sm mt-1">Home</span>
        </Link>
        <Link href="/send" className="flex flex-col items-center justify-center text-secondary hover:text-primary transition-colors">
          <span className="material-symbols-outlined">send</span><span className="font-label-sm mt-1">Send</span>
        </Link>
        <Link href="/request" className="flex flex-col items-center justify-center text-secondary hover:text-primary transition-colors">
          <span className="material-symbols-outlined">payments</span><span className="font-label-sm mt-1">Request</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center justify-center text-secondary hover:text-primary transition-colors">
          <span className="material-symbols-outlined">person</span><span className="font-label-sm mt-1">Profile</span>
        </Link>
      </nav>
    </main>
  )
}
