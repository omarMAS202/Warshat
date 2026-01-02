import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageFade from "@/components/ui/PageFade";
import { Wrench, Zap, Droplets, Hammer, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useServicesStore } from "@/store/useServicesStore";
import ServiceCard from "@/components/ServiceCard";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const { sections, loading, fetchSections } = useServicesStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const getIconForSection = (name: string) => {
    if (name.includes("سباكة")) return <Wrench className="w-14 h-14" />;
    if (name.includes("كهرباء")) return <Zap className="w-14 h-14" />;
    if (name.includes("تنظيف")) return <Droplets className="w-14 h-14" />;
    if (name.includes("نجارة")) return <Hammer className="w-14 h-14" />;
    return <Wrench className="w-14 h-14" />;
  };

  const getColorForSection = (name: string) => {
    if (name.includes("سباكة")) return "bg-blue-50 text-blue-500";
    if (name.includes("كهرباء")) return "bg-yellow-50 text-yellow-500";
    if (name.includes("تنظيف")) return "bg-cyan-50 text-cyan-500";
    if (name.includes("نجارة")) return "bg-orange-50 text-orange-500";
    return "bg-gray-50 text-gray-500";
  };

  return (
    <div
      className="min-h-screen bg-gray-50 font-['Cairo'] overflow-x-hidden selection:bg-[#FBB03B] selection:text-white"
      dir="rtl"
    >
      <Navbar />
      <PageFade>
        <section className="py-32">
          <div className="max-w-8xl mx-auto px-6 md:px-9">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
                  خدماتنا المميزة
                </h1>
                <div className="w-24 h-1.5 bg-[#FBB03B] mx-auto rounded-full mb-8"></div>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                  نقدم مجموعة متكاملة من خدمات الصيانة المنزلية لتلبية كافة
                  احتياجاتك. فريقنا من الفنيين المحترفين جاهز لخدمتك على مدار
                  الساعة.
                </p>
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-[#FBB03B]" />
                </div>
              ) : sections.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {sections.map((section) => (
                    <ServiceCard
                      key={section.id}
                      onClick={() => navigate(`/services/${section.id}`)}
                      icon={
                        section.image ? (
                          <img
                            src={section.image}
                            alt={section.name}
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          getIconForSection(section.name)
                        )
                      }
                      title={section.name}
                      desc={section.description}
                      color={getColorForSection(section.name)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-10">
                  لا توجد خدمات متاحة حالياً.
                </div>
              )}
            </div>
          </div>
        </section>
      </PageFade>
      <Footer />
    </div>
  );
}
