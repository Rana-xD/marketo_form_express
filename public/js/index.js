$(document).ready(function(){
  
  function readCookie(name) {
    var cookiename = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(cookiename) == 0) return c.substring(cookiename.length,c.length);
    }
    return null;
   }
   
    var value = readCookie('_mkto_trk');
    var id;
    console.log(value);
    
    
  
    $(".form-wrapper .button").click(function(){
      var button = $(this);
      var currentSection = button.parents(".section");
      var currentSectionIndex = currentSection.index();
      var headerSection = $('.steps li').eq(currentSectionIndex);
      var marketoButton = $('.mktoButtonRow');
      
      currentSection.removeClass("is-active").next().addClass("is-active");
      headerSection.removeClass("is-active").next().addClass("is-active");
  
      // $(".form-wrapper").submit(function(e) {
      //   e.preventDefault();
      // });
  
      // if(currentSectionIndex === 3){
      //   $(document).find(".form-wrapper .section").first().addClass("is-active");
      //   $(document).find(".steps li").first().addClass("is-active");
      // }

      $('.button_submit').on("click",(e)=>{
        e.stopImmediatePropagation();
        let radio1 = parseInt($('input[name=r1]:checked').val());
        let radio2 = parseInt($('input[name=r2]:checked').val());
        let radio3 = parseInt($('input[name=r3]:checked').val());
        let sum = radio1 + radio2 + radio3;

        $.ajax({
          url: '/triggerCampaign',
          method: "POST",
          contentType: 'application/json',
          processData: false,
          data: JSON.stringify({data: sum}),
          success: function(result){
            Swal.fire({
              type: 'success',
              text: 'Done'
            }).then((data)=>{
              location.reload();
            })
          },
          error: function(error){
            console.log("ERROR");
          }
        })
      
      
    });
      });
  
});
