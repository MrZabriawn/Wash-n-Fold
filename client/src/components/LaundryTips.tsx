import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Thermometer, Wind, AlertTriangle, Sparkles } from "lucide-react";

import tip1 from "@assets/stock_images/laundry_washing_clot_a3a68eab.jpg";
import tip2 from "@assets/stock_images/laundry_washing_clot_11731a79.jpg";
import tip3 from "@assets/stock_images/laundry_washing_clot_f68b5fd2.jpg";
import tip4 from "@assets/stock_images/laundry_washing_clot_4133e947.jpg";

const tips = [
  {
    title: "Sort Before You Go",
    description: "Save time and machine space by sorting your lights, darks, and towels at home. It makes loading the washers a breeze!",
    icon: Wind,
    image: tip1,
  },
  {
    title: "Check Your Pockets",
    description: "Always double-check pockets for pens, coins, or tissues. One stray tissue can leave white lint on your entire load!",
    icon: Sparkles,
    image: tip2,
  },
  {
    title: "The Truth About Scent Pellets",
    description: "Those little scent pellets (Unstoppables) might smell nice, but they're often made of synthetic wax that can coat fibers and aren't great for the&nbsp;environment.",
    icon: AlertTriangle,
    image: tip3,
    isWarning: true,
  },
  {
    title: "Don't Overload the Dryers",
    description: "Clothes need room to tumble for air to circulate. A half-full dryer dries faster and leaves your clothes with fewer&nbsp;wrinkles!",
    icon: Droplets,
    image: tip4,
  },
];

export function LaundryTips() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Pro Laundry Tips</h2>
          <p className="text-lg text-muted-foreground">Keep your clothes looking new with these simple habits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full overflow-hidden hover-elevate border-0 shadow-lg ${tip.isWarning ? 'bg-amber-50' : 'bg-white'}`}>
                <div className="h-48 overflow-hidden">
                  <img src={tip.image} alt={tip.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                </div>
                <CardContent className="p-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${tip.isWarning ? 'bg-amber-200 text-amber-700' : 'bg-primary/10 text-primary'}`}>
                    <tip.icon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${tip.isWarning ? 'text-amber-900' : 'text-gray-900'}`}>{tip.title}</h3>
                  <p className={`text-sm leading-relaxed ${tip.isWarning ? 'text-amber-800' : 'text-muted-foreground'}`}>
                    {tip.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
