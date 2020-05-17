<?php 

$url = 'https://maps.foundationcenter.org/api/hip/getTopFunders.php?apiKey=3A50C1D7-82FB-425C-92F1-5B2922288DA7&end_year=2017&top=500';
$data = file_get_contents($url);

$decoded = json_decode($data, true); 

if (isset($_GET["name"])) { 
 foreach ($decoded['data']['results']['rows'] as $info) {
     //php 7.4+ version
   // $formatter = new NumberFormatter('en_US', NumberFormatter::CURRENCY);
   // $money = $formatter->formatCurrency($info['amount'], 'USD');

   //php <7.4 version
   setlocale(LC_MONETARY, 'en_US.UTF-8');
$money = money_format('%.2n', $info['amount']);
$funders = array();
if (preg_match('/' . $_GET["name"] . '/i', $info['name'])) {
 echo '<div class="row"><div class="col-6"><a href=' . $info['url'] . ' target="_blank">' . $info['name'] . '</a></div><div class="col-6 text-right">Annual Funding: ' . $money . '</div></div><br>'; 
 //	echo json_encode($info); //
//$data = array( $info['url'], $info['name'], $info['amount']);
 //echo $info['name'];
//array_push($funders, $data);

}
}
}
if (isset($_POST["autocomplete"])) { 
    $names = array();
    foreach ($decoded['data']['results']['rows'] as $info) {
       // echo $info['name'] . ',';
    array_push($names, $info['name']);
    //var_dump($names[0]);
    }
    echo json_encode($names);
    //echo json_encode($names);
   // echo $data;
}

?>