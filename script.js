//getting 'calculator' element
const calc=document.getElementById("calc");
//allowed charcters to prevent other characters like abcdef
const allowed_chars=['1','2','3','4','5','6','7','8','9','0','+','-','/','*','%','.'];
//main calculation function to perform calculation
function calcuate(val){
    try{
        let result;
        /*JS would return error if 0 is used at first before any digit(not 0) like 08+9.To prevent this.The following
        condition is applied*/
        if(val[0]=='0'){
            val=val.substring(1,val.length);
        }
        //ignoring empty input if user clicks = when input box is empty
        if(!(val=="")){
           result=eval(val);
        }else{
            result="";
        }
        if(result==undefined){
            result="Invalid";
        }
        return result;
    }catch(err){
        return "Error";
    }
}
//erases last charcater from the given string
function erase(val){
    let result=val.substring(0, val.length - 1)
    return result;
}
//return last character for given string
function get_last_char(val){
    let result=val.slice(-1);
    return result;
}
//The following function is made to remove outputs like Error or Invalid in input box so that user can again use calculator
function remove_err(){
    if(!(allowed_chars.includes(get_last_char(calc.value)))){
        calc.value="";
    }
}
function filter(){
    let val=calc.value;
    let last_char=get_last_char(val);
    //checking if input is valid
    if(!(allowed_chars.includes(last_char))){
        calc.value=erase(val);
    }
}
//event listener for number and other operation buttons
document.getElementById("pad").addEventListener("click",(event)=>{
    remove_err();
    let elem=event.target;
    //insert value as same as text displayed in button
   if(elem.classList.contains("calc")||elem.classList.contains("operation")){
      calc.value+=elem.innerHTML;  
    //backspace for each individual number
   }else if(elem.classList.contains("cross")){
        let val=calc.value;
        calc.value=erase(val);
   }
   //produce results' button
   else if(elem.classList.contains("equal_to")){
    let val=calc.value;
    calc.value=calcuate(val);
    }
    //for AC button
   else if(elem.classList.contains("ac")){{
        calc.value="";
    }
   }
});
//event listener for keyboard controls. Esc- AC, Enter- produce results.other numerical inputs
calc.addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
        event.preventDefault();
        remove_err();
        calc.value=calcuate(calc.value);
    }
    else if(event.key==='Escape'){
        event.preventDefault();
        calc.value="";
    }
});