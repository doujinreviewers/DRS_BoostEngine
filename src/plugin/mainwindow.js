import * as fs from 'fs';
import * as path from 'path';
import prebundlejs from './assets/DRS_BoostEngine.prebundleapp';

let speed = 1;

let _SceneManager_update = SceneManager.update;
SceneManager.update = function(deltaTime) {
  _SceneManager_update.call(this, deltaTime);
  try {
    for (let i = 1; i < speed; i++) {
      this.updateMain();
    }
  } catch (e) {
    this.catchException(e);
  }
};

Input.keyMapper[18] = 'alt';

let root_html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ゲームスピード変更プラグイン</title>
  </head>
  <body>
    <div id="app"></div>
`;
let app_html=`<script>${prebundlejs}</script>`;

const html_filename = "DRS_BoostEngine_MainWindow.html";

let showUI = () => {
  let speed_html = `<div id="currentSpeed">${speed}</div>`;
  let render_html = root_html + speed_html + app_html +`</body></html>`;
  fs.writeFileSync(path.join(process.cwd(), html_filename), render_html);
  nw.Window.open(html_filename, {}, function(win) {
    win.width = 300;
    win.height = 300;
    win.on('close', function () {
      try {
        fs.unlinkSync(path.join(process.cwd(), html_filename));
      } catch (e) {
        console.log(e);
      } finally {
        this.close(true);
      }
    });
  
    win.window.addEventListener("changegamespeed", function(event) {
      speed = event.detail;
    });
  })
}

let speedList = ['1','2','3','4','5','6','7','8','9'];

nw.Window.get().window.addEventListener("keydown", function(e){
  if(e.altKey && e.key === 'b') {
    showUI();
  }else if(e.altKey && speedList.includes(e.key)){
    speed = parseInt(e.key, 10);
  }
});