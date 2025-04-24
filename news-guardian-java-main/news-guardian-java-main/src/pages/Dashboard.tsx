
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/context/AuthContext";
import { getUserVerifications, type NewsVerification } from "@/services/newsService";

const Dashboard = () => {
  const [verifications, setVerifications] = useState<NewsVerification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    if (currentUser) {
      // Load user's verifications
      const userVerifications = getUserVerifications(currentUser.id);
      setVerifications(userVerifications);
      setIsLoading(false);
    }
  }, [currentUser]);
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
  };
  
  // Function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              View your news verification history
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/verify">
              <Button>Verify New Content</Button>
            </Link>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center my-12">
            <p>Loading your verification history...</p>
          </div>
        ) : verifications.length === 0 ? (
          <Card className="mb-8">
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600 mb-4">
                You haven't verified any news content yet.
              </p>
              <Link to="/verify">
                <Button>Verify Your First News Content</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {verifications.map((verification) => (
              <Card key={verification.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 p-4 flex flex-row items-center space-x-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {truncateText(verification.newsText, 100)}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      Verified on {formatDate(verification.createdAt)}
                    </p>
                  </div>
                  <Badge 
                    className={
                      verification.result === "real" ? "bg-real" :
                      verification.result === "fake" ? "bg-fake" : "bg-uncertain"
                    }
                  >
                    {verification.result === "real" ? "Real" : 
                     verification.result === "fake" ? "Fake" : "Uncertain"}
                  </Badge>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">Confidence:</span> {verification.confidence.toFixed(1)}%
                  </p>
                  <Link to={`/results/${verification.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
