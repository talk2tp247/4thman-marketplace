const products = [
  { title: 'Ultimate Web Dev Course', category: 'Courses', price: 49.99, rating: 4.8, reviews: 342, icon: '🎓', badge: 'Bestseller' },
  { title: 'Business Pro Template Pack', category: 'Templates', price: 29.99, rating: 4.6, reviews: 128, icon: '📁', badge: 'Featured' },
  { title: 'Digital Marketing eBook', category: 'eBooks', price: 19.99, rating: 4.9, reviews: 567, icon: '📚', badge: 'New' },
  { title: 'Premium Photo Editing Software', category: 'Software', price: 89.99, rating: 4.7, reviews: 234, icon: '🖼️', badge: 'Popular' },
]

export default function FeaturedProducts() {
  return (
    <section style={{padding: "64px 16px", background: "#F8FAFC"}}>
      <div style={{maxWidth: "1280px", margin: "0 auto"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px"}}>
          <div>
            <h2 style={{fontSize: "36px", fontWeight: 700, color: "#1F2937"}}>Featured <span style={{color: "#2563EB"}}>Products</span></h2>
            <p style={{color: "#6B7280", marginTop: "4px"}}>Hand-picked top sellers for you</p>
          </div>
          <a href="http://localhost:3000/products" style={{color: "#2563EB", fontSize: "14px", fontWeight: 500"}}>View All →</a>
        </div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px"}}>
          {products.map((p) => (
            <div key={p.title} style={{background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden", cursor: "pointer"}}>
              <div style={{height: "160px", background: "linear-gradient(to bottom right, #EFF6FF, #FFFBEB)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", position: "relative"}}>
                {p.icon}
                <span style={{position: "absolute", top: "12px", left: "12px", background: "#F59E0B", color: "#FFFFFF", fontSize: "12px", fontWeight: 700, padding: "4px 10px", borderRadius: "999px"}}>{p.badge}</span>
              </div>
              <div style={{padding: "20px"}}>
                <p style={{fontSize: "12px", color: "#2563EB", fontWeight: 600, textTransform: "uppercase"}}>{p.category}</p>
                <h3 style={{fontWeight: 600, color: "#1F2937", marginTop: "4px", fontSize: "14px"}}>{p.title}</h3>
                <p style={{fontSize: "14px", color: "#F59E0B", marginTop: "4px"}}>{'★'.repeat(Math.floor(p.rating))} {p.rating} ({p.reviews})</p>
                <p style={{fontSize: "24px", fontWeight: 700, color: "#1F2937", marginTop: "8px"}}>${p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
