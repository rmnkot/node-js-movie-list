const logger = (() => {
  const log = (...args: any[]) => console.log(...args);
  const error = (...args: any[]) => console.error('\x1b[31m%s\x1b[0m', ...args);
  const warn = (...args: any[]) => console.warn('\x1b[33m%s\x1b[0m', ...args);
  const info = (...args: any[]) => console.info('\x1b[36m%s\x1b[0m', ...args);

  return {
    log,
    error,
    warn,
    info,
  };
})();

export default logger;
