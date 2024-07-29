module.exports = {
    apps: [
      {
        name: 'next-app',
        script: 'node_modules/.bin/next',
        args: 'start',
        cwd: './',
        instances: 'max',
        exec_mode: 'cluster',
        watch: false,
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  