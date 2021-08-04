import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";

function ZoomableSVG({ width, height, children }) {
  const svgRef = useRef();
  const [k, setK] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    const zoom = d3.zoom().on("zoom", (event) => {
      const { x, y, k } = event.transform;
      setK(k);
      setX(x);
      setY(y);
    });
    d3.select(svgRef.current).call(zoom);
  }, []);
  return (
    <svg
      ref={svgRef}
      className="graph"
      width={width}
      height={height}
      // viewBox={`0 0 ${width} ${height}`}
    >
      <g transform={`translate(${x},${y})scale(${k})`}>{children}</g>
    </svg>
  );
}

export default function Graph({
  initialNetwork,
  selected,
  handleSelect,
  width,
  height,
}) {
  const [nodes, setNodes] = useState([]); //useEffect内でselectedが更新されるごとにデータも更新していく
  const [links, setLinks] = useState([]);
  const [highlightnode, sethighlightNode] = useState({}); //これをアクターの方で実装して、赤と黒をまとめた配列をあくたーから持ってくればいいのかな？
  const [highlightlist, sethighlightList] = useState([]);
  // 添え字sourceとtargetのhighlight=Trueとか入れたりするといいかも？　setNodes.slice
  // const halfwidth = 600;
  //これは自分に合わせた大きさ
  // const width = window.innerWidth * 0.46;
  // const height = window.innerHeight;
  const borderWeight = 1;
  const svgSize = Math.min(width, height) - borderWeight * 2;

  //   window.innerWidth < halfwidth
  //     ? window.innerWidth * 0.9
  // window.innerWidth * 0.46;

  //ここら辺は変更に合わせてるやつ
  // const wrapperRef = useRef();
  // const [size, setSize] = useState({ width: 0, height: 0 }); //初期値の値でシミュレーションし終わった後にwindowのはばを取ってるからグラフが真ん中に来ないのとheightの値が更新されてレンダリングされている理由がわからない。
  // const { width_, height_ } = size;
  // console.log(width, height);
  // いまはheightの値をwindowの高さにして、widthは間によって変えています。

  //ここはnodeをクリックしたときようのやつだが今はもうつかっていない
  // const nodeHighlight = (node) => {
  //   const nodeId = node.id;
  //   setSelected((prev) => {
  //     const index = prev.indexOf(nodeId);
  //     const selectedNodeIds = [...prev];
  //     if (index < 0) {
  //       selectedNodeIds.push(nodeId);
  //     } else {
  //       selectedNodeIds.splice(index, 1);
  //     }
  //     return selectedNodeIds;
  //   });

  //   // console.log(selected);
  //   // const selectdepthnode_1 = [];
  //   // for (const item of links.id) {
  //   //   if (selected.id === item.source) {
  //   //     selectdepthnode_1.push(item.target);
  //   //   // }
  //   //   if (selected.id === item.target) {
  //   //     selectdepthnode_1.push(item.source);
  //   //   }
  //   // }
  //   // setHighlightnode(selectdepthnode_1);
  //   // const selectdepthlink_1 = [];
  //   // for (const item of links.id) {
  //   //   if (selected.id === item.source || selected.id === item.target) {
  //   //     links.push({
  //   //       source: item.source,
  //   //       target: item.target,
  //   //       color: "black",
  //   //     });
  //   //   } else {
  //   //     links.push({
  //   //       source: item.source,
  //   //       target: item.target,
  //   //       color: "silver",
  //   //     });
  //   //   }
  //   // }
  // };

  // ここでネットワークの描画範囲をとっている。
  // useEffect(() => {
  //   const observer = new ResizeObserver((entries) => {
  //     if (wrapperRef.current) {
  //       console.log(wrapperRef);
  //       const { clientWidth, clientHeight } = wrapperRef.current;
  //       setSize({ width: clientWidth, height: clientHeight });
  //     }
  //   });
  //   observer.observe(wrapperRef.current);
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

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
            .distance((d) => 10)
            .id((d) => d.id)
        )
        // .force("center", d3.forceCenter(width / 2, height / 2))
        .force("center", d3.forceCenter(svgSize / 2, svgSize / 2))
        .force("charge", d3.forceManyBody().strength(-1000)) //縮小していいかどうか全体を描画してから縮小一番上のノードと一番下のノードの高さ（横も叱り）の絶対値から全体の描画の大きさがわかる
        .force(
          "x",
          d3
            .forceX()
            .x(svgSize / 2)
            .strength(0.9)
        )
        .force(
          "y",
          d3
            .forceY()
            .y(svgSize / 2)
            .strength(0.9)
        );

      simulation.nodes(nodes);
      simulation.force("link").links(links);
      simulation.tick(500).stop();
      setNodes(nodes.slice()); //何で必要か？？
      setLinks(links.slice());
    };
    const startLineChart = async () => {
      const [nodes, links] = await (async () => {
        const data = initialNetwork;

        const nodes = Array();
        const links = Array();
        let highlightnodes = {};
        for (const item of data.nodes) {
          highlightnodes[`${item.id}`] = [];
        }

        for (const item of data.links) {
          highlightnodes[`${item.source}`].push(item.target);
          highlightnodes[`${item.target}`].push(item.source);
        }
        sethighlightNode(highlightnodes);

        const r = 10;

        for (const item of data.nodes) {
          nodes.push({
            id: item.id,
            name: item.name,
            r,
          });
        }
        for (const item of data.links) {
          links.push({
            source: item.source,
            target: item.target,
            weight: item.weight,
            r,
          });
        }
        return [nodes, links];
      })();
      firstSimuration(nodes, links);
    };

    startLineChart();
  }, []); //最初とselectedが更新された時だけこれを実行するためのEffect　選択されたらデータも更新してその都度シュミレーションを行うことにしている。ハイライトの際はいらないのでmouseOverの時だけにするとか？

  useEffect(() => {
    const highlightlist_ = Array();
    if (selected.length !== 0) {
      nodes.map((node, i) => {
        if (
          selected.every((select, i) => {
            return highlightnode[`${select}`].includes(node.id);
          })
        ) {
          highlightlist_.push(node.id);
        }
      });
    }
    links.map((link, i) => {
      if (
        selected.includes(link.target.id) &&
        selected.includes(link.source.id)
      ) {
        link.highlight = "black";
      } else if (
        (selected.includes(link.target.id) ||
          selected.includes(link.source.id)) &&
        (highlightlist_.includes(link.target.id) ||
          highlightlist_.includes(link.source.id))
      ) {
        link.highlight = "red";
      } else {
        link.highlight = "silver";
      }
    });
    sethighlightList(highlightlist_.slice());
  }, [selected, nodes, links]);
  return (
    // <div ref={wrapperRef} width="100" height="100">
    <div
      style={{
        border: `${borderWeight}px solid gray`,
        width: Math.min(width, height),
        height: Math.min(width, height),
      }}
    >
      <ZoomableSVG width={svgSize} height={svgSize}>
        {/* <ZoomableSVG width={width} height={height}> */}
        <g>
          <g>
            {links.map((link, i) => {
              const target = link.target.id;
              const source = link.source.id;
              return (
                <g key={i}>
                  <line
                    x1={link.target.x}
                    y1={link.target.y}
                    x2={link.source.x}
                    y2={link.source.y}
                    strokeWidth="1"
                    stroke={link.highlight}
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
                    onClick={() => handleSelect(node)}
                    fill={
                      selected.includes(node.id)
                        ? "black"
                        : selected.length === 0
                        ? "silver"
                        : selected.every((select, i) => {
                            return highlightnode[`${select}`].includes(node.id);
                          })
                        ? "red"
                        : "silver"
                    } //ここをどう変えるか
                    style={{ stroke: "black", strokeWidth: "1.0px" }}
                    // highlightnode.includes(node.id) ? "black" : "silver"
                  />

                  <text
                    className="kanekyo"
                    // fill="black"
                    x={node.x + 12}
                    y={node.y + 5}
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </ZoomableSVG>
    </div>
  );
}
// [...ssa]フーガが言ってた奴のはず */}
//* <image  x={node.x} y={node.y}  width="50" height="50" onClick={()=> setSerected([...selected, node])}></image> */}
