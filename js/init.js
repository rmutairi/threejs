function init(THREE) {
  // Init ThreeJS
  const container = document.querySelector("#canvas-container");
  const canvas = document.querySelector('#c');
  const scene = new THREE.Scene();

  // Create renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, logarithmicDepthBuffer: true });
  renderer.stencil = true;
  if (window.devicePixelRatio < 1.5) {
      renderer.setPixelRatio(window.devicePixelRatio);
  } else {
      renderer.setPixelRatio(2);
  }
  renderer.shadowMapSoft = true;
  renderer.powerPreference = "high-performance";
  renderer.shadowMap.enabled = true;
  renderer.gammaFactor = 2.2;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.physicallyCorrectLights = true;

  // Setup camera
  const fov = 17;
  const aspect = container.clientWidth / container.clientHeight;  // the canvas default
  const near = 1;
  const far = 4000; // Increase far plane to ensure the skysphere is visible
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 180);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // Create a skysphere
  const skysphereGeometry = new THREE.SphereGeometry(1000, 70, 300); // Increase the radius of the sphere
  const skysphereMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('./gltf/sky3.png'), // Ensure the texture path is correct
      side: THREE.BackSide // Render the inside of the sphere
  });
  const skysphere = new THREE.Mesh(skysphereGeometry, skysphereMaterial);

  // Add the skysphere to the scene
  scene.add(skysphere);

  const render_canvas = renderer.domElement;
  renderer.setSize(render_canvas.clientWidth, render_canvas.clientHeight, false);
  camera.aspect = render_canvas.clientWidth / render_canvas.clientHeight;
  camera.updateProjectionMatrix();

  return { scene, renderer, camera, skysphere }; // Return skysphere
}

export { init };
