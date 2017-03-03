<?php

$fileToFlv = 'inputfile.mp4';
$fileFlv = 'output.mp4';
$Flvjpg = 'cover.jpg';


$command = "/usr/bin/ffmpeg" . ' -i ' . $fileToFlv . ' -vstats 2>&1';
$output = shell_exec ( $command );

$result = ereg ( '[0-9]?[0-9][0-9][0-9]x[0-9][0-9][0-9][0-9]?', $output, $regs );

$vals = (explode ( 'x', $regs [0] ));
$width = $vals [0] ? $vals [0] : null;
$height = $vals [1] ? $vals [1] : null;
$info = array ('width' => $width, 'height' => $height );

//$s_vid_conv_cmd = "/usr/bin/ffmpeg -i ".$fileToFlv." -ar 22050 -f mp4 ".$fileFlv;
//$s_vid_conv_cmd = "/usr/bin/ffmpeg -i ".$fileToFlv." -sameq -s 1920x1280 ".$fileFlv;

$s_vid_conv_cmd = "/usr/bin/ffmpeg -i inputfile.mp4 -i logo8.png  -filter_complex 'overlay=10:10' outpu.mp4";

$x= exec($s_vid_conv_cmd,$error);

var_dump($x);
var_dump($error);

//exec("/usr/bin/ffmpeg -i ".$fileToFlv." -vframes 1 -ss 00:00:10 -s 320x180 -f image2 ".$Flvjpg);