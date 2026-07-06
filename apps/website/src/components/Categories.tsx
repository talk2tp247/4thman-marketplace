const categories = [
  { name: 'eBooks', icon: '📚', count: '12,450' },
  { name: 'Software', icon: '💻', count: '8,230' },
  { name: 'Online Courses', icon: '🎓', count: '5,780' },
  { name: 'Physical Products', icon: '📦', count: '45,200' },
  { name: 'Music & Audio', icon: '🎵', count: '3,410' },
  { name: 'Templates', icon: '📁', count: '9,870' },
]

export default function Categories() {
  return (
    <section style={{padding: "64px 16px", background: "#FFFFFF"}} id="features">
      <div style={{maxWidth: "1280px", margin: "0 auto"}}>
        <div style={{textAlign: "center", marginBottom: "48px"}}>
          <h2 style={{fontSize: "36px", fontWeight: 700, color: "#1F2937"}}>Browse by <span style={{color: "#2563EB"}}>Category</span></h2>
          <p style={{color: "#6B7280", marginTop: "8px"}}>Find exactly what you need from our wide selection</p>
        </div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px"}}>
          {categories.map((cat) => (
            <div key={cat.name} className="card" style={{textAlign: "center", padding: "24px", cursor: "pointer"}}>
              <div style={{fontSize: "40px", marginBottom: "12px"}}>{cat.icon}</div>
              <div style={{fontSize: "18px", fontWeight: 600, color: "#1F2937"}}>{cat.name}</div>
              <div style={{fontSize: "14px", color: "#9CA3AF"}}>{cat.count} items</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
