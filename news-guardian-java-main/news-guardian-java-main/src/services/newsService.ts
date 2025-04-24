
// This would be a real API service in a production app
// For now, we're mocking the news verification with random results and local storage

export interface NewsVerification {
  id: string;
  userId: string;
  newsText: string;
  newsUrl?: string;
  result: "real" | "fake" | "uncertain";
  confidence: number;
  createdAt: string;
  explanation: string;
}

// Sample explanations for different verification results
const realNewsExplanations = [
  "The information has been confirmed by multiple credible sources.",
  "Facts and figures in this news have been verified by official records.",
  "This story contains accurate citations and references to primary sources.",
  "The claims made are consistent with expert consensus in the field."
];

const fakeNewsExplanations = [
  "This contains claims that contradict well-established facts.",
  "The source has a history of publishing misleading information.",
  "Key details in this story cannot be verified by any credible sources.",
  "The article contains logical inconsistencies and factual errors."
];

const uncertainNewsExplanations = [
  "Some parts of this news can be verified, but others remain questionable.",
  "The information is too recent to be fully verified at this time.",
  "The claims made are plausible but lack sufficient evidence for confirmation.",
  "The source mixes factual reporting with opinion in ways that make verification difficult."
];

// Get a random explanation based on the result
const getRandomExplanation = (result: "real" | "fake" | "uncertain") => {
  const explanations = 
    result === "real" ? realNewsExplanations :
    result === "fake" ? fakeNewsExplanations : 
    uncertainNewsExplanations;
  
  return explanations[Math.floor(Math.random() * explanations.length)];
};

// Mock verification algorithm that simulates analyzing news content
const analyzeNewsContent = (text: string): { result: "real" | "fake" | "uncertain", confidence: number } => {
  // In a real app, this would use machine learning, external APIs, etc.
  // For this demo, we'll use some simple heuristics
  
  const lowerText = text.toLowerCase();
  
  // Check for common indicators of fake news
  const fakeNewsIndicators = [
    "shocking truth", "they don't want you to know", "conspiracy", 
    "miracle cure", "secret", "shocking", "you won't believe", 
    "doctors hate", "one weird trick"
  ];
  
  // Check for indicators of real news
  const realNewsIndicators = [
    "according to research", "studies show", "experts say", 
    "official statement", "confirmed by", "evidence suggests", 
    "data indicates", "analysis shows"
  ];
  
  let fakeScore = 0;
  let realScore = 0;
  
  // Count fake news indicators
  fakeNewsIndicators.forEach(indicator => {
    if (lowerText.includes(indicator)) {
      fakeScore += 1;
    }
  });
  
  // Count real news indicators
  realNewsIndicators.forEach(indicator => {
    if (lowerText.includes(indicator)) {
      realScore += 1;
    }
  });
  
  // Calculate result based on scores
  if (Math.abs(realScore - fakeScore) <= 1) {
    // If scores are close, mark as uncertain
    return { 
      result: "uncertain", 
      confidence: Math.random() * 30 + 40 // Random confidence between 40-70%
    };
  } else if (realScore > fakeScore) {
    return { 
      result: "real", 
      confidence: Math.random() * 20 + 70 // Random confidence between 70-90%
    };
  } else {
    return { 
      result: "fake", 
      confidence: Math.random() * 20 + 70 // Random confidence between 70-90%
    };
  }
};

// Mock verify news function
export const verifyNews = async (userId: string, newsText: string, newsUrl?: string): Promise<NewsVerification> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const analysis = analyzeNewsContent(newsText);
  
  const verification: NewsVerification = {
    id: Date.now().toString(),
    userId,
    newsText,
    newsUrl,
    result: analysis.result,
    confidence: analysis.confidence,
    createdAt: new Date().toISOString(),
    explanation: getRandomExplanation(analysis.result)
  };
  
  // Save to "database" (localStorage in this case)
  const verifications = JSON.parse(localStorage.getItem("verifications") || "[]");
  verifications.push(verification);
  localStorage.setItem("verifications", JSON.stringify(verifications));
  
  return verification;
};

// Get a single verification by ID
export const getVerificationById = (id: string): NewsVerification | undefined => {
  const verifications = JSON.parse(localStorage.getItem("verifications") || "[]");
  return verifications.find((v: NewsVerification) => v.id === id);
};

// Get user's verifications
export const getUserVerifications = (userId: string): NewsVerification[] => {
  const verifications = JSON.parse(localStorage.getItem("verifications") || "[]");
  return verifications
    .filter((v: NewsVerification) => v.userId === userId)
    .sort((a: NewsVerification, b: NewsVerification) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};
