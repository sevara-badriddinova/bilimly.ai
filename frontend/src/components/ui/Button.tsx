import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'contrast'
  children: React.ReactNode
}

export default function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold transition-transform hover:-translate-y-0.5 active:translate-y-0'
  const styles: Record<string, string> = {
    primary: 'text-[#00296b] shadow-md',
    outline: 'border text-white',
    contrast: 'text-[#00296b] shadow-md',
  }
  const bg: Record<string, React.CSSProperties> = {
    primary: { background: '#FFB703' },
    outline: { borderColor: '#FFB703', color: '#FFB703' },
    contrast: { background: '#FB8500' },
  }
  return (
    <button className={`${base} ${styles[variant]} ${className}`} style={bg[variant]} {...rest}>
      {children}
    </button>
  )
}


