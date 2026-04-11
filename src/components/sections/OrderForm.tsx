import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ORDER_PRODUCTS, type CreateOrderInput, type OrderProductId } from "@/types/order";
import { countries } from "@/data/countries";
import { useCreateOrder } from "@/hooks/useOrders";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { toast } from "@/hooks/use-toast";
import { ChevronsUpDown, Check, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phoneCountryCode: z.string().min(1, "Country code is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  idNumber: z.string().min(1, "ID Number is required"),
  gender: z.enum(["male", "female"], { required_error: "Please select a gender" }),

  // Personal Address
  personalStreetAddress: z.string().min(1, "Street address is required"),
  personalCity: z.string().min(1, "City is required"),
  personalState: z.string().min(1, "State is required"),
  personalCountry: z.string().min(1, "Country is required"),
  personalPostalCode: z.string().min(1, "Postal code is required"),

  // Recipient info
  isRecipientSameAsPersonal: z.boolean().default(true),
  recipientName: z.string().optional(),
  recipientPhone: z.string().optional(),
  recipientStreetAddress: z.string().optional(),
  recipientCity: z.string().optional(),
  recipientState: z.string().optional(),
  recipientCountry: z.string().optional(),
  recipientPostalCode: z.string().optional(),

  // Products
  items: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.number().min(0),
  })).min(1, "Please select at least one product").refine(items => items.some(i => i.quantity > 0), "Please select at least one product with quantity > 0"),

  consent1: z.boolean().refine(v => v === true, "Confirmation is required"),
  consent2: z.boolean().refine(v => v === true, "Confirmation is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function OrderForm() {
  const { t } = useTranslation();
  const createOrder = useCreateOrder();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneCountryCode: "+61",
      phoneNumber: "",
      idNumber: "",
      gender: undefined,
      personalStreetAddress: "",
      personalCity: "",
      personalState: "",
      personalCountry: "AU",
      personalPostalCode: "",
      isRecipientSameAsPersonal: true,
      recipientName: "",
      recipientPhone: "",
      recipientStreetAddress: "",
      recipientCity: "",
      recipientState: "",
      recipientCountry: "AU",
      recipientPostalCode: "",
      items: ORDER_PRODUCTS.map(p => ({ productId: p.id, quantity: 0 })),
      consent1: false,
      consent2: false,
    },
  });

  const { watch, setValue } = form;
  const isSameAddress = watch("isRecipientSameAsPersonal");
  const formItems = watch("items");

  const [openPhoneCode, setOpenPhoneCode] = useState(false);
  const [openPersonalCountry, setOpenPersonalCountry] = useState(false);
  const [openRecipientCountry, setOpenRecipientCountry] = useState(false);

  const regularProducts = ORDER_PRODUCTS.filter(p => !p.isBundle);
  const bundleProducts = ORDER_PRODUCTS.filter(p => p.isBundle);

  // Sync recipient fields if "same as personal" is checked
  useEffect(() => {
    if (isSameAddress) {
      const values = form.getValues();
      setValue("recipientName", `${values.firstName} ${values.lastName}`.trim());
      setValue("recipientPhone", values.phoneNumber);
      setValue("recipientStreetAddress", values.personalStreetAddress);
      setValue("recipientCity", values.personalCity);
      setValue("recipientState", values.personalState);
      setValue("recipientCountry", values.personalCountry);
      setValue("recipientPostalCode", values.personalPostalCode);
    }
  }, [
    isSameAddress,
    watch("firstName"),
    watch("lastName"),
    watch("phoneNumber"),
    watch("personalStreetAddress"),
    watch("personalCity"),
    watch("personalState"),
    watch("personalCountry"),
    watch("personalPostalCode"),
    setValue
  ]);

  const onSubmit = async (data: FormValues) => {
    // Filter out items with 0 quantity
    const filteredItems = data.items.filter(item => item.quantity > 0) as { productId: OrderProductId; quantity: number }[];

    const input: CreateOrderInput = {
      ...data,
      items: filteredItems,
    };

    try {
      await createOrder.mutateAsync(input);
      toast({
        title: t("order.success.title"),
        description: t("order.success.desc"),
      });
      form.reset();
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: t("order.error.title"),
        description: t("order.error.desc"),
      });
    }
  };

  // const calculateTotals = () => {
  //   let subtotal = 0;
  //   let phTotal = 0;

  //   formItems.forEach(item => {
  //     const product = ORDER_PRODUCTS.find(p => p.id === item.productId);
  //     if (product && item.quantity > 0) {
  //       const lineSubtotal = product.price * item.quantity;
  //       subtotal += lineSubtotal;
  //       phTotal += (lineSubtotal * product.phPercent) / 100;
  //     }
  //   });

  //   return { subtotal, phTotal, total: subtotal + phTotal };
  // };

  // const { subtotal, phTotal, total } = calculateTotals();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 w-full">
        {/* Section 1: Personal Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-white/10 flex-1" />
            <h3 className="text-xl font-heading font-bold text-primary uppercase tracking-wider whitespace-nowrap">
              {t("order.form.labels.personal_details")}
            </h3>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <h4 className="text-sm font-heading font-bold text-white tracking-wider whitespace-nowrap">{t("order.form.labels.full_legal_name")}</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">{t("order.form.labels.first_name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("order.form.placeholders.first_name")} {...field} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-primary/50" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">{t("order.form.labels.middle_name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("order.form.placeholders.middle_name")} {...field} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-primary/50" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">{t("order.form.labels.last_name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("order.form.placeholders.last_name")} {...field} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-primary/50" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">{t("order.form.labels.email")}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t("order.form.placeholders.email")} {...field} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-primary/50" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label className="text-white/70 font-normal">{t("order.form.labels.phone")}</Label>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="phoneCountryCode"
                  render={({ field }) => (
                    <FormItem className="flex-shrink-0">
                      <Popover open={openPhoneCode} onOpenChange={setOpenPhoneCode}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[100px] h-12 bg-black/40 border-white/10 text-white rounded-xl flex justify-between px-3",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 bg-background border-white/10">
                          <Command>
                            <CommandInput placeholder={t("order.form.placeholders.search_country")} className="h-9" />
                            <CommandList className="max-h-[300px]">
                              <CommandEmpty>{t("order.form.placeholders.no_country")}</CommandEmpty>
                              <CommandGroup>
                                {countries.map((country) => (
                                  <CommandItem
                                    key={country.code}
                                    value={`${country.name} (${country.dialCode})`}
                                    onSelect={() => {
                                      form.setValue("phoneCountryCode", country.dialCode);
                                      setOpenPhoneCode(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4 text-primary",
                                        field.value === country.dialCode ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {country.name} ({country.dialCode})
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder={t("order.form.placeholders.phone")} {...field} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-primary/50" />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">{t("order.form.labels.id_number")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("order.form.placeholders.id_number")} {...field} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-primary/50" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-white/70">{t("order.form.labels.gender")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-6 mt-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" className="border-white/20 text-primary" />
                        </FormControl>
                        <Label className="font-normal text-white/80 cursor-pointer">
                          {t("order.form.labels.male")}
                        </Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" className="border-white/20 text-primary" />
                        </FormControl>
                        <Label className="font-normal text-white/80 cursor-pointer">
                          {t("order.form.labels.female")}
                        </Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section 2: Personal Address */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-white/10 flex-1" />
            <h3 className="text-xl font-heading font-bold text-primary uppercase tracking-wider whitespace-nowrap">
              {t("order.form.labels.personal_address")}
            </h3>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <FormField
            control={form.control}
            name="personalStreetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/70">{t("order.form.labels.street")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("order.form.placeholders.street")} {...field} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-primary/50" />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="personalCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">{t("order.form.labels.city")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("order.form.placeholders.city")} {...field} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-primary/50" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">{t("order.form.labels.state")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("order.form.placeholders.state")} {...field} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-primary/50" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="personalCountry"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white/70">{t("order.form.labels.country")}</FormLabel>
                  <Popover open={openPersonalCountry} onOpenChange={setOpenPersonalCountry}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full h-12 bg-black/40 border-white/10 text-white rounded-xl flex justify-between px-3",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? countries.find((country) => country.code === field.value)?.name
                            : t("order.form.placeholders.country")}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full min-w-[300px] p-0 bg-background border-white/10">
                      <Command>
                        <CommandInput placeholder={t("order.form.placeholders.search_country")} className="h-9" />
                        <CommandList className="max-h-[300px]">
                          <CommandEmpty>{t("order.form.placeholders.no_country")}</CommandEmpty>
                          <CommandGroup>
                            {countries.map((country) => (
                              <CommandItem
                                key={country.code}
                                value={country.name}
                                onSelect={() => {
                                  form.setValue("personalCountry", country.code);
                                  setOpenPersonalCountry(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4 text-primary",
                                    field.value === country.code ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {country.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalPostalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/70">{t("order.form.labels.postal_code")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("order.form.placeholders.postal_code")} {...field} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-primary/50" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section 3: Recipient Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-white/10 flex-1" />
            <h3 className="text-xl font-heading font-bold text-primary uppercase tracking-wider whitespace-nowrap">
              {t("order.form.labels.shipping_details")}
            </h3>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <FormField
            control={form.control}
            name="isRecipientSameAsPersonal"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-black/20 p-4 rounded-xl border border-white/5">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:text-black"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-medium text-white/90 cursor-pointer">
                    {t("order.form.labels.same_as_personal")}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          {!isSameAddress && (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="recipientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">{t("order.form.labels.recipient_name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("order.form.placeholders.recipient_name")} {...field} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-primary/50" />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">{t("order.form.labels.recipient_phone")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("order.form.placeholders.recipient_phone")} {...field} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-primary/50" />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="recipientStreetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/70">{t("order.form.labels.street")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("order.form.placeholders.street")} {...field} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-primary/50" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="recipientCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">{t("order.form.labels.city")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("order.form.placeholders.city")} {...field} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-primary/50" />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientState"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">{t("order.form.labels.state")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("order.form.placeholders.state")} {...field} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-primary/50" />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="recipientCountry"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-white/70">{t("order.form.labels.country")}</FormLabel>
                      <Popover open={openRecipientCountry} onOpenChange={setOpenRecipientCountry}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full h-12 bg-black/40 border-white/10 text-white rounded-xl flex justify-between px-3",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? countries.find((country) => country.code === field.value)?.name
                                : t("order.form.placeholders.country")}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full min-w-[300px] p-0 bg-background border-white/10">
                          <Command>
                            <CommandInput placeholder={t("order.form.placeholders.search_country")} className="h-9" />
                            <CommandList className="max-h-[300px]">
                              <CommandEmpty>{t("order.form.placeholders.no_country")}</CommandEmpty>
                              <CommandGroup>
                                {countries.map((country) => (
                                  <CommandItem
                                    key={country.code}
                                    value={country.name}
                                    onSelect={() => {
                                      form.setValue("recipientCountry", country.code);
                                      setOpenRecipientCountry(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4 text-primary",
                                        field.value === country.code ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {country.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientPostalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">{t("order.form.labels.postal_code")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("order.form.placeholders.postal_code")} {...field} className="bg-black/40 border-white/10 text-white h-12 rounded-xl focus:border-primary/50" />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Products Selection */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-white/10 flex-1" />
            <h3 className="text-xl font-heading font-bold text-primary uppercase tracking-wider whitespace-nowrap">
              {t("order.form.labels.products_section")}
            </h3>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <p className="text-sm hidden text-white/50 bg-white/5 p-4 rounded-xl border border-white/10 leading-relaxed italic">
            {t("order.form.labels.products_disclaimer")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProducts.map((product) => {
              const globalIndex = ORDER_PRODUCTS.findIndex(p => p.id === product.id);
              return (
                <div key={product.id} className="bg-black/40 border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-primary/30 transition-all group">
                  <div>
                    <h4 className="font-bold text-white mb-1 group-hover:text-primary transition-colors">
                      {t(`order.form.labels.product_names.${product.id}`)}
                    </h4>
                    <p className="text-xs text-white/40 mb-4">{product.phPercent}% {t("order.form.labels.summary_ph")}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">{t("order.form.labels.quantity")}</span>
                    <Input
                      type="number"
                      min="0"
                      placeholder="0"
                      className="w-20 bg-black/40 border-white/5 text-white h-10 rounded-lg text-center font-mono"
                      value={formItems[globalIndex]?.quantity || 0}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        form.setValue(`items.${globalIndex}.quantity`, val);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bundles Section */}
          <div className="flex items-center gap-4 mt-12 mb-4">
            <div className="h-px bg-white/10 flex-1" />
            <h3 className="text-xl font-heading font-bold text-primary uppercase tracking-wider whitespace-nowrap">
              {t("order.form.labels.bundles_section")}
            </h3>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {/* <p className="text-sm text-white/50 bg-white/5 p-4 rounded-xl border border-white/10 leading-relaxed italic">
            {t("order.form.labels.bundles_disclaimer")}
          </p> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bundleProducts.map((product) => {
              const globalIndex = ORDER_PRODUCTS.findIndex(p => p.id === product.id);
              return (
                <div key={product.id} className="bg-black/40 border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-primary/30 transition-all group">
                  <div>
                    <h4 className="font-bold text-white mb-1 group-hover:text-primary transition-colors">
                      {t(`order.form.labels.product_names.${product.id}`)}
                    </h4>
                    <p className="text-xs text-white/40 mb-4">{product.phPercent}% {t("order.form.labels.summary_ph")}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">{t("order.form.labels.quantity")}</span>
                    <Input
                      type="number"
                      min="0"
                      placeholder="0"
                      className="w-20 bg-black/40 border-white/5 text-white h-10 rounded-lg text-center font-mono"
                      value={formItems[globalIndex]?.quantity || 0}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        form.setValue(`items.${globalIndex}.quantity`, val);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Totals Summary Card */}
          {/* <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl mt-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-white/60">
                <span>{t("order.form.labels.summary_subtotal")}</span>
                <span className="font-mono text-lg">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-white/60">
                <span>{t("order.form.labels.summary_ph")}</span>
                <span className="font-mono text-lg">${phTotal.toLocaleString()}</span>
              </div>
              <div className="h-px bg-primary/20 my-4" />
              <div className="flex justify-between items-center text-white">
                <span className="text-xl font-bold">{t("order.form.labels.summary_total")}</span>
                <div className="text-right">
                  <span className="text-3xl font-bold font-mono text-primary">${total.toLocaleString()}</span>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Indicative USD</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Section 5: Consent and Submit */}
        <div className="space-y-6 pt-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="consent1"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1 border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:text-black"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-white/60 leading-relaxed cursor-pointer select-none">
                      {t("order.form.labels.consent1")}
                    </FormLabel>
                    {form.formState.errors.consent1 && (
                      <p className="text-xs text-red-400 mt-1">{form.formState.errors.consent1.message}</p>
                    )}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consent2"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1 border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:text-black"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-white/60 leading-relaxed cursor-pointer select-none">
                      {t("order.form.labels.consent2")}
                    </FormLabel>
                    {form.formState.errors.consent2 && (
                      <p className="text-xs text-red-400 mt-1">{form.formState.errors.consent2.message}</p>
                    )}
                  </div>
                </FormItem>
              )}
            />
          </div>


          <div className="flex justify-center w-full">
            <Button
              type="submit"
              disabled={createOrder.isPending}
              className="sm:px-4 gap-[6px] sm:py-4 px-3 py-3 rounded-lg bg-primary text-black font-bold uppercase tracking-widest text-[0.65rem] sm:text-[0.8rem] hover:bg-white transition-all text-center inline-flex items-center justify-center shadow-[0_0_20px_rgba(102,248,219,0.3)] hover:shadow-[0_0_15px_rgba(102,248,219,0.5)] hover:-translate-y-1 w-fit"
            >
              {createOrder.isPending ? t("order.form.labels.submitting") : t("order.form.labels.submit")}
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}