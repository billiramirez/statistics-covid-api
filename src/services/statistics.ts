import Statistics, { IStatistics } from "../models/statistics";

export const getAllStatistics = async () => {
  return await Statistics.find();
};

export const createStatistic = async (statistic: IStatistics) => {
  const newStatistic = new Statistics(statistic);
  return await newStatistic.save();
};

export const getStatisticByCountryName = async (country: string) => {
  return await Statistics.findOne({ country });
};
