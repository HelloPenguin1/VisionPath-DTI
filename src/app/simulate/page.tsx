"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { simulationPaths } from "@/config/careers";
import {
  Check,
  LineChart,
  TrendingUp,
  Clock,
  DollarSign,
  Award,
  ArrowRight,
} from "lucide-react";
import { SimulationPath } from "@/types/careers";

export default function SimulatePage() {
  const [selectedPath, setSelectedPath] = useState<SimulationPath | null>(null);

  const trendingPaths = simulationPaths.filter((path) => path.trending);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="bg-gradient-to-br from-white via-gray-50 to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950 py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-1 px-3 mb-3 text-sm border border-emerald-200 dark:border-emerald-800 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300">
              <LineChart className="w-3.5 h-3.5 mr-1.5" />
              <span>See where your choices lead</span>
            </div>
            <h1 className="text-3xl font-serif font-medium tracking-tight text-gray-900 dark:text-white mb-4">
              Career{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                Simulation
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              Thoughtfully explore different career paths and discover how your
              choices today can shape your professional journey tomorrow.
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 mx-auto py-12">
        {/* Trending Careers Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-5 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
            <h2 className="text-2xl font-serif font-medium text-gray-900 dark:text-white flex items-center">
              Trending Career Paths
              <TrendingUp className="ml-2 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingPaths.map((path) => (
              <Card
                key={path.id}
                className="transition-all hover:border-emerald-200 dark:hover:border-emerald-800 cursor-pointer border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm"
                onClick={() => setSelectedPath(path)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 border-emerald-200 dark:border-emerald-800">
                      {path.growthRate} Growth
                    </Badge>
                    <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <CardTitle className="text-xl font-medium text-gray-900 dark:text-white">
                    {path.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">
                    {path.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{path.timeToAchieve}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  Explore pathway <ArrowRight className="ml-1 h-3 w-3" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* All Career Paths */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-5 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
            <h2 className="text-2xl font-serif font-medium text-gray-900 dark:text-white">
              All Career Pathways
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {simulationPaths.map((path) => (
              <Card
                key={path.id}
                className="transition-all hover:border-blue-200 dark:hover:border-blue-800 cursor-pointer border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm"
                onClick={() => setSelectedPath(path)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <Badge className="bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 border-blue-200 dark:border-blue-800">
                      {path.averageSalary}
                    </Badge>
                    <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl font-medium text-gray-900 dark:text-white">
                    {path.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">
                    {path.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{path.timeToAchieve}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 text-sm text-blue-600 dark:text-blue-400 font-medium">
                  Explore pathway <ArrowRight className="ml-1 h-3 w-3" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Career Detail Dialog */}
        <Dialog
          open={!!selectedPath}
          onOpenChange={(open) => !open && setSelectedPath(null)}
        >
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            {selectedPath && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <LineChart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                      Career Pathway
                    </span>
                  </div>
                  <DialogTitle className="text-2xl font-serif font-medium text-gray-900 dark:text-white">
                    {selectedPath.title}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 dark:text-gray-300 mt-2">
                    {selectedPath.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-8 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md border border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Average Salary
                        </h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {selectedPath.averageSalary}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md border border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Growth Rate
                        </h4>
                      </div>
                      <p className="text-emerald-600 dark:text-emerald-400">
                        {selectedPath.growthRate}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                      <div className="w-1 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPath.requiredSkills.map((skill) => (
                        <Badge
                          key={skill}
                          className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-2"></div>

                  <div>
                    <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                      <div className="w-1 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                      Career Path Journey
                    </h3>
                    <div className="space-y-6">
                      {selectedPath.steps.map((step, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            {index + 1}
                          </div>
                          <div className="pt-1.5">
                            <p className="text-gray-700 dark:text-gray-300">
                              {step}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/30 rounded-md border border-gray-100 dark:border-gray-800">
                    <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium text-gray-900 dark:text-white">
                        Estimated time to achieve:
                      </span>{" "}
                      {selectedPath.timeToAchieve}
                    </div>
                  </div>
                </div>

                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Close
                    </Button>
                  </DialogClose>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                    <Award className="mr-2 h-4 w-4" />
                    Start Simulation
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
