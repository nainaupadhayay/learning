<?php

	$result = $conn->query("select * from user");
	while($row = $result->fetch_assoc()){
		
		echo '<tr>';
		echo "<td>{$row['id']}</td>";
		echo "<td>{$row['name']}</td>";
		echo "<td>{$row['age']}</td>";
		echo "<td>{$row['email']}</td>";
		echo "<td><a href=\"?id={$row['id']}&action=delete\">Delete</a> <a href=\"update.php?id={$row['id']}\" target='_blank'>Update</a></td>";
		echo '</tr>';
		
	}
?>