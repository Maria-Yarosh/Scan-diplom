import { IRequestDocumentData } from "../../../interfaces/documents";
import { EFieldName, TFormData } from "../interfaces";

export function convertDocument(formData: TFormData): IRequestDocumentData {
  return {
    issueDateInterval: {
      startDate: (formData[EFieldName.DateRange] as { start: string; end: string }).start,
      endDate: (formData[EFieldName.DateRange] as { start: string; end: string }).end,
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: "company",
            sparkId: null,
            entityId: null,
            inn: parseInt(formData[EFieldName.INN] as string),
            maxFullness: formData[EFieldName.MaxCompleteness] as boolean,
            inBusinessNews: formData[EFieldName.BusinessContext] as boolean,
          },
        ],
        onlyMainRole: formData[EFieldName.MainRole] as boolean,
        tonality: formData[EFieldName.Tone] as "any" | "positive" | "negative",
        onlyWithRiskFactors: formData[EFieldName.RiskFactors] as boolean,
        riskFactors: { and: [], or: [], not: [] },
        themes: { and: [], or: [], not: [] },
      },
      themesFilter: { and: [], or: [], not: [] },
    },
    searchArea: {
      includedSources: [],
      excludedSources: [],
      includedSourceGroups: [],
      excludedSourceGroups: [],
    },
    attributeFilters: {
      excludeTechNews: !(formData[EFieldName.TechNews] as boolean),
      excludeAnnouncements: !(formData[EFieldName.Announcements] as boolean),
      excludeDigests: !(formData[EFieldName.NewsDigest] as boolean),
    },
    similarMode: "duplicates",
    limit: parseInt(formData[EFieldName.DocumentCount] as string),
    sortType: "sourceInfluence",
    sortDirectionType: "desc",
    intervalType: "month",
    histogramTypes: ["totalDocuments", "riskFactors"],
  };
}
