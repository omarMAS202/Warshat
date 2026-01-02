import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import logo from "@/assets/NAME-PNG-1.png";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "الرئيسية", href: "/home" },
    { name: "خدماتنا", href: "/services" },
    { name: "من نحن", href: "/about" },
    { name: "اتصل بنا", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-lg transition-all duration-300">
      <div className="w-full">
        <div className="mx-auto max-w-[95%] px-3 sm:px-4 lg:px-8 h-20 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center">
          {/* Logo */}
          <Link
            to="/home"
            className="flex items-center gap-3 justify-self-start shrink-0"
          >
            <img src={logo} alt="logo" className="h-16 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 justify-self-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-xl font-medium transition-colors hover:scale-105 transition-transform no-underline relative group py-2 ${
                  isActive(link.href)
                    ? "text-[#FBB03B]"
                    : "text-gray-700 hover:text-[#FBB03B]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* User Actions - Desktop */}
          <div className="hidden lg:flex items-center gap-4 justify-self-end shrink-0">
            {user ? (
              <div className="flex items-center gap-5 bg-white py-2.5 px-6 rounded-full border border-gray-200 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center border border-orange-100">
                    <User className="w-4 h-4 text-[#FBB03B]" />
                  </div>
                  <span className="max-w-[150px] truncate pt-0.5" dir="auto">
                    {user.name || user.email?.split("@")[0]}
                  </span>
                </div>
                <div className="w-px h-6 bg-gray-200 mx-1"></div>
                <Button
                  onClick={() => navigate("/logout")}
                  variant="default"
                  size="sm"
                  className="rounded-full h-8 px-4 text-xs font-bold bg-[#FBB03B] shrink-0 shadow-sm hover:shadow-md transition-all hover:bg-[#e09b30] border border-none"
                >
                  <LogOut className="w-4 h-4 ml-2" />
                  خروج
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => navigate("/")}
                  variant="ghost"
                  className="font-medium text-gray-600 hover:text-[#FBB03B] hover:bg-orange-50"
                >
                  تسجيل الدخول
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="bg-[#FBB03B] hover:bg-[#e09b30] text-white shadow-md shadow-orange-200 rounded-full px-6"
                >
                  حساب جديد
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t p-6 space-y-6 shadow-2xl absolute w-full left-0 top-20 z-40 animate-in slide-in-from-top-5 duration-200">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-lg font-medium hover:text-[#FBB03B] flex items-center justify-between group ${
                    isActive(link.href) ? "text-[#FBB03B]" : "text-gray-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                  <span className="text-gray-300 group-hover:text-[#FBB03B] transition-colors">
                    ←
                  </span>
                </Link>
              ))}
            </nav>
            <div className="pt-6 border-t border-gray-100">
              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-[#FBB03B]">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-800">
                        حسابي
                      </span>
                      <span className="text-xs text-gray-500" dir="ltr">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => navigate("/logout")}
                    variant="outline"
                    className="w-full justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
                  >
                    <LogOut className="w-4 h-4" /> تسجيل خروج
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => navigate("/")}
                    variant="outline"
                    className="w-full py-6 text-base"
                  >
                    تسجيل الدخول
                  </Button>
                  <Button
                    onClick={() => navigate("/register")}
                    className="w-full bg-[#FBB03B] text-white py-6 text-base shadow-lg shadow-orange-200/50"
                  >
                    إنشاء حساب جديد
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
