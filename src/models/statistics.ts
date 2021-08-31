import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface Statistics {
  continent: string;
  country: string;
  population: number;
  cases: {
    new: string;
    active: number;
    critical: number;
    recovered: number;
    "1M_pop": string;
    total: number;
  };
  deaths: {
    new: string;
    "1M_pop": string;
    total: number;
  };
  tests: {
    "1M_pop": string;
    total: number;
  };
  day: string;
  time: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<Statistics>({
  continent: { type: String },
  country: { type: String },
  population: { type: Number },
  cases: {
    new: { type: String },
    active: { type: Number },
    critical: { type: Number },
    recovered: { type: Number },
    "1M_pop": { type: String },
    total: { type: Number },
  },
  deaths: {
    new: { type: String },
    "1M_pop": { type: String },
    total: { type: Number },
  },
  tests: {
    "1M_pop": { type: String },
    total: { type: Number },
  },
  day: { type: String },
  time: { type: String },
});

// 3. Create a Model.
const StatisticModel = model<Statistics>("Statistic", schema);

export default StatisticModel;
