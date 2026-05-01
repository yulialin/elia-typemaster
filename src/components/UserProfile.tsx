'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import AuthModal from './AuthModal'

export default function UserProfile() {
  const { user, signOut } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      setShowDropdown(false)
    } catch {
      // silent
    }
  }

  if (!user) {
    return (
      <>
        <button
          onClick={() => setShowAuthModal(true)}
          className="border border-zinc-300 text-zinc-700 px-3 py-1.5 text-xs hover:border-zinc-900 hover:text-zinc-900 transition-colors"
        >
          Sign in
        </button>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 text-xs text-zinc-600 hover:text-zinc-900 transition-colors"
      >
        <span className="w-6 h-6 border border-zinc-300 flex items-center justify-center font-mono font-medium text-xs flex-shrink-0">
          {user.email?.[0]?.toUpperCase() ?? 'U'}
        </span>
        <span className="hidden sm:block truncate max-w-32">{user.email}</span>
        <svg className="w-3 h-3 text-zinc-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-1 w-52 bg-white border border-zinc-200 z-10">
          <div className="px-3 py-2.5 border-b border-zinc-100">
            <p className="text-xs font-medium text-zinc-900 truncate">{user.email}</p>
            <p className="text-xs text-zinc-400 mt-0.5">
              Since {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="p-1">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-3 py-1.5 text-xs text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      )}

      {showDropdown && (
        <div className="fixed inset-0 z-0" onClick={() => setShowDropdown(false)} />
      )}
    </div>
  )
}
