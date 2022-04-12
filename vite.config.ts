import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import react from "@vitejs/plugin-react";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import { defineConfig } from "vite";
import viteDefineEnvs from "vite-define-envs-plugin";
import EnvironmentPlugin from "vite-plugin-environment";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import resolve from "rollup-plugin-node-resolve";
// @ts-ignore
import { dependencies } from "./package.json";

const pwaConfig: Partial<VitePWAOptions> = {
  workbox: {
    runtimeCaching: [
      {
        urlPattern: /someInterface/i, //  Tile interface cache   Fill in the regular matching of the interface you want to cache here
        handler: "CacheFirst",
        options: {
          cacheName: "interface-cache",
        },
      },
      {
        urlPattern: /(.*?)\.(js|css|ts)/, // js /css /ts Static resource cache
        handler: "CacheFirst",
        options: {
          cacheName: "js-css-cache",
        },
      },
      {
        urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, //  Image caching
        handler: "CacheFirst",
        options: {
          cacheName: "image-cache",
        },
      },
    ],
  },
  includeAssets: ["favicon.svg"],
  manifest: {},
  registerType: "autoUpdate",
  includeManifestIcons: true,
};

const bigLibs = [
  { regExp: /^three*/, chunkName: "three" },
  { regExp: /^@mui*/, chunkName: "@mui_material" },
];

function getManualChunks(deps: Record<string, string>) {
  return Object.keys(deps).reduce(
    (prev, cur) => {
      let isBigLib = false;
      for (const l of bigLibs) {
        if (l.regExp.test(cur)) {
          isBigLib = true;
          if (prev[l.chunkName]) {
            prev[l.chunkName].push(cur);
          } else {
            prev[l.chunkName] = [cur];
          }
          break;
        }
      }
      if (!isBigLib) prev.vendors.push(cur);
      return prev;
    },
    { vendors: [] } as Record<string, string[]>
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          // buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },

  build: {
    // sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: getManualChunks(dependencies),
      },
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        resolve({ preferBuiltins: false, mainFields: ["browser"] }),
        rollupNodePolyFill(),
      ],
    },
  },

  plugins: [
    react(),
    VitePWA(pwaConfig),
    new viteDefineEnvs(["USER", "API_BASE_URL"], "GLOBAL"),
    EnvironmentPlugin({
      // Uses 'development' if the NODE_ENV environment variable is not defined.
      NODE_ENV: "development",

      // Have in mind that variables coming from process.env are always strings.
      DEBUG: "false",

      // Required: will fail if the API_KEY environment variable is not provided.
      API_KEY: null,

      // Optional: will not fail if the APP_VERSION environment variable is missing.
      APP_VERSION: null,
    }),
  ],
});

///&& cp font.ttf dist/
//  "browser-image-compression": "^1.0.17",
// "ky": "^0.30.0",
