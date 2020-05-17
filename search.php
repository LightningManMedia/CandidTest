<?php 

$url = 'https://maps.foundationcenter.org/api/hip/getTopFunders.php?apiKey=3A50C1D7-82FB-425C-92F1-5B2922288DA7&end_year=2017&top=500';
$data = file_get_contents($url);

$decoded = json_decode($data, true); 

if (isset($_GET["name"])) { 
    $funderData = array();
        foreach ($decoded['data']['results']['rows'] as $info) {
            if (preg_match('/' . $_GET["name"] . '/i', $info['name'])) {
                $data = array( $info['url'], $info['name'], $info['amount']);
                array_push($funderData, $data);
            }
        }
    echo json_encode($funderData);
}
if (isset($_POST["autocomplete"])) { 
    $names = array();
        foreach ($decoded['data']['results']['rows'] as $info) {
            array_push($names, $info['name']);
        }
    echo json_encode($names);
}

?>