"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CareerCard } from "../../components/careerCard";
import {
  careers,
  experienceLevels,
  educationLevels,
  industries,
} from "@/config/careers";
import { demoUser } from "@/config/config";
import { Career } from "@/types/careers";
import { UserProfile } from "@/types/user";
import {
  Compass,
  Filter,
  Briefcase,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

export default function ExplorePage() {
  const [filteredCareers, setFilteredCareers] = useState<Career[]>(careers);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [filters, setFilters] = useState({
    industry: "",
    experienceLevel: "",
    education: "",
  });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Simulate loading user profile
    setTimeout(() => {
      setUserProfile(demoUser);
    }, 500);
  }, []);

  useEffect(() => {
    const filtered = careers.filter((career) => {
      return (
        (!filters.industry || career.industry === filters.industry) &&
        (!filters.experienceLevel ||
          career.experience_level.includes(filters.experienceLevel)) &&
        (!filters.education || career.education_required === filters.education)
      );
    });
    setFilteredCareers(filtered);
  }, [filters]);

  const calculateMatchScore = (career: Career) => {
    if (!userProfile) return 0;

    let score = 0;
    const userSkills = new Set(userProfile.skills || []);

    // Match skills
    career.skills_required.forEach((skill) => {
      if (userSkills.has(skill)) score += 20;
    });

    // Match education
    if (userProfile.education_level === career.education_required) score += 20;

    return Math.min(score, 100);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-1 px-3 mb-3 text-sm border border-blue-200 dark:border-blue-800 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
              <Compass className="w-3.5 h-3.5 mr-1.5" />
              <span>Discover new opportunities</span>
            </div>
            <h1 className="text-3xl font-serif font-medium tracking-tight text-gray-900 dark:text-white mb-4">
              Explore{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Career Paths
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              Browse through carefully curated career options, find your perfect
              match, and plan your professional journey.
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 mx-auto py-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-4 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Filter Results
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <Select
                value={filters.industry}
                onValueChange={(value) =>
                  setFilters({ ...filters, industry: value })
                }
              >
                <SelectTrigger className="w-full md:w-[180px] border-gray-200 dark:border-gray-800">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-industries">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.experienceLevel}
                onValueChange={(value) =>
                  setFilters({ ...filters, experienceLevel: value })
                }
              >
                <SelectTrigger className="w-full md:w-[180px] border-gray-200 dark:border-gray-800">
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-experience">
                    All Experience Levels
                  </SelectItem>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.education}
                onValueChange={(value) =>
                  setFilters({ ...filters, education: value })
                }
              >
                <SelectTrigger className="w-full md:w-[180px] border-gray-200 dark:border-gray-800">
                  <SelectValue placeholder="Education Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-education">
                    All Education Levels
                  </SelectItem>
                  {educationLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Showing {filteredCareers.length} career paths
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
              matchScore={userProfile ? calculateMatchScore(career) : undefined}
              onClick={() => setSelectedCareer(career)}
            />
          ))}
        </div>

        {filteredCareers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No careers match your current filters.
            </p>
            <Button
              variant="outline"
              onClick={() =>
                setFilters({ industry: "", experienceLevel: "", education: "" })
              }
              className="border border-gray-200 dark:border-gray-800"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Career Detail Dialog */}
      <Dialog
        open={!!selectedCareer}
        onOpenChange={(open) => !open && setSelectedCareer(null)}
      >
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          {selectedCareer && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {selectedCareer.industry}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-serif font-medium text-gray-900 dark:text-white">
                  {selectedCareer.title}
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-300 mt-2">
                  {selectedCareer.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-8 py-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                    <div className="w-1 h-4 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                    Requirements
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    {selectedCareer.requirements.map((req, i) => (
                      <li key={i} className="flex items-baseline gap-2">
                        <span className="text-blue-600 dark:text-blue-400">
                          •
                        </span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                    <div className="w-1 h-4 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.skills_required.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800 hover:bg-blue-100"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Salary Range
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedCareer.salary_range}
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
                      {selectedCareer.growth_rate}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Education Required
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedCareer.education_required}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Experience Level
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedCareer.experience_level}
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-2"></div>

                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <div className="w-1 h-4 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                    Career Paths
                  </h3>
                  <div className="space-y-4">
                    {selectedCareer.career_paths.map((path, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-100 dark:border-gray-800 rounded-md bg-white dark:bg-gray-900"
                      >
                        <h4 className="font-medium text-lg text-gray-900 dark:text-white">
                          {path.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                          {path.description}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <span className="font-medium">Timeline:</span>{" "}
                          {path.timeline}
                        </p>

                        <div className="mt-4">
                          <h5 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
                            Requirements:
                          </h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            {path.requirements.map((req, i) => (
                              <li key={i} className="flex items-baseline gap-2">
                                <span className="text-blue-600 dark:text-blue-400">
                                  •
                                </span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4">
                          <h5 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
                            Potential Roles:
                          </h5>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {path.potential_roles.map((role) => (
                              <Badge
                                key={role}
                                variant="outline"
                                className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                              >
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Close
                  </Button>
                </DialogClose>
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                  Add to My Path
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
