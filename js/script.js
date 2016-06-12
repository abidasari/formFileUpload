var upload = false;
var api = false;
var OK = false;

var _validFileExtensions = [".pdf"];
function ValidateSingleInput(oInput) {
    var sFileName = oInput;
     if (sFileName.length > 0) {
        var blnValid = false;
        for (var j = 0; j < _validFileExtensions.length; j++) {
            var sCurExtension = _validFileExtensions[j];
            if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                blnValid = true;
                break;
            }
        }
        if (!blnValid) {
            return false;
        }
    }
    return true;
}


$(document).ready(function (){
  /*step-3 function*/

  var upload = false;
  var api = false;
  var OK = false;

  $('form.step-3 .action-button-holder .download').click(function(){
      console.log("Download onclick: api- " + api + " upload- " + upload);
      $("#triggerDialog")[0].click();
      $("#button-bar-div").css("margin-top", 30);
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
      $('form.step-3 .button-bar .btn').removeClass('disabled');
      $("#uploadFileNameDivP").html("<span style='color: #59a2e7'>UtilitiesAPI will securely share your billing info with us</span>");
  });


  $('form.step-3 .action-button-holder .upload').on("click", function(){
      console.log("Upload onclick: api- " + api + " upload- " + upload);
      $("#uploadFileNameDivP").html("");
      if(upload === true || api === true)
          $('form.step-3 .button-bar .btn').addClass('disabled');
      $('#upload').click();
      console.log("Upload onclick<end>: api- " + api + " upload- " + upload);
  });

  $('#upload').change(function(){
      console.log("upload change: api- " + api + " upload- " + upload);

      var fullPath = this.value;
      var filename = fullPath.replace(/^.*[\\\/]/, '');
      console.log("adasarisolar", $('#upload').val());
      if(ValidateSingleInput(filename) && filename!=""){
          $("#uploadFileNameDivP").html("<span style='color: #59a2e7'>File Selected:  </span>" + filename);
          upload = true; api = false;
          $('form.step-3 .button-bar .btn').removeClass('disabled');
      }
      else {
          $("#uploadFileNameDivP").html("<span style='color: #59a2e7'>Please upload .pdf files only</span>");
          upload = false; api = false;
      }
      console.log("upload change<end>: api- " + api + " upload- " + upload);
  });

  $("#button-bar-div").on("click", function(){
      console.log("ButtonClicked");
      $("#form-3-submit").click();
  });

  $(".step-3").on("submit", function(ev){
      console.log("File Submitted!");
      var formData = new FormData($(".step-3"));
      var files = document.getElementById("upload");
      formData.append("BillFileField", files[0]);
      $


      var oReq = new XMLHttpRequest();
      oReq.open("POST", "uploads.php", true);
      oReq.onload = function(oEvent) {
        if (oReq.status == 200) {
          console.log("UPLOADED!!!");
        } else {
          console.log("Error " + oReq.status + " occurred when trying to upload your file.");
        }
      };
      oReq.send(formData);


      ev.preventDefault();
  });
});
