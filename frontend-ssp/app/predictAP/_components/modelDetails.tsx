"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import type { PredictionResult } from "../_types/predict";

type ModelDetailsProps = {
  result: PredictionResult;
  firstTermGpa: number;
  mathScore: number;
  hsAverage: number;
  firstLanguage: number;
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

export function ModelDetails({
  result,
  firstTermGpa,
  mathScore,
  hsAverage,
  firstLanguage,
  funding,
  school,
  fastTrack,
  coop,
  residency,
  gender,
  prevEducation,
  ageGroup,
  englishGrade,
}: ModelDetailsProps) {
  if (!result) return null;

  const predictedValue =
    result?.prediction ??
    result?.predictedGpa ??
    result?.predicted_gpa ??
    null;

  const inputFeatureData = [
    { name: "First GPA", value: firstTermGpa },
    { name: "Math", value: mathScore },
    { name: "HS Avg", value: hsAverage },
    { name: "English", value: englishGrade },
  ];

  const encodedFeatureData = [
    { name: "Language", value: firstLanguage },
    { name: "Funding", value: funding },
    { name: "School", value: school },
    { name: "FastTrack", value: fastTrack },
    { name: "Coop", value: coop },
    { name: "Residency", value: residency },
    { name: "Gender", value: gender },
    { name: "PrevEdu", value: prevEducation },
    { name: "AgeGroup", value: ageGroup },
  ];

  const comparisonData = [
    { name: "First Term GPA", value: firstTermGpa },
    { name: "Predicted GPA", value: Number(predictedValue ?? 0) },
  ];

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Model Details</h2>
        <p className="mt-2 text-sm text-slate-600">
          A visual breakdown of the academic model inputs and predicted output.
        </p>
      </div>

    

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Current vs Predicted GPA
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 4.5]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl border bg-slate-950 p-6 text-slate-100 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Raw Model Response</h3>
        <pre className="overflow-auto text-xs">
{JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </section>
  );
}