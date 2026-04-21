import { SliderField } from "../../_components/SliderField";
import { SelectField } from "../../_components/SelectField";
import { options } from "../_data/predict-options";

type StudentInputsFormProps = {
  firstTermGpa: number;
  setFirstTermGpa: (value: number) => void;

  secondTermGpa: number;
  setSecondTermGpa: (value: number) => void;

  mathScore: number;
  setMathScore: (value: number) => void;

  hsAverage: number;
  setHsAverage: (value: number) => void;

  firstLanguage: number;
  setFirstLanguage: (value: number) => void;

  funding: number;
  setFunding: (value: number) => void;

  school: number;
  setSchool: (value: number) => void;

  fastTrack: number;
  setFastTrack: (value: number) => void;

  coop: number;
  setCoop: (value: number) => void;

  residency: number;
  setResidency: (value: number) => void;

  gender: number;
  setGender: (value: number) => void;

  prevEducation: number;
  setPrevEducation: (value: number) => void;

  ageGroup: number;
  setAgeGroup: (value: number) => void;

  englishGrade: number;
  setEnglishGrade: (value: number) => void;

  handlePredict: () => void;
  loading: boolean;
  error: string;
};

export function StudentInputsForm({
  firstTermGpa,
  setFirstTermGpa,
  mathScore,
  setMathScore,
  hsAverage,
  setHsAverage,
  secondTermGpa,
  setSecondTermGpa,
  firstLanguage,
  setFirstLanguage,
  funding,
  setFunding,
  school,
  setSchool,
  fastTrack,
  setFastTrack,
  coop,
  setCoop,
  residency,
  setResidency,
  gender,
  setGender,
  prevEducation,
  setPrevEducation,
  ageGroup,
  setAgeGroup,
  englishGrade,
  setEnglishGrade,
  handlePredict,
  loading,
  error,
}: StudentInputsFormProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Student Inputs
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Enter all features required by the academic persistence model.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SliderField
          label="First Term GPA"
          description="Student GPA from the first academic term."
          value={firstTermGpa}
          min={0}
          max={4.5}
          step={0.1}
          onChange={setFirstTermGpa}
        />

        <SliderField
          label="Second Term GPA"
          description="Student GPA from the second academic term."
          value={secondTermGpa}
          min={0}
          max={4.5}
          step={0.1}
          onChange={setSecondTermGpa}
        />
        <SliderField
          label="Math Score"
          description="Student math score."
          value={mathScore}
          min={0}
          max={50}
          step={1}
          onChange={setMathScore}
        />
        <SliderField
          label="High School Average"
          description="Student's average grade in high school."
          value={hsAverage}
          min={0}
          max={100}
          step={1}
          onChange={setHsAverage}
        />

        <SelectField
          label="First Language"
          description="Student first language category."
          value={firstLanguage}
          options={options.firstLanguage}
          onChange={setFirstLanguage}
        />

        <SelectField
          label="Funding"
          description="Student funding category."
          value={funding}
          options={options.funding}
          onChange={setFunding}
        />

        <SelectField
          label="School"
          description="School associated with the student record."
          value={school}
          options={options.school}
          onChange={setSchool}
        />

        <SelectField
          label="Fast Track"
          description="Whether the student is in fast track."
          value={fastTrack}
          options={options.fastTrack}
          onChange={setFastTrack}
        />

        <SelectField
          label="Co-op"
          description="Whether the student is in co-op."
          value={coop}
          options={options.coop}
          onChange={setCoop}
        />

        <SelectField
          label="Residency"
          description="Student residency status."
          value={residency}
          options={options.residency}
          onChange={setResidency}
        />

        <SelectField
          label="Gender"
          description="Student gender category."
          value={gender}
          options={options.gender}
          onChange={setGender}
        />

        <SelectField
          label="Previous Education"
          description="Highest prior education category."
          value={prevEducation}
          options={options.prevEducation}
          onChange={setPrevEducation}
        />

        <SelectField
          label="Age Group"
          description="Student age bracket."
          value={ageGroup}
          options={options.ageGroup}
          onChange={setAgeGroup}
        />

        <SelectField
          label="English Grade"
          description="English level associated with the student record."
          value={englishGrade}
          options={options.englishGrade}
          onChange={setEnglishGrade}
        />
   </div>
   <div className="py-4">
<button
          onClick={handlePredict}
          disabled={loading}
          className="w-full rounded-2xl bg-slate-900 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Generating Prediction..." : "Predict Persistence"}
        </button>
   </div>
        
   

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">Something went wrong</p>
          <p className="mt-1">{error}</p>
        </div>
      )}
    </section>
  );
}