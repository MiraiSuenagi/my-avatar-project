// Пути к файлам модели и текстуры
const modelPath = "./test-AI2/model.glb"; // Путь к GLB-модели
const texturePath = "./test-AI2/gltf_embedded_0.jpeg"; // Путь к текстуре

// Создаем сцену, камеру и рендерер
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 2); // Позиция камеры

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Освещение
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 2, 2).normalize();
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Мягкое освещение
scene.add(ambientLight);

// Загрузка текстуры
const textureLoader = new THREE.TextureLoader();
let texture;
textureLoader.load(
    texturePath,
    (loadedTexture) => {
        texture = loadedTexture;
        console.log("Текстура успешно загружена.");
    },
    undefined,
    (error) => console.error("Ошибка загрузки текстуры:", error)
);

// Загрузка модели
let model, mixer;
const loader = new THREE.GLTFLoader();
loader.load(
    modelPath,
    (gltf) => {
        model = gltf.scene;
        scene.add(model);

        model.position.set(0, -1, 0); // Устанавливаем позицию модели
        model.scale.set(1.5, 1.5, 1.5); // Масштаб модели

        // Применяем текстуру
        if (texture) {
            model.traverse((child) => {
                if (child.isMesh) {
                    child.material.map = texture;
                    child.material.needsUpdate = true;
                }
            });
        }

        // Анимация, если доступна
        if (gltf.animations && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(model);
            const action = mixer.clipAction(gltf.animations[0]);
            action.play();
        }

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
    if (mixer) mixer.update(0.01); // Обновление анимации
    renderer.render(scene, camera);
}
animate();
