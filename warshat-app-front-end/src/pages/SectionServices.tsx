import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageFade from "@/components/ui/PageFade";
import {
  Loader2,
  ArrowRight,
  Wrench,
  Star,
  Clock,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useServicesStore } from "@/store/useServicesStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SectionServices() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    currentSectionServices,
    currentSection, // Use this instead of computing from 'sections'
    loading,
    fetchServicesBySection,
    clearCurrentServices,
  } = useServicesStore();

  const sectionId = Number(id);

  useEffect(() => {
    if (sectionId) fetchServicesBySection(sectionId);
    return () => clearCurrentServices();
  }, [sectionId, fetchServicesBySection, clearCurrentServices]);

  return (
    <div
      className="relative min-h-screen bg-[#F8F9FB] font-['Cairo'] selection:bg-[#FBB03B] selection:text-white overflow-x-hidden"
      dir="rtl"
    >
      <Navbar />

      <PageFade>
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-0 -right-24 w-[500px] h-[500px] bg-[#FBB03B]/5 rounded-full blur-[100px] opacity-50"></div>
          <div className="absolute bottom-0 -left-24 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] opacity-50"></div>
        </div>

        <main className="relative z-10 pt-32 pb-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div
                onClick={() => navigate("/services")}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FBB03B] cursor-pointer transition-colors mb-4 text-sm font-medium"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة للأقسام</span>
              </div>

              <div className="flex items-center gap-4">
                {currentSection && (
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 text-[#FBB03B]">
                    {currentSection.image ? (
                      <img
                        src={currentSection.image}
                        className="w-8 h-8"
                        alt=""
                      />
                    ) : (
                      <Wrench className="w-8 h-8" />
                    )}
                  </div>
                )}
                <div>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                    {currentSection
                      ? `خدمات ${currentSection.name}`
                      : "جاري التحميل..."}
                  </h1>
                  <p className="text-gray-500 mt-2 max-w-xl text-lg">
                    {currentSection?.description ||
                      "اختر الخدمة المناسبة وسنقوم بإرسال أفضل الفنيين إليك فوراً."}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white px-5 py-2 rounded-full shadow-sm border border-gray-100 flex items-center gap-2 text-sm font-medium text-gray-600 self-start md:self-end">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {currentSectionServices.length} خدمات متاحة الآن
            </div>
          </div>

          {loading ? (
            <div className="min-h-[40vh] flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 animate-spin text-[#FBB03B] mb-4 opacity-30" />
              <p className="text-gray-400 font-medium animate-pulse">
                جاري تحميل الخدمات...
              </p>
            </div>
          ) : currentSectionServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
              {currentSectionServices.map((service, index) => (
                <div
                  key={service.id}
                  className="group bg-white rounded-[2.5rem] border border-gray-100 p-4 hover:border-[#FBB03B]/20 hover:shadow-2xl hover:shadow-[#FBB03B]/5 transition-all duration-500 flex flex-col h-full relative"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6 bg-gray-50 shrink-0">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200">
                        <Wrench className="w-16 h-16 opacity-30" />
                      </div>
                    )}

                    {service.price && (
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-black shadow-sm border border-white/50 flex items-center gap-1">
                        <span className="text-gray-900">{service.price}</span>
                        <span className="text-[#FBB03B] text-[10px]">ر.س</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-grow px-2">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#FBB03B] transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                      {service.description ||
                        "خدمة مهنية متكاملة مع ضمان الجودة والسرعة في التنفيذ."}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                      <Badge variant="warning" className="px-3 py-1">
                        <Star className="w-3 h-3 fill-current" />
                        4.9
                      </Badge>
                      <Badge variant="secondary" className="px-3 py-1">
                        <ShieldCheck className="w-3 h-3 text-green-500" />
                        ضمان
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 text-blue-500"
                      >
                        <Clock className="w-3 h-3" />
                        سريع
                      </Badge>
                    </div>

                    <div className="pt-2">
                      <Button
                        onClick={() => navigate(`/service/${service.id}/experts`)}
                        className="w-full bg-gray-900 text-white hover:bg-[#FBB03B] hover:shadow-lg hover:shadow-[#FBB03B]/20 rounded-2xl h-14 font-black transition-all duration-300 group/btn flex items-center justify-between px-6"
                      >
                        <span className="text-base">طلب الخدمة</span>
                        <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                          <ChevronLeft className="w-5 h-5" />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] p-12 md:p-20 text-center shadow-sm border border-gray-50 max-w-2xl mx-auto mt-10">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Wrench className="w-12 h-12 text-gray-200" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                لا توجد خدمات حالياً
              </h3>
              <p className="text-gray-500 mb-10 text-lg">
                هذا القسم لا يحتوي على خدمات نشطة في الوقت الحالي.
              </p>
              <Button
                onClick={() => navigate("/services")}
                className="bg-[#FBB03B] hover:bg-gray-900 text-white rounded-2xl px-10 h-14 text-lg font-bold transition-all w-full sm:w-auto shadow-xl shadow-[#FBB03B]/10"
              >
                تصفح كافة الأقسام
              </Button>
            </div>
          )}
        </main>
      </PageFade>
      <Footer />
    </div>
  );
}
