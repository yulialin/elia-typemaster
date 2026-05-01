'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      if (isLogin) {
        const { error } = await signIn(email, password)
        if (error) {
          setError(typeof error === 'object' && error && 'message' in error ? String(error.message) : 'An error occurred')
        } else {
          onClose()
        }
      } else {
        const { error } = await signUp(email, password)
        if (error) {
          setError(typeof error === 'object' && error && 'message' in error ? String(error.message) : 'An error occurred')
        } else {
          setError('')
          alert('Check your email for the confirmation link!')
        }
      }
    } catch {
      setError('An unexpected error occurred')
    }

    setLoading(false)
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setError('')
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    resetForm()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white border border-zinc-200 p-8 max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-semibold text-zinc-900">
            {isLogin ? 'Sign in' : 'Create account'}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-900 transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-zinc-600 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-zinc-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
              placeholder="••••••"
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-medium text-zinc-600 mb-1">
                Confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2 border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
                placeholder="••••••"
              />
            </div>
          )}

          {error && (
            <p className="text-xs text-zinc-900 border border-zinc-300 px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full border border-zinc-900 bg-zinc-900 text-white py-2 text-sm font-medium hover:bg-white hover:text-zinc-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : (isLogin ? 'Sign in' : 'Create account')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-zinc-500">
            {isLogin ? "No account? " : "Already have one? "}
            <button
              onClick={switchMode}
              className="text-zinc-900 font-medium hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
