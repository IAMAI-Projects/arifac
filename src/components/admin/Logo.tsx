import React from 'react'

const Logo: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <img
        src="/logo.png"
        alt="ARIFAC"
        style={{ maxWidth: '220px', height: 'auto' }}
      />
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          color: 'var(--theme-elevation-500)',
        }}
      >
        Content Management
      </div>
    </div>
  )
}

export default Logo
