<?php

$data = $_POST["data"];
$address = $_POST["address"];
send_email($address, $data);

function send_email($email_addr, $data)
{
  $to = $email_addr;
  $subject = "KnockoutJS Test Data";
  $message = $data;
  $headers = "FROM: The Sender Name <mylsbu001@myuct.ac.za>\r\n";
  $headers .= "Reply-To: mylsbu001@myuct.ac.za\r\n";
  $headers .= "Content-type: text/html\r\n";

  echo $data . <br />
  echo $email_addr

  mail($to, $subject, $message,$headers); //email sent
}
?>
