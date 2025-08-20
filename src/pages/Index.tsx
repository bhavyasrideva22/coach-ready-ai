import { useState } from "react";
import AssessmentIntro from "@/components/AssessmentIntro";
import AssessmentQuestions from "@/components/AssessmentQuestions";
import AssessmentResults from "@/components/AssessmentResults";

type AssessmentStep = 'intro' | 'questions' | 'results';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('intro');
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleStartAssessment = () => {
    setCurrentStep('questions');
  };

  const handleCompleteAssessment = (assessmentAnswers: Record<string, string>) => {
    setAnswers(assessmentAnswers);
    setCurrentStep('results');
  };

  const handleBackToIntro = () => {
    setCurrentStep('intro');
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep('intro');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {currentStep === 'intro' && (
          <AssessmentIntro onStartAssessment={handleStartAssessment} />
        )}
        
        {currentStep === 'questions' && (
          <AssessmentQuestions 
            onComplete={handleCompleteAssessment}
            onBack={handleBackToIntro}
          />
        )}
        
        {currentStep === 'results' && (
          <AssessmentResults 
            answers={answers}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
