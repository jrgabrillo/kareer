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

        $name = $function->escape($data[0]['value']);
        $email = $function->escape($data[1]['value']);
        $phone = $function->escape($data[2]['value']);

        $query = $function->PDO(false,"INSERT INTO tbl_leads(id,name,email,phone,`date`) VALUES ('{$id}',{$name},{$email},{$phone},'{$date}')");
        if($query->execute()){

            $subject =  "Kareer PH - Account sign up";
            $message = "<div style='margin:0 auto; padding:20px; text-align:center;font-family:helvetica neue,helvetica,arial,sans-serif; width:500px; border:dashed 1px #ccc;'>
                            <h1>Thank you!</h1>
                            <p>Please keep intouch with this email and website for announcement.</p>
                            <p>For inquiries, please email us at <a href='mailto:info@rnrdigitalconsultancy.com'>info@rnrdigitalconsultancy.com</a></p>
                        </div>";

            $mail = $function->mail($email.', rufo.gabrillo@gmail.com, info@rnrdigitalconsultancy.com',$subject,$message);
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

?>