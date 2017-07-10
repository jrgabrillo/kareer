<?php
//secure this file
include("Functions.php");
session_start();
$function = new DatabaseClasses;
    if(isset($_GET['send-mail'])){
        $data = $_POST['data'];

        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'From: RNR Digital Consultancy <rnrdigitalconsultancy.com>' . "\r\n";
        $receiver = $data[0];
        $subject =  $data[1];
        $message = $data[2];

        $result = mail($receiver,$subject,$message,$headers);
        print_r($result);
    }

    if(isset($_GET['set-leads'])){
        $id = $function->PDO_IDGenerator('tbl_leads','id');
        $date = $function->PDO_DateAndTime();
        $data = $_POST['data'];

        print_r($data);

        // $query = $function->PDO(false,"INSERT INTO tbl_leads(id,name,email,`date`) VALUES ('{$id}','{$data[1]['value']}','{$data[1]['value']}','{$date}')");
        // if($query->execute()){
        //     echo 1;
        // }
        // else{
        //     $Data = $query->errorInfo();
        //     print_r($Data);
        // }
    }

?>