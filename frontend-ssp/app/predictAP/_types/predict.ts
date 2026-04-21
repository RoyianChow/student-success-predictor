export type SelectOption = {
  label: string;
  value: number;
};


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

export type PredictionResult =
  | {
      prediction?: number;
      predictedGpa?: number;
      predicted_gpa_label?: string;
      predicted_gpa?: number;
      probability?: number;
      confidence?: number;
      error?: string;
      message?: string;
    }
  | null;