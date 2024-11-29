import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../../api/config";
import { IDocumentResponse, IHistogramResponse, getDocumentsData } from "./getDocumentsData";
import { IDocument, IHistogram, IRequestDocumentData } from "../../../interfaces/documents";
import { TFormData } from "../../../pages/SearchDocument/interfaces";

interface IDocumnetSlice {
  documents: IDocument[] | null;
  isLoading: boolean;
  error: string | null;
  documentSearchData: TFormData | null;
  encodedIds: string[] | null;
  pageSize: number;
  currentPage: number;
  totalCounts: number | null;
  histogramData: IHistogram[] | null
}

const PAGE_SIZE = 10;

interface IFetchDocumentResponse {
  documents: IDocumentResponse[];
  encodedIds: string[];
  histogramData: IHistogramResponse[];
}

export const fetchDocuments = createAsyncThunk<IFetchDocumentResponse, IRequestDocumentData, { rejectValue: string }>(
  "objects/fetchObjectsAndDocuments",
  async (searchParams, { rejectWithValue }) => {
    try {
      const hitogramResponse = await api.post('/api/v1/objectsearch/histograms', searchParams)
      const objectSearchResponse = await api.post("/api/v1/objectsearch", searchParams);
      const objectSearchResult = objectSearchResponse.data;

      const encodedIds = objectSearchResult.items.map((item: { encodedId: string }) => item.encodedId);

      const firstEncodedIds = encodedIds.slice(0, PAGE_SIZE);

      const documentsResponse = await api.post("/api/v1/documents", { ids: firstEncodedIds });

      return {
        documents: documentsResponse.data,
        encodedIds: encodedIds,
        histogramData: hitogramResponse.data.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || "Ошибка запроса");
      }
      return rejectWithValue("Ошибка запроса");
    }
  }
);

interface IFetchMoreDocumentParams {
  encodedIds: string[];
  page: number;
}

export const fetchMoreDocuments = createAsyncThunk<
  IDocumentResponse[],
  IFetchMoreDocumentParams,
  { rejectValue: string }
>("objects/fetchMoreDocuments", async (params, { rejectWithValue }) => {
  try {
    const { page, encodedIds } = params;
    const startIndex = page * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const nextEncodedIds = encodedIds.slice(startIndex, endIndex);
    const documentsResponse = await api.post("/api/v1/documents", { ids: nextEncodedIds });
    return documentsResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || "Ошибка запроса");
    }
    return rejectWithValue("Ошибка запроса");
  }
});

const initialState: IDocumnetSlice = {
  documents: null,
  isLoading: false,
  error: null,
  documentSearchData: null,
  encodedIds: null,
  pageSize: PAGE_SIZE,
  currentPage: 1,
  totalCounts: null,
  histogramData: null,
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    updateDocuments: (state, action: PayloadAction<Partial<IDocumnetSlice>>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action: PayloadAction<IFetchDocumentResponse>) => {
        const { documents: data, encodedIds, histogramData } = action.payload;
        state.documents = getDocumentsData(data);
        state.isLoading = false;
        state.error = null;
        state.encodedIds = encodedIds;
        state.histogramData = histogramData;
        state.totalCounts = encodedIds.length;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Неизвестная ошибка";
      })
      .addCase(fetchMoreDocuments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMoreDocuments.fulfilled, (state, action: PayloadAction<IDocumentResponse[]>) => {
        const data = action.payload;
        const newDocuments = getDocumentsData(data);
        state.documents = state.documents ? [...state.documents, ...newDocuments] : newDocuments;
        state.isLoading = false;
        state.error = null;
        state.currentPage += 1;
      })
      .addCase(fetchMoreDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Неизвестная ошибка";
      });

  },
});

const { actions, reducer } = documentSlice;
export const { updateDocuments } = actions;
export const documentReducer = reducer;
