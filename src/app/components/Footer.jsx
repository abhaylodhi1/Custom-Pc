export default function Footer() {
    return (
      <footer className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#24438c] text-gray-300 py-10 px-6 ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm sm:text-base">
          <div>
            <h2 className="text-white font-bold text-lg mb-2">PC Gaming Store</h2>
            <p>Building the ultimate gaming experience with custom PCs, laptops, parts, and accessories.</p>
          </div>
  
          <div>
            <h3 className="text-white font-semibold mb-2">Contact Us</h3>
            <p>📞 +91-9876543210</p>
            <p>📧 support@pcgamingstore.com</p>
          </div>
  
          <div>
            <h3 className="text-white font-semibold mb-2">Head Offices</h3>
            <p>Bhopal, MP - 462001</p>
            <p>New Delhi, DL - 110001</p>
            <p>Bengaluru, KA - 560001</p>
          </div>
  
          <div>
            <h3 className="text-white font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li><a href="/dashboard" className="hover:text-purple-300">Dashboard</a></li>
              <li><a href="/profile" className="hover:text-purple-300">Profile</a></li>
              <li><a href="/cart" className="hover:text-purple-300">Cart</a></li>
              <li><a href="/support" className="hover:text-purple-300">Support</a></li>
            </ul>
          </div>
        </div>
  
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} PC Gaming Store. All rights reserved.
        </div>
      </footer>
    );
  }
  