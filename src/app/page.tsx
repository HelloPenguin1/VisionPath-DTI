import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  Card,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ArrowRight,
  BarChart,
  Users,
  LineChart,
  Lightbulb,
  Compass,
  Target,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section - refined with subtle details */}
      <section className="w-full py-24 md:py-32 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center p-1 px-3 mb-2 text-sm border border-blue-200 dark:border-blue-800 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
              <span>Thoughtfully crafted for your career journey</span>
            </div>
            <h1 className="text-4xl font-serif font-medium tracking-tight sm:text-5xl md:text-6xl text-gray-900 dark:text-white">
              Shape Your Future{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Career Path
              </span>
            </h1>
            <p className="mx-auto text-gray-600 text-lg md:text-xl leading-relaxed dark:text-gray-300">
              Discover your path forward with personalized career
              recommendations, thoughtful skill analysis, and carefully crafted
              career simulations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Link href="/explore">
                <Button
                  size="lg"
                  className="h-12 px-6 text-base font-medium rounded-md transition-all duration-300 shadow-sm"
                >
                  Begin Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/simulate">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 text-base font-medium rounded-md transition-all duration-300 border"
                >
                  Explore Career Simulations
                </Button>
              </Link>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-6"></div>

            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              "The tools offered here helped me find clarity in my career path
              when I needed it most."
            </p>
          </div>
        </div>
      </section>

      {/* Thoughtful divider */}
      <div className="relative h-24 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"></div>
        <svg
          className="absolute bottom-0 w-full h-16 text-white dark:text-gray-950 fill-current"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.55,118.92,163.17,106.42,241.39,85.37Z"></path>
        </svg>
      </div>

      {/* Features Section - crafted with care */}
      <section className="w-full py-20 md:py-28">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-md mx-auto mb-16">
            <div className="w-12 h-1 bg-blue-600 dark:bg-blue-400 mb-2"></div>
            <h2 className="text-3xl font-serif font-medium tracking-tight">
              Thoughtfully Crafted Tools
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Each feature has been carefully designed to provide meaningful
              insights for your career development
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3">
            <Card className="flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden group">
              <div className="p-6">
                <div className="w-12 h-12 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Compass className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl font-semibold mb-2">
                  Career Pathfinding
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our carefully designed simulation tools help you explore
                  different paths with precision, revealing how each choice
                  shapes your journey.
                </CardDescription>
              </div>
              <CardFooter className="p-6 pt-0 mt-auto">
                <Link
                  href="/simulation"
                  className="text-blue-600 dark:text-blue-400 text-sm font-medium inline-flex items-center group-hover:underline"
                >
                  Discover pathways <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden group">
              <div className="p-6">
                <div className="w-12 h-12 rounded-md bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-xl font-semibold mb-2">
                  Skill Insights
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  A thoughtful analysis of your skills, revealing gaps and
                  opportunities with personalized recommendations for growth.
                </CardDescription>
              </div>
              <CardFooter className="p-6 pt-0 mt-auto">
                <Link
                  href="/skills"
                  className="text-amber-600 dark:text-amber-400 text-sm font-medium inline-flex items-center group-hover:underline"
                >
                  Analyze your skills <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden group">
              <div className="p-6">
                <div className="w-12 h-12 rounded-md bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-xl font-semibold mb-2">
                  Market Navigator
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Carefully curated market insights give you a clear view of
                  industry trends, helping you make informed decisions with
                  confidence.
                </CardDescription>
              </div>
              <CardFooter className="p-6 pt-0 mt-auto">
                <Link
                  href="/insights"
                  className="text-emerald-600 dark:text-emerald-400 text-sm font-medium inline-flex items-center group-hover:underline"
                >
                  Explore insights <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Thoughtful divider */}
      <div className="w-full max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent my-12"></div>

      {/* Call to Action Section - warm and inviting */}
      <section className="w-full py-20 md:py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-900 dark:text-white">
              Begin Your Thoughtful Career Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Join our community of professionals who have found their path
              through careful consideration and thoughtful planning.
            </p>
            <Link href="/login">
              <Button size="lg" className="mt-2 h-12 px-8 rounded-md">
                Start Now
              </Button>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Carefully crafted tools to help you every step of the way
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
