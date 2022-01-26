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

let app_html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ゲームスピード変更プラグイン</title>
  </head>
  <body>
    <div id="app"></div>
    <script>${prebundlejs}</script>
  </body>
</html>
`
const html_filename = "DRS_BoostEngine_MainWindow.html";

let showUI = () => {
  fs.writeFileSync(path.join(process.cwd(), html_filename), app_html);
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

nw.Window.get().window.addEventListener("keydown", function(e){
  if(e.altKey && e.key === 'b') {
    showUI();
  }
});