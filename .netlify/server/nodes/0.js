

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BQ0OBIoH.js","_app/immutable/chunks/disclose-version.D-MZTq7R.js","_app/immutable/chunks/runtime.cuZl10Db.js"];
export const stylesheets = ["_app/immutable/assets/0.CkN1xyTf.css"];
export const fonts = [];
