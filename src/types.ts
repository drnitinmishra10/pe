export interface Lecture {
  path: string;
  title: string;
  fileName: string;
}

export interface SyllabusUnit {
  unit: string;
  title: string;
  description: string;
  topics: string[];
  readings: string[];
  assignments: {
    id: string;
    title: string;
    dueDate: string;
    points: number;
    description: string;
  }[];
  iconName: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  tags: string[];
}

export interface StudentProject {
  id: string;
  title: string;
  studentNames: string[];
  description: string;
  promptSolution: string;
  outputPreview: string;
  tags: string[];
  votes: number;
}

export interface FeedbackInquiry {
  id: string;
  name: string;
  email: string;
  inquiryType: 'assignment' | 'lecture' | 'general' | 'project';
  assignmentName?: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'reviewed';
}
