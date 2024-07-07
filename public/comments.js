for (let i = 0; i < document.querySelectorAll(".edit").length; i++) {
    document.querySelectorAll(".edit")[i].addEventListener("click", editComment);
  } 
  for (let i = 0; i < document.querySelectorAll(".delete").length; i++) {
    document.querySelectorAll(".delete")[i].addEventListener("click", deleteComment);
  } 
  
  function editComment() {

    
    let currentMsg= this.parentNode.children[1];
    let newMsg=document.createElement('textarea');
    newMsg.textContent=currentMsg.innerHTML;
    newMsg.setAttribute("name","newMsg");
    currentMsg.replaceWith(newMsg);

    
    this.setAttribute("name","submit");
    this.setAttribute("value","Update");
    this.setAttribute("type","submit");
    this.setAttribute("method","POST");
    this.setAttribute("class","")
  }