import React, { useEffect, useState } from 'react'
import { MessageCircle, LogOut, User, Leaf } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface DashboardProps {
  onSignOut: () => void
}

export default function Dashboard({ onSignOut }: DashboardProps) {
  const [user, setUser] = useState<SupabaseUser | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    onSignOut()
  }

  const handleStartChat = () => {
    // This is where you would implement the chat functionality
    alert('Chat functionality would start here!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Smart Kissan</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {user?.user_metadata?.full_name || user?.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="mb-8">
            <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Leaf className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Smart Kissan
            </h2>
            <p className="text-lg font-semibold text-green-600 mb-4">Smart Kissan Smart Pakistan</p>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your intelligent agricultural assistant is ready to help you with farming insights, 
              crop recommendations, and agricultural best practices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Chat</h3>
              <p className="text-gray-600">Get instant answers to your agricultural questions</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-green-100 p-3 rounded-lg w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Crop Insights</h3>
              <p className="text-gray-600">Receive personalized crop recommendations</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-orange-100 p-3 rounded-lg w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <User className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Advice</h3>
              <p className="text-gray-600">Access agricultural expertise anytime</p>
            </div>
          </div>

          <button
            onClick={handleStartChat}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-6 h-6 inline mr-2" />
            Start Chatting with Smart Kissan
          </button>
        </div>
      </main>
    </div>
  )
}