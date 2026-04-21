export type SelectOption = {
  label: string;
  value: number;
};

export type PredictionResult = {
  prediction?: number;
  predictedClass?: number;
  predicted_class?: number;
  persistence_score?: number | string;
  persistence_label?: string;
  probability?: number;
  confidence?: number;
  risk?: number;
  error?: string;
  message?: string;
} | null;

export type PredictPayload = {
  firstTermGpa: number;
  secondTermGpa: number;
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