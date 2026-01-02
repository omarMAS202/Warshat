import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageFade from "@/components/ui/PageFade";

export default function About() {
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
              لماذا تختار ورشات؟
            </h1>
            <div className="w-24 h-1.5 bg-[#FBB03B] mx-auto rounded-full mb-8"></div>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              نسعى في ورشات لتقديم تجربة صيانة منزلية استثنائية تجمع بين الجودة،
              السرعة، والموثوقية. هدفنا هو راحتك ورضاك التام.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
            {[
              {
                icon: "🛡️",
                title: "أمان وموثوقية",
                desc: "نضع أمانك في المقام الأول. جميع الفنيين لدينا تم التحقق من هوياتهم وخبراتهم وسجلاتهم لضمان راحة بالك وأمان منزلك.",
              },
              {
                icon: "⚡",
                title: "سرعة في الإنجاز",
                desc: "نقدر وقتك الثمين. نلتزم بالمواعيد المحددة ونحرص على إنجاز المهام بدقة وكفاءة عالية دون تأخير.",
              },
              {
                icon: "💰",
                title: "أسعار تنافسية",
                desc: "نقدم أفضل الخدمات بأسعار مدروسة ومناسبة للجميع. أسعارنا واضحة وشفافة بدون أي رسوم خفية أو مفاجآت.",
              },
            ].map((feat, idx) => (
              <div
                key={idx}
                className="p-10 rounded-3xl bg-white border border-gray-100 hover:border-[#FBB03B]/30 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 group"
              >
                <div className="text-6xl mb-8 transform group-hover:scale-110 transition-transform duration-300">
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-[#FBB03B] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              قصتنا
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              بدأت ورشات بفكرة بسيطة: جعل صيانة المنزل أسهل وأكثر موثوقية.
              لاحظنا الصعوبات التي يواجهها أصحاب المنازل في العثور على فنيين
              ماهرين وموثوقين، وقررنا تغيير ذلك.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              اليوم، نفخر بكوننا المنصة الرائدة التي تربط بين أفضل الفنيين
              وأصحاب المنازل، مع ضمان الجودة والرضا في كل خدمة نقدمها.
            </p>
          </div>
        </section>
      </PageFade>
      <Footer />
    </div>
  );
}
