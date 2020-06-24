let isValid = function(s=""){
  let stack=[];
  for(let i=0; i<s.length;i++){
    if(s[i]===')'){
      let pop=stack.pop();
      if(pop !='(' ) return false;
    }
    else if(s[i]==='}' ){
      let pop=stack.pop();
      if(pop != '{') return false;
    }
    else if(s[i]===']'){
      let pop=stack.pop();
      if(pop != '[') return false;
    }else{
      stack.push(s[i])
    }

    
  }
  return stack.length === 0;
}

var isValid = function(s) {
  const stack = s.split('');
  const outt = [];
  
  for(let i=stack.length - 1; i >= 0; i--){
      if ( stack[i] === ')' || stack[i] === '}' || stack[i] === ']') {
          outt.push(stack.pop());
          continue;
      }
      
      if ( stack[i] === '(' || stack[i] === '{' || stack[i] === '[') {
          if(outt.length) return false;
          if(stack[i] === '(' && outt[outt.length-1] === ')') continue;
          if(stack[i] === '{' && outt[outt.length-1] === '}') continue;
          if(stack[i] === '[' && outt[outt.length-1] === ']') continue;
          return false;
      }
  }
  
  return true;
};