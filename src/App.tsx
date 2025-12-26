import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import UnitDetail from "./pages/UnitDetail";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import CourseChallenge from "./pages/CourseChallenge";
import ViewAllQuestions from "./pages/ViewAllQuestions";
import MathCategory from "./pages/categories/MathCategory";
import EnglishCategory from "./pages/categories/EnglishCategory";
import ScienceCategory from "./pages/categories/ScienceCategory";
import SocialCategory from "./pages/categories/SocialCategory";
import OtherCategory from "./pages/categories/OtherCategory";
import StockPage from "./pages/StockPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/category/math" element={<MathCategory />} />
            <Route path="/category/english" element={<EnglishCategory />} />
            <Route path="/category/science" element={<ScienceCategory />} />
            <Route path="/category/social" element={<SocialCategory />} />
            <Route path="/category/other" element={<OtherCategory />} />
            <Route path="/unit/:subject/:unitId" element={<UnitDetail />} />
            <Route path="/unit/:subject/:unitId/view-all" element={<ViewAllQuestions />} />
            <Route path="/unit/:subject/:unitId/quiz/:quizType" element={<Quiz />} />
            <Route path="/course-challenge/:subject" element={<CourseChallenge />} />
            <Route path="/quiz/:subject/:unitId/:quizType" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;