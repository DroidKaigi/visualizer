import React from "react";
import Starter from "./starter";
import SlideShow from "./slideshow";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Starter />
        <SlideShow items={slideshowItems}/>
        <div className="header-decoration">
          <img src="./logo-pie-twohead.png" width="1000"/>
        </div>
        <div className="footer-decoration">
          <img src="./logo-pie.png" width="1000"/>
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
        Avoid using flash and shutter sound when taking pictures during the session
      </p>
      <p style={{marginTop: "20pt"}}>
        セッション中の写真撮影では<br/>フラッシュやシャッター音は<br/>お控えください
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
    t: "Room changed",
    t_i: "zmdi-swap",
    d: <div>
      [Day 1 12:50-13:40]<br/>
      "今から始めるAndroidアプリ開発"<br />
      Room 7 → <strong>Room 2</strong>
    </div>
  }
];
