import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

window.addEventListener('load', function () {
  init();
});

function init() {
  const options = {
    color: 0x00ffff,
  }
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500,
  );

  const controls = new OrbitControls(camera, renderer.domElement);

  controls.autoRotate = true;
  controls.enableDamping = true; // 마우스를 통해 드래그할때 관성을 나타내주는 효과
  controls.enableZoom = true;
  controls.enablePan = true;
  // controls.maxDistance = 50; // 줌범위 조절
  // controls.minDistance = 10; // 줌범위 조절
  // controls.maxAzimuthAngle = Math.PI / 2; // 회적각도 조절
  // controls.minAzimuthAngle = Math.PI / 3; // 회적각도 조절

  // const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper);

  const cubeGeometry = new THREE.IcosahedronBufferGeometry(1)
  const cubeMeterial = new THREE.MeshLambertMaterial({
    // color: 0xcc99ff
    color: new THREE.Color(0x00ffff),
    emissive: 0x111111,
  })

  const cube = new THREE.Mesh(cubeGeometry, cubeMeterial)

  const skeletonGeometry = new THREE.IcosahedronBufferGeometry(2)
  const skeletonMeterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    color: 0xaaaaaa,
  })

  const skeleton = new THREE.Mesh(skeletonGeometry, skeletonMeterial)

  scene.add(cube, skeleton)

  // camera.position.set(3, 4, 5);
  camera.position.z = 5;

  // camera.lookAt(cube.position);

  const directionlLight = new THREE.DirectionalLight(0xffffff, 1);
  // directionlLight.position.set(-1, 2, 3);
  scene.add(directionlLight);

  // const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  // ambientLight.position.set(3, 2, 1)
  // scene.add(ambientLight);

  // clock인스턴스 사용하기
  const clock = new THREE.Clock();

  render();

  function render() {
    const elapsedTime = clock.getElapsedTime();

    // 본래 렌더링 될때 라디안이 단위이나 MathUtils함수를 이용하여 deg단위로 변경 가능
    // cube.rotation.x = THREE.MathUtils.degToRad(45);

    //Date.now함수 사용하기
    // cube.rotation.x = Date.now() / 1000;

    // clock인스턴스 사용하기
    // cube.rotation.x = clock.getElapsedTime();
    // cube.rotation.y = clock.getElapsedTime();
    // cube.rotation.x += clock.getElapsedTime();

    // skeleton.rotation.x = clock.getElapsedTime() * 1.5;
    // skeleton.rotation.y = clock.getElapsedTime() * 1.5;

    // 그 외 scale과 position 변경하는 에니메이션
    // cube.position.y = Math.sin(cube.rotation.x);
    // cube.scale.x = Math.cos(cube.rotation.x);

    renderer.render(scene, camera);

    controls.update();

    // 에니메이션을 삽입하기 위한 코드 -> 매 프레임마다 애니메이션을 호출하는 함수 (큐브의 속성을 변경하는 코드를 삽입해야 에니메이션 작동 시작!)
    requestAnimationFrame(render);
  }

  //창크기에 따라 메소드가 동일한 비율로 리사이즈되도록하는 코드
  function handleResize() {
    // 렌더링 시 카메라의 종횡비 업데이트
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    // 렌더링 화면 업데이트하는 코드
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 새롭게 랜더된 결과를 화면에 반영하는 코드
    renderer.render(scene, camera);

    controls.update();
  }

  window.addEventListener('resize', handleResize);

  const gui = new GUI();

  // gui.add(cube.position, 'y', -3, 3, 0.5);
  gui
    .add(cube.position, 'y')
    .min(-3)
    .max(3)
    .step(0.5);

  gui.add(cube, 'visible');

  gui
    .addColor(options, 'color')
    .onChange((value) => {
      cube.material.color.set(value);
    });
}