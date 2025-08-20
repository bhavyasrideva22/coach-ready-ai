import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Brain, Target, Users, Lightbulb } from "lucide-react";

interface Question {
  id: string;
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  question: string;
  options: { value: string; label: string; }[];
  type: 'single' | 'likert';
}

interface AssessmentQuestionsProps {
  onComplete: (answers: Record<string, string>) => void;
  onBack: () => void;
}

const AssessmentQuestions = ({ onComplete, onBack }: AssessmentQuestionsProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions: Question[] = [
    // Psychometric - Interest Scale
    {
      id: "interest_1",
      category: "psychometric",
      subcategory: "Interest Scale",
      question: "How interested are you in helping others develop their leadership skills?",
      type: "likert",
      options: [
        { value: "1", label: "Not interested at all" },
        { value: "2", label: "Slightly interested" },
        { value: "3", label: "Moderately interested" },
        { value: "4", label: "Very interested" },
        { value: "5", label: "Extremely interested" }
      ]
    },
    {
      id: "interest_2", 
      category: "psychometric",
      subcategory: "Interest Scale",
      question: "How much do you enjoy facilitating team discussions and meetings?",
      type: "likert",
      options: [
        { value: "1", label: "Strongly dislike" },
        { value: "2", label: "Dislike" },
        { value: "3", label: "Neutral" },
        { value: "4", label: "Enjoy" },
        { value: "5", label: "Love it" }
      ]
    },

    // Psychometric - Personality Compatibility
    {
      id: "personality_1",
      category: "psychometric", 
      subcategory: "Personality Compatibility",
      question: "When faced with team conflict, what is your natural tendency?",
      type: "single",
      options: [
        { value: "avoid", label: "Avoid the conflict and hope it resolves itself" },
        { value: "direct", label: "Address it directly and immediately" },
        { value: "mediate", label: "Listen to all sides and help find common ground" },
        { value: "escalate", label: "Escalate to higher management" }
      ]
    },
    {
      id: "personality_2",
      category: "psychometric",
      subcategory: "Personality Compatibility", 
      question: "How do you typically handle stress in leadership situations?",
      type: "single",
      options: [
        { value: "overwhelmed", label: "I often feel overwhelmed and struggle to cope" },
        { value: "compartmentalize", label: "I compartmentalize and focus on one issue at a time" },
        { value: "calm", label: "I remain calm and use stress as motivation" },
        { value: "delegate", label: "I delegate tasks to reduce my stress load" }
      ]
    },

    // Technical - General Aptitude
    {
      id: "aptitude_1",
      category: "technical",
      subcategory: "General Aptitude",
      question: "A team of 8 people needs to complete a project in 12 days. If 2 people leave, how many additional days will the remaining team need?",
      type: "single", 
      options: [
        { value: "3", label: "3 additional days" },
        { value: "4", label: "4 additional days" },
        { value: "6", label: "6 additional days" },
        { value: "8", label: "8 additional days" }
      ]
    },
    {
      id: "aptitude_2",
      category: "technical",
      subcategory: "General Aptitude",
      question: "What is the next pattern in this sequence: Team → Performance → Success → ?",
      type: "single",
      options: [
        { value: "growth", label: "Growth" },
        { value: "reward", label: "Reward" },
        { value: "innovation", label: "Innovation" }, 
        { value: "sustainability", label: "Sustainability" }
      ]
    },

    // Technical - Prerequisite Knowledge  
    {
      id: "knowledge_1",
      category: "technical",
      subcategory: "Prerequisite Knowledge",
      question: "Which leadership style involves high relationship behavior and low task behavior?",
      type: "single",
      options: [
        { value: "directing", label: "Directing" },
        { value: "coaching", label: "Coaching" },
        { value: "supporting", label: "Supporting" },
        { value: "delegating", label: "Delegating" }
      ]
    },
    {
      id: "knowledge_2",
      category: "technical", 
      subcategory: "Prerequisite Knowledge",
      question: "What is the primary focus of transformational leadership?",
      type: "single",
      options: [
        { value: "tasks", label: "Completing tasks efficiently" },
        { value: "rules", label: "Following rules and procedures" },
        { value: "vision", label: "Inspiring and motivating through vision" },
        { value: "control", label: "Maintaining control and order" }
      ]
    },

    // WISCAR Framework
    {
      id: "wiscar_will",
      category: "wiscar",
      subcategory: "Will",
      question: "How persistent are you when facing leadership challenges?",
      type: "likert",
      options: [
        { value: "1", label: "Give up easily" },
        { value: "2", label: "Sometimes give up" },
        { value: "3", label: "Moderately persistent" },
        { value: "4", label: "Very persistent" },
        { value: "5", label: "Never give up" }
      ]
    },
    {
      id: "wiscar_skill",
      category: "wiscar",
      subcategory: "Skill", 
      question: "How would you rate your current communication skills?",
      type: "likert",
      options: [
        { value: "1", label: "Poor" },
        { value: "2", label: "Below average" },
        { value: "3", label: "Average" },
        { value: "4", label: "Above average" },
        { value: "5", label: "Excellent" }
      ]
    },
    {
      id: "wiscar_cognitive",
      category: "wiscar",
      subcategory: "Cognitive Readiness",
      question: "When solving complex team problems, you prefer to:",
      type: "single", 
      options: [
        { value: "quick", label: "Make quick decisions based on intuition" },
        { value: "analyze", label: "Thoroughly analyze all available data" },
        { value: "collaborate", label: "Collaborate with team members for input" },
        { value: "research", label: "Research best practices and proven methods" }
      ]
    },
    {
      id: "wiscar_learn",
      category: "wiscar",
      subcategory: "Ability to Learn",
      question: "How do you typically respond to feedback about your leadership style?",
      type: "single",
      options: [
        { value: "defensive", label: "I become defensive and justify my actions" },
        { value: "consider", label: "I consider it but don't always act on it" },
        { value: "embrace", label: "I embrace it and actively work to improve" },
        { value: "seek", label: "I actively seek out feedback to grow" }
      ]
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const isAnswered = answers[currentQuestion.id] !== undefined;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'psychometric': return <Brain className="h-5 w-5" />;
      case 'technical': return <Target className="h-5 w-5" />;
      case 'wiscar': return <Lightbulb className="h-5 w-5" />;
      default: return <Users className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'psychometric': return 'text-primary';
      case 'technical': return 'text-success';
      case 'wiscar': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`${getCategoryColor(currentQuestion.category)}`}>
              {getCategoryIcon(currentQuestion.category)}
            </div>
            <div>
              <h2 className="text-lg font-semibold capitalize">{currentQuestion.category}</h2>
              <p className="text-sm text-muted-foreground">{currentQuestion.subcategory}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Question {currentQuestionIndex + 1} of {questions.length}</p>
            <p className="text-xs text-muted-foreground">{Math.round(progress)}% Complete</p>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
          {currentQuestion.type === 'likert' && (
            <CardDescription>
              Please rate your response on the scale below
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[currentQuestion.id] || ""}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className="flex-1 cursor-pointer text-sm leading-relaxed"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {currentQuestionIndex === 0 ? 'Back to Intro' : 'Previous'}
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={!isAnswered}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AssessmentQuestions;