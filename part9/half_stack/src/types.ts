export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CourseNewPart extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends CoursePartBase {
  type: "normal";
  description?: string;
}
export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}
export interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  description?: string;
  exerciseSubmissionLink: string;
}
export interface CourseSpecialPart extends CoursePartBase {
  type: "special",
  description: string,
  requirements: string[]
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;