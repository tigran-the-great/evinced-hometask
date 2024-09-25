export interface Issue {
  id: number;
  issueType: string;
  severity: string;
  component: string;
  selector: string;
  url: string;
  description: string;
  codeSnippet: string;
  screenshot: string;
}

export interface Column {
  key: keyof Issue;
  header: string;
  isSortable?: boolean;
  isFilterable?: boolean;
  filterType?: "text" | "number";
}

export interface TableProps {
  columns: Column[];
  rows: Issue[];
}
