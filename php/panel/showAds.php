<?php 

	include '../conn.php';


	$cons = "SELECT * FROM ads";
	$result = $conn->query($cons);
	if ($result->num_rows > 0) {	

	while ($row = $result->fetch_assoc()) {

		$id = $row['id'];
		$title = $row['title'];
		$url = $row['url'];
		$img = $row['img'];

		echo "

			<tr>
	            <td>{$id}</td>
	            <td>{$title}</td>
	            <td><a href='{$url}'>{$url}</a></td>
	            <td><img style='width:100px' src='{$img}'></td>
	            <td>
					<div class='btn-flat' ondblclick='deleteAd({$id})'>
						<i class='material-icons'>delete</i>
					</div>
	            </td>
	        </tr>

		";

	}
}

 ?>