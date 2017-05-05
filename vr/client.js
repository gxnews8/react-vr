/**
 * The examples provided by Oculus are for non-commercial testing and
 * evaluation purposes only.
 *
 * Oculus reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * OCULUS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Example ReactVR app that allows a simple tour using linked 360 photos.
 */
import {VRInstance} from 'react-vr-web';
import {get3DPoint} from '../components/camera.js'

function init(bundle, parent, options) {
  const vr = new VRInstance(bundle, 'TourSample', parent, {
    // Show a gaze cursor.
    cursorVisibility: 'visible',
    ...options,
  });
  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
  };
  // Begin the animation loop
  vr.start();
  window.playerCamera = vr.player._camera;
  window.vr = vr;
  window.ondblclick= onRendererDoubleClick;
  window.onmousewheel = onRendererMouseWheel;
  vr.rootView.context.worker.addEventListener('message', onVRMessage);
  return vr;
}

window.ReactVR = {init};

function onVRMessage(e) {
  switch (e.data.type) {
    case 'sceneChanged':
    if (window.playerCamera.zoom != 1) {
      window.playerCamera.zoom = 1;
      window.playerCamera.updateProjectionMatrix();
    }
    break;
    case 'sceneLoadStart':
      document.getElementById('loader').style.display = 'block';
    break;
    case 'sceneLoadEnd':
      document.getElementById('loader').style.display = 'none';
    break;
    default:
    return;
  }
}

function onRendererDoubleClick(){
  // var x  = 2 * (event.x / window.innerWidth) - 1;
  // var y = 1 - 2 * ( event.y / window.innerHeight );
  // var coordinates = get3DPoint(window.playerCamera, x, y);
  // vr.rootView.context.worker.postMessage({ type: "newCoordinates", coordinates: coordinates });
  window.playerCamera.zoom = 1;
  window.playerCamera.updateProjectionMatrix();
}

function onRendererMouseWheel(){
  if (event.deltaY > 0 ){
     if(window.playerCamera.zoom  > 0.2) {
       window.playerCamera.zoom -= 0.05;
       window.playerCamera.updateProjectionMatrix();
      }
   }
   else {
     if(window.playerCamera.zoom < 10) {
      window.playerCamera.zoom += 0.05;
      window.playerCamera.updateProjectionMatrix();
     }
   }
}
