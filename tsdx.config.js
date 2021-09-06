const alias = require('@rollup/plugin-alias');
const replace = require('@rollup/plugin-replace');

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, opts) {
    config.plugins = config.plugins.map((p) =>
      p.name === 'replace'
        ? replace({
            'process.env.NODE_ENV': JSON.stringify(opts.env),
            preventAssignment: true,
          })
        : p
    );

    // Replace "@/" with "src/" as the root directory
    config.plugins.push({
      plugins: [
        alias({
          entries: [{ find: /@\//, replacement: /src\// }],
        }),
      ],
    });

    // Do not treat absolute paths as external modules
    return {
      ...config,
      external: (id) => !id.startsWith('@/') && config.external(id),
    };
  },
};
