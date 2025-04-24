
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                Verify News, Identify Truth
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                TruthGuardian helps you detect fake news with advanced analysis tools. Stay informed with facts, not fiction.
              </p>
              <div className="mt-10">
                {currentUser ? (
                  <Link to="/verify">
                    <Button size="lg" className="mr-4">
                      Verify News Now
                    </Button>
                  </Link>
                ) : (
                  <div className="space-x-4">
                    <Link to="/register">
                      <Button size="lg" className="mr-4">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline">
                        Login
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 mx-auto">1</div>
                <h3 className="font-semibold text-xl mb-2 text-center">Submit Content</h3>
                <p className="text-gray-600 text-center">
                  Copy and paste news text or provide a URL to analyze the content.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 mx-auto">2</div>
                <h3 className="font-semibold text-xl mb-2 text-center">Verification Process</h3>
                <p className="text-gray-600 text-center">
                  Our system analyzes the content using advanced detection algorithms.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4 mx-auto">3</div>
                <h3 className="font-semibold text-xl mb-2 text-center">Get Results</h3>
                <p className="text-gray-600 text-center">
                  Review verification results with explanation of why content may be real or fake.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Feature Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Use TruthGuardian?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col items-start">
                <h3 className="font-semibold text-xl mb-3">Accurate Verification</h3>
                <p className="text-gray-600">
                  Our system uses multiple verification techniques to analyze news content and provide accurate results.
                </p>
              </div>
              
              <div className="flex flex-col items-start">
                <h3 className="font-semibold text-xl mb-3">User-Friendly Interface</h3>
                <p className="text-gray-600">
                  Simple, intuitive design makes it easy to verify news from any device.
                </p>
              </div>
              
              <div className="flex flex-col items-start">
                <h3 className="font-semibold text-xl mb-3">Personal Dashboard</h3>
                <p className="text-gray-600">
                  Keep track of your verified content and review past analyses in your personal dashboard.
                </p>
              </div>
              
              <div className="flex flex-col items-start">
                <h3 className="font-semibold text-xl mb-3">Detailed Explanations</h3>
                <p className="text-gray-600">
                  Understand why content is classified as real or fake with detailed explanations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Verifying News?
            </h2>
            <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of users who rely on TruthGuardian to identify fake news and stay informed.
            </p>
            {currentUser ? (
              <Link to="/verify">
                <Button size="lg" variant="secondary">
                  Verify News Now
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button size="lg" variant="secondary">
                  Sign Up for Free
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">TruthGuardian</h2>
            <p className="mb-4">Your trusted source for news verification</p>
            <p className="text-gray-400">&copy; {new Date().getFullYear()} TruthGuardian. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
