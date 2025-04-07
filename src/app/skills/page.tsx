"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadarChartCard } from "../../components/radarChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { skillCategories } from "@/config/skills";
import { demoUser } from "@/config/config";
import { SkillLevels } from "@/types/user";
import { Lightbulb, Save, Star, Loader2, BarChart } from "lucide-react";

export default function SkillsPage() {
  const [skillLevels, setSkillLevels] = useState<SkillLevels>({});
  const [selectedCategory, setSelectedCategory] = useState(
    skillCategories[0].name
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      const initialSkillLevels: SkillLevels = {};

      // Initialize all skills with 0 value
      skillCategories.forEach((category) => {
        category.skills.forEach((skill) => {
          initialSkillLevels[skill] = 0;
        });
      });

      // Set values for skills the user has
      demoUser.skills.forEach((skill) => {
        initialSkillLevels[skill] = 3; // Default skill level
      });

      setSkillLevels(initialSkillLevels);
      setLoading(false);
    }, 500);
  }, []);

  const updateSkillLevel = (skill: string, level: number) => {
    setSkillLevels((prev) => ({
      ...prev,
      [skill]: level,
    }));
  };

  const handleSaveSkills = () => {
    setSaving(true);

    // Simulate API call
    setTimeout(() => {
      // Get skills with level > 0
      const userSkills = Object.entries(skillLevels)
        .filter(([_, level]) => level > 0)
        .map(([skill]) => skill);

      setSaving(false);
      alert(`Skills saved successfully! You have ${userSkills.length} skills.`);
    }, 800);
  };

  const selectedCategoryData = skillCategories.find(
    (c) => c.name === selectedCategory
  );

  const getSkillCount = () => {
    return Object.values(skillLevels).filter((level) => level > 0).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-300">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
          <p>Loading your skills profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="bg-gradient-to-br from-white via-gray-50 to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-amber-950 py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-1 px-3 mb-3 text-sm border border-amber-200 dark:border-amber-800 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300">
              <Lightbulb className="w-3.5 h-3.5 mr-1.5" />
              <span>Assess your professional abilities</span>
            </div>
            <h1 className="text-3xl font-serif font-medium tracking-tight text-gray-900 dark:text-white mb-4">
              Skill{" "}
              <span className="text-amber-600 dark:text-amber-400">
                Analysis
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              Carefully evaluate your skills to identify strengths and growth
              opportunities for your career journey.
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                  {getSkillCount()} Skills Identified
                </span>
              </div>
              <CardTitle className="text-xl font-medium text-gray-900 dark:text-white">
                Skill Assessment
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Rate your proficiency in each skill from 0 (none) to 5 (expert)
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="mt-2"
              >
                <TabsList className="grid grid-cols-3 mb-6 bg-gray-100 dark:bg-gray-800 p-1">
                  {skillCategories.map((category) => (
                    <TabsTrigger
                      key={category.name}
                      value={category.name}
                      className="text-xs md:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 data-[state=active]:shadow-sm"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {skillCategories.map((category) => (
                  <TabsContent
                    key={category.name}
                    value={category.name}
                    className="space-y-5 mt-2"
                  >
                    {category.skills.map((skill) => (
                      <div key={skill} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium text-gray-900 dark:text-white">
                            {skill}
                          </label>
                          <div className="flex items-center gap-1.5">
                            {[...Array(6)].map((_, i) => (
                              <span
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i <= (skillLevels[skill] || 0)
                                    ? "bg-amber-500 dark:bg-amber-400"
                                    : "bg-gray-200 dark:bg-gray-700"
                                }`}
                              ></span>
                            ))}
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                              {skillLevels[skill] || 0}
                            </span>
                          </div>
                        </div>
                        <Slider
                          min={0}
                          max={5}
                          step={1}
                          value={[skillLevels[skill] || 0]}
                          onValueChange={(value) =>
                            updateSkillLevel(skill, value[0])
                          }
                          className="h-1.5"
                        />
                      </div>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-6"></div>

              <Button
                onClick={handleSaveSkills}
                className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Skills
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {selectedCategoryData && (
            <div className="flex flex-col gap-6">
              <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                      Visualization
                    </span>
                  </div>
                  <CardTitle className="text-xl font-medium text-gray-900 dark:text-white">
                    {selectedCategoryData.name} Skills
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Visual representation of your skill proficiency
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <RadarChartCard
                    category={selectedCategoryData}
                    skillLevels={skillLevels}
                  />
                </CardContent>
              </Card>

              <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-medium text-gray-900 dark:text-white">
                    Skill Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p>
                      Based on your {selectedCategoryData.name.toLowerCase()}{" "}
                      skills assessment:
                    </p>

                    <div className="p-3 border border-amber-200 dark:border-amber-800 rounded-md bg-amber-50 dark:bg-amber-900/20">
                      <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">
                        Strengths
                      </h4>
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        {Object.entries(skillLevels).filter(
                          ([skill, level]) =>
                            selectedCategoryData.skills.includes(skill) &&
                            level >= 4
                        ).length > 0
                          ? "You show proficiency in advanced skills within this category."
                          : "Continue developing skills in this area to build strengths."}
                      </p>
                    </div>

                    <div className="p-3 border border-blue-200 dark:border-blue-800 rounded-md bg-blue-50 dark:bg-blue-900/20">
                      <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                        Growth Opportunities
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Focus on improving skills rated below 3 to round out
                        your capabilities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
