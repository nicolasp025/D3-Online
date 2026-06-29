import { TabDisplayer } from "../../components/tab-displayer/TabDisplayer";
import { useInspector } from "../../hooks/useInspector";
import "../../models/queries/index";
import "./QueryLayout.css";
import { useQuery } from "../../hooks/useQuery";

const QueryLayout = () => {
  const { openInspectorOn } = useInspector();

  const { queries, addQuery } = useQuery();

  return (
      <div className="query-layout">
        <div className="query-container container">
          <TabDisplayer
            tabs={queries.map((query, index) => {
              return {
                id: index,
                title: query.name,
                content: <>{query.description}</>,
              };
            })}
            onAddTab={addQuery}
          ></TabDisplayer>
        </div>
      </div>
  );
};

export default QueryLayout;
