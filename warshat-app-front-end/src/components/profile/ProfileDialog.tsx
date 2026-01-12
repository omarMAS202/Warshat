import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  ShieldCheck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/utils/cn";

// التحقق من صحة البيانات
const profileSchema = z
  .object({
    name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
    email: z.string().email("البريد الإلكتروني غير صالح"),
    phone: z.string().optional(),
    location: z.string().optional(),
    changePassword: z.boolean(),
    password: z.string().optional(),
    password_confirmation: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.changePassword) {
        if (!data.password || data.password.length < 6) return false;
        if (data.password !== data.password_confirmation) return false;
      }
      return true;
    },
    {
      message: "يرجى التأكد من كلمة المرور (6 أحرف على الأقل) وتطابقها",
      path: ["password_confirmation"],
    }
  );

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon: React.ElementType;
  error?: FieldError;
  registerProps?: UseFormRegisterReturn;
}

// مكون إضافي لتبسيط الحقول ومنع التكرار وضمان الاتساق
const InputField = ({
  label,
  id,
  icon: Icon,
  error,
  registerProps,
  ...props
}: InputFieldProps) => (
  <div className="space-y-2">
    <Label
      htmlFor={id}
      className="text-gray-900 dark:text-white font-bold block text-right mb-2"
    >
      {label}
    </Label>
    <div className="relative">
      {/* الأيقونة في اليمين لأننا RTL */}
      <div className="absolute right-3 top-0 bottom-0 flex items-center justify-center pointer-events-none text-gray-400">
        <Icon className="h-5 w-5" />
      </div>
      <Input
        id={id}
        {...registerProps}
        {...props}
        // pr-10 مهمة جداً عشان الكلام ما يجي فوق الأيقونة
        className={`pr-10 h-11 text-right bg-gray-50/50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-950 transition-all ${
          error
            ? "border-red-500 ring-1 ring-red-500/20"
            : "focus:border-brand focus:ring-1 focus:ring-brand/20"
        } ${props.className || ""}`}
      />
    </div>
    {error && (
      <p className="text-xs text-red-500 mt-1 text-right font-medium">
        {error.message}
      </p>
    )}
  </div>
);

export function ProfileDialog({ isOpen, onClose }: ProfileDialogProps) {
  const { user, setUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      changePassword: false,
    },
  });

  useEffect(() => {
    if (isOpen && user) {
      // إعادة تعيين الحالة عند الفتح

      api
        .get("/client/profile")
        .then(({ data }) => {
          setValue("name", data.name);
          setValue("email", data.email);
          setValue("phone", data.phone || "");
          setValue("location", data.location || "");
        })
        .catch(() => {
          toast.error("فشل تحميل بيانات الملف الشخصي");
          if (user.name) setValue("name", user.name);
          if (user.email) setValue("email", user.email);
        });
    } else {
      reset();
    }
  }, [isOpen, user, setValue, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const payload: Record<string, string | undefined> = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: data.location,
      };

      if (data.changePassword && data.password) {
        payload.password = data.password;
        payload.password_confirmation = data.password_confirmation;
      }

      const { data: responseData } = await api.put("/client/profile", payload);

      if (responseData.user) {
        if (data.changePassword && data.password) {
          await logout();
          onClose();
          navigate("/login");
          toast.success("تم تغيير كلمة المرور بنجاح. يرجى تسجيل الدخول مجدداً");
        } else {
          setUser(responseData.user);
          toast.success("تم تحديث الملف الشخصي بنجاح");
          onClose();
        }
      }
    } catch (error) {
      console.error(error);
      const err = error as AxiosError<{
        message: string;
        errors?: Record<string, string[]>;
      }>;

      if (err.response?.status === 422 && err.response.data.errors) {
        Object.entries(err.response.data.errors).forEach(([key, messages]) => {
          setError(key as keyof ProfileFormValues, {
            type: "server",
            message: messages[0],
          });
        });
        toast.error("يرجى التحقق من البيانات المدخلة");
      } else {
        const msg = err.response?.data?.message || "حدث خطأ أثناء التحديث";
        toast.error(msg);
      }
    }
  };

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setShowPasswordSection(false);
          onClose();
        }
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
            "sm:max-w-4xl w-[95vw] p-0 overflow-hidden bg-white dark:bg-slate-950 border-none shadow-2xl rounded-2xl flex flex-col max-h-[90vh]"
          )}
          dir="rtl"
        >
          <Button
            onClick={onClose}
            variant="ghost"
            className="absolute left-4 top-4 z-[100] w-8 h-8 min-h-0 rounded-full bg-white/80 hover:bg-brand/10 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-brand/50 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm p-0 group"
            type="button"
          >
            <X className="w-4 h-4 text-gray-500 group-hover:text-brand transition-colors" />
            <span className="sr-only">إغلاق</span>
          </Button>

          {/* Body - قابل للسكرول */}
          <div className="flex-1 overflow-y-auto scrollbar-hide relative">
            {/* Header - يتحرك مع السكرول */}
            <div className="relative shrink-0">
              <div className="h-24 bg-gradient-to-l from-brand/10 to-brand/5 w-full absolute top-0 left-0 z-0" />
              <div
                className={cn(
                  "flex flex-col space-y-1.5 text-center sm:text-left",
                  "relative z-10 px-8 pt-8 pb-4 text-right pl-16"
                )}
              >
                <DialogPrimitive.Title
                  className={cn(
                    "text-lg font-semibold leading-none tracking-tight",
                    "text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2"
                  )}
                >
                  الملف الشخصي
                  <span className="text-brand text-4xl leading-none">.</span>
                </DialogPrimitive.Title>
                <p className="text-gray-500 text-sm mt-1">
                  قم بإدارة معلوماتك الشخصية وإعدادات الحساب
                </p>
              </div>
            </div>

            <form
              id="profile-form"
              onSubmit={handleSubmit(onSubmit)}
              className="p-8 pt-2"
            >
              {/* Main Content: Form Fields */}
              <div className="w-full max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 gap-5">
                  <div className="col-span-1">
                    <InputField
                      id="name"
                      label="الاسم الكامل"
                      icon={User}
                      registerProps={register("name")}
                      error={errors.name}
                      placeholder="الاسم كما يظهر للآخرين"
                    />
                  </div>

                  <div className="col-span-1">
                    <InputField
                      id="email"
                      label="البريد الإلكتروني"
                      icon={Mail}
                      registerProps={register("email")}
                      error={errors.email}
                      type="email"
                    />
                  </div>

                  <div className="col-span-1">
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-gray-700 dark:text-gray-300 font-semibold block text-right"
                      >
                        رقم الهاتف
                      </Label>
                      <div className="relative">
                        <div className="absolute right-3 top-0 bottom-0 flex items-center justify-center pointer-events-none text-gray-400">
                          <Phone className="h-5 w-5" />
                        </div>
                        <Input
                          id="phone"
                          {...register("phone")}
                          className="pr-10 h-11 text-right bg-gray-50/50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-950 transition-all focus:border-brand focus:ring-brand/20"
                          placeholder="09xxxxxxxx"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1">
                    <InputField
                      id="location"
                      label="العنوان"
                      icon={MapPin}
                      registerProps={register("location")}
                      placeholder="المدينة، المنطقة..."
                    />
                  </div>
                </div>

                {/* Security Section */}
                <div className="pt-6 border-t border-gray-100 dark:border-slate-800 mt-2">
                  <div className="flex items-center justify-between mb-4 bg-gray-50 dark:bg-slate-900/30 p-3 rounded-lg">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                        تغيير كلمة المرور
                      </h4>
                      <p className="text-xs text-gray-500">
                        قم بالتفعيل فقط إذا كنت تود التغيير
                      </p>
                    </div>
                    <Switch
                      id="change-pass-toggle"
                      dir="ltr"
                      checked={showPasswordSection}
                      onCheckedChange={(checked) => {
                        setShowPasswordSection(checked);
                        setValue("changePassword", checked);
                        if (!checked) {
                          setValue("password", "");
                          setValue("password_confirmation", "");
                        }
                      }}
                      className="data-[state=checked]:bg-gray-200 dark:data-[state=checked]:bg-slate-700 [&_span]:bg-[#FBB03B]"
                    />
                  </div>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      showPasswordSection
                        ? "max-h-[400px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="grid grid-cols-1 gap-5 pt-4 pb-2 px-2 max-w-lg mx-auto">
                      <div className="col-span-1">
                        <InputField
                          id="password"
                          label="كلمة المرور الجديدة"
                          icon={Lock}
                          registerProps={register("password")}
                          type="password"
                          placeholder="أدخل كلمة المرور الجديدة"
                          className="bg-white dark:bg-slate-950"
                        />
                      </div>
                      <div className="col-span-1">
                        <InputField
                          id="password_confirmation"
                          label="تأكيد كلمة المرور"
                          icon={ShieldCheck}
                          registerProps={register("password_confirmation")}
                          error={errors.password_confirmation}
                          type="password"
                          placeholder="أعد كتابة كلمة المرور"
                          className="bg-white dark:bg-slate-950"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Footer - ثابت أسفل الديالوج */}
          <div
            className={cn(
              "flex flex-col-reverse sm:flex-row justify-center items-center gap-6",
              "shrink-0 p-6 bg-gray-50/80 dark:bg-slate-900/80 border-t border-gray-100 dark:border-slate-800 backdrop-blur-sm"
            )}
          >
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="rounded-full h-12 px-8 text-base font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 shrink-0 transition-all border border-transparent"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              form="profile-form" // ربط الزر بالفورم لأن الزر خارج الـ form tag الآن
              disabled={isSubmitting}
              variant="default"
              className="rounded-full h-12 px-6 text-base font-bold bg-[#FBB03B] shrink-0 shadow-sm hover:shadow-md transition-all hover:bg-[#e09b30] border border-none"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>حفظ التحديثات</>
              )}
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
