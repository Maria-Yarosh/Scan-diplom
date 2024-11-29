export enum EFieldName {
  INN = "inn",
  Tone = "tone",
  DocumentCount = "documentCount",
  DateRange = "dateRange",
  MaxCompleteness = "maxCompleteness",
  BusinessContext = "businessContext",
  MainRole = "mainRole",
  RiskFactors = "riskFactors",
  TechNews = "techNews",
  Announcements = "announcements",
  NewsDigest = "newsDigest",
}

export type TFormData = {
  [K in EFieldName]: TFieldValue;
};

export type TFieldValue = string | boolean | { start: string; end: string };
