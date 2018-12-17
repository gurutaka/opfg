export class OpfView {
  constructor(props) {
    this.wrapper = document.getElementById("js-AppView");
    this.onOppaiHeightCallBack = props.onOppaiHeightCallBack;
    this.onOppaiWidthCallBack = props.onOppaiWidthCallBack;
    this.onChikubiHeightCallBack = props.onChikubiHeightCallBack;
    this.onChikubiWidthCallBack = props.onChikubiWidthCallBack;
    this.onHighBodyCallBack = props.onHighBodyCallBack;
    this.onLowBodyCallBack = props.onLowBodyCallBack;
    this.onResetCallBack = props.onResetCallBack;
    this.onDownLoadCallBack = props.onDownLoadCallBack;
    // this.opfDom = opfDom;
    this.render();
    this.bindDomElement();

    this.handleEvents();
  }

  render() {
    const temp = `
    <nav>
      <div class="nav-wrapper"><a class="brand-logo center">OPFG</a></div>
    </nav>
    <main class="container" id="oppai-view">
    <div class="row">
      <div class="col m8 s12 center-align" id="oppai-container">
      <canvas id="oppai-canvas" class="card-panel"></canvas>
      </div>
      <div class="col m4 s12 option-container">
        <form class="card-panel">
          <div class="range-field row valign-wrapper center-align">
            <label class="col s5">OPF:SIZE</label>
            <input type="range" id="opf_h" min="1" max="6" value="4" step="0.1" class="col s7" />
          </div>
          <div class="range-field row valign-wrapper center-align">
            <label class="col s5">OPF：横</label>
            <input type="range" id="opf_w" min="0.2" max="2.2" value="1.2" step="0.01" class="col s7" />
          </div>
          <div class="range-field row valign-wrapper center-align">
            <label class="col s5">CKB：縦</label>
            <input type="range" id="ckb_h" min="4" max="18" value="8" step="0.1" class="col s7" />
          </div>
          <div class="range-field row valign-wrapper center-align">
            <label class="col s5">CKB：横</label>
            <input type="range" id="ckb_w" min="0.06" max="0.18" value="0.12" step="0.01" class="col s7" />
          </div>
          <div class="range-field row valign-wrapper center-align">
            <label class="col s5">OPF:ハリ</label>
            <input type="range" id="high_body" min="1" max="5" value="3" step="0.1" class="col s7" />
          </div>
          <div class="range-field row valign-wrapper center-align">
            <label class="col s5">LOW BODY</label>
            <input type="range" id="low_body" min="20" max="70" value="35" step="1" class="col s7" />
          </div>
          <div class="range-field row valign-wrapper center-align last-range">
          <a class="waves-effect waves-light btn-small opfgBtn resetBtn" id="resetBtn">reset</a>
          </div>
        </form>
        </div>
        </div>
        <div class="center" id="opf"></div>
      <div class="dlBtn-wrapper center">
        <a class="waves-effect waves-light btn-large opfgBtn" id="opfDLBtn" download="opf_graph.jpeg"
          ><i class="material-icons left">file_download</i>OPFをダウンロードする</a
        >
        <div class="DLmsg_sp"
        >iOS”safari”をお使いの方は、DLできません。<br />
        今すぐDLしたい気持ちを抑えて下さいませ。<br />PCにて保存して頂けると幸いです！</div>
        <a class="waves-effect waves-light btn-large opfgBtn" id="opfMathDLBtn" download="opf.png"
          ><i class="material-icons left">file_download</i>OPF</a
        >
        <a class="waves-effect waves-light btn-large opfgBtn" id="opfMathDLBtn" download="opf.png"
          ><i class="material-icons left">file_download</i>OPF</a
        >
      </div>
      <div class="fixed-action-btn" id="sns-wrapper">
        <a class="btn-floating btn-large red">
          <i class="large material-icons">share</i>
        </a>
        <ul>
        <li><a class="btn-floating snsBtn hatena" href="http://b.hatena.ne.jp/add?mode=confirm&url=https://opfg.xyz/&title={OPFG}" target="_blank" rel="nofollow">B!</a></li>
        <li><a class="btn-floating snsBtn facebook" href="http://www.facebook.com/share.php?u=https://opfg.xyz/" rel="nofollow" target="_blank"><i class="fab fa-facebook"></i></a></li>
        <li><a class="btn-floating snsBtn twitter" href="https://twitter.com/intent/tweet?url=https://opfg.xyz/&&hashtags=おっぱい関数,OPFG" rel="nofollow" target="_blank"><i class="fab fa-twitter"></i></a></li>
      </ul>

      </div>
      </main>
      <footer>
        ©OPFG
    </footer>
  `;

    this.wrapper.innerHTML = "";
    this.wrapper.insertAdjacentHTML("afterbegin", temp);
  }

  renderOpf(
    ckb_w,
    ckb_h,
    w_size,
    h_size,
    h_half_size,
    h_b_slope,
    l_b_slope,
    l_b_w
  ) {
    const temp = `
    \\[opf(y) = \\frac{${ckb_w} e^{-4(${ckb_h}(y-(${h_half_size} - \\frac{${h_size}}{e}))^4)} + ${w_size} (y -${h_half_size})\\log
    (-\\frac{1}{${h_size}}(y-${h_half_size}))-${l_b_w}(1+e^{-${l_b_slope}(y-${h_half_size})})^{-1}}{1+e^{-${h_b_slope}(y+${h_half_size})}}\\]
    `;

    this.opfView.innerHTML = "";
    this.opfView.insertAdjacentHTML("afterbegin", temp);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "opf"]);
  }

  bindDomElement() {
    this.wrapperElement = document.getElementById("oppai-view");
    this.oppaiContaner = this.wrapperElement.querySelector("#oppai-container");
    this.oppaiCanvas = this.wrapperElement.querySelector("#oppai-canvas");
    this.oppaiHeight = this.wrapperElement.querySelector("#opf_h");
    this.oppaiWidth = this.wrapperElement.querySelector("#opf_w");
    this.chikubiHeight = this.wrapperElement.querySelector("#ckb_h");
    this.chikubiWidth = this.wrapperElement.querySelector("#ckb_w");
    this.highBody = this.wrapperElement.querySelector("#high_body");
    this.lowBody = this.wrapperElement.querySelector("#low_body");
    this.opfView = this.wrapperElement.querySelector("#opf");
    this.resetBtn = this.wrapperElement.querySelector("#resetBtn");
    this.wrapperSns = this.wrapperElement.querySelector("#sns-wrapper");
    this.opfDLBtn = this.wrapperElement.querySelector("#opfDLBtn");
    this.opfMathDLBtn = this.wrapperElement.querySelector("#opfMathDLBtn");
  }

  handleEvents() {
    //おっぱいのスケール調整
    this.oppaiHeight.addEventListener("change", e =>
      this.onOppaiHeightCallBack(this.oppaiHeight.value)
    );
    this.oppaiHeight.addEventListener("input", e =>
      this.onOppaiHeightCallBack(this.oppaiHeight.value)
    );
    //おっぱいの横の調整
    this.oppaiWidth.addEventListener("change", e =>
      this.onOppaiWidthCallBack(this.oppaiWidth.value)
    );
    this.oppaiWidth.addEventListener("input", e =>
      this.onOppaiWidthCallBack(this.oppaiWidth.value)
    );
    //乳首の縦の調整
    this.chikubiHeight.addEventListener("change", e =>
      this.onChikubiHeightCallBack(this.chikubiHeight.value)
    );
    this.chikubiHeight.addEventListener("input", e =>
      this.onChikubiHeightCallBack(this.chikubiHeight.value)
    );
    //乳首の横の調整
    this.chikubiWidth.addEventListener("change", e =>
      this.onChikubiWidthCallBack(this.chikubiWidth.value)
    );
    this.chikubiWidth.addEventListener("input", e =>
      this.onChikubiWidthCallBack(this.chikubiWidth.value)
    );

    //上半身の調整
    this.highBody.addEventListener("change", e =>
      this.onHighBodyCallBack(this.highBody.value)
    );
    this.highBody.addEventListener("input", e =>
      this.onHighBodyCallBack(this.highBody.value)
    );

    //下半身の調整
    this.lowBody.addEventListener("change", e =>
      this.onLowBodyCallBack(this.lowBody.value)
    );
    this.lowBody.addEventListener("input", e =>
      this.onLowBodyCallBack(this.lowBody.value)
    );

    //リセットボタン
    this.resetBtn.addEventListener("click", e => this.onResetCallBack());

    //DLボタン
    this.opfDLBtn.addEventListener("click", e => this.onDownLoadCallBack());
  }
}

export default OpfView;
