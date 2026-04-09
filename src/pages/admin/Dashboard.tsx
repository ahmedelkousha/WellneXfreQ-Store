import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { supabase } from "@/lib/supabase";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useProducts, useAddProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/useProducts";
import { useInquiries, useUpdateInquiryStatus, useDeleteInquiry } from "@/hooks/useInquiries";
import { useBlogs, useAddBlog, useUpdateBlog, useDeleteBlog } from "@/hooks/useBlogs";
import { useOrders, useUpdateOrderStatus, useDeleteOrder } from "@/hooks/useOrders";
import { Product } from "@/data/products";
import { Blog } from "@/types/blog";
import { Inquiry } from "@/types/inquiry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, LogOut, Check, X, Loader2, UploadCloud, Eye, EyeOff, Archive, Globe, ExternalLink, Star } from "lucide-react";

export default function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language || "en";
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const { data: products = [], isLoading: loadingProducts, error } = useProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const { data: inquiries = [], isLoading: loadingInquiries } = useInquiries();
  const { data: orders = [], isLoading: loadingOrders } = useOrders();
  const updateOrderStatus = useUpdateOrderStatus();
  const deleteOrder = useDeleteOrder();
  const updateInquiry = useUpdateInquiryStatus();
  const deleteInquiry = useDeleteInquiry();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [galleryUploadProgress, setGalleryUploadProgress] = useState<number | null>(null);
  const [rawFeatures, setRawFeatures] = useState("");
  const [rawFeaturesPl, setRawFeaturesPl] = useState("");

  // Blog states
  const { data: blogs = [], isLoading: loadingBlogs } = useBlogs();
  const addBlog = useAddBlog();
  const updateBlog = useUpdateBlog();
  const deleteBlog = useDeleteBlog();
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogFormData, setBlogFormData] = useState<Partial<Blog>>({
    content: { intro: "", sections: [], conclusion: "" }
  });
  const [blogUploadProgress, setBlogUploadProgress] = useState<number | null>(null);

  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate(`/${currentLang}/admin/login`);
      } else {
        setIsAuthenticated(true);
      }
    });
    return () => unsubscribe();
  }, [navigate, currentLang]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate(`/${currentLang}/admin/login`);
  };

  const startEditProduct = (product: Product | null) => {
    if (product) {
      setEditingId(product.id);
      setFormData(product);
    } else {
      setEditingId("new");
      setFormData({
        name: "",
        name_pl: "",
        slug: "",
        shortDescription: "",
        shortDescription_pl: "",
        features: [],
        features_pl: [],
        image: "",
        gallery: [],
        price: "",
        isFeatured: false,
      });
      setRawFeatures("");
      setRawFeaturesPl("");
    }
  };

  const syncRawFeatures = (p: Product | null) => {
    setRawFeatures(p?.features?.join("\n\n") || "");
    setRawFeaturesPl(p?.features_pl?.join("\n\n") || "");
  };

  useEffect(() => {
    if (editingId && editingId !== "new") {
      const p = products.find(p => p.id === editingId);
      if (p) syncRawFeatures(p);
    } else if (editingId === "new") {
      setRawFeatures("");
      setRawFeaturesPl("");
    }
  }, [editingId, products]);

  const startEditBlog = (blog: Blog | null) => {
    if (blog) {
      setEditingBlogId(blog.id);
      setBlogFormData(blog);
    } else {
      setEditingBlogId("new");
      setBlogFormData({
        title: "", slug: "", category: "Technology", author: "wellneXfreQ", readTime: "5 min read", date: new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date()),
        excerpt: "", image: "",
        content: { intro: "", sections: [], conclusion: "" }
      });
    }
  };

  const handleSave = async () => {
    try {
      // If setting this product to featured, optionally unset others (best effort)
      if (formData.isFeatured) {
        const featured = products.find(p => p.isFeatured && p.id !== editingId);
        if (featured) {
          await updateProduct.mutateAsync({ ...featured, isFeatured: false });
        }
      }

      const finalData = {
        ...formData,
        features: rawFeatures.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
        features_pl: rawFeaturesPl.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
      };

      if (editingId === "new") {
        await addProduct.mutateAsync(finalData as Omit<Product, "id">);
      } else if (editingId) {
        await updateProduct.mutateAsync({ ...finalData, id: editingId } as Product);
      }
      setEditingId(null);
      setFormData({});
      setRawFeatures("");
      setRawFeaturesPl("");
    } catch (error) {
      console.error("Error saving product:", error);
      alert(t("admin.dashboard.products.save_failed"));
    }
  };

  const saveBlog = async () => {
    if (!blogFormData.title || !blogFormData.slug) return alert("Title and Slug required");
    try {
      if (editingBlogId === "new") {
        await addBlog.mutateAsync(blogFormData as Omit<Blog, "id" | "createdAt">);
      } else if (editingBlogId) {
        await updateBlog.mutateAsync({ ...blogFormData, id: editingBlogId } as Blog);
      }
      setEditingBlogId(null);
    } catch (error) {
      console.error("Error saving blog:", error);
      alert(t("admin.dashboard.blogs.save_failed"));
    }
  };

  const handleProductDelete = async (id: string) => {
    if (confirm(t("admin.dashboard.products.delete_confirm"))) {
      try {
        await deleteProduct.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const syncFirebaseProducts = async () => {
    if(confirm("This will WIPE all current products and permanently forcefully sync to the 6 seed products. Continue?")) {
      try {
        const { products: localSeedProducts } = await import("@/data/products");
        for (const p of products) { // from useProducts hook
          await deleteProduct.mutateAsync(p.id);
        }
        for (const seed of localSeedProducts) {
          await addProduct.mutateAsync(seed as any);
        }
        alert("Firebase Products Synced to New Schema!");
      } catch(e) {
        console.error(e);
        alert("Sync failed.");
      }
    }
  };

  const handleBlogDelete = async (id: string) => {
    if (confirm(t("admin.dashboard.blogs.delete_confirm"))) await deleteBlog.mutateAsync(id);
  };

  const generateSlug = (text: string) =>
    text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  const handleChange = (field: keyof Product, value: any) => {
    setFormData((prev) => {
      const updates: Partial<Product> = { [field]: value };
      if (field === "name" && editingId === "new") {
        updates.slug = generateSlug(value);
      }
      return { ...prev, ...updates };
    });
  };

  const handleBlogChange = (field: keyof Blog, value: string) => {
    setBlogFormData(prev => {
      const updates: Partial<Blog> = { [field]: value };
      if (field === "title" && editingBlogId === "new") {
        updates.slug = generateSlug(value);
      }
      return { ...prev, ...updates };
    });
  };

  const handleBlogContentChange = (field: 'intro' | 'conclusion', value: string) => {
    setBlogFormData(prev => ({
      ...prev,
      content: { ...(prev.content || { intro: '', sections: [], conclusion: '' }), [field]: value }
    }));
  };

  const handleBlogSectionChange = (index: number, field: 'heading' | 'body', value: string) => {
    setBlogFormData(prev => {
      const sections = [...(prev.content?.sections || [])];
      sections[index] = { ...sections[index], [field]: value };
      return { ...prev, content: { ...prev.content, intro: prev.content?.intro || '', conclusion: prev.content?.conclusion || '', sections } };
    });
  };

  const addBlogSection = () => {
    setBlogFormData(prev => ({
      ...prev,
      content: { ...prev.content, intro: prev.content?.intro || '', conclusion: prev.content?.conclusion || '', sections: [...(prev.content?.sections || []), { heading: '', body: '' }] }
    }));
  };

  const removeBlogSection = (index: number) => {
    setBlogFormData(prev => {
      const sections = [...(prev.content?.sections || [])];
      sections.splice(index, 1);
      return { ...prev, content: { ...prev.content, intro: prev.content?.intro || '', conclusion: prev.content?.conclusion || '', sections } };
    });
  };

  // Removed handleFeaturesChange in favor of raw state logic

  const performSupabaseUpload = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const { error } = await supabase.storage
      .from('products')
      .upload(`${fileName}`, file, { cacheControl: '3600', upsert: false });

    if (error) throw error;

    const { data: urlData } = supabase.storage.from('products').getPublicUrl(`${fileName}`);
    if (!urlData) throw new Error("Could not retrieve URL");
    return urlData.publicUrl;
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const file = files[0];

    const maxSizeBytes = 500 * 1024; // 500KB
    if (file.size > maxSizeBytes) {
      alert(t("admin.dashboard.upload.too_large"));
      return;
    }

    setUploadProgress(0);
    try {
      setUploadProgress(50);
      const url = await performSupabaseUpload(file);
      setFormData(prev => ({ ...prev, image: url }));
    } catch (err: any) {
      console.error("Upload error", err);
      alert(`Main image upload failed: ${err?.message || "Check Supabase Config"}`);
    } finally {
      setUploadProgress(null);
      if (e.target) e.target.value = "";
    }
  };

  const handleBlogThumbUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 500 * 1024) return alert(t("admin.dashboard.upload.too_large"));

    setBlogUploadProgress(10);
    try {
      const url = await performSupabaseUpload(file);
      setBlogUploadProgress(100);
      setBlogFormData(prev => ({ ...prev, image: url }));
    } catch (err: any) {
      alert(t("admin.dashboard.upload.failed"));
    } finally {
      setBlogUploadProgress(null);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const existingCount = formData.gallery?.length || 0;
    if (files.length + existingCount > 4) {
      alert(t("admin.dashboard.products.gallery_limit"));
      return;
    }

    const maxSizeBytes = 500 * 1024; // 500KB
    for (const file of files) {
      if (file.size > maxSizeBytes) {
        alert(t("admin.dashboard.upload.too_large"));
        return;
      }
    }

    setGalleryUploadProgress(0);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        setGalleryUploadProgress(Math.max((i / files.length) * 100, 5));
        const url = await performSupabaseUpload(files[i]);
        uploadedUrls.push(url);
      }
      setFormData(prev => {
        const newGallery = [...(prev.gallery || []), ...uploadedUrls].slice(0, 4);
        return { ...prev, gallery: newGallery };
      });
    } catch (error: any) {
      alert(`${t("admin.dashboard.upload.failed")}: ${error?.message || "Check Supabase Configuration"}`);
    } finally {
      setGalleryUploadProgress(null);
      if (e.target) e.target.value = "";
    }
  };

  const removeGalleryImage = (idxToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery?.filter((_, idx) => idx !== idxToRemove) || [],
    }));
  };

  const handleInquiryStatusAction = async (inquiryId: string, status: Inquiry['status']) => {
    await updateInquiry.mutateAsync({ id: inquiryId, status });
  };

  const handleInquiryDelete = async (inquiryId: string) => {
    if (confirm(t("admin.dashboard.inquiries.delete_confirm"))) {
      await deleteInquiry.mutateAsync(inquiryId);
    }
  };

  const renderInquiryCard = (inquiry: Inquiry) => (
    <motion.div
      key={inquiry.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`p-5 rounded-2xl border transition-colors ${inquiry.status === 'new' ? 'bg-primary/5 border-primary/30' : inquiry.status === 'archived' ? 'bg-white/5 border-transparent opacity-60' : 'bg-card border-white/10'}`}
    >
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-lg text-white">{inquiry.fullName}</h3>
            {inquiry.status === 'new' && <span className="bg-primary text-black text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider">{t("admin.dashboard.inquiries.new_badge")}</span>}
            {inquiry.status === 'archived' && <span className="bg-white/20 text-white/60 text-xs px-2 py-0.5 rounded uppercase tracking-wider">{t("admin.dashboard.inquiries.archived")}</span>}
          </div>
          <div className="text-sm text-white/60 flex flex-wrap gap-x-4 gap-y-1">
            <span><strong className="text-white/80">Email:</strong> <a href={`mailto:${inquiry.email}`} className="text-primary hover:underline">{inquiry.email}</a></span>
            {inquiry.phone && <span><strong className="text-white/80">Phone:</strong> {inquiry.phone}</span>}
            <span className="text-white/40">{new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(inquiry.createdAt)}</span>
          </div>
          {inquiry.productOfInterest && inquiry.productOfInterest !== 'none' && (
            <div className="text-sm"><strong className="text-primary/80">Interested In:</strong> {products.find(p => p.id === inquiry.productOfInterest)?.name || inquiry.productOfInterest}</div>
          )}
          <div className="bg-black/50 p-4 rounded-lg mt-3 text-white/90 whitespace-pre-wrap text-sm border border-white/5">
            {inquiry.message}
          </div>
          {inquiry.source && inquiry.source !== 'none' && <p className="text-xs text-white/40 mt-2">Source: {inquiry.source}</p>}
        </div>

        <div className="flex flex-row md:flex-col justify-end gap-2 shrink-0 md:min-w-[140px]">
          {inquiry.status === 'new' && (
            <Button size="sm" variant="outline" onClick={() => handleInquiryStatusAction(inquiry.id, 'read')} className="border-white/20 w-full text-white/80">
              <Eye className="w-3.5 h-3.5 mr-2" /> {t("admin.dashboard.inquiries.mark_read")}
            </Button>
          )}
          {inquiry.status === 'read' && (
            <Button size="sm" variant="outline" onClick={() => handleInquiryStatusAction(inquiry.id, 'new')} className="border-white/20 w-full text-white/60">
              <EyeOff className="w-3.5 h-3.5 mr-2" /> {t("admin.dashboard.inquiries.mark_unread")}
            </Button>
          )}
          {inquiry.status !== 'archived' ? (
            <Button size="sm" variant="outline" onClick={() => handleInquiryStatusAction(inquiry.id, 'archived')} className="border-white/20 w-full text-orange-400 hover:text-orange-300">
              <Archive className="w-3.5 h-3.5 mr-2" /> {t("admin.dashboard.inquiries.archive")}
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => handleInquiryStatusAction(inquiry.id, 'read')} className="border-white/20 w-full text-white/60">
              {t("admin.dashboard.inquiries.unarchive")}
            </Button>
          )}
          <Button size="sm" variant="destructive" onClick={() => handleInquiryDelete(inquiry.id)} className="w-full">
            <Trash2 className="w-3.5 h-3.5 mr-2" /> {t("admin.dashboard.inquiries.delete")}
          </Button>
        </div>
      </div>
    </motion.div>
  );

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
        <div className="text-red-500 mb-2 font-bold text-xl">{t("admin.dashboard.error_title")}</div>
        <p className="text-white/70 max-w-md text-center">
          {error instanceof Error ? error.message : t("admin.dashboard.error_message")}
        </p>
        <Button onClick={() => window.location.reload()} className="mt-6 bg-primary text-black">
          {t("admin.dashboard.retry")}
        </Button>
      </div>
    );
  }

  if (isAuthenticated === null || loadingProducts) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <span className="text-white/60 font-medium tracking-wide">{t("admin.dashboard.status")}</span>
      </div>
    );
  }

  const isModalOpen = editingId !== null;
  const isBlogModalOpen = editingBlogId !== null;

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="products" className="w-full">
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md pt-18 lg:pt-22 pb-4 mb-6 border-b border-white/5">
            <div className="flex flex-col md:flex-row justify-between md:items-center pb-6 gap-4">
              <h1 className="text-3xl font-heading font-bold text-white">{t("admin.dashboard.title")}</h1>
              <div className="flex items-center gap-3">
                <Button asChild variant="outline" className="border-white/20 text-white bg-white/5 hover:bg-white/10">
                  <a href={`/${currentLang}`} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" /> {t("admin.dashboard.go_to_site")}
                  </a>
                </Button>
                <Button onClick={handleLogout} variant="destructive" className="border-white/20 text-white">
                  <LogOut className="w-4 h-4 mr-2" /> {t("admin.dashboard.logout")}
                </Button>
              </div>
            </div>

            <TabsList className="bg-white/5 border border-white/10 p-1 w-full justify-start">
              <TabsTrigger value="products" className="data-[state=active]:bg-primary data-[state=active]:text-black text-white/70 whitespace-nowrap">{t("admin.dashboard.tabs.products")}</TabsTrigger>
              <TabsTrigger value="blogs" className="data-[state=active]:bg-primary data-[state=active]:text-black text-white/70 whitespace-nowrap">{t("admin.dashboard.tabs.blogs")}</TabsTrigger>
              <TabsTrigger value="inquiries" className="data-[state=active]:bg-primary data-[state=active]:text-black text-white/70 flex items-center gap-2 whitespace-nowrap">
                {t("admin.dashboard.tabs.inquiries")}
                {inquiries.filter(i => i.status === 'new').length > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    {inquiries.filter(i => i.status === 'new').length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-black text-white/70 flex items-center gap-2 whitespace-nowrap">
                {t("admin.dashboard.tabs.orders")}
                {orders.filter((o) => (o as any).status === "new").length > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    {orders.filter((o) => (o as any).status === "new").length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="products">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">{t("admin.dashboard.products.title")}</h2>
              <div className="flex gap-2 items-center">
                <Button onClick={syncFirebaseProducts} variant="destructive" className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/50">
                  ⚠️ Reset & Sync Products
                </Button>
                <Button onClick={() => startEditProduct(null)} className="gap-2 bg-primary text-black">
                  <Plus className="w-4 h-4" /> {t("admin.dashboard.products.new")}
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  className="bg-card border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row justify-between md:items-start gap-4"
                >
                  <div className="flex gap-6 items-start">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg bg-black/50 shrink-0" />
                    ) : (
                      <div className="w-24 h-24 rounded-lg bg-white/5 shrink-0 flex items-center justify-center text-white/20 text-xs text-center p-2">{t("admin.dashboard.products.no_img")}</div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {product.name} <span className="text-sm font-normal text-white/50 bg-white/5 px-2 py-1 rounded">/{product.slug}</span>
                        {product.price && <span className="ml-3 font-mono text-primary bg-primary/10 px-2 py-1 rounded-md text-sm">{product.price}</span>}
                      </h3>
                      <p className="text-white/70 text-sm line-clamp-2 max-w-xl">{product.features?.[0]}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
                    <Button size="sm" variant="outline" asChild className="border-white/20 text-white w-full">
                      <a href={`/${currentLang}/product/${product.slug}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 md:mr-0 mr-2" /> <span className="md:hidden">{t("admin.dashboard.products.view_live")}</span>
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => startEditProduct(product)} className="border-white/20 text-white w-full">
                      <Edit2 className="w-4 h-4 md:mr-0 mr-2" /> <span className="md:hidden">{t("admin.dashboard.products.edit")}</span>
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleProductDelete(product.id)} className="w-full">
                      <Trash2 className="w-4 h-4 md:mr-0 mr-2" /> <span className="md:hidden">{t("admin.dashboard.products.delete")}</span>
                    </Button>
                  </div>
                </motion.div>
              ))}

              {products.length === 0 && (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 text-white/50">
                  {t("admin.dashboard.products.no_products")}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="blogs">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">{t("admin.dashboard.blogs.title")}</h2>
              <Button onClick={() => startEditBlog(null)} className="gap-2 bg-primary text-black">
                <Plus className="w-4 h-4" /> {t("admin.dashboard.blogs.new")}
              </Button>
            </div>

            {loadingBlogs ? (
              <div className="flex py-10 items-center justify-center"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
            ) : (
              <div className="grid gap-6">
                {blogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    layout
                    className="bg-card border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row justify-between md:items-start gap-4"
                  >
                    <div className="flex gap-6 items-start">
                      {blog.image ? (
                        <img src={blog.image} alt={blog.title} className="w-24 h-24 object-cover rounded-lg bg-black/50 shrink-0" />
                      ) : (
                        <div className="w-24 h-24 rounded-lg bg-white/5 shrink-0 flex items-center justify-center text-white/20 text-xs text-center p-2">{t("admin.dashboard.products.no_img")}</div>
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 flex flex-wrap items-center gap-2">
                          {blog.title}
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-primary/10 text-primary border-primary/30">{blog.category}</span>
                        </h3>
                        <p className="text-white/50 text-xs mb-2">{blog.date} • {blog.readTime} • /{blog.slug}</p>
                        <p className="text-white/70 text-sm line-clamp-2 max-w-xl">{blog.excerpt}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
                      <Button size="sm" variant="outline" asChild className="border-white/20 text-white w-full">
                        <a href={`/${currentLang}/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 md:mr-0 mr-2" /> <span className="md:hidden">{t("admin.dashboard.blogs.view_live")}</span>
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => startEditBlog(blog)} className="border-white/20 text-white w-full">
                        <Edit2 className="w-4 h-4 md:mr-0 mr-2" /> <span className="md:hidden">{t("admin.dashboard.blogs.edit")}</span>
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleBlogDelete(blog.id)} className="w-full">
                        <Trash2 className="w-4 h-4 md:mr-0 mr-2" /> <span className="md:hidden">{t("admin.dashboard.blogs.delete")}</span>
                      </Button>
                    </div>
                  </motion.div>
                ))}

                {blogs.length === 0 && (
                  <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 text-white/50">
                    {t("admin.dashboard.blogs.no_articles")}
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="inquiries">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">{t("admin.dashboard.inquiries.title")}</h2>
            </div>

            {loadingInquiries ? (
              <div className="flex py-10 items-center justify-center"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
            ) : (
              <Tabs defaultValue="active" className="w-full">
                <TabsList className="bg-white/5 border border-white/10 mb-6 p-1">
                  <TabsTrigger value="active" className="data-[state=active]:bg-primary data-[state=active]:text-black text-white/70">
                    {t("admin.dashboard.inquiries.active")}
                    {inquiries.filter(i => i.status === 'new').length > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                        {inquiries.filter(i => i.status === 'new').length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="archived" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70">
                    {t("admin.dashboard.inquiries.archived")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="grid gap-4 mt-0">
                  <AnimatePresence>
                    {inquiries.filter(i => i.status !== 'archived').map(renderInquiryCard)}
                    {inquiries.filter(i => i.status !== 'archived').length === 0 && (
                      <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 text-white/50">
                        {t("admin.dashboard.inquiries.no_active")}
                      </div>
                    )}
                  </AnimatePresence>
                </TabsContent>

                <TabsContent value="archived" className="grid gap-4 mt-0">
                  <AnimatePresence>
                    {inquiries.filter(i => i.status === 'archived').map(renderInquiryCard)}
                    {inquiries.filter(i => i.status === 'archived').length === 0 && (
                      <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 text-white/50">
                        {t("admin.dashboard.inquiries.no_archived")}
                      </div>
                    )}
                  </AnimatePresence>
                </TabsContent>
              </Tabs>
            )}
          </TabsContent>

          <TabsContent value="orders">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">{t("admin.dashboard.orders.title")}</h2>
            </div>
            {loadingOrders ? (
              <div className="flex py-10 items-center justify-center">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 text-white/50">
                {t("admin.dashboard.orders.no_orders")}
              </div>
            ) : (
              <Tabs defaultValue="active" className="w-full">
                <TabsList className="bg-white/5 border border-white/10 mb-6 p-1">
                  <TabsTrigger value="active" className="data-[state=active]:bg-primary data-[state=active]:text-black text-white/70">
                    {t("admin.dashboard.orders.active")}
                    {orders.filter((o) => (o as any).status === "new").length > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                        {orders.filter((o) => (o as any).status === "new").length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="archived" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70">
                    {t("admin.dashboard.orders.archived")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="grid gap-4 mt-0">
                  {orders
                    .filter((o) => (o as any).status !== "archived")
                    .map((order) => {
                  const items = Array.isArray(order.items) ? order.items : [];
                  const subtotal = typeof order.subtotal === "number" ? order.subtotal : 0;
                  const totalPh = typeof order.totalPh === "number" ? order.totalPh : 0;
                  const total =
                    typeof order.total === "number" ? order.total : subtotal + totalPh;
                  const status = (order as any).status || "new";

                  return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl border border-white/10 bg-card flex flex-col gap-3"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {order.firstName} {order.lastName}
                        </h3>
                        <p className="text-xs text-white/60">
                          {new Intl.DateTimeFormat("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }).format(new Date(order.createdAt))}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          {status === "new" && (
                            <span className="bg-primary text-black text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                              {t("admin.dashboard.orders.new_badge")}
                            </span>
                          )}
                          {status === "archived" && (
                            <span className="bg-white/20 text-white/60 text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                              {t("admin.dashboard.orders.archived")}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-white/70">
                          <strong>Email:</strong>{" "}
                          <a
                            href={`mailto:${order.email}`}
                            className="text-primary hover:underline"
                          >
                            {order.email}
                          </a>
                          {" • "}
                          <strong>ID:</strong> {order.idNumber}
                        </p>
                        <p className="mt-1 text-xs text-white/60">
                          <strong>{t("admin.dashboard.orders.address")}:</strong> {order.personalStreetAddress}, {order.personalCity || ""}, {order.personalCountry}<br/>
                        </p>
                        
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)} className="border-primary/30 text-primary hover:bg-primary/10 mb-2">
                          <Eye className="w-4 h-4 mr-2" /> {t("admin.dashboard.orders.view_details")}
                        </Button>
                        <p className="text-xs text-white/60 uppercase tracking-[0.15em]">
                          {t("admin.dashboard.orders.total")}
                        </p>
                        <p className="text-xl font-mono font-bold text-primary">
                          {order.currency || "USD"}{" "}
                          {total.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>

                        <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                          {status === "new" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-white/80 w-full"
                              onClick={() => updateOrderStatus.mutateAsync({ id: order.id, status: "read" })}
                            >
                              <Eye className="w-3.5 h-3.5 mr-2" /> {t("admin.dashboard.orders.mark_read")}
                            </Button>
                          )}
                          {status === "read" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-white/60 w-full"
                              onClick={() => updateOrderStatus.mutateAsync({ id: order.id, status: "new" })}
                            >
                              <EyeOff className="w-3.5 h-3.5 mr-2" /> {t("admin.dashboard.orders.mark_unread")}
                            </Button>
                          )}
                          {status !== "archived" ? (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-orange-400 hover:text-orange-300 w-full"
                              onClick={() => updateOrderStatus.mutateAsync({ id: order.id, status: "archived" })}
                            >
                              <Archive className="w-3.5 h-3.5 mr-2" /> {t("admin.dashboard.orders.archive")}
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-white/60 w-full"
                              onClick={() => updateOrderStatus.mutateAsync({ id: order.id, status: "read" })}
                            >
                              {t("admin.dashboard.orders.unarchive")}
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            className="w-full"
                            onClick={async () => {
                              if (confirm(t("admin.dashboard.orders.delete_confirm"))) {
                                await deleteOrder.mutateAsync(order.id);
                              }
                            }}
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-2" /> {t("admin.dashboard.orders.delete")}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-white/10 pt-3 mt-1 text-xs text-white/80 space-y-1">
                      {items.map((item: any) => {
                        const qty = typeof item.quantity === "number" ? item.quantity : 0;
                        const unitPrice = typeof item.unitPrice === "number" ? item.unitPrice : 0;
                        const phPercent = typeof item.phPercent === "number" ? item.phPercent : 0;
                        const linePhAmount =
                          typeof item.linePhAmount === "number" ? item.linePhAmount : 0;
                        const lineTotal = typeof item.lineTotal === "number" ? item.lineTotal : 0;

                        return (
                        <div
                          key={`${order.id}-${item.productId}-${qty}-${unitPrice}`}
                          className="flex flex-wrap justify-between gap-2"
                        >
                          <div>
                            <span className="font-medium">{item.name}</span>{" "}
                            <span className="text-white/60">
                              × {qty} • ${unitPrice.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-right text-white/70">
                            <div>
                              {phPercent}% P&H: $
                              {linePhAmount.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}
                            </div>
                            <div className="font-semibold">
                              {t("admin.dashboard.orders.line_total")}: $
                              {lineTotal.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}
                            </div>
                          </div>
                        </div>
                      );
                      })}
                      <div className="flex justify-end gap-4 pt-2 text-[11px] text-white/60">
                        <span>
                          {t("admin.dashboard.orders.summary_subtotal")}: $
                          {subtotal.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <span>
                          {t("admin.dashboard.orders.summary_ph")}: $
                          {totalPh.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
                })}
                  {orders.filter((o) => (o as any).status !== "archived").length === 0 && (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 text-white/50">
                      {t("admin.dashboard.orders.no_active")}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="archived" className="grid gap-4 mt-0">
                  {orders
                    .filter((o) => (o as any).status === "archived")
                    .map((order) => {
                      const items = Array.isArray(order.items) ? order.items : [];
                      const subtotal = typeof order.subtotal === "number" ? order.subtotal : 0;
                      const totalPh = typeof order.totalPh === "number" ? order.totalPh : 0;
                      const total =
                        typeof order.total === "number" ? order.total : subtotal + totalPh;
                      const status = (order as any).status || "archived";

                      return (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-5 rounded-2xl border border-white/10 bg-card flex flex-col gap-3 opacity-80"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div>
                              <h3 className="text-lg font-semibold text-white">
                                {order.firstName} {order.lastName}
                              </h3>
                              <p className="text-xs text-white/60">
                                {new Intl.DateTimeFormat("en-US", {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                }).format(new Date(order.createdAt))}
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                {status === "archived" && (
                                  <span className="bg-white/20 text-white/60 text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                                    {t("admin.dashboard.orders.archived")}
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-xs text-white/70">
                                <strong>Email:</strong>{" "}
                                <a
                                  href={`mailto:${order.email}`}
                                  className="text-primary hover:underline"
                                >
                                  {order.email}
                                </a>
                                {" • "}
                                <strong>ID:</strong> {order.idNumber}
                              </p>
                              <p className="mt-1 text-xs text-white/60">
                                <strong>{t("admin.dashboard.orders.address")}:</strong>{" "}
                                {order.personalStreetAddress}, {order.personalCity || ""}, {order.personalCountry}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)} className="border-primary/30 text-primary hover:bg-primary/10 mb-2">
                                <Eye className="w-4 h-4 mr-2" /> {t("admin.dashboard.orders.view_details")}
                              </Button>
                              <p className="text-xs text-white/60 uppercase tracking-[0.15em]">
                                {t("admin.dashboard.orders.total")}
                              </p>
                              <p className="text-xl font-mono font-bold text-primary">
                                {order.currency || "USD"}{" "}
                                {total.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </p>

                              <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-white/20 text-white/60 w-full"
                                  onClick={() =>
                                    updateOrderStatus.mutateAsync({ id: order.id, status: "read" })
                                  }
                                >
                                  {t("admin.dashboard.orders.unarchive")}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="w-full"
                                  onClick={async () => {
                                    if (confirm(t("admin.dashboard.orders.delete_confirm"))) {
                                      await deleteOrder.mutateAsync(order.id);
                                    }
                                  }}
                                >
                                  <Trash2 className="w-3.5 h-3.5 mr-2" />{" "}
                                  {t("admin.dashboard.orders.delete")}
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-white/10 pt-3 mt-1 text-xs text-white/80 space-y-1">
                            {items.map((item: any) => {
                              const qty = typeof item.quantity === "number" ? item.quantity : 0;
                              const unitPrice =
                                typeof item.unitPrice === "number" ? item.unitPrice : 0;
                              const phPercent =
                                typeof item.phPercent === "number" ? item.phPercent : 0;
                              const linePhAmount =
                                typeof item.linePhAmount === "number" ? item.linePhAmount : 0;
                              const lineTotal =
                                typeof item.lineTotal === "number" ? item.lineTotal : 0;

                              return (
                                <div
                                  key={`${order.id}-${item.productId}-${qty}-${unitPrice}`}
                                  className="flex flex-wrap justify-between gap-2"
                                >
                                  <div>
                                    <span className="font-medium">{item.name}</span>{" "}
                                    <span className="text-white/60">
                                      × {qty} • ${unitPrice.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="text-right text-white/70">
                                    <div>
                                      {phPercent}% P&H: $
                                      {linePhAmount.toLocaleString(undefined, {
                                        maximumFractionDigits: 2,
                                      })}
                                    </div>
                                    <div className="font-semibold">
                                      {t("admin.dashboard.orders.line_total")}: $
                                      {lineTotal.toLocaleString(undefined, {
                                        maximumFractionDigits: 2,
                                      })}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                            <div className="flex justify-end gap-4 pt-2 text-[11px] text-white/60">
                              <span>
                                {t("admin.dashboard.orders.summary_subtotal")}: $
                                {subtotal.toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })}
                              </span>
                              <span>
                                {t("admin.dashboard.orders.summary_ph")}: $
                                {totalPh.toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  {orders.filter((o) => (o as any).status === "archived").length === 0 && (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 text-white/50">
                      {t("admin.dashboard.orders.no_archived")}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isModalOpen} onOpenChange={(open) => !open && setEditingId(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black border border-white/10 text-white sm:rounded-2xl custom-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-heading">{editingId === "new" ? t("admin.dashboard.modals.product.title_new") : t("admin.dashboard.modals.product.title_edit")}</DialogTitle>
            <DialogDescription className="text-white/60">
              {t("admin.dashboard.modals.product.description")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4 pb-2">

            <div className="grid md:grid-cols-2 gap-4">
              {/* Main Image Uploader */}
              <div className="p-4 rounded-xl border border-dashed border-white/20 bg-white/5">
                <label className="text-sm text-white/80 font-bold mb-2 flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-primary" />
                  {t("admin.dashboard.modals.product.labels.main_img")}
                </label>

                <div className="mt-2 flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageUpload}
                    disabled={uploadProgress !== null}
                    className="bg-black/50 border-white/10 text-white cursor-pointer file:bg-primary file:text-black file:border-0 file:rounded-md file:mr-2 file:px-2"
                  />
                </div>

                {uploadProgress !== null && (
                  <div className="mt-4"><div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden"><div className="bg-primary h-full" style={{ width: `${uploadProgress}%` }}></div></div></div>
                )}

                {formData.image && (
                  <div className="mt-4 relative w-24 h-24 rounded-lg overflow-hidden border border-white/10">
                    <img src={formData.image} alt="Main" className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-primary/80 text-black text-[10px] text-center font-bold">PRIMARY</div>
                  </div>
                )}
              </div>

              {/* Secondary Gallery Uploader */}
              <div className="p-4 rounded-xl border border-dashed border-white/20 bg-white/5">
                <label className="text-sm text-white/80 font-bold mb-2 flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-white/60" />
                  {t("admin.dashboard.modals.product.labels.gallery_img")}
                </label>

                <div className="mt-2 flex items-center gap-4">
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleGalleryUpload}
                    disabled={galleryUploadProgress !== null}
                    className="bg-black/50 border-white/10 text-white cursor-pointer file:bg-white file:text-black file:border-0 file:rounded-md file:mr-2 file:px-2"
                  />
                </div>

                {galleryUploadProgress !== null && (
                  <div className="mt-4"><div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden"><div className="bg-white h-full" style={{ width: `${galleryUploadProgress}%` }}></div></div></div>
                )}

                {formData.gallery && formData.gallery.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.gallery.map((url, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden group border border-white/10">
                        <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute inset-0 bg-black/60 items-center justify-center opacity-0 group-hover:opacity-100 flex transition-opacity"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/50 font-medium mb-1 block">Name (English)</label>
                <Input value={formData.name || ""} onChange={(e) => handleChange("name", e.target.value)} className="bg-black/50 border-white/10 text-white" />
              </div>
              <div>
                <label className="text-xs text-white/50 font-medium mb-1 block">Name (Polish)</label>
                <Input value={formData.name_pl || ""} onChange={(e) => handleChange("name_pl", e.target.value)} className="bg-black/50 border-white/10 text-white" />
              </div>
              <div>
                <label className="text-xs text-white/50 font-medium mb-1 block">{t("admin.dashboard.modals.product.labels.slug")}</label>
                <Input value={formData.slug || ""} onChange={(e) => handleChange("slug", e.target.value)} className="bg-black/50 border-white/10 text-white" />
              </div>
              <div>
                <label className="text-xs text-white/50 font-medium mb-1 block">{t("admin.dashboard.modals.product.labels.price")}</label>
                <Input value={formData.price || ""} onChange={(e) => handleChange("price", e.target.value)} className="bg-black/50 border-white/10 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-white/50 font-medium mb-1 block">Image URL Fallback (External Link)</label>
                <Input value={formData.image || ""} onChange={(e) => handleChange("image", e.target.value)} className="bg-black/50 border-white/10 text-white text-xs" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/50 font-medium mb-1 block">Quick Feature (Description)</label>
                <Textarea value={formData.shortDescription || ""} onChange={(e) => handleChange("shortDescription", e.target.value)} className="bg-black/50 border-white/10 text-white min-h-[80px]" placeholder="English summary..." />
              </div>
              <div>
                <label className="text-xs text-white/50 font-medium mb-1 block">Quick Feature PL (Opis)</label>
                <Textarea value={formData.shortDescription_pl || ""} onChange={(e) => handleChange("shortDescription_pl", e.target.value)} className="bg-black/50 border-white/10 text-white min-h-[80px]" placeholder="Polskie podsumowanie..." />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/50 font-medium mb-1 block">Key Benefits (English) - Double-line-break separated</label>
              <Textarea value={rawFeatures} onChange={(e) => setRawFeatures(e.target.value)} className="bg-black/50 border-white/10 text-white min-h-[150px]" />
            </div>

            <div>
              <label className="text-xs text-white/50 font-medium mb-1 block">Key Benefits (Polish) - Double-line-break separated</label>
              <Textarea value={rawFeaturesPl} onChange={(e) => setRawFeaturesPl(e.target.value)} className="bg-black/50 border-white/10 text-white min-h-[150px]" />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input 
                type="checkbox" 
                id="isFeatured"
                checked={!!formData.isFeatured}
                onChange={(e) => handleChange("isFeatured", e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <label htmlFor="isFeatured" className="text-sm text-white font-medium cursor-pointer flex items-center gap-2">
                Mark as Featured Product (Home Page)
                {formData.isFeatured && <Star className="w-3 h-3 text-primary fill-primary" />}
              </label>
            </div>

            <div className="flex gap-3 justify-end pt-6 mb-2 border-t border-white/10 mt-6">
              <Button variant="outline" onClick={() => setEditingId(null)} className="border-white/20 text-white">
                {t("admin.dashboard.modals.product.buttons.cancel")}
              </Button>
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[140px]" disabled={uploadProgress !== null || galleryUploadProgress !== null}>
                {(uploadProgress !== null || galleryUploadProgress !== null) ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4 mr-2" /> {editingId === "new" ? t("admin.dashboard.modals.product.buttons.create") : t("admin.dashboard.modals.product.buttons.save")}</>}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* BLOG CMS MODAL */}
      <Dialog open={isBlogModalOpen} onOpenChange={(open) => !open && setEditingBlogId(null)}>
        <DialogContent className="max-w-4xl bg-black border border-white/10 text-white overflow-y-auto max-h-[90vh] custom-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading font-bold">{editingBlogId === "new" ? t("admin.dashboard.modals.blog.title_new") : t("admin.dashboard.modals.blog.title_edit")}</DialogTitle>
            <DialogDescription className="text-white/60">{t("admin.dashboard.modals.blog.description")}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* THUMBNAIL */}
            <div className="p-4 rounded-xl border border-dashed border-white/20 bg-white/5">
              <label className="text-sm text-white/80 font-bold mb-2 flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-white/60" /> {t("admin.dashboard.modals.blog.labels.header_img")}
              </label>
              <div className="mt-2 flex items-center gap-4">
                <Input type="file" accept="image/*" onChange={handleBlogThumbUpload} disabled={blogUploadProgress !== null} className="bg-black/50 border-white/10 file:bg-white file:px-2 file:border-0 file:rounded-md file:text-black cursor-pointer" />
              </div>
              {blogUploadProgress !== null && <div className="mt-4"><div className="w-full bg-white/10 h-1.5 rounded-full"><div className="bg-white h-full" style={{ width: `${blogUploadProgress}%` }}></div></div></div>}
              {blogFormData.image && (
                <div className="mt-4 w-40 aspect-video rounded-lg overflow-hidden border border-white/10 relative">
                  <img src={blogFormData.image} alt="Header" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* CORE META */}
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="text-xs text-white/50 mb-1 block">{t("admin.dashboard.modals.blog.labels.title")}</label><Input value={blogFormData.title || ""} onChange={(e) => handleBlogChange("title", e.target.value)} className="bg-black/50 border-white/10" /></div>
              <div><label className="text-xs text-white/50 mb-1 block">{t("admin.dashboard.modals.blog.labels.slug")}</label><Input value={blogFormData.slug || ""} onChange={(e) => handleBlogChange("slug", e.target.value)} className="bg-black/50 border-white/10" /></div>
              <div><label className="text-xs text-white/50 mb-1 block">{t("admin.dashboard.modals.blog.labels.category")}</label><Input value={blogFormData.category || ""} onChange={(e) => handleBlogChange("category", e.target.value)} className="bg-black/50 border-white/10" /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="text-xs text-white/50 mb-1 block">{t("admin.dashboard.modals.blog.labels.date")}</label><Input value={blogFormData.date || ""} onChange={(e) => handleBlogChange("date", e.target.value)} className="bg-black/50 border-white/10" /></div>
                <div><label className="text-xs text-white/50 mb-1 block">{t("admin.dashboard.modals.blog.labels.read_time")}</label><Input value={blogFormData.readTime || ""} onChange={(e) => handleBlogChange("readTime", e.target.value)} className="bg-black/50 border-white/10" /></div>
              </div>
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">{t("admin.dashboard.modals.blog.labels.excerpt")}</label>
              <Textarea value={blogFormData.excerpt || ""} onChange={(e) => handleBlogChange("excerpt", e.target.value)} className="bg-black/50 border-white/10" />
            </div>

            {/* CONTENT MODULE */}
            <div className="border border-white/10 p-5 rounded-2xl bg-white/5 mt-4">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2"><Edit2 className="w-4 h-4" /> {t("admin.dashboard.modals.blog.labels.body_title")}</h3>
              <div className="grid gap-5">
                <div>
                  <label className="text-xs text-white/50 mb-1 block">{t("admin.dashboard.modals.blog.labels.intro")}</label>
                  <Textarea value={blogFormData.content?.intro || ""} onChange={(e) => handleBlogContentChange("intro", e.target.value)} className="bg-black/50 border-white/10 h-24" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <label className="text-sm font-semibold text-white/90">{t("admin.dashboard.modals.blog.labels.sections")}</label>
                    <Button type="button" size="sm" variant="outline" onClick={addBlogSection} className="h-7 text-xs border-primary/40 text-primary hover:bg-primary/20">
                      <Plus className="w-3 h-3 mr-1" /> {t("admin.dashboard.modals.blog.labels.add_section")}
                    </Button>
                  </div>

                  {blogFormData.content?.sections?.map((sec, idx) => (
                    <div key={idx} className="bg-black/50 border border-white/10 p-4 rounded-xl relative group">
                      <button onClick={() => removeBlogSection(idx)} className="absolute top-2 right-2 text-red-400 opacity-50 hover:opacity-100 bg-red-900/20 rounded-md p-1"><X className="w-3 h-3" /></button>
                      <div className="mb-3">
                        <label className="text-xs text-white/50 mb-1 block">{t("admin.dashboard.modals.blog.labels.section_heading")} {idx + 1}</label>
                        <Input value={sec.heading} onChange={(e) => handleBlogSectionChange(idx, "heading", e.target.value)} className="bg-black border-white/10 h-8" />
                      </div>
                      <div>
                        <label className="text-xs text-white/50 mb-1 block">{t("admin.dashboard.modals.blog.labels.section_body")} {idx + 1}</label>
                        <Textarea value={sec.body} onChange={(e) => handleBlogSectionChange(idx, "body", e.target.value)} className="bg-black border-white/10 min-h-[120px]" />
                      </div>
                    </div>
                  ))}
                  {blogFormData.content?.sections?.length === 0 && <p className="text-xs text-white/40 italic text-center py-4 bg-black/20 rounded">{t("admin.dashboard.modals.blog.labels.no_sections")}</p>}
                </div>

                <div className="mt-2">
                  <label className="text-xs text-white/50 mb-1 block">{t("admin.dashboard.modals.blog.labels.conclusion")}</label>
                  <Textarea value={blogFormData.content?.conclusion || ""} onChange={(e) => handleBlogContentChange("conclusion", e.target.value)} className="bg-black/50 border-white/10 h-24" />
                </div>
              </div>
            </div>

          </div>
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-white/10">
            <Button variant="outline" onClick={() => setEditingBlogId(null)} className="border-white/20 text-white hover:bg-white/5">{t("admin.dashboard.modals.product.buttons.cancel")}</Button>
            <Button onClick={saveBlog} className="bg-primary hover:bg-primary/90 text-black min-w-[140px]">
              <Check className="w-4 h-4 mr-2" /> {editingBlogId === "new" ? t("admin.dashboard.modals.blog.buttons.publish") : t("admin.dashboard.modals.product.buttons.save")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ORDER DETAILS MODAL */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-4xl bg-black border border-white/10 text-white overflow-y-auto max-h-[90vh] custom-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading font-bold text-primary">{t("admin.dashboard.orders.modal_title")}</DialogTitle>
            <DialogDescription className="text-white/60">{t("admin.dashboard.orders.modal_subtitle")} {selectedOrder?.firstName} {selectedOrder?.lastName}</DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-8 py-4">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Personal Section */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-primary/80 border-b border-white/10 pb-2">{t("admin.dashboard.orders.personal_info")}</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/40 block">Full Name</span>
                      <span className="text-white">{selectedOrder.firstName} {selectedOrder.middleName} {selectedOrder.lastName}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">Email</span>
                      <a href={`mailto:${selectedOrder.email}`} className="text-primary hover:underline">{selectedOrder.email}</a>
                    </div>
                    <div>
                      <span className="text-white/40 block">Phone</span>
                      <span className="text-white">{selectedOrder.phoneCountryCode} {selectedOrder.phoneNumber}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">ID Number</span>
                      <span className="text-white font-mono">{selectedOrder.idNumber}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">Gender</span>
                      <span className="text-white capitalize">{selectedOrder.gender}</span>
                    </div>
                  </div>
                </div>

                {/* Personal Address Section */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-primary/80 border-b border-white/10 pb-2">Personal Address</h4>
                  <div className="text-sm space-y-2">
                    <p><span className="text-white/40">Street:</span> {selectedOrder.personalStreetAddress}</p>
                    <p><span className="text-white/40">City:</span> {selectedOrder.personalCity}</p>
                    <p><span className="text-white/40">State/Prov:</span> {selectedOrder.personalState}</p>
                    <p><span className="text-white/40">Country:</span> {selectedOrder.personalCountry}</p>
                    <p><span className="text-white/40">Postal Code:</span> {selectedOrder.personalPostalCode}</p>
                  </div>
                </div>
              </div>

              {/* Recipient Section */}
              <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-primary/80">{t("admin.dashboard.orders.shipping_info")}</h4>
                  {selectedOrder.isRecipientSameAsPersonal && (
                    <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded">SAME AS PERSONAL</span>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-8 text-sm">
                  <div className="space-y-2">
                    <p><span className="text-white/40">Name:</span> {selectedOrder.recipientName}</p>
                    <p><span className="text-white/40">Phone:</span> {selectedOrder.recipientPhone}</p>
                  </div>
                  <div className="space-y-2">
                    <p><span className="text-white/40">Address:</span> {selectedOrder.recipientStreetAddress}</p>
                    <p><span className="text-white/40">Location:</span> {selectedOrder.recipientCity}, {selectedOrder.recipientState}, {selectedOrder.recipientCountry} ({selectedOrder.recipientPostalCode})</p>
                  </div>
                </div>
              </div>

              {/* Products Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary/80 border-b border-white/10 pb-2">{t("admin.dashboard.orders.ordered_products")}</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5">
                      <div>
                        <span className="font-bold text-white">{item.name}</span>
                        <span className="text-white/40 ml-2">× {item.quantity}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-primary">${item.lineTotal?.toLocaleString()}</span>
                        <p className="text-[10px] text-white/40 whitespace-nowrap">Incl. {item.phPercent}% P&H</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col items-end gap-1 pt-4 border-t border-white/10">
                  <div className="text-sm text-white/60 flex justify-between w-full md:w-64">
                    <span>Subtotal:</span>
                    <span>${selectedOrder.subtotal?.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-white/60 flex justify-between w-full md:w-64">
                    <span>P&H Total:</span>
                    <span>${selectedOrder.totalPh?.toLocaleString()}</span>
                  </div>
                  <div className="text-xl font-bold text-primary flex justify-between w-full md:w-64 mt-2">
                    <span>Total:</span>
                    <span>USD ${selectedOrder.total?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end mt-6">
            <Button onClick={() => setSelectedOrder(null)} className="bg-white/10 text-white hover:bg-white/20">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
