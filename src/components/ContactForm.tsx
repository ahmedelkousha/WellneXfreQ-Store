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
    phone: z.string().optional(),
    productOfInterest: z.string().optional(),
    message: z.string().min(10, { message: t("common.form.validation.message") }),
    source: z.string().optional(),
  });
  
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
        title: t("common.form.success.title"),
        description: t("common.form.success.desc"),
      });
      form.reset();
    } catch(err) {
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
                  <Input placeholder={t("common.form.placeholders.name")} className="bg-black/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white" {...field} />
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
                  <Input placeholder={t("common.form.placeholders.email")} type="email" className="bg-black/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white" {...field} />
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
                  <Input placeholder={t("common.form.placeholders.phone")} type="tel" className="bg-black/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white" {...field} />
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
                      <SelectValue placeholder={t("contact.form.placeholders.interest") || t("common.form.placeholders.product")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-card border-white/10 text-white">
                    <SelectItem className="focus:bg-[#008080]" value="none">1. {t("common.form.options.interests.general")}</SelectItem>
                    <SelectItem className="focus:bg-[#008080]" value="buy">2. {t("common.form.options.interests.buy")}</SelectItem>
                    <SelectItem className="focus:bg-[#008080]" value="consultation">3. {t("common.form.options.interests.consult")}</SelectItem>
                    {/* <SelectItem value="affiliate">{t("common.form.options.interests.affiliate")}</SelectItem> */}
                    <div className="hidden">{/* Divider for products if needed */}</div>
                    {/* {products.map(p => (
                      <SelectItem key={p.id} value={p.id}>{currentLang === "pl" ? (p.name_pl || p.name) : p.name}</SelectItem>
                    ))} */}
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
                  placeholder={t("common.form.placeholders.message")} 
                  className="min-h-[120px] bg-black/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/80">{t("common.form.labels.source")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-black/50 border-white/10 focus-visible:ring-primary text-white">
                    <SelectValue placeholder={t("common.form.placeholders.source")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-card border-white/10 text-white">
                  <SelectItem value="none">{t("common.form.placeholders.source")}</SelectItem>
                  <SelectItem value="instagram">{t("common.form.options.sources.instagram")}</SelectItem>
                  <SelectItem value="facebook">{t("common.form.options.sources.facebook")}</SelectItem>
                  <SelectItem value="friend">{t("common.form.options.sources.friend")}</SelectItem>
                  <SelectItem value="search">{t("common.form.options.sources.search")}</SelectItem>
                  <SelectItem value="other">{t("common.form.options.sources.other")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-[0.65rem] sm:text-[0.8rem] font-semibold group">
          {t("common.form.submit").toUpperCase()}
          <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </Form>
  );
}
