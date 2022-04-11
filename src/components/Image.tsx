import * as THREE from "three";
import { extend } from "react-three-fiber";
export default class Image extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        // @ts-expect-error
        texture: { type: "t", value: undefined },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D texture;
        void main() {
          vec2 uv = vUv;
          vec4 texture = texture2D(texture, uv);
          gl_FragColor = texture;
        }`,
    });
  }
  // These let us set the texture uniform with a react prop
  get texture() {
    return this.uniforms.texture.value;
  }
  set texture(v) {
    this.uniforms.texture.value = v;
  }
}
// register an element in r3f as <image />
extend({ Image });
