<?php

if (isset($_GET['q'])) {
  include_once "./func.php";

  $conn = connDb();
  if (!$conn) {
    header("Internal Server Error", true, 500);
    return;
  }

  $search = $_GET['q'];
  $resData = [];

  $search = mysqli_real_escape_string($conn, trim($search));
  $sql = "SELECT * FROM products WHERE `name` LIKE '%$search%' OR `manifacture` LIKE '%$search%' LIMIT 5 ;";
  $stmt = $conn->prepare($sql);
  // $stmt->bind_param("s", $search);
  if (!$stmt->execute()) {
    header("Internal Server Error", true, 500);
    return;
  }
  $result = $stmt->get_result();
  while ($row = $result->fetch_assoc()) {
    $id = $row['id'];
    $name = $row['name'];
    array_push($resData, [
      "id" => $id,
      "name" => $name,
    ]);
  }


  // $resData = [
  //   [
  //     "url" => "https://www.google.com",
  //     "name" => "Pixel 4",
  //   ],
  //   [
  //     "url" => "./product.php?id=12365",
  //     "name" => "Pixel 7pro",
  //   ],
  //   [
  //     "url" => "./product.php?id=432634",
  //     "name" => $search,
  //   ],
  //   [
  //     "url" => "./product.php?id=23443",
  //     "name" => "RTX 3080 TI",
  //   ]
  // ];

  if (!$resData || !count($resData)) {
    header("Not Found", true, 404);
    return;
  } else {
    echo json_encode($resData);
  }
} else {
  header("Forbidden", true, 403);
}
