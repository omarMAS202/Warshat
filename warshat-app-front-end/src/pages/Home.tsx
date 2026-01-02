import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageFade from "@/components/ui/PageFade";
import { useAuthStore } from "@/store/useAuthStore";
import { useServicesStore } from "@/store/useServicesStore";
import { useNavigate } from "react-router-dom";
import { Search, CheckCircle2, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const { sections, fetchSections } = useServicesStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // Normalize search query
    const query = searchQuery.trim().toLowerCase();

    // Map common terms to their respective Arabic section names or IDs
    // This is a simple client-side mapping. For more complex search, backend API is better.
    // Assuming we want to match section names.
    const matchedSection = sections.find(
      (section) =>
        section.name.toLowerCase().includes(query) ||
        (query === "electricity" && section.name.includes("كهرباء")) ||
        (query === "plumbing" && section.name.includes("سباكة")) ||
        (query === "cleaning" && section.name.includes("تنظيف")) ||
        (query === "carpentry" && section.name.includes("نجارة"))
    );

    if (matchedSection) {
      navigate(`/services/${matchedSection.id}`);
    } else {
      toast.error("لم يتم العثور على قسم يطابق بحثك");
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 font-['Cairo'] selection:bg-[#FBB03B] selection:text-white overflow-x-clip"
      dir="rtl"
    >
      <Navbar />

      <PageFade>
        {/* Hero Section */}
        <section className="relative pt-20 pb-20 lg:pt-28 lg:pb-32 overflow-hidden">
          {/* Background Design */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FBB03B]/90 to-[#F59E0B] z-0">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(#fff 2px, transparent 2px)",
                backgroundSize: "30px 30px",
              }}
            ></div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 to-transparent z-10"></div>

          <div className="container mx-auto px-4 relative z-20 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 text-white leading-[1.2] drop-shadow-sm">
              صيانة منزلك.. <br className="hidden md:block" />
              <span className="text-white opacity-90">
                بلمسة زر وبأعلى جودة
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
              نصلك بأمهر الفنيين في السباكة، الكهرباء، التنظيف، والنجارة. خدمة
              موثوقة، أسعار تنافسية، وضمان للرضا.
            </p>

            {/* Enhanced Search Box */}
            <div className="bg-white p-2 rounded-2xl shadow-xl shadow-orange-500/20 max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 transform hover:-translate-y-1 transition-transform duration-300">
              <div className="relative flex-1 group flex items-center">
                {/* تم استبدال right-4 بـ right-5 وإضافة z-10 لضمان الظهور */}
                <Search className="absolute right-5 text-gray-400 w-5 h-5 group-focus-within:text-[#FBB03B] transition-colors pointer-events-none z-10" />

                <Input
                  className="border-0 bg-transparent h-14 pr-14 pl-4 text-lg text-gray-800 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                  placeholder="ما هي الخدمة التي تبحث عنها؟"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                />
              </div>

              <Button
                size="lg"
                className="h-18 px-8 rounded-xl bg-[#FBB03B] hover:bg-[#dfa238] text-white font-bold text-lg shadow-md hover:shadow-lg transition-all border-none shrink-0"
                onClick={handleSearch}
              >
                ابحث الآن
              </Button>
            </div>

            {/* Quick Stats/Tags */}
            <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-8 text-white/80 text-sm md:text-base font-medium">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> فنيين معتمدين
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> ضمان على الخدمة
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> دعم 24/7
              </span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          {" "}
          {/* إزالة container من هنا للسماح بالمرونة */}
          <div className="max-w-6xl mx-auto bg-[#1F2937] rounded-[2.5rem] p-10 md:p-20 text-white relative overflow-hidden text-center shadow-2xl">
            {/* Abstract Shapes */}
            {/* قمت بتعديل تموضع الأشكال لضمان عدم تسببها في قص الحواف */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FBB03B]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                جاهز لطلب خدمتك الأولى؟
              </h2>
              <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                انضم لآلاف العملاء الراضين واستمتع بتجربة صيانة منزلية خالية من
                المتاعب. حمل التطبيق أو سجل الآن.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-[#FBB03B] hover:bg-[#e09b30] text-white px-10 h-14 text-lg rounded-full font-bold shadow-lg border-none"
                  onClick={() =>
                    user ? navigate("/services") : navigate("/register")
                  }
                >
                  ابدأ الآن
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/20 text-white hover:bg-white/10 px-10 h-14 text-lg rounded-full font-bold"
                  onClick={() => navigate("/contact")}
                >
                  <Phone className="w-5 h-5 ml-2" /> اتصل بنا
                </Button>
              </div>
            </div>
          </div>
        </section>
      </PageFade>
      <Footer />
    </div>
  );
}
