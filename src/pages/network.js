
  // 今現時点でのわかってないこと
  // データ選択時のfilterの仕方(これは手を動かせって感じ)
  // 終わってないこと
  // データの更新（仮で書いておく）
  //めちゃくそ中庭くんの参考にさせてもらってる。感謝感激です
  // ネットワークに必要な情報自体の要素が何になるのかをなるはやで選定　
import * as d3 from "d3";
import { useEffect, useState } from "react";
import Layout from "~/components/layout"
import Network from "~/components/network"
export default function Graph(){
  return (
    <Layout>
      <Network/>
    </Layout>

  );
}