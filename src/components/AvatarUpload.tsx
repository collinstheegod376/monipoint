'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function AvatarUpload({ userId, currentAvatar }: { userId: string, currentAvatar?: string }) {
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(currentAvatar)
  const supabase = createClient()

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      if (!event.target.files || event.target.files.length === 0) return
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${userId}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
      
      await supabase.from('users').update({ avatar_url: data.publicUrl }).eq('user_id', userId)
      setAvatarUrl(data.publicUrl)
    } catch (error) {
      alert('Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 group">
      <div className="relative w-24 h-24 rounded-full border-4 border-surface-container-lowest shadow-sm overflow-hidden bg-surface-variant flex items-center justify-center">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="material-symbols-outlined text-4xl text-on-surface-variant">person</span>
        )}
        <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <span className="material-symbols-outlined text-white">photo_camera</span>
          <input type="file" accept="image/*" onChange={uploadAvatar} disabled={uploading} className="hidden" />
        </label>
      </div>
      {uploading && <span className="text-xs text-primary animate-pulse">Uploading...</span>}
    </div>
  )
}
