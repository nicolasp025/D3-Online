import "./TreeLayout.css";
import DivergenceTree from "../../components/divergence-tree/DivergenceTree";
import { TREE_CONFIG } from "../../components/divergence-tree/tree-config";

const TreeLayout = () => {
  return (
    <div className="tree-layout">
      <DivergenceTree />
      <dl className="legend">
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
    </div>
  );
};
export default TreeLayout;
