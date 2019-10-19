
const rm = require('rimraf')
const path = require('path')
const config = require('../config')
const {task, src, dest} = require('gulp')

const removeDist = (env) => {
  return new Promise((resolve, reject) => {
    rm(path.join(config.build.assetsStorage, env), () => {
      resolve()
    })
  })
}

const removeOutput = (env) => {
  return new Promise((resolve, reject) => {
    rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), () => {
      resolve()
    })
  })
}

// "qa:build": "cross-env RUN_ENV=qa npm run build && gulp --gulpfile ./build/gulp.js copy:qa:dist",
task('copy:qa:dist', () => {
  return removeDist('qa').then(() => {
    return src(`${path.join(config.build.assetsRoot)}/**`)
      .pipe(dest(path.join(config.build.assetsStorage, 'qa')))
  })
})
// "qa": "cnpm i rimraf gulp && gulp --gulpfile ./build/gulp.js copy:qa:output",
task('copy:qa:output', () => {
  return removeOutput().then(() => {
    return src(`${path.join(config.build.assetsStorage, 'qa')}/**`)
      .pipe(dest(config.build.assetsRoot))
  })
})
// eslint-disable-next-line max-len
// "preview:build": "cross-env RUN_ENV=preview npm run build && gulp --gulpfile ./build/gulp.js copy:preview:dist",
task('copy:preview:dist', () => {
  return removeDist('preview').then(() => {
    return src(`${path.join(config.build.assetsRoot)}/**`)
      .pipe(dest(path.join(config.build.assetsStorage, 'preview')))
  })
})
// "pre_online": "cnpm i rimraf gulp && gulp --gulpfile ./build/gulp.js copy:preview:output",
task('copy:preview:output', () => {
  return removeOutput().then(() => {
    return src(`${path.join(config.build.assetsStorage, 'preview')}/**`)
      .pipe(dest(config.build.assetsRoot))
  })
})

// eslint-disable-next-line max-len
// "online:build": "cross-env RUN_ENV=online npm run build && gulp --gulpfile ./build/gulp.js copy:online:dist",
task('copy:online:dist', () => {
  return removeDist('online').then(() => {
    return src(`${path.join(config.build.assetsRoot)}/**`)
      .pipe(dest(path.join(config.build.assetsStorage, 'online')))
  })
})
// "online": "cnpm i rimraf gulp && gulp --gulpfile ./build/gulp.js copy:online:output",
task('copy:online:output', () => {
  return removeOutput().then(() => {
    return src(`${path.join(config.build.assetsStorage, 'online')}/**`)
      .pipe(dest(config.build.assetsRoot))
  })
})

// "build:all": "npm run qa:build && npm run preview:build && npm run online:build"
