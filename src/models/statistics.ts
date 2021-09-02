import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface IStatistics {
  continent: string;
  country: string;
  population: number;
  cases: {
    new: number;
    active: number;
    critical: number;
    recovered: number;
    total: number;
  };
  deaths: {
    new: string;
    total: number;
  };
  tests: {
    total: number;
  };
  day: string;
  time: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IStatistics>({
  continent: { type: String },
  country: { type: String },
  population: { type: Number },
  cases: {
    new: { type: Number },
    active: { type: Number },
    critical: { type: Number },
    recovered: { type: Number },
    total: { type: Number },
  },
  deaths: {
    new: { type: Number },
    total: { type: Number },
  },
  tests: {
    total: { type: Number },
  },
  day: { type: String },
  time: { type: String },
});

// 3. Create a Model.
const StatisticModel = model<IStatistics>("Statistic", schema);

export default StatisticModel;
