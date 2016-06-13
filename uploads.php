<?php

$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["FILE"]["name"]);
$uploadOk = 1;
$pdfFileType = pathinfo($target_file, PATHINFO_EXTENSION);

// Check if pdf file is a actual pdf or fake pdf

// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

// Check file size
if ($_FILES["FILE"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Allow certain file formats
if($pdfFileType != "pdf" ) {
    echo "Sorry, only PDF files are allowed.";
    $uploadOk = 0;
}

if($uploadOk == 0){
  echo "Sorry your file was not uploaded. Please try again.";
} else {
  if ( 0 < $_FILES['FILE']['error'] ) {
    echo 'Error: ' . $_FILES['FILE']['error'] . '<br>';
  }
  else {
    move_uploaded_file($_FILES['FILE']['tmp_name'], 'uploads/' . $_POST['USERID'] . '.pdf');
  }
}
?>
