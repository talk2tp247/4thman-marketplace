export default function BecomeSeller() {
  return (
    <section style={{padding: "64px 16px", background: "linear-gradient(to right, #2563EB, #1D4ED8)"}} id="sellers">
      <div style={{maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center"}}>
        <div style={{color: "#FFFFFF"}}>
          <span style={{background: "rgba(255,255,255,0.2)", padding: "4px 16px", borderRadius: "999px", fontSize: "14px"}}>🚀 Start Selling Today</span>
          <h2 style={{fontSize: "36px", fontWeight: 700, marginTop: "16px"}}>Become a Seller on 4thMan</h2>
          <p style={{color: "#BFDBFE", fontSize: "18px", marginTop: "12px"}}>Turn your products into profit. Join thousands of successful sellers globally.</p>
          <ul style={{marginTop: "24px", listStyle: "none", padding: 0}}>
            {['List unlimited products', 'Set your own prices', 'Reach a global audience', 'Secure payment processing'].map((b) => (
              <li key={b} style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px"}}>✅ {b}</li>
            ))}
          </ul>
          <a href="http://localhost:3000/auth/register?type=seller" className="btn-gold" style={{display: "inline-block", marginTop: "24px"}}>Start Selling Now →</a>
        </div>
        <div style={{textAlign: "center", color: "#FFFFFF"}}>
          <div style={{fontSize: "64px"}}>📈</div>
          <p style={{fontSize: "36px", fontWeight: 700}}>$2.4B+</p>
          <p>Total seller earnings</p>
        </div>
      </div>
    </section>
  )
}
