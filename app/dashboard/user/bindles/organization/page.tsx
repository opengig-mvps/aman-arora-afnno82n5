"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import api from "@/lib/api";
import { isAxiosError } from "axios";
import { LoaderCircleIcon } from "lucide-react";

const OrganizeContentPage: React.FC = () => {
  const { bindleId } = useParams<{ bindleId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [organizedContent, setOrganizedContent] = useState<any>(null);
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    const fetchOrganizedContent = async () => {
      try {
        setLoading(true);
        const response = await api.post(`/api/bindles/${bindleId}/organize`);
        setOrganizedContent(response?.data?.data?.organizedContent);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error?.response?.data?.message ?? "Something went wrong");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizedContent();
  }, [bindleId]);

  const handleFeedbackSubmit = async () => {
    toast.success("Feedback submitted successfully!");
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Organize Bindle Content</h2>
      <Card>
        <CardHeader>
          <CardTitle>Organized Content</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <div>
              <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(organizedContent, null, 2)}</pre>
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">Customization Options</h3>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select organization method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="method1">Method 1</SelectItem>
                    <SelectItem value="method2">Method 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">Feedback</h3>
                <Textarea
                  placeholder="Provide your feedback here..."
                  value={feedback}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)}
                />
                <Button onClick={handleFeedbackSubmit} className="w-full mt-2">
                  Submit Feedback
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizeContentPage;