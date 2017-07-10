<?php
//secure this file
class DatabaseClasses{

	public $Data;
	public $Row;
	public $Key;
	public $Value;

	function DBCon(){
		$host = "localhost";
		$dataBase = "db_jobportal";
		$user = "root";
		$password = "";
		try{
			$PDO = new PDO('mysql:host='.$host.';dbname='.$dataBase, $user, $password);
			return $PDO; $PDO = null;
		}
		catch(PDOExcemption $e){
			echo 'There was an error connecting to your database.<br/>';
			echo 'Error:'.$e->getMessage();
		}
	}

	function PDO_DateAndTime(){
		$Query = DatabaseClasses::PDO_Query("SELECT NOW() AS DateAndTime");
		foreach ($Query as $key => $value) {
			return $value[0];
		}
	}

	function PDO_Queried_RowCount($String){
		$Query = DatabaseClasses::PDO_Query($String);
		return $Query->rowCount();
	} 

	function PDO_Query($QueryString){
		$Data = DatabaseClasses::DBCon();
		$Query = $Data->prepare($QueryString);
		$Query->execute();
		return $Query;
	}

	function PDO_Query2($QueryString){
		$Data = DatabaseClasses::DBCon();
		$Query = $Data->prepare($QueryString);
		return $Query->execute();
	}

	function PDO_SQLQuery($QueryString){
		$Data = DatabaseClasses::DBCon();
		$Query = $Data->prepare($QueryString);
		return $Query;
	}

	function PDO_ShowTable($Table,$Column = "*",$Condition = "*"){
		if($Column == '*' || $Condition == "*"){
			$Array = array();
			$Query = DatabaseClasses::PDO_Query("SELECT * FROM $Table");
			foreach ($Query->fetchAll(PDO::FETCH_NUM) as $key) {
				$Array[] = $key;
			}
			return $Array;
		}
		else{
			$Array = array();
			$Query = DatabaseClasses::PDO_Query("SELECT * FROM $Table WHERE $Column = '$Condition'");
			foreach ($Query->fetchAll(PDO::FETCH_NUM) as $key) {
				$Array[] = $key;
			}
			return $Array;
		}
	}

	function PDO_SQL($SQLString){
		$Array = array();
		$Query = DatabaseClasses::PDO_Query($SQLString);
		foreach ($Query->fetchAll(PDO::FETCH_NUM) as $key) {
			$Array[] = $key;
		}
		return $Array;
	}

	function PDO_RowCount($Table,$Column,$Condition){
		$Query = DatabaseClasses::PDO_Query("SELECT * FROM $Table WHERE $Column = '$Condition'");
		return $Query->rowCount();
	}

	function PDO_ShowRow($Table,$Column,$Condition){
		$Array = array();
		$Query = DatabaseClasses::PDO_Query("SELECT * FROM $Table WHERE $Column = '$Condition'");
		if($Query->rowCount() > 0){
			foreach ($Query->fetch(PDO::FETCH_NUM) as $key => $value) {
				$Array[] = $value;
			}
			return $Array;
		}
	}

	function PDO_TableCounter($Table){
		$Query = DatabaseClasses::PDO_Query("SELECT * FROM $Table'");
		return $Query->rowCount();
	}

	function PDO_IDGenerator($Table,$ID){
		$Status = true;
		for($x=0;$Status == true;$x++){
			$TempID = sha1(DatabaseClasses::PDO_TableCounter($Table)+$x);
			$Query = DatabaseClasses::PDO_RowCount($Table,$ID,$TempID);
			if($Query == 0){
				$Status = false;
			}
		}
		return $TempID;
	}


	function CheckUserLog($Username,$Password){
		if(!isset($Username) && !isset($Password))
			return true;
	}

	function PDO_StudentIDNumberGenerator($Table,$ID){
		$Status = true; $RetString = ""; $Zero = '';
		$Query = DatabaseClasses::PDO_SQLQuery("SELECT * FROM $Table");
		$Query->execute(); $Num = $Query->rowCount();
		for($x=0;$x<5-strlen($Num);$x++){
			$Zero.="0";
		}
		$Year = substr(DatabaseClasses::PDO_DateNow(),2,2);
		$TempNum = $Zero.$Query->rowCount();

		return $Year.'-LN-'.$TempNum;
	}

	function PDO_DateNow(){
		$Query = DatabaseClasses::PDO_SQLQuery("SELECT NOW() as Date");
		$Query->execute();
		return $Query->fetch(PDO::FETCH_NUM)[0];
	}

	function BackUpTable($TableName,$WhereClause = ''){
	    $RetVal = '{"'.$TableName.'":['; $loop = 0;
	    $Query = DatabaseClasses::PDO_SQL2("SELECT COUNT(*) FROM $TableName $WhereClause");
	    $LoopTotal = ceil($Query[0][0] / 50000);
	    for($x=0;$x<$Query[0][0];$x=$x+50000){
	    	$y=$x+50000; $loop++;
	    	if($loop == $LoopTotal){
		    	$RetVal .= DatabaseClasses::DescribeTable($TableName,$x,$y,$WhereClause);
	    	}
		    else{
		    	$RetVal .= DatabaseClasses::DescribeTable($TableName,$x,$y,$WhereClause).',';
		    }
	    }
	    $RetVal .= ']}';
	    return $RetVal;
	}

    function SecureString($String){
        $String = trim($String);
        $String = str_replace(PHP_EOL,"<33>  ",$String);
        $String = str_replace("\n","<33>  ",$String);
        $String = str_replace("\r","<33>  ",$String);
        return $String;
    }    
}
?>