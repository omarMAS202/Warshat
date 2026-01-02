import { Link } from "react-router-dom";
import logo from "@/assets/NAME-PNG-1.png";

export default function Footer() {
  const navLinks = [
    { name: "الرئيسية", href: "/home" },
    { name: "خدماتنا", href: "/services" },
    { name: "من نحن", href: "/about" },
    { name: "اتصل بنا", href: "/contact" },
  ];

  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img
                src={logo}
                alt="logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-gray-500 leading-relaxed max-w-sm mb-6">
              منصتك الأولى لخدمات الصيانة المنزلية. نجمع بين الجودة، السرعة،
              والموثوقية لتقديم تجربة لا تضاهى في المملكة.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-lg mb-6">
              روابط سريعة
            </h4>
            <ul className="space-y-3 text-gray-500">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="hover:text-[#FBB03B] transition-colors flex items-center gap-2 group no-underline"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#FBB03B] transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-lg mb-6">تواصل معنا</h4>
            <ul className="space-y-4 text-gray-500">
              <li className="flex items-center gap-3">
                <span className="bg-orange-50 p-2 rounded-full text-[#FBB03B]">
                  ✉️
                </span>
                support@warshat.com
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-orange-50 p-2 rounded-full text-[#FBB03B]">
                  📞
                </span>
                <span dir="ltr">+963 992 320 906</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ورشات. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
