import React from "react";
import Visualizer from "./visualizer"
import SlideShow from "./slideshow";

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Visualizer style={{width: "500px", height: "500px"}}/>
        <SlideShow items={slideshowItems}/>
        <div className="header-decoration">
          <img src="./droid-twohead.png"/>
        </div>
        <div className="footer-decoration">
          <img src="./cocoa-biscuit.png"/>
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
      <em>SSID: Droid-picapp</em>
      <em>PASS: hellopicapp</em>
      <span style={{marginTop: "100px", fontSize: "45pt"}}>
        Unavailable at Hall, sorry<br/>
        ホールにWi-Fiありません。ごめんなさい！
      </span>
    </div>
  },
  {
    t: "#DroidKaigi",
    t_i: "fa-twitter no-shadow",
    d: <table className="hashtag">
      <tbody>
      <tr>
        <td>#droidkaigi_hall</td>
        <td>#droidkaigi_room4</td>
      </tr>
      <tr>
        <td>#droidkaigi_room1</td>
        <td>#droidkaigi_room5</td>
      </tr>
      <tr>
        <td>#droidkaigi_room2</td>
        <td>#droidkaigi_room6</td>
      </tr>
      <tr>
        <td>#droidkaigi_room3</td>
        <td>#droidkaigi_room7</td>
      </tr>
      </tbody>
    </table>
  },
  {
    t_i: <img src="./badge.jpg" style={{width: "300px"}}/>,
    d: <div>
      <p>Always wear your badge in the venue.</p>
      <p>会場内では名札を<br />常に着用してください</p>
    </div>
  },
  {
    // t: "No Flash and Shutter Sound",
    t_i: "zmdi-flash-off",
    d: <div>
      <p>Avoid flash and shutter sound when you taking pictures during the sessions.</p>
      <p>セッション中の写真撮影はフラッシュやシャッター音はご遠慮ください。</p>
    </div>
  },
  {
    // t: "",
    t_i: "zmdi-local-dining",
    d: <div>
      <p>No eating and drinking allowed in the lobby and corridors.</p>
      <p>ロビーと廊下での飲食はご遠慮ください</p>
    </div>
  },
  {
    t: "Session Recordings",
    t_i: <i className="zmdi zmdi-videocam"/>,
    d: <div>
      <p>All session recordings will be available online later.</p>
      <p>全セッション動画を<br/>後日公開予定です。</p>
    </div>
  }
];