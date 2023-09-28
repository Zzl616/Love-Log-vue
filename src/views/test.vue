<template>
  <div>
    <canvas id="c"></canvas>
  </div>
</template>

<script>
import { fabric } from "fabric";
import { onMounted } from "vue";

export default {
  setup() {
    const initializeCanvas = () => {
      let canvas = new fabric.Canvas("c", {
        width: window.innerWidth, //后面会改成自适应
        height: window.innerWidth, //后面会改成自适应
        backgroundColor: "rgb(255,255,255)",
      });

      fabric.Image.fromURL("/Image/1.jpg", function (img) {
        img.scaleToWidth(350);
        img.set({
          left: 100, //后面会改成自适应
          top: 100, //后面会改成自适应
          angle: 0,
          hasRotatingPoint: true,
          cornerSize: 8,
        });

        canvas.add(img).setActiveObject(img);
      });
    };

    onMounted(initializeCanvas);

    return {};
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
