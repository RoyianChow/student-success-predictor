export type SelectOption = {
  label: string;
  value: number;
};

export type PredictionResult = {
  predicted_gpa?: number | string;
  predicted_gpa_label?: string;
} | null;

export type PredictPayload = {
  firstTermGpa: number;
  firstLanguage: number;
  mathScore: number;
  hsAverage: number;
  funding: number;
  school: number;
  fastTrack: number;
  coop: number;
  residency: number;
  gender: number;
  prevEducation: number;
  ageGroup: number;
  englishGrade: number;
};