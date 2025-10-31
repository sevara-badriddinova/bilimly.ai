import React from 'react'
import Button from '../../components/ui/Button'

export default function PricingBanner() {
  return (
    <section className="py-16" style={{ background: '#EAF6FB' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-center" style={{ color: '#023047' }}>Choose your plan</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[{name:'Free',price:'0 UZS',features:['Daily limit','Basic chat']},{name:'Standard',price:'49,000 UZS',badge:'Most Popular',features:['Unlimited chat','Voice feedback']},{name:'Pro',price:'99,000 UZS',features:['All features','Priority support']}].map((p)=> (
            <div key={p.name} className="relative rounded-2xl p-6 shadow-xl ring-1 bg-white" style={{ borderColor:'rgba(2,48,71,0.12)'}}>
              {p.badge && <div className="absolute -top-3 right-4 rounded-full px-3 py-1 text-xs font-bold" style={{ background:'#FFB703', color:'#00296b' }}>{p.badge}</div>}
              <div className="text-xl font-extrabold" style={{ color:'#023047' }}>{p.name}</div>
              <div className="mt-2 text-2xl font-extrabold" style={{ color:'#003f88' }}>{p.price}</div>
              <ul className="mt-4 space-y-2 text-sm text-[#0F172A]/80">
                {p.features.map(f=> <li key={f}>• {f}</li>)}
              </ul>
              <div className="mt-6">
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


