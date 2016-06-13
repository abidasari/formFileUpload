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
      // console.log("Download onclick: api- " + api + " upload- " + upload);
      $("#triggerDialog")[0].click();
      // $("#button-bar-div").css("margin-top", 30);
      // console.log("Download onclick<end>: api- " + api + " upload- " + upload);
  });

  $("#dialogCloseBtn").on("click", function(){
      api = false;
      upload = false;
  });

  $("#dialogDoneBtn").on("click", function(){
      upload = false;
      api = true;
      $('form.step-3 .button-bar .btn').removeClass('disabled');
      $("#uploadFileNameDivP").html("<span style='color: #59a2e7'>UtilitiesAPI will securely share your billing info with us</span>");
  });

  $('form.step-3 .action-button-holder .upload').on("click", function(){
      $('form.step-3 .button-bar .btn').addClass('disabled');
      $("#uploadFileNameDivP").html("");
      $('#upload').click();
  });

  $('#upload').change(function(){

    var fullPath = this.value;
    var filename = fullPath.replace(/^.*[\\\/]/, '');
    console.log("adasarisolar", $('#upload').val());
    if(ValidateSingleInput(filename) && filename!=""){
        $("#uploadFileNameDivP").html("<span style='color: #59a2e7'>File Selected:  </span>" + filename);
        upload = true;
        api = false;
        $('form.step-3 .button-bar .btn').removeClass('disabled');
    } else if(!ValidateSingleInput(filename) && filename!="") {
        $("#uploadFileNameDivP").html("<span style='color: #59a2e7'>Please upload .pdf files only</span>");
        upload = false;
        api = false;
    } else {
        upload = false;
        api = false;
    }
  });

  $("#button-bar-div").on("click", function(){
    console.log("ButtonClicked");
    var disabled = $("#button-bar-div").hasClass("disabled");
    if(api == true && upload == false && !disabled){
      // what to upload to the db?
    } else if (api == false && upload == true && !disabled){
      $("#form-3-submit").click();
      // what to upload to db
    } else {
      $("#uploadFileNameDivP").html("<span style='color: #59a2e7'>We need your billing details to proceed. Please select one of the options above.</span>");
    }
  });

  $(".step-3").on("submit", function(ev){
    // console.log("upload: " + upload + "   api: " + api);
    // console.log("File Submitted!");
    var formData = new FormData();
    var file = $("#upload").prop('files')[0];
    formData.append("FILE", file);
    formData.append("USERID", "USERIDPLACEHOLDER");

    $.ajax({
      url: "uploads.php", // Where to send
      type: "POST", // GET or POST
      dataType: 'text', // What to expect in return from the server
      data: formData,
      success: function(data, textStatus, xhr){
        // console.log("SUCCESS: " + data);
        var pathUploadedTo = toString(data);
      },
      error: function(xhr, textStatus, errThrown){
        console.log("ERROR: " + textStatus);
      },
      processData: false,
      contentType: false
    });

    return false;
  });
});
