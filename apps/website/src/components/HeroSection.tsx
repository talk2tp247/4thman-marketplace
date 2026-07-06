export default function HeroSection() {
  return (
    <section style={{background: "linear-gradient(to bottom right, #EFF6FF, #FFFFFF, #FFFBEB)"}}>
      <div style={{maxWidth: "1280px", margin: "0 auto", padding: "80px 16px"}}>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center"}}>
          <div>
            <span style={{display: "inline-block", padding: "4px 16px", background: "rgba(37,99,235,0.1)", color: "#2563EB", fontSize: "14px", fontWeight: 600, borderRadius: "999px", marginBottom: "16px"}}>🌍 Global Marketplace</span>
            <h1 style={{fontSize: "48px", fontWeight: 800, color: "#1F2937", lineHeight: 1.2, marginBottom: "16px"}}>
              Buy & Sell <span style={{color: "#2563EB"}}>Worldwide</span>
            </h1>
            <p style={{fontSize: "20px", color: "#6B7280", marginBottom: "32px", maxWidth: "500px"}}>
              Connect with millions of buyers and sellers across the globe. Discover unique products, digital assets, and top-tier services.
            </p>
            <div style={{display: "flex", gap: "16px", flexWrap: "wrap"}}>
              <a href="http://localhost:3000/products" className="btn-primary">Shop Now →</a>
              <a href="http://localhost:3000/auth/register?type=seller" className="btn-gold">Start Selling →</a>
            </div>
            <div style={{display: "flex", gap: "32px", marginTop: "32px", flexWrap: "wrap"}}>
              <div><div style={{fontSize: "24px", fontWeight: 700, color: "#1F2937"}}>Secure</div><div style={{fontSize: "14px", color: "#9CA3AF"}}>Payments</div></div>
              <div><div style={{fontSize: "24px", fontWeight: 700, color: "#1F2937"}}>100K+</div><div style={{fontSize: "14px", color: "#9CA3AF"}}>Products</div></div>
              <div><div style={{fontSize: "24px", fontWeight: 700, color: "#1F2937"}}>4.8</div><div style={{fontSize: "14px", color: "#9CA3AF"}}>Avg Rating</div></div>
            </div>
          </div>
          <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "350px", height: "350px", background: "linear-gradient(to bottom right, rgba(37,99,235,0.2), rgba(245,158,11,0.2))", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "64px"}}>
              🌍
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
