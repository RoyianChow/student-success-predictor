"use client";

import {
  ResponsiveContainer,

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
 
}: ModelDetailsProps) {
  if (!result) return null;

  const predictedValue =
    Number(
      result?.prediction ??

        0
    ) || 0;
 

  const comparisonData = [
    { name: "First Term GPA", value: firstTermGpa },
    { name: "Predicted GPA", value: predictedValue },
  ];

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Model Details</h2>
        <p className="mt-2 text-sm text-slate-600">
          A visual breakdown of the academic model inputs, predicted GPA, and
          training performance.
        </p>
      </div>

      

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Current vs Predicted GPA
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 4.5]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Training Loss
          </h3>
          <img
            src="/academicmodelloss.png"
            alt="Academic model training loss"
            className="h-auto w-full rounded-xl border border-slate-200"
          />
          <p className="mt-3 text-sm text-slate-600">
            This graph shows how the model loss changed during training.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Training MAE
          </h3>
          <img
            src="/academicmae.png"
            alt="Academic model MAE"
            className="h-auto w-full rounded-xl border border-slate-200"
          />
          <p className="mt-3 text-sm text-slate-600">
            This graph shows how the mean absolute error changed during
            training.
          </p>
        </div>
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