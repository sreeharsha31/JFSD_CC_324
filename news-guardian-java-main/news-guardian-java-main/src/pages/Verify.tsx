
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { verifyNews } from "@/services/newsService";
import Navigation from "@/components/Navigation";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  newsContent: z.string().min(20, {
    message: "News content must be at least 20 characters.",
  }),
  newsUrl: z.string().url({
    message: "Please enter a valid URL",
  }).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const Verify = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newsContent: "",
      newsUrl: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!currentUser) return;
    
    setIsSubmitting(true);
    try {
      const verification = await verifyNews(
        currentUser.id,
        values.newsContent,
        values.newsUrl || undefined
      );
      
      toast({
        title: "Verification Complete",
        description: "News content has been analyzed successfully.",
      });
      
      navigate(`/results/${verification.id}`);
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "An error occurred while verifying the news content.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify News</h1>
          <p className="text-gray-600 mb-8">
            Enter the news content or URL you want to check for authenticity.
          </p>
          
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="newsContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>News Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste the news content here..."
                            rows={8}
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the full text of the news article or content you want to verify.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="newsUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source URL (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/news-article"
                            type="url"
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          If available, provide the URL where you found this content.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Analyzing..." : "Verify Content"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Tips for Accurate Verification</h2>
            <div className="space-y-3 text-gray-700">
              <p>• Include as much of the original news content as possible.</p>
              <p>• Provide the original source URL if available.</p>
              <p>• For best results, include full paragraphs rather than short excerpts.</p>
              <p>• Our system works best with news articles in English.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
