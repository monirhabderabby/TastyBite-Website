import { Card, CardContent } from "@/components/ui/card";
import { Home, Mail, Phone } from "lucide-react";

export default function ContactTop() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-none">
          <CardContent className="flex flex-col items-center text-center p-6">
            <div className="rounded-full p-3 bg-orange-100 mb-4">
              <Home className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-lg font-bold uppercase mb-2">Address Line</h2>
            <p className="text-sm text-muted-foreground">
              Dhaka, Bangladesh,1206
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary-orange text-white shadow-none">
          <CardContent className="flex flex-col items-center text-center p-6">
            <div className="rounded-full p-3 bg-orange-400 mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold uppercase mb-2">Phone Number</h2>
            <p className="text-sm">+1 123 456 7890</p>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="flex flex-col items-center text-center p-6">
            <div className="rounded-full p-3 bg-orange-100 mb-4">
              <Mail className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-lg font-bold uppercase mb-2">Mail Address</h2>
            <p className=" text-muted-foreground">tastybite@gmail.com</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
