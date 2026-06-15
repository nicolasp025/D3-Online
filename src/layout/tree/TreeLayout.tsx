import "./TreeLayout.css";
import DivergenceTree from "../../components/divergence-tree/DivergenceTree";
import { TREE_CONFIG } from "../../config/tree-config";
import DownArrow from "../../assets/icons/arrow_down.svg?react";
import { useState } from "react";

const TreeLayout = () => {
  const [showLegend, setShowLegend] = useState<boolean>(true);

  return (
    <div className="tree-layout">
      <DivergenceTree />
      <div className="legend">
        {showLegend && (
          <dl className="legend-items">
            <div className="legend-item">
              <dt className="legend-color state-div">
                <svg>
                  <circle
                    className="state-div"
                    r={TREE_CONFIG.DOT_RADIUS}
                    cx={10}
                    cy={10}
                  />
                </svg>
              </dt>
              <dd className="legend-label">State divergence</dd>
            </div>
            <div className="legend-item">
              <dt className="legend-color">
                <svg>
                  <circle
                    className="flow-div"
                    r={TREE_CONFIG.DOT_RADIUS}
                    cx={10}
                    cy={10}
                  />
                </svg>
              </dt>
              <dd className="legend-label">Flow divergence</dd>
            </div>
            <div className="legend-item">
              <dt>
                <svg className="legend-color">
                  <line x1={0} y1={12} x2={20} y2={12} strokeWidth={3} />
                </svg>
              </dt>
              <dd className="legend-label">Divergence / convergence</dd>
            </div>
          </dl>
        )}
        <div className="legend-actions">
          <button
            onClick={() => {
              setShowLegend(!showLegend);
            }}
          >
            <DownArrow />
          </button>
        </div>
      </div>
    </div>
  );
};
export default TreeLayout;
