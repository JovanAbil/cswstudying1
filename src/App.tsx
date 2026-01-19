import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DebugModeToggle } from "@/components/DebugModeToggle";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import TermsOfServiceModal from "@/components/TermsOfServiceModal";
import { PageviewTracker } from "@/components/PageviewTracker";
import Index from "./pages/Index";
import UnitDetail from "./pages/UnitDetail";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import CourseChallenge from "./pages/CourseChallenge";
import CourseChallengePresetBuilder from "./pages/CourseChallengePresetBuilder";
import ViewAllQuestions from "./pages/ViewAllQuestions";
import PresetBuilder from "./pages/PresetBuilder";
import MathCategory from "./pages/categories/MathCategory";
import EnglishCategory from "./pages/categories/EnglishCategory";
import ScienceCategory from "./pages/categories/ScienceCategory";
import SocialCategory from "./pages/categories/SocialCategory";
import OtherCategory from "./pages/categories/OtherCategory";
import CustomTopicEditor from "./pages/CustomTopicEditor";
import StockPage from "./pages/StockPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeToggle />
        <DebugModeToggle />
        <AdPlaceholder position="sidebar-left" />
        <AdPlaceholder position="sidebar-right" />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageviewTracker />
          <CookieConsentBanner />
          <TermsOfServiceModal />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/category/math" element={<MathCategory />} />
            <Route path="/category/english" element={<EnglishCategory />} />
            <Route path="/category/science" element={<ScienceCategory />} />
            <Route path="/category/social" element={<SocialCategory />} />
            <Route path="/category/other" element={<OtherCategory />} />
            <Route path="/custom-topic/:unitId/:topicId" element={<CustomTopicEditor />} />
            <Route path="/unit/:subject/:unitId" element={<UnitDetail />} />
            <Route path="/unit/:subject/:unitId/view-all" element={<ViewAllQuestions />} />
            <Route path="/view-all/:subject/:unitId" element={<ViewAllQuestions />} />
            <Route path="/unit/:subject/:unitId/preset-builder" element={<PresetBuilder />} />
            <Route path="/unit/:subject/:unitId/quiz/:quizType" element={<Quiz />} />
            <Route path="/course-challenge/:subject" element={<CourseChallenge />} />
            <Route path="/course-challenge/:subject/preset-builder" element={<CourseChallengePresetBuilder />} />
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