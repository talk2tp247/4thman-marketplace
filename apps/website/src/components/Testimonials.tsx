const testimonials = [
  { name: 'Sarah Johnson', role: 'Buyer', avatar: '👩‍💼', text: 'I found the perfect digital marketing course here. The transaction was smooth and the support team was incredibly helpful.' },
  { name: 'Marcus Chen', role: 'Seller', avatar: '👨‍💻', text: '4thMan transformed my freelance business. I went from local clients to selling globally within weeks.' },
  { name: 'Amara Okafor', role: 'Buyer', avatar: '👩‍🎨', text: 'The best marketplace for digital products. The search filters make it so easy to find exactly what I need.' },
]

export default function Testimonials() {
  return (
    <section style={{padding: "64px 16px", background: "#F8FAFC"}} id="testimonials">
      <div style={{maxWidth: "1280px", margin: "0 auto"}}>
        <div style={{textAlign: "center", marginBottom: "48px"}}>
          <h2 style={{fontSize: "36px", fontWeight: 700, color: "#1F2937"}}>What Our <span style={{color: "#2563EB"}}>Users Say</span></h2>
        </div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px"}}>
          {testimonials.map((t) => (
            <div key={t.name} style={{background: "#FFFFFF", borderRadius: "12px", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)"}}>
              <div style={{color: "#F59E0B", marginBottom: "16px", fontSize: "18px"}}>★★★★★</div>
              <p style={{color: "#6B7280", lineHeight: 1.6}}>\"{{t.text}}\"</p>
              <div style={{display: "flex", alignItems: "center", gap: "12px", marginTop: "16px", borderTop: "1px solid #E5E7EB", paddingTop: "16px"}}>
                <span style={{fontSize: "32px"}}>{t.avatar}</span>
                <div><p style={{fontWeight: 600, color: "#1F2937"}}>{t.name}</p><p style={{fontSize: "14px", color: "#9CA3AF"}}>{t.role}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
