import { OrderForm } from "@/components/OrderForm";
import { PricingCard } from "@/components/PricingCard";
import { Shirt, ShoppingBag, Truck, MapPin, Phone, Clock, Star, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white p-2 rounded-lg">
              <Shirt className="h-6 w-6" />
            </div>
            <span className="font-display font-bold text-xl text-primary-foreground tracking-tight hidden sm:block">
              Aliquippa Laundry
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
            <a href="#order" className="text-gray-600 hover:text-primary transition-colors">Schedule Pickup</a>
            <a href="tel:7245550123" className="hidden sm:flex items-center gap-2 text-primary bg-primary/10 px-4 py-2 rounded-full hover:bg-primary/20 transition-colors">
              <Phone className="h-4 w-4" />
              (724) 555-0123
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-secondary text-sm font-bold mb-6">
                Fresh & Clean in 24 Hours
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                Laundry Day <br className="hidden sm:block" />
                <span className="text-primary">Done For You.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Premium Wash & Fold service in Aliquippa. We pick up, clean, and deliver your clothes fresh and neatly folded.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#order" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-1 transition-all">
                  Schedule Pickup
                </a>
                <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-full font-bold text-lg hover:shadow-md transition-all">
                  How it Works
                </a>
              </div>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            {[
              { icon: Clock, label: "24h Turnaround" },
              { icon: Truck, label: "Doorstep Delivery" },
              { icon: MapPin, label: "Local Service" },
              { icon: Star, label: "Premium Care" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center justify-center gap-2 text-gray-500 font-medium"
              >
                <item.icon className="w-5 h-5 text-secondary" />
                {item.label}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">No hidden fees. Just clean clothes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard 
              title="Wash & Fold"
              price="$1.50"
              unit="lb"
              description="Sorted, washed, dried, and perfectly folded. 10lb minimum order."
              icon={Shirt}
              colorClass="bg-primary"
              delay={0}
            />
            <PricingCard 
              title="Per Bag"
              price="$0.50"
              unit="bag"
              description="Handling fee per laundry bag used for separation or delivery."
              icon={ShoppingBag}
              colorClass="bg-secondary"
              delay={0.1}
            />
            <PricingCard 
              title="Delivery"
              price="$5+"
              unit="order"
              description="Based on distance. Free pickup on all orders."
              icon={Truck}
              colorClass="bg-blue-400"
              delay={0.2}
            />
          </div>

          {/* Delivery Tiers */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 bg-gray-50 rounded-2xl p-8 border border-gray-100"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <MapPin className="text-primary w-6 h-6" />
              <h3 className="text-xl font-bold">Delivery Zones from Aliquippa (447 Franklin Ave)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-secondary font-bold mb-1">Zone 1</div>
                <div className="text-sm text-muted-foreground mb-2">&lt; 5 miles</div>
                <div className="text-xl font-bold text-gray-900">$5.00</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">POPULAR</div>
                <div className="text-primary font-bold mb-1">Zone 2</div>
                <div className="text-sm text-muted-foreground mb-2">5 - 20 miles</div>
                <div className="text-xl font-bold text-gray-900">$10.00</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-gray-500 font-bold mb-1">Zone 3</div>
                <div className="text-sm text-muted-foreground mb-2">&gt; 20 miles</div>
                <div className="text-sm font-bold text-gray-900 flex items-center justify-center gap-1">
                  <Phone className="w-3 h-3" /> Call Us
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Order Section */}
      <section id="order" className="py-24 bg-primary/5 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready for Fresh Clothes?</h2>
            <p className="text-lg text-muted-foreground">Fill out the form below to schedule your pickup.</p>
          </div>
          
          <OrderForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shirt className="h-6 w-6 text-primary" />
                <span className="font-display font-bold text-xl">Aliquippa Laundry</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Professional wash and fold service committed to quality and convenience. Your clothes are safe with us.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span>447 Franklin Avenue<br/>Aliquippa, PA 15001</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href="tel:7245550123" className="hover:text-white transition-colors">(724) 555-0123</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Hours</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-white">8am - 6pm</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-white">9am - 4pm</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-gray-600">Closed</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Aliquippa Laundry Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
