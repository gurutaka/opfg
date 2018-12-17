import data from "../../data/oppaiData.js";

export class OpfModel {
  constructor(props) {
    this.datainit = Object.assign({}, data);
    this.data = data;
  }

  initFloatActBtn(elem) {
    var instances = M.FloatingActionButton.init(elem, {
      hoverEnabled: false
    });
  }
  setOppaiCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
  }

  setWidthHeight(container) {
    this.width = container.clientWidth * this.data.ctx_scale;
    this.height = this.width;
  }

  setScaleSpan() {
    this.datainit.scale_span = this.width / 4.5;
    this.data.scale_span = this.width / 4.5;
  }

  setCenterCoordinate() {
    this.center = {
      x: this.width / 2,
      y: this.height / 2
    };
  }

  deelCtxHighReso() {
    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    this.canvas.style.width = this.width + "px";
    this.canvas.style.height = this.height + "px";
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawAxis() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(255,255,255,0.4)";
    this.ctx.lineWidth = 1;
    //x軸
    this.ctx.moveTo(0, this.center.y);
    this.ctx.lineTo(this.width, this.center.y);
    //y軸
    this.ctx.moveTo(this.center.x, 0);
    this.ctx.lineTo(this.center.x, this.height);
    this.ctx.stroke();
  }

  drawCenter() {
    this.ctx.beginPath();
    this.ctx.arc(this.center.x, this.center.y, 1, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgba(255,255,255,0.6)";
    this.ctx.fill();
  }

  drawXaxisScale() {
    this.ctx.beginPath();
    this.ctx.save();
    this.ctx.translate(this.center.x, this.center.y);
    this.ctx.strokeStyle = "rgba(255,255,255,0.4)";
    this.ctx.lineWidth = 0.7;

    for (let i = 0; i < this.center.x; i += this.data.scale_span) {
      if (i != 0) {
        let cnt = i / this.data.scale_span;
        this.ctx.moveTo(i, -this.data.scale_len);
        this.ctx.lineTo(i, this.data.scale_len);
        this.ctx.moveTo(-cnt * this.data.scale_span, -this.data.scale_len);
        this.ctx.lineTo(-cnt * this.data.scale_span, this.data.scale_len);
        this.ctx.stroke();
      }
    }
    this.ctx.restore();
  }

  drawYaxisScale() {
    this.ctx.beginPath();
    this.ctx.save();
    this.ctx.translate(this.center.x, this.center.y);
    this.ctx.strokeStyle = "rgba(255,255,255,0.4)";
    this.ctx.lineWidth = 0.7;

    for (let i = 0; i < this.center.y; i += this.data.scale_span) {
      if (i != 0) {
        let cnt = i / this.data.scale_span;
        this.ctx.moveTo(-this.data.scale_len, i);
        this.ctx.lineTo(this.data.scale_len, i);
        this.ctx.moveTo(-this.data.scale_len, -cnt * this.data.scale_span);
        this.ctx.lineTo(this.data.scale_len, -cnt * this.data.scale_span);
        this.ctx.stroke();
      }
    }
    this.ctx.restore();
  }

  getCtxMaxYaxis() {
    return -this.center.y / this.data.scale_span;
  }

  getCtxMinYaxis() {
    return this.center.y / this.data.scale_span;
  }

  //接点のy座標
  getTangentYaxis() {
    return this.data.h_size / 2 - this.data.h_size / Math.exp(1);
  }

  drawTrajectory(x, y) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(this.center.x, this.center.y);
    this.ctx.arc(
      x * this.data.scale_span,
      y * this.data.scale_span,
      1,
      0,
      2 * Math.PI
    );
    this.ctx.fillStyle = "rgba(255,255,255,0.6)";
    this.ctx.fill();
    this.ctx.restore();
  }

  //ちくび関数
  ckb_x(y) {
    let contactYaxis = this.getTangentYaxis();
    return (
      this.data.ckb_w_size *
      Math.exp(-1 * 4 * Math.pow(this.data.ckb_h_size * (y - contactYaxis), 4))
    );
  }

  //胸の関数
  breast_x(y) {
    return (
      this.data.w_size *
      (y - this.data.h_size / 2) *
      Math.log(((y - this.data.h_size / 2) * -1) / this.data.h_size)
    );
  }

  //下半身の関数
  lowBody_x(y) {
    return (
      -this.data.body_l_w /
      (1 + Math.exp(-1 * this.data.body_l_slope * (y - this.data.h_size / 2)))
    );
  }

  //上半身とおっぱいの接続：シグモイド関数
  connectHighBody(y) {
    return (
      1 /
      (1 + Math.exp(-1 * this.data.body_h_slope * (y + this.data.h_size / 2)))
    );
  }

  //おっぱい関数
  opf_x(y) {
    let oppai = this.breast_x(y) + this.ckb_x(y) + this.lowBody_x(y);
    return oppai * this.connectHighBody(y);
  }

  drawOppai() {
    this.drawBreast();
    this.drawLowBody();
  }

  drawBreast() {
    let max_height = this.getCtxMaxYaxis();
    for (let y = this.data.h_size / 2; y >= max_height; y -= 0.005) {
      let all_opi_x = this.opf_x(y);
      this.drawTrajectory(all_opi_x, y);
    }
  }

  drawLowBody() {
    let min_height = this.getCtxMinYaxis();
    for (let y = this.data.h_size / 2; y <= min_height; y += 0.01) {
      let x = this.lowBody_x(y) * this.connectHighBody(y);
      this.drawTrajectory(x, y);
    }
  }

  getCanvasDLUrl(blob) {
    let url = window.URL || window.webkitURL;
    return url.createObjectURL(blob);
  }

  getCanvasDataBase64(canvas, type) {
    return canvas.toDataURL(type);
  }

  // Base64データをBlobデータに変換
  async changeBase64toBlob(base64) {
    // カンマで分割して以下のようにデータを分ける
    // tmp[0] : データ形式（data:image/png;base64）
    // tmp[1] : base64データ（iVBORw0k～）
    let tmp = base64.split(",");
    // base64データの文字列をデコード
    let data = atob(tmp[1]);
    // tmp[0]の文字列（data:image/png;base64）からコンテンツタイプ（image/png）部分を取得
    let mime = tmp[0].split(":")[1].split(";")[0];
    //  1文字ごとにUTF-16コードを表す 0から65535 の整数を取得
    let buf = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      buf[i] = data.charCodeAt(i);
    }
    // blobデータを作成
    let blob = new Blob([buf], { type: mime });
    return blob;
  }

  changehtmlTobase64(element) {
    return html2canvas(element).then(canvas => {
      let base64 = this.getCanvasDataBase64(canvas, "image/png");
      return base64;
    });
  }

  changeOppaiHeight(value) {
    this.data.h_size = value;
  }

  changeOppaiWidth(value) {
    this.data.w_size = value;
  }

  changeChikubiHeight(value) {
    this.data.ckb_h_size = value;
  }

  changeChikubiWidth(value) {
    this.data.ckb_w_size = value;
  }

  changeLowBodySlope(value) {
    this.data.body_l_slope = value;
  }

  changeHighBodySlope(value) {
    this.data.body_h_slope = value;
  }
}

export default OpfModel;

//メモ
//午後：上半身の接続部、下半身の滑らかさok
//数式が表示されるようにする：よる
//レスポンシブ対応
//画像の取得
