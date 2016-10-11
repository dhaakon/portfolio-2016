let rand = function( numA, numB ){
  if( !numB ){
    return Math.random() * numA;
  }else{
    let _num = Math.random() * ( numB - numA );

    return numA + _num;
  }
}

export { rand }
