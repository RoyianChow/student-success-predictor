"use client";

import React, { useState } from "react";
import { predictAcademicPerformance } from "@/app/lib/api";
import { ModelDetails } from "./_components/modelDetails";
import { StudentInputsForm } from "./_components/StudentInputsForm";
import { PredictionSummary } from "./_components/PredictionSummary";
import type { PredictionResult } from "./_types/predict";

export default function PredictAPPage() {
  const [firstTermGpa, setFirstTermGpa] = useState(2.0);
  const [mathScore, setMathScore] = useState(25.0);
  const [hsAverage, setHsAverage] = useState(50.0);
  const [firstLanguage, setFirstLanguage] = useState(1);
  const [funding, setFunding] = useState(1);
  const [school, setSchool] = useState(1);
  const [fastTrack, setFastTrack] = useState(2);
  const [coop, setCoop] = useState(2);
  const [residency, setResidency] = useState(1);
  const [gender, setGender] = useState(1);
  const [prevEducation, setPrevEducation] = useState(1);
  const [ageGroup, setAgeGroup] = useState(3);
  const [englishGrade, setEnglishGrade] = useState(1);

  const [result, setResult] = useState<PredictionResult>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const data = await predictAcademicPerformance({
        firstTermGpa,
        firstLanguage,
        mathScore,
        hsAverage,
        funding,
        school,
        fastTrack,
        coop,
        residency,
        gender,
        prevEducation,
        ageGroup,
        englishGrade,
      });

      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Could not get prediction. Make sure the Flask API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-1 text-sm font-medium text-slate-700 shadow-sm">
            Student Success Model
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
            Predict Academic Performance
          </h1>

          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Enter the student details used by the academic model to estimate
            the student’s second term GPA.
          </p>
        </div>

        <div className="mx-auto max-w-7xl space-y-6">
          <StudentInputsForm
            firstTermGpa={firstTermGpa}
            setFirstTermGpa={setFirstTermGpa}
            mathScore={mathScore}
            setMathScore={setMathScore}
            hsAverage={hsAverage}
            setHsAverage={setHsAverage}
            firstLanguage={firstLanguage}
            setFirstLanguage={setFirstLanguage}
            funding={funding}
            setFunding={setFunding}
            school={school}
            setSchool={setSchool}
            fastTrack={fastTrack}
            setFastTrack={setFastTrack}
            coop={coop}
            setCoop={setCoop}
            residency={residency}
            setResidency={setResidency}
            gender={gender}
            setGender={setGender}
            prevEducation={prevEducation}
            setPrevEducation={setPrevEducation}
            ageGroup={ageGroup}
            setAgeGroup={setAgeGroup}
            englishGrade={englishGrade}
            setEnglishGrade={setEnglishGrade}
            handlePredict={handlePredict}
            loading={loading}
            error={error}
          />

          <PredictionSummary
            loading={loading}
            result={result}
            firstTermGpa={firstTermGpa}
            mathScore={mathScore}
            hsAverage={hsAverage}
            firstLanguage={firstLanguage}
            funding={funding}
            school={school}
            fastTrack={fastTrack}
            coop={coop}
            residency={residency}
            gender={gender}
            prevEducation={prevEducation}
            ageGroup={ageGroup}
            englishGrade={englishGrade}
          />

          <ModelDetails
            result={result}
            firstTermGpa={firstTermGpa}
            mathScore={mathScore}
            hsAverage={hsAverage}
            firstLanguage={firstLanguage}
            funding={funding}
            school={school}
            fastTrack={fastTrack}
            coop={coop}
            residency={residency}
            gender={gender}
            prevEducation={prevEducation}
            ageGroup={ageGroup}
            englishGrade={englishGrade}
          />
        </div>
      </div>
    </main>
  );
}