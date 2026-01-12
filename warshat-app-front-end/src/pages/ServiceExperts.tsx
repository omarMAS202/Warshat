import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageFade from "@/components/ui/PageFade";
import { useExpertsStore, type Expert } from "@/store/useExpertsStore";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, Star, MapPin, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ExpertProfileDialog from "@/components/experts/ExpertProfileDialog";

export default function ServiceExperts() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { experts, service, loading, error, fetchServiceWithExperts } =
    useExpertsStore();

  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const serviceId = Number(id);

  useEffect(() => {
    if (serviceId) {
      fetchServiceWithExperts(serviceId);
    }
  }, [serviceId, fetchServiceWithExperts]);

  const handleShowMore = (expert: Expert) => {
    setSelectedExpert(expert);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#FBB03B]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-bold">{error}</p>
        <Button onClick={() => window.location.reload()}>إعادة المحاولة</Button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#F8F9FB] font-['Cairo'] selection:bg-[#FBB03B] selection:text-white"
      dir="rtl"
    >
      <Navbar />
      <PageFade>
        <div className="pt-32 pb-20 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-500 hover:text-[#FBB03B] transition-colors mb-6"
            >
              <ArrowRight className="w-4 h-4" />
              <span>عودة</span>
            </button>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              خبراء {service?.name || "الخدمة"}
            </h1>
            <p className="text-gray-500 max-w-2xl text-lg">
              اختر الفني المناسب لك بناءً على التقييم والخبرة والسعر.
            </p>
          </div>

          {/* Experts Grid */}
          {experts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map((expert) => (
                <div
                  key={expert.id}
                  className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#FBB03B]/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                      {expert.avatar ? (
                        <img
                          src={expert.avatar}
                          alt={expert.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <User className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#FBB03B] transition-colors">
                        {expert.name}
                      </h3>
                      {expert.expert_profile?.rating && (
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-bold text-sm pt-0.5">
                            {expert.expert_profile.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {expert.location && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{expert.location}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-2">
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                      >
                        {expert.expert_profile?.experience_years || 0} سنوات
                        خبرة
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-[#FBB03B] text-[#FBB03B]"
                      >
                        {expert.expert_profile?.hourly_rate || 0} ر.س/ساعة
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      {expert.expert_profile?.is_active ? (
                        <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          متاح اليوم
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-red-500 bg-red-50 px-3 py-1 rounded-full text-xs font-bold">
                          <span className="h-2 w-2 rounded-full bg-red-500"></span>
                          غير متاح
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gray-900 hover:bg-[#FBB03B] text-white rounded-xl h-12 font-bold transition-all shadow-lg shadow-gray-200 hover:shadow-[#FBB03B]/20">
                      حجز موعد
                    </Button>
                    <Button
                      onClick={() => handleShowMore(expert)}
                      variant="outline"
                      className="flex-1 border-2 border-gray-200 hover:border-[#FBB03B] text-gray-700 hover:text-[#FBB03B] rounded-xl h-12 font-bold transition-all"
                    >
                      عرض المزيد
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                لا يوجد فنيين متاحين
              </h3>
              <p className="text-gray-500">
                للأسف لا يتوفر فنيين لهذه الخدمة في الوقت الحالي.
              </p>
            </div>
          )}
        </div>
      </PageFade>
      <ExpertProfileDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        expert={selectedExpert}
      />
      <Footer />
    </div>
  );
}
