import type { SelectOption } from "../_types/predict";

export const options: {
  firstLanguage: SelectOption[];
  funding: SelectOption[];
  school: SelectOption[];
  fastTrack: SelectOption[];
  coop: SelectOption[];
  residency: SelectOption[];
  gender: SelectOption[];
  prevEducation: SelectOption[];
  ageGroup: SelectOption[];
  englishGrade: SelectOption[];
} = {
  firstLanguage: [
    { label: "English", value: 1 },
    { label: "French", value: 2 },
    { label: "Other", value: 3 },
  ],

  funding: [
    { label: "Apprentice_PS", value: 1 },
    { label: "GPOG_FT", value: 2 },
    { label: "Intl Offshore", value: 3 },
    { label: "Intl Regular", value: 4 },
    { label: "Intl Transfer", value: 5 },
    { label: "Joint Program Ryerson", value: 6 },
    { label: "Joint Program UTSC", value: 7 },
    { label: "Second Career Program", value: 8 },
    { label: "Work Safety Insurance Board", value: 9 },
  ],

  school: [
    { label: "Advancement", value: 1 },
    { label: "Business", value: 2 },
    { label: "Communications", value: 3 },
    { label: "Community and Health", value: 4 },
    { label: "Hospitality", value: 5 },
    { label: "Engineering", value: 6 },
    { label: "Transportation", value: 7 },
  ],

  fastTrack: [
    { label: "Yes", value: 1 },
    { label: "No", value: 2 },
  ],

  coop: [
    { label: "Yes", value: 1 },
    { label: "No", value: 2 },
  ],

  residency: [
    { label: "Domestic", value: 1 },
    { label: "International", value: 2 },
  ],

  gender: [
    { label: "Female", value: 1 },
    { label: "Male", value: 2 },
    { label: "Neutral", value: 3 },
  ],

  prevEducation: [
    { label: "High School", value: 1 },
    { label: "Post Secondary", value: 2 },
  ],

  ageGroup: [
    { label: "0 to 18", value: 1 },
    { label: "19 to 20", value: 2 },
    { label: "21 to 25", value: 3 },
    { label: "26 to 30", value: 4 },
    { label: "31 to 35", value: 5 },
    { label: "36 to 40", value: 6 },
    { label: "41 to 50", value: 7 },
    { label: "51 to 60", value: 8 },
    { label: "61 to 65", value: 9 },
    { label: "66+", value: 10 },
  ],

  englishGrade: [
    { label: "Level-130", value: 1 },
    { label: "Level-131", value: 2 },
    { label: "Level-140", value: 3 },
    { label: "Level-141", value: 4 },
    { label: "Level-150", value: 5 },
    { label: "Level-151", value: 6 },
    { label: "Level-160", value: 7 },
    { label: "Level-161", value: 8 },
    { label: "Level-170", value: 9 },
    { label: "Level-171", value: 10 },
    { label: "Level-180", value: 11 },
  ],
};