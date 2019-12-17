
import VConsole from 'vconsole'

if (process.env.RUN_ENV !== 'online' && process.env.RUN_ENV !== 'local') {
  // eslint-disable-next-line no-new
  new VConsole()
}
// eslint-disable-next-line no-console
console.log('当前运行环境', process.env.RUN_ENV)
