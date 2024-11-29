import { IDocument } from "../../../interfaces/documents";

export interface IDocumentResponse {
  ok: {
    id: string;
    title: {
      text: string;
    };
    content: {
      markup: string;
    };
    issueDate: string;
    url: string;
    source: {
      name: string;
    };
    attributes: {
      wordCount: number;
    };
  };
}

export interface IHistogramResponse {
  data: Array<{date: string, value: number}>,
  histogramType: string,
}

export const getDocumentsData = (data: IDocumentResponse[]): IDocument[] => {
  return data.map((item) => {
    const { ok } = item;
    const { title, content, url, issueDate, id, source, attributes } = ok;
    return {
      id: id,
      title: title.text,
      content: content.markup,
      issueDate: issueDate,
      redirectSourceUrl: url,
      nameSource: source.name,
      wordCount: attributes.wordCount,
    };
  });
};
