import PageFade from "@/components/ui/PageFade";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import authImg from "@assets/Gemini_Generated_Image_comdv5comdv5comd.png";

export default function Logout() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("تم تسجيل الخروج");
    navigate("/");
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#FBB03B] flex">
      <PageFade className="flex w-full h-full">
        <div className="w-3/5 h-full flex items-center justify-center">
          <Card className="w-full max-w-md bg-white/7 rounded-[30px] backdrop-blur-xl shadow-2xl border border-white/20">
            <CardHeader className="pt-10 pb-2 border-b-0">
              <h1 className="text-4xl font-bold text-white text-center drop-shadow-sm">تسجيل الخروج</h1>
            </CardHeader>
            <CardContent className="p-8">
              <div className="max-w-sm mx-auto px-6">
                <p className="text-white text-center text-md">هل تريد تسجيل الخروج من الحساب؟</p>
                <Button
                  size="lg"
                  className="mt-6 w-full border-0 rounded-full bg-white text-[#FBB03B] text-base font-semibold shadow-xl shadow-black/30 hover:shadow-2xl hover:bg-white/90 focus:outline-none focus:ring-0 transition-shadow"
                  onClick={handleLogout}
                >
                  تسجيل الخروج
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-2/5 h-full overflow-hidden rounded-r-[100vmax] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)]">
          <img src={authImg} alt="auth" className="w-full h-full object-cover drop-shadow-2xl" />
        </div>
      </PageFade>
    </div>
  );
}
