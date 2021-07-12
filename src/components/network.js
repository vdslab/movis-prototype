// 今現時点でのわかってないこと
// データ選択時のfilterの仕方(これは手を動かせって感じ)
// 終わってないこと
// データだけ更新の処理
// ネットワークに必要な情報自体の要素が何になるのかをなるはやで選定
import * as d3 from "d3";
import { useEffect, useState } from "react";
export default function Graph() {
  const [selected, setSerected] = useState([{ id: "Null" }]); //データだけ入る段階。
  const [nodes, setNodes] = useState([]); //useEffect内でselectedが更新されるごとにデータも更新していく
  const [links, setLinks] = useState([]);
  const width = 1000;
  const height = 1000;

  const nodeHighlight = (node) => {
    setSerected([...selected, node]);
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
        const data = {
          //いったん用 選択によってここを更新する処理が必要 data.を要らなくする propsにて
          nodes: [
            { id: "神木隆之介" },
            { id: "藤原竜也" },
            { id: "土屋太鳳" },
            { id: "坂口健太郎" },
            { id: "綾野剛" },
            { id: "小松菜奈" },
            { id: "佐藤健" },
            { id: "阿部寛" },
            { id: "伊勢谷友介" },
            { id: "江口洋介" },
            { id: "松岡茉優" },
            { id: "てらそままさき" },
            { id: "山田孝之" },
            { id: "武井咲" },
            { id: "森山未來" },
            { id: "黒木華" },
            { id: "田中裕子" },
            { id: "蒼井優" },
            { id: "波瑠" },
            { id: "高橋一生" },
            { id: "瀬戸康史" },
            { id: "濱田岳" },
            { id: "二階堂ふみ" },
            { id: "有村架純" },
            { id: "鈴木亮平" },
            { id: "吉川晃司" },
            { id: "香川照之" },
            { id: "遊佐浩二" },
            { id: "本郷奏多" },
            { id: "木梨憲武" },
            { id: "荒川良々" },
            { id: "鈴村健一" },
            { id: "綾瀬はるか" },
            { id: "桐谷健太" },
            { id: "中村蒼" },
            { id: "向井理" },
            { id: "関俊彦" },
            { id: "宮﨑あおい" },
            { id: "中村優一" },
            { id: "桜田通" },
            { id: "水嶋ヒロ" },
            { id: "白鳥百合子" },
          ],
          links: [
            { source: "神木隆之介", target: "小松菜奈", weight: "2" },
            { source: "神木隆之介", target: "藤原竜也", weight: "1" },
            { target: "藤原竜也", source: "土屋太鳳", weight: "1" },
            { source: "藤原竜也", target: "伊勢谷友介", weight: "3" },
            { source: "藤原竜也", target: "山田孝之", weight: "1" },
            { source: "藤原竜也", target: "香川照之", weight: "2" },
            { source: "坂口健太郎", target: "山田孝之", weight: "1" },
            { source: "坂口健太郎", target: "波瑠", weight: "1" },
            { source: "綾野剛", target: "向井理", weight: "1" },
            { target: "綾野剛", source: "小松菜奈", weight: "1" },
            { source: "小松菜奈", target: "森山未來", weight: "1" },
            { target: "藤原竜也", source: "江口洋介", weight: "2" },
            { target: "伊勢谷友介", source: "江口洋介", weight: "2" },
            { source: "江口洋介", target: "吉川晃司", weight: "1" },
            { source: "江口洋介", target: "香川照之", weight: "1" },
            { source: "山田孝之", target: "波瑠", weight: "1" },
            { target: "綾野剛", source: "山田孝之", weight: "4" },
            { target: "伊勢谷友介", source: "山田孝之", weight: "1" },
            { source: "山田孝之", target: "香川照之", weight: "1" },
            { source: "山田孝之", target: "濱田岳", weight: "1" },
            { target: "江口洋介", source: "武井咲", weight: "5" },
            { target: "藤原竜也", source: "武井咲", weight: "2" },
            { target: "伊勢谷友介", source: "武井咲", weight: "2" },
            { source: "武井咲", target: "吉川晃司", weight: "1" },
            { source: "武井咲", target: "香川照之", weight: "1" },
            { source: "黒木華", target: "高橋一生", weight: "1" },
            { target: "小松菜奈", source: "黒木華", weight: "1" },
            { target: "阿部寛", source: "黒木華", weight: "1" },
            { target: "綾野剛", source: "黒木華", weight: "2" },
            { target: "田中裕子", source: "蒼井優", weight: "1" },
            { source: "蒼井優", target: "高橋一生", weight: "2" },
            { target: "武井咲", source: "蒼井優", weight: "1" },
            { target: "江口洋介", source: "蒼井優", weight: "2" },
            { source: "蒼井優", target: "吉川晃司", weight: "1" },
            { source: "蒼井優", target: "香川照之", weight: "2" },
            { target: "森山未來", source: "蒼井優", weight: "1" },
            { target: "伊勢谷友介", source: "蒼井優", weight: "1" },
            { source: "松岡茉優", target: "田中裕子", weight: "1" },
            { source: "松岡茉優", target: "高橋一生", weight: "1" },
            { source: "二階堂ふみ", target: "有村架純", weight: "1" },
            { target: "坂口健太郎", source: "有村架純", weight: "2" },
            { target: "山田孝之", source: "有村架純", weight: "1" },
            { target: "波瑠", source: "有村架純", weight: "1" },
            { target: "神木隆之介", source: "有村架純", weight: "3" },
            { target: "藤原竜也", source: "有村架純", weight: "1" },
            { target: "松岡茉優", source: "鈴木亮平", weight: "1" },
            { target: "田中裕子", source: "鈴木亮平", weight: "1" },
            { target: "坂口健太郎", source: "鈴木亮平", weight: "1" },
            { target: "綾野剛", source: "鈴木亮平", weight: "2" },
            { source: "吉川晃司", target: "香川照之", weight: "1" },
            { source: "田中裕子", target: "香川照之", weight: "1" },
            { target: "伊勢谷友介", source: "香川照之", weight: "3" },
            { target: "山田孝之", source: "本郷奏多", weight: "1" },
            { target: "綾野剛", source: "本郷奏多", weight: "1" },
            { target: "阿部寛", source: "本郷奏多", weight: "1" },
            { target: "本郷奏多", source: "木梨憲武", weight: "1" },
            { target: "山田孝之", source: "荒川良々", weight: "1" },
            { target: "坂口健太郎", source: "綾瀬はるか", weight: "1" },
            { target: "濱田岳", source: "綾瀬はるか", weight: "1" },
            { target: "藤原竜也", source: "綾瀬はるか", weight: "1" },
            { source: "綾瀬はるか", target: "桐谷健太", weight: "1" },
            { target: "森山未來", source: "濱田岳", weight: "1" },
            { target: "綾野剛", source: "伊勢谷友介", weight: "2" },
            { target: "濱田岳", source: "宮﨑あおい", weight: "1" },
            { target: "藤原竜也", source: "宮﨑あおい", weight: "1" },
            { target: "向井理", source: "宮﨑あおい", weight: "1" },
            { target: "桐谷健太", source: "宮﨑あおい", weight: "2" },
            { target: "江口洋介", source: "宮﨑あおい", weight: "1" },
            { source: "桐谷健太", target: "中村蒼", weight: "1" },
            { source: "桐谷健太", target: "向井理", weight: "1" },
            { target: "桐谷健太", source: "水嶋ヒロ", weight: "1" },
            { target: "中村蒼", source: "水嶋ヒロ", weight: "1" },
            { target: "向井理", source: "水嶋ヒロ", weight: "1" },
            { source: "中村蒼", target: "向井理", weight: "1" },
            { target: "関俊彦", source: "桜田通", weight: "1" },
            { target: "遊佐浩二", source: "桜田通", weight: "1" },
            { target: "てらそままさき", source: "桜田通", weight: "1" },
            { source: "中村優一", target: "桜田通", weight: "1" },
            { target: "関俊彦", source: "中村優一", weight: "2" },
            { target: "遊佐浩二", source: "中村優一", weight: "2" },
            { target: "てらそままさき", source: "中村優一", weight: "2" },
            { target: "鈴村健一", source: "中村優一", weight: "1" },
            { target: "瀬戸康史", source: "中村優一", weight: "1" },
            { source: "瀬戸康史", target: "関俊彦", weight: "1" },
            { source: "瀬戸康史", target: "遊佐浩二", weight: "1" },
            { target: "てらそままさき", source: "瀬戸康史", weight: "1" },
            { target: "遊佐浩二", source: "関俊彦", weight: "2" },
            { target: "てらそままさき", source: "関俊彦", weight: "2" },
            { target: "てらそままさき", source: "遊佐浩二", weight: "2" },
            { target: "瀬戸康史", source: "鈴村健一", weight: "1" },
            { source: "鈴村健一", target: "関俊彦", weight: "1" },
            { target: "遊佐浩二", source: "鈴村健一", weight: "1" },
            { target: "てらそままさき", source: "鈴村健一", weight: "1" },
          ],
        };
        const nodes = Array();
        const links = Array();
        const select = selected.slice(-1)[0].id;
        // console.log(select);
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
            });
          } else {
            nodes.push({
              id: item.id,
              color: "silver",
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
  }, [selected]); //最初とselectedが更新された時だけこれを実行するためのEffect　選択されたらデータも更新してその都度シュミレーションを行うことにしている。ハイライトの際はいらないのでmouseOverの時だけにするとか？

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
                  fill={node.color}
                />
                <text fill="black" x={node.x + 10} y={node.y + 5}>
                  {node.id}
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
