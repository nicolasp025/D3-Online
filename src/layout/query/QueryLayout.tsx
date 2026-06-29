import { TabDisplayer } from "../../components/tab-displayer/TabDisplayer";
import "../../models/queries/index";
import "./QueryLayout.css";
import { useQuery } from "../../hooks/useQuery";
import Switcher from "../../components/switcher/Switcher";
import { useState } from "react";

const QueryLayout = () => {
  const { queries, addQuery } = useQuery();

  const [_selectedItem, setSelectedItem] = useState<string>("testtest3");

  return (
    <div className="query-layout">
      <div className="query-container container">
        <TabDisplayer
          tabs={queries.map((query, index) => {
            return {
              id: index,
              title: query.name,
              content: (
                <>
                  <div className="query-rows">
                    <div className="query-row">
                      <span>What are you investigating ?</span>
                      <Switcher
                        items={["Source code", "Execution behavior"]}
                        onChange={(item) => {
                          setSelectedItem(item);
                        }}
                        renderLabel={(item) => item}
                      />
                    </div>
                  </div>
                </>
              ),
            };
          })}
          onAddTab={addQuery}
        ></TabDisplayer>
      </div>
    </div>
  );
};

export default QueryLayout;
