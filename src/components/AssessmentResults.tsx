import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Brain, 
  Target, 
  Lightbulb, 
  TrendingUp, 
  Users,
  BookOpen,
  ArrowRight,
  Star
} from "lucide-react";

interface AssessmentResultsProps {
  answers: Record<string, string>;
  onRestart: () => void;
}

interface ScoreBreakdown {
  psychometric: number;
  technical: number;
  wiscar: number;
  overall: number;
  recommendation: 'yes' | 'maybe' | 'no';
}

const AssessmentResults = ({ answers, onRestart }: AssessmentResultsProps) => {
  
  // Calculate scores based on answers
  const calculateScores = (): ScoreBreakdown => {
    let psychometricTotal = 0;
    let psychometricCount = 0;
    let technicalTotal = 0;
    let technicalCount = 0;
    let wiscarTotal = 0;
    let wiscarCount = 0;

    // Psychometric scoring
    Object.entries(answers).forEach(([key, value]) => {
      if (key.startsWith('interest_')) {
        psychometricTotal += parseInt(value) * 20; // Convert 1-5 to 20-100
        psychometricCount++;
      } else if (key.startsWith('personality_')) {
        // Score personality questions (good answers = higher scores)
        const goodAnswers = ['mediate', 'calm'];
        psychometricTotal += goodAnswers.includes(value) ? 85 : 65;
        psychometricCount++;
      }
    });

    // Technical scoring  
    Object.entries(answers).forEach(([key, value]) => {
      if (key.startsWith('aptitude_')) {
        // Correct answers: aptitude_1 = "4", aptitude_2 = "sustainability"
        const correctAnswers = { 'aptitude_1': '4', 'aptitude_2': 'sustainability' };
        technicalTotal += correctAnswers[key as keyof typeof correctAnswers] === value ? 90 : 60;
        technicalCount++;
      } else if (key.startsWith('knowledge_')) {
        // Correct answers: knowledge_1 = "supporting", knowledge_2 = "vision"
        const correctAnswers = { 'knowledge_1': 'supporting', 'knowledge_2': 'vision' };
        technicalTotal += correctAnswers[key as keyof typeof correctAnswers] === value ? 85 : 55;
        technicalCount++;
      }
    });

    // WISCAR scoring
    Object.entries(answers).forEach(([key, value]) => {
      if (key.startsWith('wiscar_will') || key.startsWith('wiscar_skill')) {
        wiscarTotal += parseInt(value) * 20; // Convert 1-5 to 20-100
        wiscarCount++;
      } else if (key.startsWith('wiscar_cognitive')) {
        const goodAnswers = ['collaborate', 'research'];
        wiscarTotal += goodAnswers.includes(value) ? 85 : 65;
        wiscarCount++;
      } else if (key.startsWith('wiscar_learn')) {
        const scoreMap = { 'defensive': 40, 'consider': 65, 'embrace': 85, 'seek': 95 };
        wiscarTotal += scoreMap[value as keyof typeof scoreMap] || 60;
        wiscarCount++;
      }
    });

    const psychometric = psychometricCount > 0 ? Math.round(psychometricTotal / psychometricCount) : 0;
    const technical = technicalCount > 0 ? Math.round(technicalTotal / technicalCount) : 0;
    const wiscar = wiscarCount > 0 ? Math.round(wiscarTotal / wiscarCount) : 0;
    const overall = Math.round((psychometric + technical + wiscar) / 3);

    let recommendation: 'yes' | 'maybe' | 'no' = 'no';
    if (overall >= 80) recommendation = 'yes';
    else if (overall >= 60) recommendation = 'maybe';

    return { psychometric, technical, wiscar, overall, recommendation };
  };

  const scores = calculateScores();

  const getRecommendationContent = () => {
    switch (scores.recommendation) {
      case 'yes':
        return {
          icon: <CheckCircle className="h-8 w-8 text-success" />,
          title: "Excellent Fit for Team Leadership Coaching",
          description: "Your assessment results indicate strong potential for success in team leadership coaching roles.",
          color: "border-success/50 bg-success/5"
        };
      case 'maybe':
        return {
          icon: <AlertTriangle className="h-8 w-8 text-warning" />,
          title: "Good Potential with Development",
          description: "You show promising qualities for team leadership coaching with targeted skill development.",
          color: "border-warning/50 bg-warning/5"
        };
      case 'no':
        return {
          icon: <XCircle className="h-8 w-8 text-destructive" />,
          title: "Consider Alternative Paths",
          description: "Your current profile suggests exploring other leadership or coaching specializations first.",
          color: "border-destructive/50 bg-destructive/5"
        };
    }
  };

  const recommendationContent = getRecommendationContent();

  const topJobRoles = [
    { title: "Team Leader", match: scores.overall >= 75 ? "Excellent Match" : scores.overall >= 60 ? "Good Match" : "Developing Match" },
    { title: "Leadership Coach", match: scores.psychometric >= 80 ? "Excellent Match" : scores.psychometric >= 65 ? "Good Match" : "Developing Match" },
    { title: "HR Business Partner", match: scores.wiscar >= 75 ? "Excellent Match" : scores.wiscar >= 60 ? "Good Match" : "Developing Match" },
    { title: "Project Manager", match: scores.technical >= 70 ? "Excellent Match" : scores.technical >= 55 ? "Good Match" : "Developing Match" },
    { title: "Organizational Consultant", match: scores.overall >= 80 ? "Excellent Match" : scores.overall >= 65 ? "Good Match" : "Developing Match" }
  ];

  const learningPath = scores.recommendation === 'yes' 
    ? ["Advanced Leadership Techniques", "Coaching Certification Programs", "Executive Coaching Skills"]
    : scores.recommendation === 'maybe'
    ? ["Foundational Leadership Skills", "Communication & Conflict Resolution", "Team Dynamics Fundamentals"]
    : ["Self-Leadership Development", "Basic Management Principles", "Interpersonal Skills Training"];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Your Assessment Results</h1>
        <p className="text-lg text-muted-foreground">Comprehensive analysis of your leadership coaching readiness</p>
      </div>

      {/* Overall Recommendation */}
      <Card className={`${recommendationContent.color} border-2`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {recommendationContent.icon}
            {recommendationContent.title}
          </CardTitle>
          <CardDescription className="text-base">
            {recommendationContent.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">Overall Score: {scores.overall}/100</p>
              <p className="text-sm text-muted-foreground">Confidence Level: {scores.overall >= 80 ? 'High' : scores.overall >= 60 ? 'Moderate' : 'Developing'}</p>
            </div>
            <Progress value={scores.overall} className="w-32 h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="h-5 w-5 text-primary" />
              Psychometric Fit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{scores.psychometric}/100</span>
                <Progress value={scores.psychometric} className="w-20 h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                Interest, personality compatibility, and motivation assessment
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-success" />
              Technical Readiness  
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{scores.technical}/100</span>
                <Progress value={scores.technical} className="w-20 h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                Aptitude and prerequisite knowledge evaluation
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-warning" />
              WISCAR Framework
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{scores.wiscar}/100</span>
                <Progress value={scores.wiscar} className="w-20 h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                Will, skills, cognitive readiness, and learning ability
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Career Alignment */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Top Job Role Matches
            </CardTitle>
            <CardDescription>Roles aligned with your assessment results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topJobRoles.map((role, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="font-medium">{role.title}</span>
                  <Badge 
                    variant={role.match.includes('Excellent') ? 'default' : role.match.includes('Good') ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {role.match}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Recommended Learning Path
            </CardTitle>
            <CardDescription>Next steps for your development journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {learningPath.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card className="bg-gradient-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Key Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                Strengths Identified
              </h4>
              <ul className="space-y-2 text-sm">
                {scores.psychometric >= 75 && <li>• Strong interpersonal and motivational qualities</li>}
                {scores.technical >= 70 && <li>• Solid foundational knowledge of leadership principles</li>}
                {scores.wiscar >= 75 && <li>• High learning potential and adaptability</li>}
                {scores.overall >= 60 && <li>• Good problem-solving and analytical skills</li>}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-warning" />
                Growth Opportunities
              </h4>
              <ul className="space-y-2 text-sm">
                {scores.psychometric < 70 && <li>• Develop emotional intelligence and empathy skills</li>}
                {scores.technical < 65 && <li>• Strengthen knowledge of leadership frameworks</li>}
                {scores.wiscar < 70 && <li>• Focus on communication and conflict resolution</li>}
                <li>• Practice facilitating team discussions and meetings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onRestart} variant="outline" size="lg">
          Retake Assessment
        </Button>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Explore Learning Resources
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AssessmentResults;