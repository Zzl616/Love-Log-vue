<template>
  <div class="page-container">
    <el-button @click="addImage">点击添加</el-button>
    <div ref="container"></div>
  </div>
  
</template>

<script>
import { onMounted, ref } from "vue";
import Konva from "konva";

export default {
  setup() {
    const container = ref(null);
    let stage = ref(null); // Make 'stage' and 'layer' responsive by using 'ref'.
    let layer = ref(null);

    const initializeCanvas = () => {
      stage.value = new Konva.Stage({
        container: container.value,
        width: window.innerWidth,
        height: window.innerHeight,
      });

      layer.value = new Konva.Layer();
      stage.value.add(layer.value);

      addImage(); // Call 'addImage()' here to add an initial image.
    };

    const addImage = () => {
      var imageObj = new Image();
      imageObj.onload = function () {
        const aspectRatio = imageObj.naturalWidth / imageObj.naturalHeight;
        const newHeight = 350 / aspectRatio;

        var img = new Konva.Image({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          image: imageObj,
          width: 350,
          height: newHeight,
          draggable: true,
        });

        let transformer = new Konva.Transformer({
          anchorSize: 10,
          anchorStroke: "White",
        });

        transformer.attachTo(img);

        img.on("mouseover", function () {
          stage.value.container().style.cursor = "move";
          transformer.show();
          layer.value.batchDraw();
        });

        img.on("mouseout", function () {
          stage.value.container().style.cursor = "default";
          layer.value.batchDraw();
        });

        stage.value.on("click mousedown", function (e) {
          if (e.target instanceof Konva.Image) {
            stage.value.container().style.cursor = "move";
            transformer.show();
            layer.value.batchDraw();
          } else {
            stage.value.container().style.cursor = "default";
            transformer.hide();
            layer.value.batchDraw();
          }
        });

        layer.value.add(img);
        layer.value.add(transformer);
        layer.value.batchDraw();
      };
      imageObj.src = "/Image/1.jpg";
    };

    onMounted(() => initializeCanvas());

    return { container, addImage };
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
/* .page-container {
  position: relative;
} */
/* .el-button {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
} */
</style>
