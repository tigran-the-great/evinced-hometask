import GenericIssuesTable from "../components/list-issues-screen/issue-list-table";
import { Column } from "../components/list-issues-screen/types";
import { sampleData } from "../data/sample";

const IssueListTableScreen = () => {
  const columns: Column[] = [
    { key: "id", header: "No.", isSortable: true },
    { key: "issueType", header: "Issue Type", isSortable: true },
    { key: "severity", header: "Severity", isSortable: true },
    { key: "component", header: "Component", isSortable: true },
    {
      key: "selector",
      header: "Selector",
      isFilterable: true,
      isSortable: true,
    },
    { key: "url", header: "URL", isFilterable: true, isSortable: true },
  ];
  return <GenericIssuesTable columns={columns} rows={sampleData} />;
};

export default IssueListTableScreen;
