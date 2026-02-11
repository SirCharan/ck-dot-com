/**
 * Legacy App component - used by main.tsx for Vite.
 * Next.js uses app/layout.tsx and app/page.tsx instead.
 */
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import Index from "./views/Index";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Index />
        <Analytics />
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
