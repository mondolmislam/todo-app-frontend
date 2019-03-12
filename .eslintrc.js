module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
		jest: true
	},
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parser: 'babel-eslint',
parserOptions: {
  sourceType: 'module',
  allowImportExportEverywhere: true
},
	rules: {
		'no-console': 'off',
		semi: 'off',
		'space-before-function-paren': 'off'
	}
};
