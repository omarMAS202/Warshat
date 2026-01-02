import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageFade from "@/components/ui/PageFade";
import { toast } from "sonner";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import authImg from "@assets/Gemini_Generated_Image_comdv5comdv5comd.png";
import api from "@/lib/api";

const schema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirm: z.string().min(6),
  })
  .refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "كلمتا المرور غير متطابقتين",
  });

type FormValues = z.infer<typeof schema>;

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await api.post("/register", {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirm,
      });
      toast.success("تم إنشاء الحساب بنجاح");
      navigate("/");
    } catch {
      toast.error("فشل إنشاء الحساب");
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#FBB03B] flex">
      <PageFade className="flex w-full h-full">
        <div className="w-3/5 h-full flex items-center justify-center">
          <Card className="w-full max-w-md bg-white/7 rounded-[30px] backdrop-blur-xl shadow-2xl border border-white/20">
            <CardHeader className="pt-10 pb-2 border-b-0">
              <h1 className="text-4xl font-bold text-white text-center drop-shadow-sm">
                إنشاء حساب
              </h1>
            </CardHeader>
            <CardContent className="p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 max-w-sm mx-auto px-6"
              >
                <div className="space-y-2">
                  <Label className="block text-base font-medium text-white">
                    الاسم
                  </Label>
                  <div className="relative group">
                    <User className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
                    <div className="border-b-2 border-white">
                      <Input
                        variant="underline"
                        className="w-full bg-transparent text-white placeholder:text-white border-0 rounded-none px-0 pr-12 py-2 text-right focus:outline-none focus:ring-0 autofill-transparent"
                        type="text"
                        placeholder=""
                        {...register("name")}
                      />
                    </div>
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-200">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="block text-base font-medium text-white">
                    البريد الإلكتروني
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
                    <div className="border-b-2 border-white">
                      <Input
                        variant="underline"
                        className="w-full bg-transparent text-white placeholder:text-white border-0 rounded-none px-0 pr-12 py-2 text-right focus:outline-none focus:ring-0 autofill-transparent"
                        type="email"
                        placeholder=""
                        {...register("email")}
                      />
                    </div>
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-200">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="block text-base font-medium text-white">
                    كلمة المرور
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
                    <div className="border-b-2 border-white">
                      <Input
                        variant="underline"
                        className="w-full bg-transparent text-white placeholder:text-white border-0 rounded-none px-0 pr-12 py-2 text-right focus:outline-none focus:ring-0 autofill-transparent"
                        type="password"
                        placeholder=""
                        {...register("password")}
                      />
                    </div>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-200">
                      {errors.password.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="block text-base font-medium text-white">
                    تأكيد كلمة المرور
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
                    <div className="border-b-2 border-white">
                      <Input
                        variant="underline"
                        className="w-full bg-transparent text-white placeholder:text-white border-0 rounded-none px-0 pr-12 py-2 text-right focus:outline-none focus:ring-0 autofill-transparent"
                        type="password"
                        placeholder=""
                        {...register("confirm")}
                      />
                    </div>
                  </div>
                  {errors.confirm && (
                    <p className="mt-1 text-sm text-red-200">
                      {errors.confirm.message as string}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="mt-6 w-full border-0 rounded-full bg-white text-[#FBB03B] text-base font-semibold shadow-xl shadow-black/30 hover:shadow-2xl hover:bg-white/90 focus:outline-none focus:ring-0 transition-shadow"
                >
                  {isSubmitting ? "جارٍ إنشاء الحساب..." : "إنشاء حساب"}
                </Button>
              </form>
              <p className="mt-5 text-center text-md text-white">
                لديك حساب؟{" "}
                <Link to="/" className="font-semibold underline">
                  تسجيل الدخول
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="w-2/5 h-full overflow-hidden rounded-r-[100vmax] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)]">
          <img
            src={authImg}
            alt="auth"
            className="w-full h-full object-cover drop-shadow-2xl"
          />
        </div>
      </PageFade>
    </div>
  );
}
