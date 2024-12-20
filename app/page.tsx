'use client' ;
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clouds, Check, LineChart, Users, Heart } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[url('https://placehold.co/1600x900.png')] bg-cover bg-center">
      <main className="flex-1">
        <section className="w-full py-16 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl text-sky-800">
                    Maximize Your Workflow with Bindles
                  </h1>
                  <p className="max-w-[600px] md:text-xl text-gray-700">
                    Manage your work and communication smoothly across your cloud-based apps with intelligent real-time folders.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="h-12 bg-sky-500 text-white hover:bg-sky-600">
                    Get Started
                  </Button>
                  <Button variant="outline" className="h-12 border-sky-500 text-sky-500 hover:bg-sky-100">
                    Learn More
                  </Button>
                </div>
              </div>
              <img
                src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3h3Z2cwOThud2U4aGppOWFpOWI2dXRtNWhpcnNmdGUzN2VwcTZ3MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/12voxtUHROcg7K/giphy.gif"
                alt="Workflow"
                className="aspect-video overflow-hidden rounded-xl sm:w-full"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-16 md:py-32 bg-white bg-opacity-70">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sky-800">
                  Effortless Integration
                </h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl">
                  Seamlessly sync your projects with Bindles and enjoy automated organization without the hassle.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-12">
                <Card className="flex flex-col items-center justify-center space-y-4 p-6">
                  <Clouds className="h-12 w-12 text-sky-500" />
                  <CardHeader>
                    <CardTitle>Cloud Sync</CardTitle>
                    <CardDescription>
                      Automatically sync your folders with your preferred cloud applications.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="flex flex-col items-center justify-center space-y-4 p-6">
                  <LineChart className="h-12 w-12 text-sky-500" />
                  <CardHeader>
                    <CardTitle>Real-Time Updates</CardTitle>
                    <CardDescription>
                      Experience instant updates across all your devices.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="flex flex-col items-center justify-center space-y-4 p-6">
                  <Users className="h-12 w-12 text-sky-500" />
                  <CardHeader>
                    <CardTitle>Team Collaboration</CardTitle>
                    <CardDescription>
                      Enhance your team's productivity with seamless collaboration.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-16 md:py-32 bg-sky-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sky-800">
                  Join Our Community
                </h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl">
                  Discover how Bindles is transforming workflows worldwide.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Jane Doe</p>
                      <p className="text-xs text-gray-700">Product Manager</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "Bindles has drastically improved our workflow efficiency. The real-time updates keep our entire team in sync."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Sam Miller</p>
                      <p className="text-xs text-gray-700">CEO</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "The integration with our existing cloud services was seamless. Bindles saved us time and effort."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Michael Johnson</p>
                      <p className="text-xs text-gray-700">Tech Lead</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "Our team collaboration has never been better. Bindles is an essential tool for our success."
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-sky-900 p-6 w-full text-white">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold text-sky-300">Product</h3>
            <Button variant="link" className="text-sky-100 hover:text-sky-200">Features</Button>
            <Button variant="link" className="text-sky-100 hover:text-sky-200">Integration</Button>
            <Button variant="link" className="text-sky-100 hover:text-sky-200">Pricing</Button>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold text-sky-300">Company</h3>
            <Button variant="link" className="text-sky-100 hover:text-sky-200">About Us</Button>
            <Button variant="link" className="text-sky-100 hover:text-sky-200">Careers</Button>
            <Button variant="link" className="text-sky-100 hover:text-sky-200">Blog</Button>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold text-sky-300">Support</h3>
            <Button variant="link" className="text-sky-100 hover:text-sky-200">Help Center</Button>
            <Button variant="link" className="text-sky-100 hover:text-sky-200">Contact Us</Button>
            <Button variant="link" className="text-sky-100 hover:text-sky-200">FAQs</Button>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold text-sky-300">Legal</h3>
            <Button variant="link" className="text-sky-100 hover:text-sky-200">Privacy Policy</Button>
            <Button variant="link" className="text-sky-100 hover:text-sky-200">Terms of Service</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;