import React from 'react'

function Footer() {
    const foot = {
        color:"black",
        listStyle:"none"
    }
    return (
        <div style={{ backgroundColor: "#f7f7f9", padding: "60px 40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "40px" }}>

                <div>
                    <img src="https://maroko-demo.myshopify.com/cdn/shop/files/logo_1df75188-c60e-47e0-8bf8-269f725aa37c_344x48.png?v=1683521307" alt="logo" style={{ width: "120px" }} />
                    <p style={{ fontSize: "14px", margin: "5px 0", color: "#333" }}>
                        Shop 009A, Level 4, Block A, Demo Park, Ottawa
                    </p>
                    <p style={{ fontSize: "14px", margin: "5px 0", color: "#333" }}> +1-613-555-0182 </p>
                    <p style={{ fontSize: "14px", margin: "5px 0", color: "#333" }}> contact@demo.com</p>
                </div>

                <div style={{ flex: "1 1 150px" }}>
                    <h5 style={{ marginBottom: "15px" }}>My Account</h5>
                    <ul style={{ listStyle: "none" }}>
                        <li>Jackets & Coats</li>
                        <li>Long T-Shirt</li>
                        <li>Swim wear</li>
                        <li>Prom Shoes</li>
                        <li>Sleeveless Shirt</li>
                    </ul>
                </div>

                <div style={{ flex: "1 1 150px" }}>
                    <h5 style={{ marginBottom: "15px" }}>Information</h5>
                    <ul style={{ listStyle: "none" }}>
                        <li>Shirts & Blouses</li>
                        <li>Halter Tops</li>
                        <li>Long Pant</li>
                        <li>Hoodies</li>
                        <li>Sweatshirts</li>
                    </ul>
                </div>
                <div style={{ flex: "1 1 150px" }}>
                    <h5 style={{ marginBottom: "15px" }}>Social Media</h5>
                    <ul style={{ listStyle: "none" }}>
                        <a style={foot} href="https://www.facebook.com/"> <li><i class="fab fa-facebook"></i> Facebook</li></a>
                        <a style={foot} href="https://www.instagram.com/"> <li><i class="fab fa-instagram"></i>Instagram</li></a>
                        <a style={foot} href="https://in.linkedin.com/"><li><i class="fab fa-linkedin"></i>LinkedIn</li></a>
                        <a style={foot} href="https://in.pinterest.com/"><li><i class="fab fa-pinterest"></i> Pinterest</li></a>
                    </ul>
                </div>

                <div style={{ flex: "1 1 250px" }}>
                    <h5 style={{ marginBottom: "15px" }}>Subscribe</h5>
                    <form>
                        <input type="email" placeholder="Your email address..." style={{ width: "100%", padding: "10px", border: "none", borderBottom: "2px solid black", outline: "none", fontSize: "14px" }} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Footer
