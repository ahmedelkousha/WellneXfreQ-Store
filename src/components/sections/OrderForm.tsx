import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ORDER_PRODUCTS, type CreateOrderInput, type OrderProductId } from "@/types/order";
import { countries } from "@/data/countries";
import { useCreateOrder } from "@/hooks/useOrders";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
import { ChevronsUpDown, Check, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderLine {
  id: string;
  productId: OrderProductId | "";
  quantity: number;
}

const createEmptyLine = (): OrderLine => ({
  id: Math.random().toString(36).slice(2),
  productId: "",
  quantity: 1,
});

export default function OrderForm() {
  const { t } = useTranslation();
  const createOrder = useCreateOrder();

  // --- Form State ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+61");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idSuffix, setIdSuffix] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [countryCode, setCountryCode] = useState("AU");
  const [addressLine, setAddressLine] = useState("");
  const [lines, setLines] = useState<OrderLine[]>([createEmptyLine()]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- UI State ---
  const [phonePopoverOpen, setPhonePopoverOpen] = useState(false);
  const [countryPopoverOpen, setCountryPopoverOpen] = useState(false);
  // Track which line's product popover is open (instead of a single boolean for all)
  const [openProductLineId, setOpenProductLineId] = useState<string | null>(null);

  // Derived for the Mailing Country display label
  const currentCountry = countries.find((c) => c.code === countryCode) ?? countries[0];

  const handleAddLine = () => {
    setLines((prev) => [...prev, createEmptyLine()]);
  };

  const handleRemoveLine = (id: string) => {
    setLines((prev) => (prev.length === 1 ? prev : prev.filter((l) => l.id !== id)));
  };

  const handleLineChange = (id: string, changes: Partial<OrderLine>) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...changes } : l)));
  };

  const selectedItems = lines
    .filter((l) => l.productId && l.quantity > 0)
    .map((l) => ({
      product: ORDER_PRODUCTS.find((p) => p.id === l.productId)!,
      quantity: l.quantity,
    }))
    .filter((x) => x.product);

  const subtotal = selectedItems.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);
  const totalPh = selectedItems.reduce((acc, { product, quantity }) => acc + (product.price * quantity * product.phPercent) / 100, 0);
  const total = subtotal + totalPh;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = t("order.validation.first_name");
    if (!lastName.trim()) newErrors.lastName = t("order.validation.last_name");
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      newErrors.email = t("order.validation.email");
    }
    if (!phoneNumber.trim()) newErrors.phoneNumber = t("order.validation.phone");
    if (idSuffix.length !== 6) newErrors.idSuffix = t("order.validation.id_suffix");
    if (!gender) newErrors.gender = t("order.validation.gender");
    if (!countryCode) newErrors.country = t("order.validation.country");
    if (!addressLine.trim()) newErrors.address = t("order.validation.address");
    if (!selectedItems.length) newErrors.items = t("order.validation.items");
    if (!consent) newErrors.consent = t("order.validation.consent");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const input: CreateOrderInput = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phoneCountryCode,
      phoneNumber: phoneNumber.trim(),
      idNumber: `EA-${idSuffix.toUpperCase()}`,
      gender: gender === "male" ? "male" : "female",
      country: countryCode,
      addressLine: addressLine.trim(),
      items: selectedItems.map(({ product, quantity }) => ({
        productId: product.id,
        quantity,
      })),
    };

    try {
      await createOrder.mutateAsync(input);
      toast({
        title: t("order.success.title"),
        description: t("order.success.desc"),
      });
      // Reset Form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setIdSuffix("");
      setGender("");
      setAddressLine("");
      setLines([createEmptyLine()]);
      setConsent(false);
      setErrors({});
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: t("order.error.title"),
        description: t("order.error.desc"),
      });
    }
  };

  const isSubmitting = createOrder.isPending;

  return (
    <form  onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-white/70 mb-1 block">{t("order.form.labels.first_name")}</label>
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-black/40 border-white/10 text-white" />
          {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>}
        </div>
        <div>
          <label className="text-xs font-medium text-white/70 mb-1 block">{t("order.form.labels.last_name")}</label>
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-black/40 border-white/10 text-white" />
          {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-white/70 mb-1 block">{t("order.form.labels.email")}</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-black/40 border-white/10 text-white" />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>

        {/* Phone Field - Unlinked from Mailing Country */}
        <div>
          <label className="text-xs font-medium text-white/70 mb-1 block">{t("order.form.labels.phone")}</label>
          <div className="flex gap-2">
            <Popover open={phonePopoverOpen} onOpenChange={setPhonePopoverOpen}>
              <PopoverTrigger asChild>
                <Button type="button" variant="outline" className="min-w-[110px] justify-between bg-black/40 border-white/10 text-white">
                  <span>{phoneCountryCode}</span>
                  <ChevronsUpDown className="h-3 w-3 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandList>
                    <CommandEmpty>{t("order.form.placeholders.no_country")}</CommandEmpty>
                    <CommandGroup>
                      {countries.map((c) => (
                        <CommandItem
                          key={c.code}
                          value={`${c.name} ${c.dialCode} ${c.code}`}
                          onSelect={() => {
                            setPhoneCountryCode(c.dialCode);
                            setPhonePopoverOpen(false);
                          }}
                          onMouseDown={(e) => { e.preventDefault(); setPhoneCountryCode(c.dialCode); setPhonePopoverOpen(false); }}
                        >
                          <span className="mr-auto">{c.name} ({c.dialCode})</span>
                          <Check className={cn("h-3.5 w-3.5", c.dialCode === phoneCountryCode ? "opacity-100 text-primary" : "opacity-0")} />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="flex-1 bg-black/40 border-white/10 text-white" />
          </div>
          {errors.phoneNumber && <p className="mt-1 text-xs text-red-400">{errors.phoneNumber}</p>}
        </div>
      </div>

      {/* ID & Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-white/70 mb-1 block">{t("order.form.labels.id_number")}</label>
          <div className="flex gap-2">
            <Input value="EA-" disabled className="w-20 bg-black/60 border-white/10 text-white font-mono" />
            <Input maxLength={6} value={idSuffix} onChange={(e) => setIdSuffix(e.target.value.toUpperCase())} className="flex-1 bg-black/40 border-white/10 text-white font-mono tracking-widest" />
          </div>
          {errors.idSuffix && <p className="mt-1 text-xs text-red-400">{errors.idSuffix}</p>}
        </div>

        <div>
          <label className="text-xs font-medium text-white/70 mb-1 block">{t("order.form.labels.gender")}</label>
          <RadioGroup value={gender} onValueChange={(v) => setGender(v as "male" | "female")} className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
              <RadioGroupItem value="male" />
              <span>{t("order.form.labels.male")}</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
              <RadioGroupItem value="female" />
              <span>{t("order.form.labels.female")}</span>
            </label>
          </RadioGroup>
          {errors.gender && <p className="mt-1 text-xs text-red-400">{errors.gender}</p>}
        </div>
      </div>

      {/* Mailing Country Selector */}
      <div>
        <label className="text-xs font-medium text-white/70 mb-1 block">{t("order.form.labels.country")}</label>
        <Popover open={countryPopoverOpen} onOpenChange={setCountryPopoverOpen}>
          <PopoverTrigger asChild>
            <Button type="button" variant="outline" className="w-full justify-between bg-black/40 border-white/10 text-white">
              <span>{currentCountry.name}</span>
              <ChevronsUpDown className="h-3 w-3 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <CommandList>
                <CommandEmpty>{t("order.form.placeholders.no_country")}</CommandEmpty>
                <CommandGroup>
                  {countries.map((c) => (
                    <CommandItem
                      key={c.code}
                      value={`${c.name} ${c.dialCode} ${c.code}`}
                      onSelect={() => { setCountryCode(c.code); setCountryPopoverOpen(false); }}
                      onMouseDown={(e) => { e.preventDefault(); setCountryCode(c.code); setCountryPopoverOpen(false); }}
                    >
                      <span className="mr-auto">{c.name}</span>
                      <Check className={cn("h-3.5 w-3.5", c.code === countryCode ? "opacity-100 text-primary" : "opacity-0")} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {errors.country && <p className="mt-1 text-xs text-red-400">{errors.country}</p>}
      </div>

      {/* Address */}
      <div>
        <label className="text-xs font-medium text-white/70 mb-1 block">{t("order.form.labels.address")}</label>
        <Textarea value={addressLine} onChange={(e) => setAddressLine(e.target.value)} className="min-h-[80px] bg-black/40 border-white/10 text-white" />
        {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address}</p>}
      </div>

      {/* Product Lines */}
      <div className="space-y-3 border border-white/10 rounded-2xl p-4 bg-black/30">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">{t("order.form.labels.products")}</h3>
          <Button type="button" variant="outline" size="sm" className="border-primary/40 text-primary hover:bg-primary/10" onClick={handleAddLine}>
            <Plus className="h-3 w-3 mr-1" />
            {t("order.form.labels.add_product")}
          </Button>
        </div>

        <div className="space-y-2">
          {lines.map((line, index) => {
            const product = ORDER_PRODUCTS.find((p) => p.id === line.productId);
            return (
              <div key={line.id} className="flex flex-col md:flex-row md:items-center gap-2 rounded-xl bg-black/40 border border-white/10 p-3">
                <Popover 
                  open={openProductLineId === line.id} 
                  onOpenChange={(open) => setOpenProductLineId(open ? line.id : null)}
                >
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline" className="flex-1 justify-between bg-black/40 border-white/10 text-white">
                      <span className="truncate text-left">
                        {product ? `${product.name} – $${product.price.toLocaleString()} (+${product.phPercent}% P&H)` : t("order.form.placeholders.product")}
                      </span>
                      <ChevronsUpDown className="h-3 w-3 opacity-50 shrink-0 ml-2" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandList>
                        <CommandEmpty>{t("order.form.placeholders.no_product")}</CommandEmpty>
                        <CommandGroup>
                          {ORDER_PRODUCTS.map((p) => (
                            <CommandItem
                              key={p.id}
                              onSelect={() => {
                                handleLineChange(line.id, { productId: p.id as OrderProductId });
                                setOpenProductLineId(null);
                              }}
                            >
                              <div className="flex flex-col">
                                <span>{p.name}</span>
                                <span className="text-xs text-white/60">${p.price.toLocaleString()} (+{p.phPercent}% P&H)</span>
                              </div>
                              <Check className={cn("ml-auto h-3.5 w-3.5", p.id === line.productId ? "opacity-100 text-primary" : "opacity-0")} />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    value={line.quantity}
                    onChange={(e) => handleLineChange(line.id, { quantity: Math.max(1, Number(e.target.value) || 1) })}
                    className="w-20 bg-black/40 border-white/10 text-white"
                  />
                  <Button type="button" variant="ghost" size="icon" className="text-white/50 hover:text-red-400 hover:bg-red-500/10" onClick={() => handleRemoveLine(line.id)} disabled={lines.length === 1}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        {errors.items && <p className="mt-1 text-xs text-red-400">{errors.items}</p>}
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start gap-2">
        <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} id="order-consent" />
        <label htmlFor="order-consent" className="text-xs text-white/80 leading-relaxed cursor-pointer">{t("order.form.labels.consent")}</label>
      </div>
      {errors.consent && <p className="mt-1 text-xs text-red-400">{errors.consent}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-primary text-black hover:bg-primary/90">
        {isSubmitting ? t("order.form.labels.submitting") : t("order.form.labels.submit")}
      </Button>
    </form>
  );
}