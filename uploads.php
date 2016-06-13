<?php
  // if(isset($_POST)){
  //   // print_r("OUT: " . $_POST['test']);
  //   echo "1: ".$_POST['test']."\n";
  //   if(isset($_FILES['upload']))
  //     echo "2: \n";
  // }

  if ( 0 < $_FILES['FILE']['error'] ) {
        echo 'Error: ' . $_FILES['FILE']['error'] . '<br>';
    }
    else {
        move_uploaded_file($_FILES['FILE']['tmp_name'], 'uploads/' . $_FILES['FILE']['name']);
    }

?>
