import { Career } from "@/types/careers";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, TrendingUp, DollarSign, ChevronRight } from "lucide-react";

interface CareerCardProps {
  career: Career;
  matchScore?: number;
  onClick?: () => void;
}

export function CareerCard({ career, matchScore, onClick }: CareerCardProps) {
  return (
    <Card
      className="h-full transition-all hover:border-blue-200 dark:hover:border-blue-800 cursor-pointer border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-1">
          {matchScore !== undefined && (
            <Badge
              className={`
              ${
                matchScore >= 80
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                  : matchScore >= 60
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                  : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800"
              }
            `}
            >
              {matchScore}% Match
            </Badge>
          )}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <Briefcase className="h-4 w-4" />
          </div>
        </div>
        <CardTitle className="text-xl font-medium text-gray-900 dark:text-white">
          {career.title}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">
          {career.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-500 dark:text-gray-400 flex items-center">
              <DollarSign className="h-3.5 w-3.5 mr-1.5" />
              Salary Range:
            </span>
            <span className="text-gray-900 dark:text-white font-medium">
              {career.salary_range}
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-500 dark:text-gray-400 flex items-center">
              <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
              Growth Rate:
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              {career.growth_rate}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3 flex justify-between items-center">
        <div className="flex flex-wrap gap-1.5">
          {career.skills_required.slice(0, 3).map((skill) => (
            <Badge
              key={skill}
              className="text-xs bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700 font-normal"
            >
              {skill}
            </Badge>
          ))}
          {career.skills_required.length > 3 && (
            <Badge className="text-xs bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700 font-normal">
              +{career.skills_required.length - 3}
            </Badge>
          )}
        </div>
        <span className="text-blue-600 dark:text-blue-400">
          <ChevronRight className="h-4 w-4" />
        </span>
      </CardFooter>
    </Card>
  );
}
