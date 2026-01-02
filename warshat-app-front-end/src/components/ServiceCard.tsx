import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  icon: any;
  title: string;
  desc: string;
  color?: string;
  onClick?: () => void;
}

export default function ServiceCard({
  icon,
  title,
  desc,
  color,
  onClick,
}: ServiceCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`group hover:-translate-y-2 transition-all duration-300 border-gray-100 shadow-md hover:shadow-2xl overflow-hidden bg-white h-full relative ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-50 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500"></div>

      <CardHeader className="flex flex-col items-center pb-4 pt-8 px-6 relative z-10">
        <div
          className={`p-4 rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110 shadow-sm ${
            color || "bg-orange-50 text-[#FBB03B]"
          }`}
        >
          {icon}
        </div>
        <CardTitle className="text-xl font-bold text-gray-800 text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-right pb-8 px-6 relative z-10">
        <p className="text-gray-500 leading-relaxed text-md">{desc}</p>
      </CardContent>
    </Card>
  );
}
