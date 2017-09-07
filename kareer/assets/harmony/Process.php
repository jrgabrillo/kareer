<?php
session_start();
include("Functions.php");
$Functions = new DatabaseClasses;

    if (isset($_GET['kill-session']))
        { if(isset($_POST["data"])){
            print_r(session_destroy());
            //echo "0";
        }
        else{
            echo "Hacker";
        }
    }

    if(isset($_GET['check-login'])){
        print_r(json_encode($_SESSION['kareer7836']));
    }

    if(isset($_GET['validateEmail'])){
        $data = $_POST['data'];
        $query = $function->PDO(true,"SELECT count(*) FROM tbl_applicant WHERE email = '{$data}'");
        print_r($query[0][0]);
    }    
    if(isset($_GET['send-mail'])){
        $data = $_POST['data'];

        $message = "<div style='text-align: center;width: 500px;position: relative;margin: 0 auto;border-radius: 3px;background: #4485F4;color: #fff;padding: 30px;border-top: yellow solid 10px;top: 50px;box-shadow: 0px 0px 50px #ccc;margin-top: 50px;margin-bottom: 50px;'><b><font size='6'>Welcome to Kareer</font></b><br/><br/><br/>Thank you for registering to Kareer. Here is your&nbsp;system generated password: {$data[1]}&nbsp;<br/><br/><br/>Please change your password as soon as you get in to your account. <br/><br/><br/><br/>Thanks and God bless.</div> ";
        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'From: Kareer' . "\r\n";
        $subject = 'Kareer - Applicant Account Registration';

        $result = mail($data[0],$subject,$message,$headers);
    }

    /*login*/
    if (isset($_GET['login'])){
        $data = $_POST['data']; $flag = 0;
        $password = sha1($data[1]['value']);

        $query = $Functions->PDO("SELECT COUNT(*) FROM tbl_employer  WHERE email = '{$data[0]['value']}' AND password = '{$password}'");
        if($query[0][0]==0){
            $query = $Functions->PDO("SELECT COUNT(*) FROM tbl_admin  WHERE username = '{$data[0]['value']}' AND password = '{$password}'");
            if($query[0][0]==0){
                echo 0;
            }
            else if($query[0][0]==1){
                $_SESSION["kareer7836"] = [$data[0]['value'],$password,'admin'];
                echo 1;
            }
        }
        else if($query[0][0]==1){
            $_SESSION["kareer7836"] = [$data[0]['value'],$password,'employer'];
            echo 1;
        }
    }

    /*getters*/
    if(isset($_GET['get-session'])){
        if(isset($_SESSION['kareer7836']))
            print_r(json_encode($_SESSION['kareer7836']));
        else
            print_r(0);
    }

    if(isset($_GET['get-jobsPosts'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_vacancies ORDER BY date DESC LIMIT 0,6");
        print_r(json_encode($query));
    }

    if(isset($_GET['get-employerJobsPosts'])){
        $data = $_POST['data'];
        $result = [];
        $Query = $Functions->PDO("SELECT * FROM tbl_vacancies WHERE employer_id = '{$data}' ORDER BY date DESC");
        foreach ($Query as $key => $value) {
            $Query2 = $Functions->PDO("SELECT * FROM tbl_application WHERE vacany_id = '{$value[0]}'");
            $result[] = [$value,$Query2];
        }
        print_r(json_encode($result));
    }

    if (isset($_GET['get-account'])){
        $session = $_SESSION['kareer7836'];
        $query = $Functions->PDO("SELECT * FROM tbl_employer  WHERE email = '{$session[0]}' AND password = '{$session[1]}'");
        if(count($query)==0){
            $query = $Functions->PDO("SELECT * FROM tbl_admin  WHERE username = '{$session[0]}' AND password = '{$session[1]}'");
            if(count($query)==0){
                echo 0;
            }
            else if(count($query)==1){
                print_r(json_encode($query));
            }
        }
        else if(count($query)==1){
            print_r(json_encode($query));
        }
    }
     if(isset($_GET['update-image'])){
        if(isset($_POST['data'])){
            $data = $_POST['data'];
            $file = $data[0].'-'.time().'.apr';

            $handle = fopen('../img/profile'.$file, 'w+');

            fwrite($handle, $data[2]);
            fclose($handle);

            if($data[1] == 'employer'){
                $Query = $Functions->PDO("UPDATE tbl_employer SET image = '{$file}' WHERE id = '{$data[0]}'");
            }
            else if($data[1] == 'applicant'){
                $Query = $Functions->PDO("UPDATE tbl_employer SET image = '{$file}' WHERE id = '{$data[0]}'");
            }
<<<<<<< HEAD
            else{
                $Query = $Functions->PDO_SQLQuery("UPDATE tbl_admin SET image = '{$file}' WHERE id = '{$data[0]}'");
=======
            else if($data[1] == 'student'){
                $Query = $Functions->PDO("UPDATE tbl_student SET picture = '{$file}' WHERE id = '{$data[0]}'");
            }
            else{
                $Query = $Functions->PDO("UPDATE tbl_user SET image = '{$file}' WHERE id = '{$data[0]}'");
>>>>>>> fa915bd2fae5a170eaaf8cb2e2aa7814dba1b909
            }

            if($Query->execute())
                echo 1;
            else{
                $Data = $Query->errorInfo();
                print_r($Data);
            }
        }
        else{
            echo "Hacker";
        }
    }

    if(isset($_GET['get-jobByID'])){
        $data = $_POST['data'];
        $result = [];
        $Query = $Functions->PDO("SELECT * FROM tbl_vacancies WHERE id = '{$data}'");
        $Query2 = $Functions->PDO("SELECT * FROM tbl_application WHERE vacany_id = '{$Query[0][0]}'");
        $Query3 = $Functions->PDO("SELECT * FROM tbl_employer WHERE id = '{$Query[0][1]}'");
        $result[] = [$Query[0],$Query2,$Query3[0]];
        print_r(json_encode($result));
    }

    if (isset($_GET['get-allEmployer'])){
        if(isset($_POST["data"])){
            $QueryEmployer = $Functions->PDO("SELECT * FROM tbl_employer ORDER BY status DESC");
            print_r(json_encode($QueryEmployer));
        }
        else{
            echo "Hacker";
        }
    }

    if(isset($_GET['get-job'])){
        if(isset($_POST["data"])){
            $data = $_POST['data'];
            $result = [];
            $Query = $Functions->PDO("SELECT * FROM tbl_vacancies WHERE id = '{$data}'");
            $Query2 = $Functions->PDO("SELECT * FROM tbl_application WHERE vacany_id = '{$Query[0][0]}'");
            $Query3 = $Functions->PDO("SELECT * FROM tbl_employer WHERE id = '{$Query[0][1]}'");
            $result[] = [$Query[0],$Query2,$Query3[0]];
            print_r(json_encode($result));
        }
        else{
            echo "Hacker";
        }
    }
    if (isset($_GET['get-allApplicant'])){
        if(isset($_POST["data"])){
            $QueryEmployer = $Functions->PDO("SELECT * FROM tbl_applicant");
            print_r(json_encode($QueryEmployer));
        }
        else{
            echo "Hacker";
        }
    }

    
    /* setters*/
    if (isset($_GET['set-postJob'])) {
        $data = $_POST['data'];
        $id = $Functions->PDO_IDGenerator('tbl_vacancies','id');
        $date = $Functions->PDO_DateAndTime();
        $data = $_POST['data'];

        $employer_id = $data[0];
        $job_title = $Functions->escape($data[1][0]['value']);
        $vacancy_date = $Functions->escape($data[1][1]['value']);
        $skills = $Functions->escape($data[1][2]['value']);
        $description = $Functions->escape($data[1][3]['value']);

        $query = $Functions->PDO("INSERT INTO tbl_vacancies(id,employer_id,description,vacancy_date,job_title,skills,date,status) VALUES('{$id}',{$employer_id},{$description},{$vacancy_date},{$job_title},{$skills},'{$date}',1)");
        if($query->execute())
            echo 1;
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }
<<<<<<< HEAD
=======
    if(isset($_GET['update-image'])){
        if(isset($_POST['data'])){
            $data = $_POST['data'];
            $file = $data[0].'-'.time().'.apr';

            $handle = fopen('../img/'.$file, 'w+');

            fwrite($handle, $data[2]);
            fclose($handle);

            if($data[1] == 'employer'){
                $Query = $Functions->PDO("UPDATE tbl_employer SET image = '{$file}' WHERE id = '{$data[0]}'");
            }
            else if($data[1] == 'applicant'){
                $Query = $Functions->PDO("UPDATE tbl_employer SET image = '{$file}' WHERE id = '{$data[0]}'");
            }
            else if($data[1] == 'administrator'){
<<<<<<< HEAD
                $Query = $Functions->PDO("UPDATE tbl_admin SET image = '{$file}' WHERE id = '{$data[0]}'");
=======
                $Query = $Functions->PDO_SQLQuery("UPDATE tbl_admin SET image = '{$file}' WHERE id = '{$data[0]}'");
>>>>>>> af503001ee3d02c42e7f85e90ae91aeb3942c85b
            }
            else{
                $Query = $Functions->PDO("UPDATE tbl_user SET image = '{$file}' WHERE id = '{$data[0]}'");
            }

            if($Query->execute())
                echo 1;
            else{
                $Data = $Query->errorInfo();
                print_r($Data);
            }
        }
        else{
            echo "Hacker";
        }
    }
>>>>>>> fa915bd2fae5a170eaaf8cb2e2aa7814dba1b909
    if (isset($_GET['set-registerEmployer'])) {
        if(isset($_POST['data'])){
            $id = $Functions->PDO_IDGenerator('tbl_employer','id');
            $date = $Functions->PDO_DateAndTime();
            $data = $_POST['data'];

            $cname = $data[0][0]['value'];
            $email = $data[0][1]['value'];
            $password = $data[1];
            $password = sha1($data[1]);

            $Query2 = $Functions->PDO("SELECT * FROM tbl_employer WHERE email = '{$email}'");
            $Query1 = $Functions->PDO("SELECT * FROM tbl_applicant WHERE email = '{$email}'");
            if((count($Query1)>0) || (count($Query2)>0)){
                echo 0;
            }
            else{
                $QueryString = "INSERT INTO tbl_employer(id,company_name,email,password,image,status) VALUES('{$id}','{$cname}','{$email}','{$password}','profile avatar.jpg','1')";
                $Query = $Functions->PDO($QueryString);
                if($Query->execute())
                    echo 1;
                else{
                    $Data = $Query->errorInfo();
                    print_r($Data);
                }
            }
        }
        else{
            echo "Hacker";
        }
    }
    if (isset($_GET['do-registerApplicant'])) {
        if(isset($_POST['data'])){
            $id = $Functions->PDO_IDGenerator('tbl_applicant','id');
            $date = $Functions->PDO_DateAndTime();
            $data = $_POST['data'];

            $array = [$data[0][0]['value'],
            $data[0][1]['value'],
            $data[0][2]['value'],
            $data[0][3]['value'],
            $data[0][4]['value'],
            $data[0][5]['value'],
            $data[0][6]['value'],
            $data[0][7]['value'],
            $data[0][8]['value'],
            $data[0][9]['value'],
            $data[0][10]['value'],
            $data[0][11]['value'],
            $data[0][12]['value'],
            $data[0][13]['value'],
            $data[0][14]['value'],
            $data[0][15]['value'],
            $data[0][16]['value'],
            $data[0][17]['value']];

            $array = json_encode($array);
            $applicantID = $data[0][18]['value'];
            $password = $data[1];

            $Query1 = $Functions->PDO("SELECT * FROM tbl_applican    t WHERE id = '{$applicantID}'");
            if((count($Query1)>0)){
                echo 0;
            }
            else{
                $QueryString = "INSERT INTO tbl_applicant(id,description,resume,email,password,picture) VALUES('{$id}','{$applicantID}','{$password}','{$array}','profile avatar.jpg')";
                $Query = $Functions->PDO($QueryString);
                if($Query->execute())
                    echo 1;
                else{
                    $Data = $Query->errorInfo();
                    print_r($Data);
                }
            }
        }
        else{
            echo "Hacker";
        }
    }
    if(isset($_GET['do-updateData'])){
        if(isset($_POST['data'])){
            $date = $Functions->PDO_DateAndTime();
            $data = $_POST['data'];
            if($data[0] == 'admin'){
                if($data[2] == 'Given Name'){
                    $field = 'fname';
                    $val = $data[3];
                }
<<<<<<< HEAD
                else if($data[2] == 'Family Name'){ 
=======
                else if($data[2] == 'Family Name'){
>>>>>>> af503001ee3d02c42e7f85e90ae91aeb3942c85b
                    $field = 'lname';
                    $val = $data[3];
                }
                else if($data[2] == 'Username'){
                    $field = 'username';
                    $val = $data[3];
                    $_SESSION['u7836'] = $val;
<<<<<<< HEAD
                    }
                    else{
=======
                }
                else{
>>>>>>> af503001ee3d02c42e7f85e90ae91aeb3942c85b
                    $field = 'password';
                    $val = sha1($data[3]);
                    $_SESSION['p7836'] = $val;
                }
<<<<<<< HEAD
                $Query = $Functions->PDO_SQLQuery("UPDATE tbl_admin SET {$field} = '{$val}' WHERE id = '{$data[1]}'");
=======
<<<<<<< HEAD
                $Query = $Functions->PDO("UPDATE tbl_user SET {$field} = '{$val}' WHERE id = '{$data[1]}'");
=======
                $Query = $Functions->PDO_SQLQuery("UPDATE tbl_user SET {$field} = '{$val}' WHERE id = '{$data[1]}'");
>>>>>>> af503001ee3d02c42e7f85e90ae91aeb3942c85b
>>>>>>> fa915bd2fae5a170eaaf8cb2e2aa7814dba1b909
                if($Query->execute()){
                    echo 1;
                }
                else{
                    $Data = $Query->errorInfo();
                    print_r($Data);
                }
            }
            else if($data[0] == 'employer'){
                if($data[2] == 'Company'){
                    $field = 'company_name';
                    $val = $data[3];
                }
                else if($data[2] == 'Description'){
                    $field = 'description';
                    $val = $data[3];
                }
                else if($data[2] == 'DTI'){
                    $field = 'dti';
                    $val = $data[3];
                }
                else if($data[2] == 'BIR'){
                    $field = 'bir';
                    $val = $data[3];
                }
                else if($data[2] == 'Given Name'){
                    $field = 'fname';
                    $val = $data[3];
                }
                else if($data[2] == 'Family Name'){
                    $field = 'lname';
                    $val = $data[3];
                }
                else if($data[2] == 'Address'){
                    $field = 'address';
                    $val = $data[3];
                }
                else if($data[2] == 'Contact number'){
                    $field = 'contactno';
                    $val = $data[3];
                }
                else if($data[2] == 'email'){
                    $field = 'username';
                    $val = $data[3];
                    $_SESSION['u7836'] = $val;
                }
                else{
                    $field = 'password';
                    $val = sha1($data[3]);
                    $_SESSION['p7836'] = $val;
                }

<<<<<<< HEAD
                $Query = $Functions->PDO("UPDATE tbl_employer SET {$field} = '{$val}' WHERE id = '{$data[1]}'");
=======
                $Query = $Functions->PDO_SQLQuery("UPDATE tbl_employer SET {$field} = '{$val}' WHERE id = '{$data[1]}'");
>>>>>>> af503001ee3d02c42e7f85e90ae91aeb3942c85b
                if($Query->execute()){
                    echo 1;
                }
                else{
                    $Data = $Query->errorInfo();
                    print_r($Data);
                }
            }
            else if($data[0] == 'student'){
                if($data[2] == 'resume'){
                    $field = 'resume';
                    $val = json_encode([$date,$data[3]]);
                }
                else if($data[2] == 'New Password'){
                    $field = 'password';
                    $val = $data[3];
                    $_SESSION['p7836'] = $val;
                }

<<<<<<< HEAD
                $Query = $Functions->PDO("UPDATE tbl_student SET {$field} = '{$val}' WHERE id = '{$data[1]}'");
=======
                $Query = $Functions->PDO_SQLQuery("UPDATE tbl_student SET {$field} = '{$val}' WHERE id = '{$data[1]}'");
>>>>>>> af503001ee3d02c42e7f85e90ae91aeb3942c85b
                if($Query->execute()){
                    echo 1;
                }
                else{
                    $Data = $Query->errorInfo();
                    print_r($Data);
                }
            }
        }
        else{
            echo "Hacker";
        }
    }
    if(isset($_GET['update-employer'])){
            $data = $_POST['data'];
            // $user = $function->getAdmin();
            // $session = $_SESSION['kaboom'];
            if($data[0]['company_name'] == "field_company"){
                $name = $data[0]['value'];
                $query = $function->PDO(false,"UPDATE tbl_employer SET company_name = '{$name}' WHERE id = '{$user}';");
                if($query->execute()){
                    $log = $function->log2($user,"Company Name is updated to {$name}.","Update");
                    echo 1;
                }
                else{
                    $Data = $query->errorInfo();
                    print_r($Data);
                }
            }
            else if($data[0]['name'] == "field_Email"){
                $email = $data[0]['value'];
                $query = $function->PDO(false,"UPDATE tbl_employer SET email = '{$email}' WHERE id = '{$user}';");
                if($query->execute()){
                    $log = $function->log2($user,"Email Updated","Update");
                    echo 1;
                }
                else{
                    $Data = $query->errorInfo();
                    print_r($Data);
                }
            }
            else if($data[0]['name'] == "field_Username"){
                $username = $data[0]['value'];
                $query = $function->PDO(false,"UPDATE tbl_employer SET username = '{$username}' WHERE id = '{$user}';");
                if($query->execute()){
                    $_SESSION["kaboom"] = [$username,$session[1],$session[2]];
                    $log = $function->log2($user,"Username Updated","Update");
                    echo 1;
                }
                else{
                    $Data = $query->errorInfo();
                    print_r($Data);
                }
            }
            else if($data[0]['name'] == "field_Password"){
                $password = sha1($data[0]['value']);
                $query = $function->PDO(false,"UPDATE tbl_employer SET password = '{$password}' WHERE id = '{$user}';");
                if($query->execute()){
                    $_SESSION["kaboom"] = [$session[0],$password,$session[2]];
                    $log = $function->log2($user,"Password updated","Update");
                    echo 1;
                }
                else{
                    $Data = $query->errorInfo();
                    print_r($Data);
                }
            }
        }
    if (isset($_GET['set-declinePendingEmployer'])){
        if(isset($_POST["data"])){
            $data = $_POST['data'];

            $Query = $Functions->PDO("UPDATE tbl_employer SET status = '2' WHERE id = '{$data}'");
            if($Query->execute())
                echo 1;
            else{
                $Data = $Query->errorInfo();
                print_r($Data);
            }
        }
        else{
            echo "Hacker";
        }
    }
    if (isset($_GET['set-acceptPendingEmployer'])){
        if(isset($_POST["data"])){
            $data = $_POST['data'];

            $Query = $Functions->PDO("UPDATE tbl_employer SET status = '1' WHERE id = '{$data}'");
            if($Query->execute())
                echo 1;
            else{
                $Data = $Query->errorInfo();
                print_r($Data);
            }
        }
        else{
            echo "Hacker";
        }
    } 
    if (isset($_GET['set-deactivateApplicant'])){
        if(isset($_POST["data"])){
            $data = $_POST['data'];

            $Query = $Functions->PDO_SQLQuery("UPDATE tbl_applicant SET status = '0' WHERE id = '{$data}'");
            if($Query->execute())
                echo 1;
            else{
                $Data = $Query->errorInfo();
                print_r($Data);
            }
        }
        else{
            echo "Hacker";
        }
    }
    if (isset($_GET['set-activateApplicant'])){
        if(isset($_POST["data"])){
            $data = $_POST['data'];

            $Query = $Functions->PDO_SQLQuery("UPDATE tbl_applicant SET status = '1' WHERE id = '{$data}'");
            if($Query->execute())
                echo 1;
            else{
                $Data = $Query->errorInfo();
                print_r($Data);
            }
        }
        else{
            echo "Hacker";
        }
    } 


/*
    if(isset($_GET['get-jobsPosts'])){
        if(isset($_POST["data"])){
            $data = $_POST['data'];
            $result = [];
            $Query = $Functions->PDO("SELECT * FROM tbl_vacancies ORDER BY date DESC");
            foreach ($Query as $key => $value) {
                $Query2 = $Functions->PDO("SELECT * FROM tbl_application WHERE vacany_id = '{$value[0]}'");
                $result[] = [$value,$Query2];
            }
            print_r(json_encode($result));
        }
        else{
            echo "Hacker";
        }
    }
*/
    if(isset($_GET['deactivate-employer'])){
                // $user = $function->getUser();
                $data = $_POST['data'];
                $query = $function->PDO(false,"UPDATE tbl_employer SET status = '0' WHERE id = '{$data[0]}';");
                if($query->execute()){
                    $log = $function->log2($user,$data[1],"Deactivate");
                    echo 1;
                }
                else{
                    $Data = $query->errorInfo();
                    print_r($Data);
                }
    }
     if(isset($_GET['activate-employer'])){
                // $user = $function->getUser();
                $data = $_POST['data'];
                $query = $function->PDO(false,"UPDATE tbl_employer SET status = '1' WHERE id = '{$data}';");
                if($query->execute()){
                    $log = $function->log2($user,"Activating employer account","Active");
                    echo 1;
                }
                else{
                    $Data = $query->errorInfo();
                    print_r($Data);
                }
    }
?> 
