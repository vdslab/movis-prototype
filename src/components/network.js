// 今現時点でのわかってないこと
// データ選択時のfilterの仕方(これは手を動かせって感じ)
// 終わってないこと
// データだけ更新の処理
// ネットワークに必要な情報自体の要素が何になるのかをなるはやで選定
import * as d3 from "d3";
import { useEffect, useState } from "react";
export default function Graph() {
  const [selected, setSelected] = useState([]); //データだけ入る段階。
  const [highlightnode, setHighlightnode] = useState([]);
  const [highlightlink, setHighlightlink] = useState([]);
  const [nodes, setNodes] = useState([]); //useEffect内でselectedが更新されるごとにデータも更新していく
  const [links, setLinks] = useState([]);
  const width = 1000;
  const height = 1000;

  const nodeHighlight = (node) => {
    const nodeId = node.id;
    setSelected((prev) => {
      const index = prev.indexOf(nodeId);
      const selectedNodeIds = [...prev];
      if (index < 0) {
        selectedNodeIds.push(nodeId);
      } else {
        selectedNodeIds.splice(index, 1);
      }
      return selectedNodeIds;
    });
    // console.log(selected);
    // const selectdepthnode_1 = [];
    // for (const item of links.id) {
    //   if (selected.id === item.source) {
    //     selectdepthnode_1.push(item.target);
    //   // }
    //   if (selected.id === item.target) {
    //     selectdepthnode_1.push(item.source);
    //   }
    // }
    // setHighlightnode(selectdepthnode_1);
    // const selectdepthlink_1 = [];
    // for (const item of links.id) {
    //   if (selected.id === item.source || selected.id === item.target) {
    //     links.push({
    //       source: item.source,
    //       target: item.target,
    //       color: "black",
    //     });
    //   } else {
    //     links.push({
    //       source: item.source,
    //       target: item.target,
    //       color: "silver",
    //     });
    //   }
    // }
  };

  useEffect(() => {
    const firstSimuration = (nodes, links) => {
      //ここ参照https://wizardace.com/d3-forcesimulation-onlynode/
      //やっぱここの値おおきくしないとまとまんねえ
      const simulation = d3
        .forceSimulation() //ここで引力とかの設定を行う
        .force(
          "collide",
          d3
            .forceCollide()
            .radius(function (d) {
              return d.r;
            })
            .iterations(10)
        )
        .force(
          "link",
          d3
            .forceLink()
            .distance((d) => 30)
            .id((d) => d.id)
        )
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("charge", d3.forceManyBody().strength(-300))
        .force(
          "x",
          d3
            .forceX()
            .x(width / 2)
            .strength(0.05)
        )
        .force(
          "y",
          d3
            .forceY()
            .y(height / 2)
            .strength(0.05)
        );
      simulation.nodes(nodes).on("tick", ticked);
      simulation.force("link").links(links);

      function ticked() {
        setNodes(nodes.slice()); //何で必要か？？
        setLinks(links.slice());
      }
    };
    const startLineChart = async () => {
      const [nodes, links] = await (async () => {
       
        const data = initialNetwork;
        const nodes = Array();
        const links = Array();
        const select = selected.id;
        console.log(select);
        const selectdepth_1 = [select];
        for (const item of data.links) {
          if (select === item.source) {
            selectdepth_1.push(item.target);
          }
          if (select === item.target) {
            selectdepth_1.push(item.source);
          }
        }

        for (const item of data.nodes) {
          if (selectdepth_1.includes(item.id)) {
            nodes.push({
              id: item.id,
              color: "black",
              name: item.name,
            });
          } else {
            nodes.push({
              id: item.id,
              color: "silver",
              name: item.name,
            });
          }
        }
        for (const item of data.links) {
          if (select === item.source || select === item.target) {
            links.push({
              source: item.source,
              target: item.target,
              color: "black",
            });
          } else {
            links.push({
              source: item.source,
              target: item.target,
              color: "silver",
            });
          }
        }
        return [nodes, links];
      })();
      firstSimuration(nodes, links);
    };

    startLineChart();
  }, []); //最初とselectedが更新された時だけこれを実行するためのEffect　選択されたらデータも更新してその都度シュミレーションを行うことにしている。ハイライトの際はいらないのでmouseOverの時だけにするとか？

  return (
    <svg className="graph" width="1000" height="1000">
      <g>
        <g>
          {links.map((link, i) => {
            return (
              <g key={i}>
                <line
                  x1={link.target.x}
                  y1={link.target.y}
                  x2={link.source.x}
                  y2={link.source.y}
                  strokeWidth="1"
                  stroke={link.color}
                />
              </g>
            );
          })}
        </g>
        <g>
          {nodes.map((node, i) => {
            return (
              <g key={i}>
                <circle
                  r="10"
                  cx={node.x}
                  cy={node.y}
                  onClick={() => nodeHighlight(node)}
                  fill={selected.includes(node.id) ? "black" : "silver"}
                  // highlightnode.includes(node.id) ? "black" : "silver"
                />
                <text fill="black" x={node.x + 10} y={node.y + 5}>
                  {node.name}
                </text>
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
}
// [...ssa]フーガが言ってた奴のはず */}
//* <image  x={node.x} y={node.y}  width="50" height="50" onClick={()=> setSerected([...selected, node])}></image> */}
