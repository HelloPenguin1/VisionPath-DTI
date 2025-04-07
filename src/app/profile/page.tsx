"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { demoUser } from "@/config/config";
import { educationLevels } from "@/config/careers";
import { interestAreas, workEnvironments } from "@/config/skills";
import { UserProfile } from "@/types/user";
import {
  User,
  GraduationCap,
  Heart,
  Briefcase,
  Save,
  LogOut,
  Loader2,
} from "lucide-react";

// Create form schema
const profileSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  current_status: z.string(),
  education_level: z.string(),
  graduation_year: z.number().optional(),
  university: z.string().optional(),
  major: z.string().optional(),
  work_experience: z.number().optional(),
  interests: z.array(z.string()),
  career_goals: z.array(z.string()),
  preferred_work_environment: z.string().optional(),
  preferred_location: z.string().optional(),
  salary_expectations: z.string().optional(),
  willing_to_relocate: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Simulate fetching user profile
    setTimeout(() => {
      setUser(demoUser);
      setLoading(false);
    }, 500);
  }, []);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      current_status: "",
      education_level: "",
      interests: [],
      career_goals: [],
      willing_to_relocate: false,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        full_name: user.full_name,
        current_status: user.current_status,
        education_level: user.education_level,
        graduation_year: user.graduation_year,
        university: user.university,
        major: user.major,
        work_experience: user.work_experience,
        interests: user.interests,
        career_goals: user.career_goals,
        preferred_work_environment: user.preferred_work_environment,
        preferred_location: user.preferred_location,
        salary_expectations: user.salary_expectations,
        willing_to_relocate: user.willing_to_relocate,
      });
    }
  }, [user, form]);

  function onSubmit(data: ProfileFormValues) {
    setSaving(true);

    // Simulate profile update
    setTimeout(() => {
      setUser({ ...user, ...data } as UserProfile);
      setSaving(false);
      alert("Profile updated successfully!");
    }, 800);
  }

  function handleLogout() {
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-300">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 dark:text-purple-400" />
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="bg-gradient-to-br from-white via-gray-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-1 px-3 mb-3 text-sm border border-purple-200 dark:border-purple-800 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300">
              <User className="w-3.5 h-3.5 mr-1.5" />
              <span>Your personal information</span>
            </div>
            <h1 className="text-3xl font-serif font-medium tracking-tight text-gray-900 dark:text-white mb-4">
              Career{" "}
              <span className="text-purple-600 dark:text-purple-400">
                Profile
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              Carefully curate your professional details to receive personalized
              career recommendations.
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 mx-auto py-12">
        <Card className="max-w-3xl mx-auto border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-medium text-gray-900 dark:text-white">
              Your Career Profile
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Complete your profile to make the most of VisionPath's
              personalized recommendations
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Personal Information
                    </h3>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

                  <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              {...field}
                              className="border-gray-200 dark:border-gray-800 focus:border-purple-500 dark:focus:border-purple-400"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="current_status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">
                            Current Role/Status
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Student, Working Professional"
                              {...field}
                              className="border-gray-200 dark:border-gray-800 focus:border-purple-500 dark:focus:border-purple-400"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="work_experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">
                            Years of Work Experience
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              value={field.value || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(
                                  value === "" ? undefined : parseInt(value, 10)
                                );
                              }}
                              className="border-gray-200 dark:border-gray-800 focus:border-purple-500 dark:focus:border-purple-400"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Education
                    </h3>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

                  <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="education_level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">
                            Education Level
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-gray-200 dark:border-gray-800 focus:ring-purple-500 dark:focus:ring-purple-400">
                                <SelectValue placeholder="Select education level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {educationLevels.map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500 dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                    {form.watch("education_level") &&
                      form.watch("education_level") !== "High School" && (
                        <>
                          <FormField
                            control={form.control}
                            name="university"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-300">
                                  University/College
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    value={field.value || ""}
                                    className="border-gray-200 dark:border-gray-800 focus:border-purple-500 dark:focus:border-purple-400"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 dark:text-red-400" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="major"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-300">
                                  Major/Field of Study
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    value={field.value || ""}
                                    className="border-gray-200 dark:border-gray-800 focus:border-purple-500 dark:focus:border-purple-400"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 dark:text-red-400" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="graduation_year"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-300">
                                  Graduation Year
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      field.onChange(
                                        value === ""
                                          ? undefined
                                          : parseInt(value, 10)
                                      );
                                    }}
                                    className="border-gray-200 dark:border-gray-800 focus:border-purple-500 dark:focus:border-purple-400"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 dark:text-red-400" />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Career Interests
                    </h3>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

                  <FormField
                    control={form.control}
                    name="interests"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-gray-700 dark:text-gray-300">
                            Areas of Interest
                          </FormLabel>
                          <FormDescription className="text-gray-500 dark:text-gray-400">
                            Select all that apply
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {interestAreas.map((interest) => (
                            <FormField
                              key={interest}
                              control={form.control}
                              name="interests"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={interest}
                                    className="flex flex-row items-start space-x-3 space-y-0 bg-gray-50 dark:bg-gray-800/30 p-3 rounded-md border border-gray-100 dark:border-gray-800"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          interest
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                interest,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== interest
                                                )
                                              );
                                        }}
                                        className="border-purple-300 dark:border-purple-700 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-gray-700 dark:text-gray-300">
                                      {interest}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage className="text-red-500 dark:text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="career_goals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">
                          Career Goals
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your career goals (one per line)"
                            value={field.value?.join("\n") || ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value.split("\n").filter(Boolean)
                              )
                            }
                            rows={4}
                            className="border-gray-200 dark:border-gray-800 focus:border-purple-500 dark:focus:border-purple-400"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500 dark:text-gray-400">
                          Enter each goal on a new line
                        </FormDescription>
                        <FormMessage className="text-red-500 dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Work Preferences
                    </h3>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

                  <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="preferred_work_environment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">
                            Preferred Work Environment
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value || ""}
                          >
                            <FormControl>
                              <SelectTrigger className="border-gray-200 dark:border-gray-800 focus:ring-purple-500 dark:focus:ring-purple-400">
                                <SelectValue placeholder="Select work environment" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {workEnvironments.map((env) => (
                                <SelectItem key={env} value={env}>
                                  {env}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500 dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="preferred_location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">
                            Preferred Location
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., New York, Remote, Europe"
                              {...field}
                              value={field.value || ""}
                              className="border-gray-200 dark:border-gray-800 focus:border-purple-500 dark:focus:border-purple-400"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="salary_expectations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">
                            Salary Expectations
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., $50,000 - $70,000"
                              {...field}
                              value={field.value || ""}
                              className="border-gray-200 dark:border-gray-800 focus:border-purple-500 dark:focus:border-purple-400"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="willing_to_relocate"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-6 bg-gray-50 dark:bg-gray-800/30 p-3 rounded-md border border-gray-100 dark:border-gray-800">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-purple-300 dark:border-purple-700 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-gray-700 dark:text-gray-300">
                              Willing to Relocate
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-2"></div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-0">
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700"
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
                        Save Profile
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleLogout}
                    className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
