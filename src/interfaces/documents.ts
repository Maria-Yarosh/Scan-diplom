export interface IDocument {
  title: string | null;
  content: string | null;
  id: string | null;
  issueDate: string | null;
  redirectSourceUrl: string | null;
  nameSource: string | null;
  wordCount: number | null;
}

interface ISearchContext {
  targetSearchEntitiesContext: ITargetSearchEntitiesContext;
  themesFilter: {
    and: string[];
    or: string[];
    not: string[];
  };
}

interface IDateInterval {
  startDate: string;
  endDate: string;
}

interface ITargetSearchEntity {
  type: "company";
  sparkId: number | null;
  entityId: number | null;
  inn: number;
  maxFullness: boolean;
  inBusinessNews: boolean | null;
}

interface ITargetSearchEntitiesContext {
  targetSearchEntities: ITargetSearchEntity[];
  onlyMainRole: boolean;
  tonality: "any" | "positive" | "negative";
  onlyWithRiskFactors: boolean;
  riskFactors: {
    and: string[];
    or: string[];
    not: string[];
  };
  themes: {
    and: string[];
    or: string[];
    not: string[];
  };
}

interface ISearchArea {
  includedSources: string[];
  excludedSources: string[];
  includedSourceGroups: string[];
  excludedSourceGroups: string[];
}

interface IAttributeFilters {
  excludeTechNews: boolean;
  excludeAnnouncements: boolean;
  excludeDigests: boolean;
}

export interface IRequestDocumentData {
  issueDateInterval: IDateInterval;
  searchContext: ISearchContext;
  searchArea: ISearchArea;
  attributeFilters: IAttributeFilters;
  similarMode: "duplicates" | "similar";
  limit: number;
  sortType: "sourceInfluence" | "date" | "relevance";
  sortDirectionType: "desc" | "asc";
  intervalType: "month" | "day" | "week" | "year";
  histogramTypes: ("totalDocuments" | "riskFactors")[];
}

export interface IHistogram {
  data: Array<{date: string, value: number}>,
  histogramType: string,
}