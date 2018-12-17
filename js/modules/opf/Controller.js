import OpfView from "./View.js";
import OpfModel from "./Model.js";

export class OpfController {
  constructor(props) {
    this.om = new OpfModel();
    this.bindmthod();
    this.init();
  }

  bindmthod() {
    this.changeOppaiHeight = this.changeOppaiHeight.bind(this);
    this.changeOppaiWidth = this.changeOppaiWidth.bind(this);
    this.changeChikubiHeight = this.changeChikubiHeight.bind(this);
    this.changeChikubiWidth = this.changeChikubiWidth.bind(this);
    this.changeHighBodySlope = this.changeHighBodySlope.bind(this);
    this.changeLowBodySlope = this.changeLowBodySlope.bind(this);
    this.resetOpiParameter = this.resetOpiParameter.bind(this);
    this.drawOppai = this.drawOppai.bind(this);
    this.downloadOpf = this.downloadOpf.bind(this);
  }

  init() {
    this.ov = new OpfView({
      onOppaiHeightCallBack: this.changeOppaiHeight,
      onOppaiWidthCallBack: this.changeOppaiWidth,
      onChikubiHeightCallBack: this.changeChikubiHeight,
      onChikubiWidthCallBack: this.changeChikubiWidth,
      onHighBodyCallBack: this.changeHighBodySlope,
      onLowBodyCallBack: this.changeLowBodySlope,
      onResetCallBack: this.resetOpiParameter,
      onDownLoadCallBack: this.downloadOpf
    });

    this.ov.renderOpf(
      this.om.data.ckb_w_size,
      this.om.data.ckb_h_size,
      this.om.data.w_size,
      this.om.data.h_size,
      this.om.data.h_size / 2,
      this.om.data.body_h_slope,
      this.om.data.body_l_slope,
      this.om.data.body_l_w
    );
    this.initFloatActBtn();
    this.setCanvas();
    this.updateOppai();
  }

  initFloatActBtn() {
    this.om.initFloatActBtn(this.ov.wrapperSns);
  }

  setCanvas() {
    this.om.setOppaiCanvas(this.ov.oppaiCanvas);
    this.om.setWidthHeight(this.ov.oppaiContaner);
    this.om.setScaleSpan();
    this.om.setCenterCoordinate();
    this.om.deelCtxHighReso();
  }

  drawGraphCoordinates() {
    this.om.drawAxis();
    this.om.drawCenter();
    this.om.drawXaxisScale();
    this.om.drawYaxisScale();
  }

  drawOppai() {
    this.om.clearCanvas();
    this.drawGraphCoordinates();
    this.om.drawOppai();
  }

  updateOppai() {
    setInterval(this.drawOppai, 10);
  }

  changeOppaiHeight(value) {
    this.om.changeOppaiHeight(value);
    this.ov.renderOpf(
      this.om.data.ckb_w_size,
      this.om.data.ckb_h_size,
      this.om.data.w_size,
      this.om.data.h_size,
      this.om.data.h_size / 2,
      this.om.data.body_h_slope,
      this.om.data.body_l_slope,
      this.om.data.body_l_w
    );
  }

  changeOppaiWidth(value) {
    this.om.changeOppaiWidth(value);
    this.ov.renderOpf(
      this.om.data.ckb_w_size,
      this.om.data.ckb_h_size,
      this.om.data.ckb_h_size,
      this.om.data.w_size,
      this.om.data.h_size,
      this.om.data.h_size / 2,
      this.om.data.body_h_slope,
      this.om.data.body_l_slope,
      this.om.data.body_l_w
    );
  }

  changeChikubiHeight(value) {
    this.om.changeChikubiHeight(value);
    this.ov.renderOpf(
      this.om.data.ckb_w_size,
      this.om.data.ckb_h_size,
      this.om.data.ckb_h_size,
      this.om.data.w_size,
      this.om.data.h_size,
      this.om.data.h_size / 2,
      this.om.data.body_h_slope,
      this.om.data.body_l_slope,
      this.om.data.body_l_w
    );
  }
  changeChikubiWidth(value) {
    this.om.changeChikubiWidth(value);
    this.ov.renderOpf(
      this.om.data.ckb_w_size,
      this.om.data.ckb_h_size,
      this.om.data.ckb_h_size,
      this.om.data.w_size,
      this.om.data.h_size,
      this.om.data.h_size / 2,
      this.om.data.body_h_slope,
      this.om.data.body_l_slope,
      this.om.data.body_l_w
    );
  }

  changeHighBodySlope(value) {
    this.om.changeHighBodySlope(value);
    this.ov.renderOpf(
      this.om.data.ckb_w_size,
      this.om.data.ckb_h_size,
      this.om.data.ckb_h_size,
      this.om.data.w_size,
      this.om.data.h_size,
      this.om.data.h_size / 2,
      this.om.data.body_h_slope,
      this.om.data.body_l_slope,
      this.om.data.body_l_w
    );
  }

  changeLowBodySlope(value) {
    this.om.changeLowBodySlope(value);
    this.ov.renderOpf(
      this.om.data.ckb_w_size,
      this.om.data.ckb_h_size,
      this.om.data.ckb_h_size,
      this.om.data.w_size,
      this.om.data.h_size,
      this.om.data.h_size / 2,
      this.om.data.body_h_slope,
      this.om.data.body_l_slope,
      this.om.data.body_l_w
    );
  }

  resetOpiParameterRange() {
    this.ov.oppaiHeight.value = this.om.data.h_size;
    this.ov.oppaiWidth.value = this.om.data.w_size;
    this.ov.chikubiHeight.value = this.om.data.ckb_h_size;
    this.ov.chikubiWidth.value = this.om.data.ckb_w_size;
    this.ov.highBody.value = this.om.data.body_h_slope;
    this.ov.lowBody.value = this.om.data.body_l_slope;
  }

  resetOpiParameter() {
    this.om.data = Object.assign({}, this.om.datainit);
    this.resetOpiParameterRange();
    this.ov.renderOpf(
      this.om.data.ckb_w_size,
      this.om.data.ckb_h_size,
      this.om.data.ckb_h_size,
      this.om.data.w_size,
      this.om.data.h_size,
      this.om.data.h_size / 2,
      this.om.data.body_h_slope,
      this.om.data.body_l_slope,
      this.om.data.body_l_w
    );
  }

  async downloadOpf() {
    let spFlg = this.judgeSp();
    let blob = await this.om.changeBase64toBlob(
      this.om.getCanvasDataBase64(this.om.canvas, "image/jpeg")
    );
    this.ov.opfDLBtn.href = this.om.getCanvasDLUrl(blob);
    this.scaleOpfToPcSize(spFlg);
    let opfBase64 = await this.om.changehtmlTobase64(this.ov.opfView);
    let opfBlob = await this.om.changeBase64toBlob(opfBase64);
    this.ov.opfMathDLBtn.href = this.om.getCanvasDLUrl(opfBlob);
    this.ov.opfMathDLBtn.click();
    this.scaleOpfToSpSize(spFlg);
  }

  judgeSp() {
    var ua = navigator.userAgent;
    if (
      ua.indexOf("iPhone") > 0 ||
      (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0)
    ) {
      return true;
    } else {
      return false;
    }
  }

  scaleOpfToPcSize(flg) {
    if (!flg) {
      return;
    }
    this.ov.opfView.style.overflowX = "visible";
    this.ov.opfView.style.width = "600px";
  }

  scaleOpfToSpSize(flg) {
    if (!flg) {
      return;
    }
    this.ov.opfView.style.overflowX = "auto";
    this.ov.opfView.style.width = "auto";
  }
}

export default OpfController;
