import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import preprocess from 'svelte-preprocess'
import typescript from 'rollup-plugin-typescript2';


/**
 * Switch to ON if you wish to use typescript in
 * your project, do not forget to confiure your
 * tsconfig.json file accordingly.
 */
const useTypescript = false;

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);
const dedupe = importee => importee === 'svelte' || importee.startsWith('svelte/');

const aliasEntries = [
	{ find: "styles", replacement: __dirname + 'src/styles/' },
	{ find: "components", replacement: __dirname + '/src/components/' },
	{ find: "pages", replacement: __dirname + '/src/pages/' },
	{ find: "store", replacement: __dirname + '/src/store/' },
	{ find: "locales", replacement: __dirname + '/src/locales/' }
]

const customResolver = resolve({
  extensions: ['.js', '.scss', '.css', '.ts', '.svelte']
});

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			alias({
				entries: aliasEntries,
				customResolver
			}),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				preprocess: preprocess({
					typescript: {
						transpileOnly: true,
					}
				}),
				dev,
				hydratable: true,
				emitCss: true,
			}),
			resolve({
				browser: true,
				dedupe
			}),
			commonjs(),

			useTypescript && typescript({
				check: false
			}),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte', '.ts'],
				runtimeHelpers: true,
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead'
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),

			!dev && terser({
				module: true
			})
		],

		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			alias({
				entries: aliasEntries,
				customResolver
			}),
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				preprocess: preprocess({
					typescript: {
						transpileOnly: true,
					}
				}),
				generate: 'ssr',
				dev
			}),
			resolve({
				dedupe
			}),
			commonjs(),
			useTypescript && typescript({
				check: false
			}),
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
			!dev && terser()
		],

		onwarn,
	}
};
