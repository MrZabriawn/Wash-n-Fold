import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOrderSchema, type InsertOrder } from "@shared/schema";
import { useCreateOrder } from "@/hooks/use-orders";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Calculator, Loader2, Send, PhoneCall, Info, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function OrderForm() {
  const [estimatedTotal, setEstimatedTotal] = useState<number>(0);
  const [showCallMessage, setShowCallMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSameDayAvailable, setIsSameDayAvailable] = useState(true);

  const form = useForm<any>({
    resolver: zodResolver(insertOrderSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      pounds: 0,
      bagCount: 0,
      distanceTier: "less_than_5" as const,
      serviceType: "residential" as const,
      businessName: "",
      sameDay: false,
      company: "", // honeypot
      humanVerify: "",
    },
  });

  const pounds = form.watch("pounds");
  const bagCount = form.watch("bagCount");
  const distanceTier = form.watch("distanceTier");
  const serviceType = form.watch("serviceType");
  const sameDay = form.watch("sameDay");

  useEffect(() => {
    const checkSameDay = () => {
      const now = new Date();
      const etTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        hour12: false,
      }).format(now);
      
      const hour = parseInt(etTime, 10);
      setIsSameDayAvailable(hour < 9);
      if (hour >= 9 && form.getValues("sameDay")) {
        form.setValue("sameDay", false);
      }
    };

    checkSameDay();
    const interval = setInterval(checkSameDay, 60000);
    return () => clearInterval(interval);
  }, [form]);

  useEffect(() => {
    if (distanceTier === "more_than_20") {
      setShowCallMessage(true);
      setEstimatedTotal(0);
      return;
    }
    setShowCallMessage(false);

    let deliveryFee = 0;
    if (distanceTier === "less_than_5") deliveryFee = 5;
    if (distanceTier === "5_to_20") deliveryFee = 10;

    // Price calc: $1.50/lb + $0.50/bag + Delivery
    const lbsCost = (pounds || 0) * 1.5;
    const bagsCost = (bagCount || 0) * 0.5;
    setEstimatedTotal(lbsCost + bagsCost + deliveryFee);
  }, [pounds, bagCount, distanceTier]);

  function onSubmit(data: any) {
    if (data.company) return; // Honeypot
    if (showCallMessage) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("_subject", "New Aliquippa Wash n Fold Order");
    formData.append("_template", "table");
    formData.append("_captcha", "false");
    formData.append("_next", "https://washnfold.biz/thanks.html");
    
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'sameDay') {
        formData.append("same_day", value ? "Yes (ordered before 9:00 AM ET)" : "No");
      } else {
        formData.append(key, String(value));
      }
    });

    fetch("https://formsubmit.co/zeugenesmith@gmail.com", {
      method: "POST",
      body: formData,
    })
    .then(() => {
      window.location.href = "/thanks.html";
    })
    .catch(() => {
      setIsSubmitting(false);
      alert("Failed to submit order. Please try again or call us.");
    });
  }

  return (
    <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-primary to-secondary w-full" />
      <CardContent className="p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary/10 p-3 rounded-xl">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Start Your Order</h3>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="residential">Residential Wash & Fold</SelectItem>
                        <SelectItem value="commercial">Commercial Services</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {serviceType === "commercial" && (
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Company name" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" className="bg-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" className="bg-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" type="email" className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <input type="text" name="company" {...form.register("company")} autoComplete="off" tabIndex={-1} style={{ display: 'none' }} />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Aliquippa, PA" className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="pounds"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Est. Weight (lbs)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
                            <Info className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-4">
                          <div className="space-y-3">
                            <h4 className="font-bold text-sm border-b pb-2">Common Weights Guide</h4>
                            <ul className="text-xs space-y-2">
                              <li className="flex justify-between"><span>Jeans (Adult)</span> <span className="font-mono text-primary">~1.5 lbs</span></li>
                              <li className="flex justify-between"><span>Sweatshirt / Hoodie</span> <span className="font-mono text-primary">~1.2 lbs</span></li>
                              <li className="flex justify-between"><span>Bath Towel (Large)</span> <span className="font-mono text-primary">~1.0 lb</span></li>
                              <li className="flex justify-between"><span>T-Shirt (Adult)</span> <span className="font-mono text-primary">~0.5 lb</span></li>
                              <li className="flex justify-between"><span>Queen Sheet Set</span> <span className="font-mono text-primary">~3.0 lbs</span></li>
                              <li className="flex justify-between"><span>Full Laundry Basket</span> <span className="font-mono text-primary">~15-20 lbs</span></li>
                            </ul>
                            <p className="text-[10px] text-muted-foreground pt-2 border-t italic">
                              *These are rough estimates to help with your calculation.
                            </p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormControl>
                      <Input type="number" min="0" placeholder="0" className="bg-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bagCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Bags</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="0" className="bg-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="distanceTier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distance from Aliquippa</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select distance" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="less_than_5">Less than 5 miles ($5)</SelectItem>
                        <SelectItem value="5_to_20">5 to 20 miles ($10)</SelectItem>
                        <SelectItem value="more_than_20">More than 20 miles</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-primary/5 p-4 rounded-xl border border-primary/10">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <FormLabel className="text-base font-bold">Same-Day Service</FormLabel>
                  <p className="text-xs text-muted-foreground">Order by 9:00 AM ET</p>
                </div>
              </div>
              <FormField
                control={form.control}
                name="sameDay"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-end space-y-0">
                    <FormControl>
                      <div className="flex items-center gap-2">
                        {!isSameDayAvailable && (
                          <span className="text-[10px] font-bold text-destructive bg-destructive/10 px-2 py-1 rounded">MISSED CUTOFF</span>
                        )}
                        <Switch 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                          disabled={!isSameDayAvailable}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              {!isSameDayAvailable && (
                <p className="col-span-2 text-[10px] text-destructive mt-1">
                  *Same-day orders must be placed by 9:00 AM. Please select standard service.
                </p>
              )}
            </div>

            <AnimatePresence mode="wait">
              {showCallMessage ? (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center"
                >
                  <PhoneCall className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                  <h4 className="text-amber-800 font-bold mb-2">Service Area Exception</h4>
                  <p className="text-amber-700 text-sm mb-4">
                    For pickups over 20 miles, we need to coordinate directly with you.
                  </p>
                  <a href="tel:7248000295" className="inline-flex items-center gap-2 font-bold text-amber-900 bg-amber-200/50 px-6 py-3 rounded-lg hover:bg-amber-200 transition-colors">
                    Call (724) 800-0295
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">{serviceType === 'commercial' ? 'Est. Service Total:' : 'Estimated Total:'}</span>
                      <div className="flex flex-col items-end">
                        <span className="text-3xl font-bold text-primary">
                          {serviceType === 'commercial' ? 'Custom Quote Required' : `$${estimatedTotal.toFixed(2)}`}
                        </span>
                        {sameDay && (
                          <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded mt-1">SAME-DAY: YES</span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-right">
                      {serviceType === 'commercial' 
                        ? '*Commercial pricing is customized based on volume'
                        : '*Includes delivery fee based on distance'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <FormField
                      control={form.control}
                      name="humanVerify"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Security Check: What is 5 + 3?</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter number" className="bg-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-11 text-lg font-bold bg-secondary hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          {serviceType === 'commercial' ? 'Request Quote' : 'Schedule Pickup'}
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
