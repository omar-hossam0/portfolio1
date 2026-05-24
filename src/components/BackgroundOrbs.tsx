export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main blue orb — top right */}
      <div
        className="orb animate-morph"
        style={{
          width: '700px',
          height: '700px',
          top: '-15%',
          right: '-10%',
          background:
            'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
        }}
      />
      {/* Secondary teal orb — bottom left */}
      <div
        className="orb animate-morph-slow"
        style={{
          width: '500px',
          height: '500px',
          bottom: '-10%',
          left: '-12%',
          background:
            'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)',
        }}
      />
      {/* Tertiary accent — center faded */}
      <div
        className="orb animate-float-delay"
        style={{
          width: '400px',
          height: '400px',
          top: '40%',
          left: '50%',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)',
        }}
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
