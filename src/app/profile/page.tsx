import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AvatarUpload from '@/components/AvatarUpload'

export default async function Profile() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('users').select('*').eq('user_id', user.id).single()

  return (
    <main className="min-h-screen bg-surface px-container-margin pt-12">
      <header className="flex justify-between items-center mb-8 relative z-10">
        <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors text-on-surface-variant">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="font-label-md text-on-surface-variant uppercase tracking-widest">Profile</h1>
        <div className="w-10 h-10"></div>
      </header>

      <div className="max-w-md mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-surface-container p-8 flex flex-col items-center mb-6 slide-up-fade">
          <AvatarUpload userId={user.id} currentAvatar={profile?.avatar_url} />
          <h2 className="text-xl font-semibold mt-4 text-on-surface">{profile?.full_name || 'Anonymous User'}</h2>
          <p className="text-sm text-on-surface-variant mb-6">{user.email}</p>
          
          <div className="w-full bg-surface-container-low p-4 rounded-xl flex justify-between items-center group cursor-pointer hover:bg-surface-container transition-colors">
            <div>
               <p className="text-xs text-on-surface-variant mb-1 uppercase tracking-wide font-semibold">Your User ID</p>
               <p className="font-mono text-sm text-on-surface truncate max-w-[200px]">{user.id}</p>
            </div>
            <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors">content_copy</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-surface-container overflow-hidden slide-up-fade" style={{animationDelay: '0.1s'}}>
          <Link href="/settings" className="flex items-center gap-4 p-4 border-b border-surface-container hover:bg-surface-container-lowest transition-colors">
             <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface"><span className="material-symbols-outlined">settings</span></div>
             <div className="flex-1">
               <h3 className="font-medium text-on-surface">Settings</h3>
               <p className="text-xs text-on-surface-variant">Currency, Theme, Security</p>
             </div>
             <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </Link>
          <form action="/auth/signout" method="post">
            <button className="w-full flex items-center gap-4 p-4 hover:bg-error-container/20 transition-colors text-error text-left">
               <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center"><span className="material-symbols-outlined">logout</span></div>
               <div className="flex-1">
                 <h3 className="font-medium">Sign Out</h3>
               </div>
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
