const reasons = [
  { icon: '🛡️', title: 'Secure Transactions', desc: 'Every payment is protected with industry-standard encryption.' },
  { icon: '🚀', title: 'Fast & Global', desc: 'Digital products delivered instantly. Physical ships worldwide.' },
  { icon: '🎧', title: '24/7 Support', desc: 'Our team is always ready to help you.' },
  { icon: '🌍', title: 'Global Community', desc: 'Join millions from over 190 countries.' },
]

export default function WhyChoose() {
  return (
    <section style={{padding: "64px 16px", background: "#FFFFFF"}}>
      <div style={{maxWidth: "1280px", margin: "0 auto"}}>
        <div style={{textAlign: "center", marginBottom: "48px"}}>
          <h2 style={{fontSize: "36px", fontWeight: 700, color: "#1F2937"}}>Why Choose <span style={{color: "#2563EB"}}>4thMan</span>?</h2>
        </div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px"}}>
          {reasons.map((r) => (
            <div key={r.title} className="card" style={{textAlign: "center", padding: "32px"}}>
              <div style={{fontSize: "48px", marginBottom: "16px"}}>{r.icon}</div>
              <h3 style={{fontSize: "18px", fontWeight: 600, color: "#1F2937"}}>{r.title}</h3>
              <p style={{fontSize: "14px", color: "#6B7280", marginTop: "8px"}}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
