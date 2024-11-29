import { IDocument, IHistogram } from "../../../interfaces/documents";
import { TFormData } from "../../../pages/SearchDocument/interfaces";
import { RootState } from "../../store";

export const selectIsDocumentLoading = (state: RootState): boolean => state.documents.isLoading;
export const selectDocumentError = (state: RootState): string | null => state.documents.error;
export const selectDocuments = (state: RootState): IDocument[] | null => state.documents.documents;
export const selectSearchDocuments = (state: RootState): TFormData | null => state.documents.documentSearchData;
export const selectPaginationDocuments = (
  state: RootState
): { currentPage: number; pageSize: number; totalCounts: number | null } => {
  return {
    currentPage: state.documents.currentPage,
    pageSize: state.documents.pageSize,
    totalCounts: state.documents.totalCounts,
  };
};
export const selectDocumentIds = (state: RootState): string[] | null => state.documents.encodedIds;

export const selectHisogramData = (state: RootState): IHistogram[] | null => state.documents.histogramData;