<?php

function connDb()
{
  try {
    $conn = new mysqli("localhost", "root", "", "shop");
    if ($conn->connect_error || !$conn) {
      return false;
    } else {
      return $conn;
    }
  } catch (\Throwable $th) {
    return false;
  }
}
