// import adapter from "@sveltejs/adapter-netlify";
// import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
//   // Consult https://svelte.dev/docs/kit/integrations
//   // for more information about preprocessors
//   preprocess: vitePreprocess(),

//   kit: {
//     // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
//     // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
//     // See https://svelte.dev/docs/kit/adapters for more information about adapters.

//     // adapter: adapter({
//     //   edge: false,
//     //   split: true,
//     // }),
//     // target: "#svelte",
//     adapter: adapter(),
//     // adapter: adapter(
//     //   adapter({
//     //     // default options are shown. On some platforms
//     //     // these options are set automatically — see below
//     //     pages: "build",
//     //     assets: "build",
//     //     fallback: null,
//     //     precompress: false,
//     //     strict: true,
//     //     out: "build",
//     //   }),
//     // ),
//     alias: {
//       "@/*": "./path/to/lib/*",
//     },
//   },
// };

// export default config;
import adapter from "@sveltejs/adapter-netlify";

export default {
  kit: {
    adapter: adapter(
      adapter({
        // default options are shown. On some platforms
        // these options are set automatically — see below

        fallback: null,
        precompress: false,
        strict: true,
        out: "build",
      }),
    ),
    alias: {
      "@/*": "./path/to/lib/*",
    },
  },
};
