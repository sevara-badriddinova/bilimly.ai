import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/ui/Button'

export default function PricingPage() {
  const plans = [
    { name:'Free', priceUz:'0 UZS', priceUsd:'$0', features:['Daily limit','Basic chat'] },
    { name:'Standard', priceUz:'49,000 UZS', priceUsd:'$4.9', features:['Unlimited chat','Voice feedback'], badge:'Most Popular' },
    { name:'Pro', priceUz:'99,000 UZS', priceUsd:'$9.9', features:['All features','Priority support'] },
  ]
  return (
    <div className="min-h-screen w-full" style={{ background:'#F8FAFC' }}>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-center" style={{ color:'#023047' }}>Plans for everyone</h1>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map(p=> (
            <div key={p.name} className="relative rounded-2xl p-6 shadow-xl ring-1 bg-white" style={{ borderColor:'rgba(2,48,71,0.12)'}}>
              {p.badge && <div className="absolute -top-3 right-4 rounded-full px-3 py-1 text-xs font-bold" style={{ background:'#FFB703', color:'#00296b' }}>{p.badge}</div>}
              <div className="text-xl font-extrabold" style={{ color:'#023047' }}>{p.name}</div>
              <div className="mt-2 text-2xl font-extrabold" style={{ color:'#003f88' }}>{p.priceUz} <span className="text-sm text-[#0F172A]/70">({p.priceUsd})</span></div>
              <ul className="mt-4 space-y-2 text-sm text-[#0F172A]/80">
                {p.features.map(f=> <li key={f}>• {f}</li>)}
              </ul>
              <div className="mt-6"><Button className="w-full">Choose</Button></div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}


