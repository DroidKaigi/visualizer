import * as React from "react";
import Starter from "./starter";
import SlideShow from "./slideshow";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Starter />
        <SlideShow items={slideshowItems}/>
        <div className="left-decoration">
          <img src="./logo-pie-twohead-colored.png" />
        </div>
        <div className="right-decoration">
          <img src="./logo-pie-colored.png" />
        </div>
      </div>
    )
  }
}

const slideshowItems = [
  {
    // t: "Wi-Fi",
    t_i: "zmdi-wifi-alt",
    d: <div>
      <em>SSID: DroidKaigi2019</em>
      <em>PASS: thankyou-iridge</em>
      <div style={{marginTop: "50px", fontSize: "45pt"}}>
        Wi-Fi available on the 5th floor only<br/>
        ホールにWi-Fiありません<br/>ごめんなさい！
      </div>
    </div>
  },
  {
    t: <span># <img src="./droidkaigi-hash.png"
                    style={{height: "70px", position: "relative", top: "12px"}}/></span>,
    t_i: "zmdi-twitter",
    d: <table className="hashtag">
      <tbody>
      <tr>
        <td>#hallA</td>
        <td>#hallB</td>
        <td>#room1</td>
      </tr>
      <tr>
        <td>#room2</td>
        <td>#room3</td>
        <td>#room4</td>
      </tr>
      <tr>
        <td>#room5</td>
        <td>#room6</td>
        <td>#room7</td>
      </tr>
      </tbody>
    </table>
  },
  {
    t_i: <img src="./badge.jpg" style={{width: "300px"}}/>,
    d: <div>
      <p>Please wear your badge inside the venue</p>
      <p style={{marginTop: "40px"}}>
        会場内では名札を<br/>常に着用してください
      </p>
    </div>
  },
  {
    t_i: "zmdi-flash-off",
    d: <div>
      <p>
        Avoid using flash and shutter sounds when taking photos during sessions
      </p>
      <p style={{marginTop: "20pt"}}>
        セッション中の写真撮影では<br/>フラッシュやシャッター音は<br/>お控えください
      </p>
    </div>
  },
  {
    t_i: "zmdi-translate",
    d: <div>
      <p>
        Sessions with simultaneous interpretation will be in Room 3.
      </p>
      <p>
        Room 3ではセッションの同時通訳が実施されています！
      </p>
    </div>
  },
  {
    t_i: "zmdi-block",
    d: <div>
      <p>
        Do not take translation receivers outside of the session room.
      </p>
      <p>
        ルーム外への同時通訳レシーバーの持ち出しはご遠慮ください
      </p>
    </div>
  },
  {
    t:"Priority Seats",
    t_i: "zmdi-face",
    d: <div>
      <p>
        Priority seats are available in session room.
      </p>
      <p>
        セッションルームには優先席がございます。
      </p>
    </div>
  },
  {
    t:"Priority Seats",
    t_i: "zmdi-face",
    d: <div>
      <p>
        If priority seats are empty please use them. Please vacate them if necessary.
      </p>
      <p>
        優先席は空いていればどなたでもご利用いただけます。譲り合ってご利用ください。
      </p>
    </div>
  },
  {
    t_i: "zmdi-local-dining",
    d: <div>
      <p>
        No eating or drinking allowed in the lobby or corridors
      </p>
      <p style={{marginTop: "20pt"}}>
        ロビーと廊下での飲食は<br/>ご遠慮ください<br/>(ルームの中ならOK!)
      </p>
    </div>
  },
  {
    t: "Exhibition Room",
    t_i: "zmdi-drink",
    d: <div>
      <p>
        Free coffee, drinks and snacks are available! Also check out Sponsor booths!
      </p>
      <p style={{marginTop: "10pt"}}>
        飲み物、珈琲、お菓子あります<br/>
        スポンサーブースにもお立ち寄りを
      </p>
    </div>
  },
  {
    t_i: "zmdi-videocam",
    d: <div>
      <p>
        Session recordings will be available online later.
      </p>
      <p style={{marginTop: "20pt"}}>
        全セッション動画を<br/>後日公開予定です。
      </p>
    </div>
  },
  {
    t: "Canceled sessions",
    t_i: "zmdi-alert-circle-o",
    d: <div>
      [Day 1 11:20-11:50]<br/>
      "What is Navigation Architecture Component and Tips"
    </div>
  },
  {
    t: "Canceled sessions",
    t_i: "zmdi-alert-circle-o",
    d: <div>
      [Day 1 15:40-16:10]<br/>
      "ちゃんとつくる Google Assistant アプリ"
    </div>
  },
  {
    t: "Room changed",
    t_i: "zmdi-swap",
    d: <div>
      [Day 1 15:40-16:10]<br/>
      "Androidエンジニアが抑えておくべきUnicode Emojiの知識"<br/>
      Room 4 → <strong>Room 1</strong>
    </div>
  }
];
