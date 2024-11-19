// Путь к модели
const modelPath = "./model.glb";

// Создаем сцену, камеру и рендерер
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Освещение
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 2, 2).normalize();
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// Загрузка модели
let model;
const loader = new THREE.GLTFLoader();
loader.load(
    modelPath,
    (gltf) => {
        model = gltf.scene;
        scene.add(model);

        model.position.set(0, -1, 0);
        model.scale.set(1.5, 1.5, 1.5);

        console.log("Модель успешно загружена.");
    },
    undefined,
    (error) => {
        console.error("Ошибка загрузки модели:", error);
    }
);

// Анимация сцены
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
