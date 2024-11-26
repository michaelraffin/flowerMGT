export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.Babip05N.js","app":"_app/immutable/entry/app.B38veHni.js","imports":["_app/immutable/entry/start.Babip05N.js","_app/immutable/chunks/entry.BC5cAUDn.js","_app/immutable/chunks/runtime.cuZl10Db.js","_app/immutable/chunks/index.D0i4y2TH.js","_app/immutable/chunks/utils.BAN4fZiu.js","_app/immutable/entry/app.B38veHni.js","_app/immutable/chunks/runtime.cuZl10Db.js","_app/immutable/chunks/store.CA-QW0ew.js","_app/immutable/chunks/disclose-version.D-MZTq7R.js","_app/immutable/chunks/utils.BAN4fZiu.js","_app/immutable/chunks/index-client.D1OmUi4l.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/buy",
				pattern: /^\/buy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
