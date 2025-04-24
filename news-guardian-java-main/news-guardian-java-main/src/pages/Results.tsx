
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, AlertTriangle, ArrowLeft, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";
import { getVerificationById, type NewsVerification } from "@/services/newsService";

const Results = () => {
  const [verification, setVerification] = useState<NewsVerification | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    if (id) {
      const result = getVerificationById(id);
      if (result) {
        setVerification(result);
      }
      setIsLoading(false);
    }
  }, [id]);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
  };
  
  // Get result icon and color
  const getResultData = () => {
    if (!verification) return { icon: null, color: "", bgColor: "" };
    
    switch (verification.result) {
      case "real":
        return { 
          icon: <CheckCircle className="h-12 w-12 text-real" />,
          color: "text-real",
          bgColor: "bg-green-50"
        };
      case "fake":
        return { 
          icon: <AlertCircle className="h-12 w-12 text-fake" />,
          color: "text-fake",
          bgColor: "bg-red-50"
        };
      case "uncertain":
        return { 
          icon: <AlertTriangle className="h-12 w-12 text-uncertain" />,
          color: "text-uncertain",
          bgColor: "bg-yellow-50"
        };
      default:
        return { icon: null, color: "", bgColor: "" };
    }
  };
  
  const { icon, color, bgColor } = getResultData();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto py-12 px-4 text-center">
          <p>Loading verification results...</p>
        </div>
      </div>
    );
  }
  
  if (!verification) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Verification Not Found</h1>
          <p className="mb-6">The verification result you're looking for doesn't exist.</p>
          <Link to="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link to="/dashboard" className="inline-flex items-center text-gray-600 hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
          </div>
          
          <Card className={`border-l-4 ${
            verification.result === "real" ? "border-l-real" :
            verification.result === "fake" ? "border-l-fake" : "border-l-uncertain"
          }`}>
            <CardHeader className={`flex flex-col sm:flex-row sm:items-center ${bgColor} border-b`}>
              <div className="mr-4 mb-4 sm:mb-0 flex justify-center">{icon}</div>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-1">
                  <span className={color}>
                    {verification.result === "real" ? "Real" :
                     verification.result === "fake" ? "Fake" : "Uncertain"}
                  </span> Content Detected
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Verified on {formatDate(verification.createdAt)}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Confidence Level</h3>
                <div className="flex items-center">
                  <Progress 
                    value={verification.confidence} 
                    className="h-3 flex-1"
                  />
                  <span className="ml-4 font-semibold">{verification.confidence.toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Explanation</h3>
                <p className="text-gray-700">{verification.explanation}</p>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-gray-500" />
                  Content Analyzed
                </h3>
                <div className="text-gray-700 whitespace-pre-wrap">
                  {verification.newsText}
                </div>
                {verification.newsUrl && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-600">Source URL:</h4>
                    <a 
                      href={verification.newsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {verification.newsUrl}
                    </a>
                  </div>
                )}
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-4">
                <Link to="/verify">
                  <Button>Verify New Content</Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline">Back to Dashboard</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium mb-3">How to Interpret These Results</h3>
            <p className="text-gray-700 mb-4">
              Our system analyzes various factors to determine the authenticity of news content. 
              However, please note that this is an automated analysis and should be used as one of 
              multiple sources when verifying information.
            </p>
            <div className="space-y-3 text-sm text-gray-600">
              <p>• <span className="font-semibold text-real">Real:</span> Content is likely authentic and factual.</p>
              <p>• <span className="font-semibold text-fake">Fake:</span> Content contains misinformation or fabricated claims.</p>
              <p>• <span className="font-semibold text-uncertain">Uncertain:</span> Content has mixed indicators or insufficient data for a definitive assessment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
