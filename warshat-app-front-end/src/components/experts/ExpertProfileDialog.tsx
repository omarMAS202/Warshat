import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, MapPin, Star, Briefcase, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Expert } from "@/store/useExpertsStore";

interface ExpertProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  expert: Expert | null;
}

export default function ExpertProfileDialog({
  isOpen,
  onClose,
  expert,
}: ExpertProfileDialogProps) {
  if (!expert) return null;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-white p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-3xl">
          <div className="relative">
            <Button
              onClick={onClose}
              variant="ghost"
              className="absolute left-4 top-4 z-[100] w-8 h-8 min-h-0 rounded-full bg-white/80 hover:bg-brand/10 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-brand/50 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm p-0 group"
            >
              <X className="w-4 h-4 text-gray-500 group-hover:text-brand transition-colors" />
              <span className="sr-only">إغلاق</span>
            </Button>

            {/* Header / Cover */}
            <div className="h-32 bg-[#FBB03B] w-full rounded-t-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent"></div>
            </div>

            {/* Profile Info */}
            <div className="px-6 pb-6 -mt-16 relative">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-lg mb-4">
                  {expert.avatar ? (
                    <img
                      src={expert.avatar}
                      alt={expert.name}
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                      <UserIcon className="w-12 h-12" />
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {expert.name}
                </h2>
                {expert.expert_profile?.major && (
                  <p className="text-[#FBB03B] font-medium mb-1">
                    {expert.expert_profile.major}
                  </p>
                )}

                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{expert.location || "غير محدد"}</span>
                  </div>
                  {expert.phone && (
                    <>
                      <span className="text-gray-300">|</span>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span dir="ltr">{expert.phone}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex gap-2 mb-6">
                  {expert.expert_profile?.rating && (
                    <Badge
                      variant="secondary"
                      className="bg-yellow-50 text-yellow-600 border-yellow-200 gap-1 px-3 py-1"
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {expert.expert_profile.rating} تقييم
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className="border-[#FBB03B] text-[#FBB03B] gap-1 px-3 py-1"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    {expert.expert_profile?.experience_years || 0} سنوات خبرة
                  </Badge>
                </div>

                {/* Details Grid */}
                <div className="w-full grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-2xl text-center">
                    <div className="text-gray-400 text-xs mb-1 font-bold">
                      سعر الساعة
                    </div>
                    <div className="text-gray-900 font-bold text-lg flex items-center justify-center gap-1">
                      <span className="text-[#FBB03B]">
                        {expert.expert_profile?.hourly_rate || 0}
                      </span>
                      <span className="text-xs">ل.س</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl text-center">
                    <div className="text-gray-400 text-xs mb-1 font-bold">
                      التوفر
                    </div>
                    <div className="text-gray-900 font-bold text-lg flex items-center justify-center gap-1">
                      {expert.expert_profile?.is_active ? (
                        <>
                          <Clock className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">
                            متاح اليوم
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-600">غير متاح</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-full mb-8">
                  <h3 className="font-bold text-gray-900 mb-2 text-right">
                    نبذة عن الفني
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed text-right">
                    {expert.expert_profile?.description ||
                      expert.expert_profile?.bio ||
                      "لا يوجد نبذة تعريفية متاحة لهذا الفني."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}
