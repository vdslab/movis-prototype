// 今現時点でのわかってないこと
// データ選択時のfilterの仕方(これは手を動かせって感じ)
// 終わってないこと
// データだけ更新の処理
// ネットワークに必要な情報自体の要素が何になるのかをなるはやで選定
import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";
export default function Graph({ initialNetwork, selected, handleSelect }) {
  const [highlightnode, setHighlightnode] = useState([]);
  const [highlightlink, setHighlightlink] = useState([]);
  const [nodes, setNodes] = useState([]); //useEffect内でselectedが更新されるごとにデータも更新していく
  const [links, setLinks] = useState([]);
  // const width =
  //   window.innerWidth < halfwidth
  //     ? window.innerWidth * 0.9
  //     : window.innerWidth * 0.46;
  // const height = window.innerHeight;

  const wrapperRef = useRef();
  const [size, setSize] = useState({ width: 0, height: 0 }); //初期値の値でシミュレーションし終わった後にwindowのはばを取ってるからグラフが真ん中に来ないのとheightの値が更新されてレンダリングされている理由がわからない。
  const { width, height } = size;
  console.log(width, height);

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
    const observer = new ResizeObserver((entries) => {
      if (wrapperRef.current) {
        const { clientWidth, clientHeight } = wrapperRef.current;
        setSize({ width: clientWidth, height: clientHeight });
      }
    });
    observer.observe(wrapperRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

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
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("charge", d3.forceManyBody().strength(-1000)) //縮小していいかどうか全体を描画してから縮小一番上のノードと一番下のノードの高さ（横も叱り）の絶対値から全体の描画の大きさがわかる
        .force(
          "x",
          d3
            .forceX()
            .x(width / 2)
            .strength(0.9)
        )
        .force(
          "y",
          d3
            .forceY()
            .y(height / 2)
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
            r,
          });
        }
        return [nodes, links];
      })();
      firstSimuration(nodes, links);
    };

    startLineChart();
  }, []); //最初とselectedが更新された時だけこれを実行するためのEffect　選択されたらデータも更新してその都度シュミレーションを行うことにしている。ハイライトの際はいらないのでmouseOverの時だけにするとか？

  return (
    <div ref={wrapperRef}>
      <svg
        className="graph"
        width={`${width}`}
        height={`${height}`}
        viewBox={`0 0 ${width} ${height}`}
      >
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
                    stroke={"silver"}
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
    </div>
  );
}
// [...ssa]フーガが言ってた奴のはず */}
//* <image  x={node.x} y={node.y}  width="50" height="50" onClick={()=> setSerected([...selected, node])}></image> */}
