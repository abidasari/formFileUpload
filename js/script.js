var upload = false;
var api = false;
var OK = false;

$(document).ready(function (){
  $('form.step-3 .action-button-holder .upload').on("click", function(){
      console.log("Upload onclick: api- " + api + " upload- " + upload);
      $('#upload').click();
      console.log("Upload onclick<end>: api- " + api + " upload- " + upload);
  });

  $('form.step-3 .action-button-holder .download').click(function(){
      console.log("Download onclick: api- " + api + " upload- " + upload);
      $("#triggerDialog")[0].click();
      $("#button-bar-div").css("margin-top", 30);

      //get data from the iframe?!?!??!
      //also validate the "continue" button disabling

      $('form.step-3 .button-bar .btn').removeClass('disabled');
      console.log("Download onclick<end>: api- " + api + " upload- " + upload);
  });

  $("#dialogCloseBtn").on("click", function(){
      api = false;
  });

  $("#dialogDoneBtn").on("click", function(){
      if(upload === true){
          api = true;
          upload = false;
      }
      if(upload === false){
          api = true;
      }
  });

  $('#upload').change(function(){
      console.log("upload change: api- " + api + " upload- " + upload);
      upload = true;
      $('form.step-3 .button-bar .btn').removeClass('disabled');
      console.log("here", this.value);
      var fullPath = this.value;
      var filename = fullPath.replace(/^.*[\\\/]/, '');
      console.log("here", fullPath);
      $("#uploadFileNameDivP").html("<span style='color: #59a2e7'>File Selected:  </span>" + filename);
      console.log("upload change<end>: api- " + api + " upload- " + upload);
  });
});
