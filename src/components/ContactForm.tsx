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
// import { useProducts } from "@/hooks/useProducts";
import { useAddInquiry } from "@/hooks/useInquiries";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";

type ContactFormProps = {
  defaultProduct?: string;
};

export default function ContactForm({ defaultProduct }: ContactFormProps) {
  const { t } = useTranslation();
  // const currentLang = i18n.language.split("-")[0];
  const { toast } = useToast();
  // const { data: products = [] } = useProducts();

  const formSchema = z.object({
    fullName: z.string().min(2, { message: t("common.form.validation.name") }),
    email: z.string().email({ message: t("common.form.validation.email") }),
    phone: z.string().optional().refine(v => !v || /^\d+$/.test(v), { 
      message: t("common.form.validation.numbers_only") || "Only numbers allowed" 
    }),
    productOfInterest: z.string().min(1, { message: "Please select an option" }),
    message: z.string().min(10, { message: t("common.form.validation.message") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      productOfInterest: defaultProduct || "General Question",
      message: "",
    },
  });

  const addInquiry = useAddInquiry();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addInquiry.mutateAsync(values);
      toast({
        title: t("common.form.success.title"),
        description: t("common.form.success.desc"),
      });
      form.reset();
    } catch (err) {
      toast({
        title: t("common.form.error.title"),
        description: t("common.form.error.desc"),
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
                <FormLabel className="text-white/80">{t("common.form.labels.name")}</FormLabel>
                <FormControl>
                  <Input className="bg-black/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white" {...field} />
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
                <FormLabel className="text-white/80">{t("common.form.labels.email")}</FormLabel>
                <FormControl>
                  <Input type="email" className="bg-black/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white" {...field} />
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
                <FormLabel className="text-white/80">{t("common.form.labels.phone")}</FormLabel>
                <FormControl>
                  <Input type="tel" className="bg-black/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white" {...field} />
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
                <FormLabel className="text-white/80">{t("contact.form.labels.interest") || t("common.form.labels.product")}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-black/50 border-white/10 focus-visible:ring-primary text-white">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-card border-white/10 text-white">
                    <SelectItem className="focus:bg-[#008080]" value="General Question">1. {t("common.form.options.interests.general")}</SelectItem>
                    <SelectItem className="focus:bg-[#008080]" value="Buy Products">2. {t("common.form.options.interests.buy")}</SelectItem>
                    <SelectItem className="focus:bg-[#008080]" value="Consultation">3. {t("common.form.options.interests.consult")}</SelectItem>
                    <SelectItem className="focus:bg-[#008080]" value="Become an Affiliate">4. {t("common.form.options.interests.affiliate")}</SelectItem>
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
              <FormLabel className="text-white/80">{t("common.form.labels.message")}</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[120px] bg-black/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <div className="flex justify-center w-full">
          <Button type="submit" className="sm:px-4 gap-[6px] sm:py-4 px-3 py-3 rounded-lg bg-primary text-black font-bold uppercase tracking-widest text-[0.65rem] sm:text-[0.8rem] hover:bg-white transition-all text-center inline-flex items-center justify-center shadow-[0_0_20px_rgba(102,248,219,0.3)] hover:shadow-[0_0_15px_rgba(102,248,219,0.5)] hover:-translate-y-1 w-fit">
            {t("common.form.submit").toUpperCase()}
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>

  );
}
