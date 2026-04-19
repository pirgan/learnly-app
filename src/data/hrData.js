export const HR_STATS = {
  totalLearners: 1248,
  totalLearnersChange: 12,
  overallCompletion: 74,
  overallCompletionChange: 5,
  voluntaryCompletion: 61,
  voluntaryCompletionChange: -2,
  avgSkillGapScore: 3.2,
  highRiskDomains: 2,
}

export const COMPLETION_TRENDS = [
  { month: 'Nov', overall: 52, voluntary: 31 },
  { month: 'Dec', overall: 55, voluntary: 34 },
  { month: 'Jan', overall: 57, voluntary: 38 },
  { month: 'Feb', overall: 61, voluntary: 42 },
  { month: 'Mar', overall: 68, voluntary: 47 },
  { month: 'Apr', overall: 74, voluntary: 61 },
]

export const SKILL_HEATMAP = [
  {
    domain: 'Leadership',
    Engineering: 82,
    Sales: 71,
    HR: 68,
    Product: 88,
  },
  {
    domain: 'Technical',
    Engineering: 91,
    Sales: 43,
    HR: 37,
    Product: 79,
  },
  {
    domain: 'Compliance',
    Engineering: 85,
    Sales: 88,
    HR: 93,
    Product: 87,
  },
  {
    domain: 'Communication',
    Engineering: 74,
    Sales: 78,
    HR: 81,
    Product: 77,
  },
  {
    domain: 'Analytics',
    Engineering: 69,
    Sales: 48,
    HR: 52,
    Product: 84,
  },
]

export const TOP_SKILL_GAPS = [
  {
    id: 1,
    severity: 'critical',
    skill: 'Cloud Security',
    team: 'Engineering Team',
    gap: 32,
    coursePath: 'Cloud Security Fundamentals path',
  },
  {
    id: 2,
    severity: 'critical',
    skill: 'Data Analytics',
    team: 'Sales Team',
    gap: 48,
    coursePath: 'Analytics for Business Leaders',
  },
  {
    id: 3,
    severity: 'high',
    skill: 'Agile Methods',
    team: 'HR Team',
    gap: 42,
    coursePath: 'Agile Practitioner Program',
  },
  {
    id: 4,
    severity: 'moderate',
    skill: 'UX Research',
    team: 'Product Team',
    gap: 58,
    coursePath: 'User Research Methods course',
  },
  {
    id: 5,
    severity: 'moderate',
    skill: 'Leadership',
    team: 'HR Team',
    gap: 68,
    coursePath: 'Leadership Essentials path',
  },
]

export const DEPARTMENT_STATS = [
  { dept: 'Engineering', learners: 312, completion: 79, avgGap: 2.8 },
  { dept: 'Sales', learners: 248, completion: 65, avgGap: 4.1 },
  { dept: 'HR', learners: 187, completion: 81, avgGap: 3.5 },
  { dept: 'Product', learners: 204, completion: 86, avgGap: 2.4 },
  { dept: 'Operations', learners: 297, completion: 70, avgGap: 3.9 },
]
