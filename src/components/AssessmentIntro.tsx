import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Brain, Target, ArrowRight } from "lucide-react";

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

const AssessmentIntro = ({ onStartAssessment }: AssessmentIntroProps) => {
  const typicalCareers = [
    "Team Leader",
    "Leadership Coach", 
    "HR Business Partner",
    "Organizational Development Consultant",
    "Project Manager"
  ];

  const successTraits = [
    "Empathy & Emotional Intelligence",
    "Communication & Conflict Resolution", 
    "Strategic Thinking & Problem Solving",
    "Patience & Adaptability",
    "Motivation & Influencing Skills"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
          <Brain className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Professional Assessment</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Comprehensive Readiness & Fit Assessment for
          <span className="block text-primary mt-2">Team Leadership Coaching</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Evaluate your suitability and readiness for Team Leadership Coaching with our scientifically-backed assessment framework.
        </p>
      </div>

      {/* Purpose Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Assessment Purpose
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
              <span>Evaluate your suitability and readiness for Team Leadership Coaching</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
              <span>Identify gaps and personalized growth paths</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              About Team Leadership Coaching
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Facilitating, mentoring, and guiding teams towards effective collaboration and achievement of goals through organizational development, people management, conflict resolution, motivation, and performance optimization.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Career & Traits Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle>Typical Career Paths</CardTitle>
            <CardDescription>
              Roles where these skills are highly valued
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {typicalCareers.map((career, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {career}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle>Success Traits</CardTitle>
            <CardDescription>
              Key characteristics for effective leadership coaching
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {successTraits.map((trait, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                  <span className="text-sm">{trait}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment Info */}
      <Card className="bg-gradient-primary border-primary/50 shadow-glow">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-primary-foreground">
              Ready to discover your leadership coaching potential?
            </h3>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Our comprehensive assessment combines psychometric evaluation, technical aptitude, and the WISCAR framework to provide personalized insights and career guidance.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-primary-foreground/70">
              <span>⏱️ 20-30 minutes</span>
              <span>📊 Scientifically validated</span>
              <span>🎯 Personalized results</span>
            </div>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={onStartAssessment}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-3 text-lg"
            >
              Start Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentIntro;