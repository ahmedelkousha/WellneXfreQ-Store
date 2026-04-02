import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts } from "@/hooks/useProducts";
import { useAddInquiry } from "@/hooks/useInquiries";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional(),
  productOfInterest: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  source: z.string().optional(),
});

type ContactFormProps = {
  defaultProduct?: string;
};

export default function ContactForm({ defaultProduct }: ContactFormProps) {
  const { toast } = useToast();
  const { data: products = [] } = useProducts();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      productOfInterest: defaultProduct || "none",
      message: "",
      source: "none",
    },
  });

  const addInquiry = useAddInquiry();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addInquiry.mutateAsync(values);
      toast({
        title: "Inquiry Sent Successfully",
        description: "We've received your message and our team will be in touch shortly.",
      });
      form.reset();
    } catch(err) {
      toast({
        title: "Error Sending",
        description: "There was a problem sending your inquiry. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80">Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" className="bg-black/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80">Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" type="email" className="bg-black/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80">Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 000-0000" type="tel" className="bg-black/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productOfInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80">Product of Interest</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-black/50 border-white/10 focus-visible:ring-primary text-white">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-card border-white/10 text-white">
                    <SelectItem value="none">General Inquiry</SelectItem>
                    {products.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/80">Message / Query</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about your health goals or specific questions..." 
                  className="min-h-[120px] bg-black/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/80">How did you hear about us? (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-black/50 border-white/10 focus-visible:ring-primary text-white">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-card border-white/10 text-white">
                  <SelectItem value="none">Select an option</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="friend">Friend / Referral</SelectItem>
                  <SelectItem value="search">Search Engine</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold group">
          Send Inquiry
          <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </Form>
  );
}
