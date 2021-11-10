const logger = (() => {
  const log = (...args) => console.log(...args);
  const error = (...args) => console.error('\x1b[31m%s\x1b[0m', ...args);
  const warn = (...args) => console.warn('\x1b[33m%s\x1b[0m', ...args);
  const info = (...args) => console.info('\x1b[36m%s\x1b[0m', ...args);

  return {
    log,
    error,
    warn,
    info,
  };
})();

module.exports = logger;
