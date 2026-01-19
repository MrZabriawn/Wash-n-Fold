import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  unit: string;
  description: string;
  icon: LucideIcon;
  colorClass: string;
  delay?: number;
}

export function PricingCard({ title, price, unit, description, icon: Icon, colorClass, delay = 0 }: PricingCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative group h-full"
    >
      <div className={`absolute inset-0 rounded-3xl opacity-20 transform group-hover:scale-105 transition-transform duration-300 ${colorClass}`} />
      <div className="relative h-full bg-white rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${colorClass.replace('bg-', 'bg-opacity-10 bg-')} `}>
          <Icon className={`w-8 h-8 ${colorClass.replace('bg-', 'text-')}`} />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="flex items-baseline justify-center gap-1 mb-4">
          <span className="text-4xl font-extrabold text-gray-900">{price}</span>
          <span className="text-muted-foreground font-medium">/{unit}</span>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
