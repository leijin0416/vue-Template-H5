module.exports = {
  presets: [
    '@vue/app'
  ],
  // 第三方库使用es6 
  overrides: [    
    {      
      // include: './node_modules/module-name/library-name/name.common.js',  // 使用的第三方库      
      // sourceType: 'unambiguous'    
    }  
  ],
}
