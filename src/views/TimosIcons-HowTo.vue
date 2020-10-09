<template>
  <div class="timosicons-howto">
    <tc-hero tc-dark-container>
      <img src="assets/hero.jpg" alt="" slot="background" />
      <h1>Getting started</h1>
    </tc-hero>
    <div content>
      <tc-quote>
        There are 2 ways to use Timo's icons in your project
      </tc-quote>
      <h1>Variant 1</h1>
      <h3>Include single icons via svg</h3>
      <p>
        To use a single icon in your project, click on the "Copy SVG" button of
        the desired icon and paste it into your project
      </p>

      <h1>Variant 2</h1>
      <h3>Include the whole library from version X</h3>
      <p>
        To insert all icons from a certain version on, first choose a version
        and then add the following link to your &lt;head>
        <br />
        <span
          >https://cdn.jsdelivr.net/gh/TimoScheuermann/Timos-Icons@X/public/resources/style.css</span
        >
        <br />
        replace the X with your chosen version. Now the icons can be used in
        your project via a &lt;i class="ti-{icon name}" />. Alternatively you
        can use the "Copy HTML" button to generate the i-tag.
        <br />
        <br />
        Example URL:
        https://cdn.jsdelivr.net/gh/TimoScheuermann/Timos-Icons@2.21/public/resources/style.css
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class TimosIconsHowTo extends Vue {}
</script>

<style lang="scss" scoped>
.tc-hero {
  color: #fff;
}
span {
  color: #08f;
  line-height: 30px;
  font-weight: 500;
}
</style>
