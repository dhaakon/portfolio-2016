let Color = {
  gray: function( value, o ){
    return [ value, value, value, o || 1 ].join(',');
  }
}

export { Color }
