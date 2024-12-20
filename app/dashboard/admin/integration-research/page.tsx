'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import api from '@/lib/api';
import { useSession } from 'next-auth/react';
import { LoaderCircleIcon } from 'lucide-react';

const IntegrationResearchPage: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [integrationData, setIntegrationData] = useState<any>({
    appName: '',
    technicalRequirements: '',
    findings: '',
    recommendations: '',
    collaborationNotes: '',
    userExperienceImpact: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e?.target;
    setIntegrationData({ ...integrationData, [name]: value });
  };

  const generateReport = async () => {
    try {
      setLoading(true);
      const response = await api.post(`/api/bindles/${session?.user?.id}/organize`, integrationData);

      if (response?.data?.success) {
        toast.success("Integration feasibility report generated successfully!");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Integration Research</h2>
      <Card>
        <CardHeader>
          <CardTitle>Document Integration Process</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="appName">Cloud Application Name</Label>
            <Input
              id="appName"
              name="appName"
              placeholder="Enter application name"
              value={integrationData?.appName}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technicalRequirements">Technical Requirements</Label>
            <Textarea
              id="technicalRequirements"
              name="technicalRequirements"
              placeholder="Describe technical requirements"
              value={integrationData?.technicalRequirements}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="findings">Findings</Label>
            <Textarea
              id="findings"
              name="findings"
              placeholder="Document findings"
              value={integrationData?.findings}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recommendations">Recommendations</Label>
            <Textarea
              id="recommendations"
              name="recommendations"
              placeholder="Provide recommendations"
              value={integrationData?.recommendations}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="collaborationNotes">Collaboration Notes</Label>
            <Textarea
              id="collaborationNotes"
              name="collaborationNotes"
              placeholder="Collaboration notes with app providers"
              value={integrationData?.collaborationNotes}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userExperienceImpact">Impact on User Experience</Label>
            <Textarea
              id="userExperienceImpact"
              name="userExperienceImpact"
              placeholder="Assess impact on user experience"
              value={integrationData?.userExperienceImpact}
              onChange={handleInputChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={generateReport} disabled={loading}>
            {loading ? <LoaderCircleIcon className="animate-spin" /> : 'Generate Report'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default IntegrationResearchPage;