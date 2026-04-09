import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Schemes = lazy(() => import("./pages/Schemes"));
const SchemeDetail = lazy(() => import("./pages/SchemeDetail"));
const Apply = lazy(() => import("./pages/Apply"));
const Grievance = lazy(() => import("./pages/Grievance"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Media = lazy(() => import("./pages/Media"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Statistics = lazy(() => import("./pages/Statistics"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/schemes/:id" element={<SchemeDetail />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/grievance" element={<Grievance />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/media" element={<Media />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

