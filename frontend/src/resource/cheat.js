document.addEventListener("visibilitychange", function() {
  if (document.hidden){
    console.log("Hey why are you doing that!")
    document.getElementById('123').innerText = "Hey stop that right now!"
    alert("Cheating alert!")
  }
});
window.onresize = function(){
  var maxheight = window.screen.height
  var maxwidth = window.screen.width

  var webheight = 975 //smallest u can get with chrome while fullscreen
  document.getElementById('123').innerText = `Resizing!\nHeight: ${window.innerHeight}\nWidth: ${window.innerWidth}`;
  var height = window.innerHeight
  var width = window.innerWidth

  if (width<webheight)
  {
    alert("Cheating alert!")
  }else if (height<maxheight)
  {
    alert("Cheating alert!")
  }
}
