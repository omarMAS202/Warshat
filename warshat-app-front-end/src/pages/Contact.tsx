import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageFade from "@/components/ui/PageFade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div
      className="min-h-screen bg-gray-50 font-['Cairo'] overflow-x-hidden selection:bg-[#FBB03B] selection:text-white"
      dir="rtl"
    >
      <Navbar />
      <PageFade>
        <section className="py-32 container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
              تواصل معنا
            </h1>
            <div className="w-24 h-1.5 bg-[#FBB03B] mx-auto rounded-full mb-8"></div>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              لدينا فريق دعم متميز جاهز للإجابة على استفساراتك ومساعدتك في أي
              وقت. لا تتردد في التواصل معنا.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            {/* Contact Info */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                بيانات التواصل
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FBB03B] shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      رقم الهاتف
                    </h3>
                    <p className="text-gray-600 text-lg" dir="ltr">
                      +963 992 320 906
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      متوفرون من 8 صباحاً حتى 10 مساءً
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FBB03B] shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      البريد الإلكتروني
                    </h3>
                    <p className="text-gray-600 text-lg">support@warshat.com</p>
                    <p className="text-sm text-gray-400 mt-1">
                      نرد على جميع الرسائل خلال 24 ساعة
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FBB03B] shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      مقرنا الرئيسي
                    </h3>
                    <p className="text-gray-600 text-lg">دمشق، سوريا</p>
                    <p className="text-sm text-gray-400 mt-1">
                      ساحة السبع بحرات, برج الفيصلية
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                أرسل لنا رسالة
              </h2>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input
                    id="name"
                    placeholder="أدخل اسمك هنا"
                    className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">الرسالة</Label>
                  <textarea
                    id="message"
                    className="w-full min-h-[150px] rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:bg-white transition-colors font-sans"
                    placeholder="كيف يمكننا مساعدتك؟"
                  ></textarea>
                </div>

                <Button className="w-full h-12 bg-[#FBB03B] hover:bg-[#e09b30] text-white font-bold text-lg shadow-lg shadow-orange-500/20 border-none">
                  <Send className="w-5 h-5 ml-2" />
                  إرسال الرسالة
                </Button>
              </form>
            </div>
          </div>
        </section>
      </PageFade>
      <Footer />
    </div>
  );
}
