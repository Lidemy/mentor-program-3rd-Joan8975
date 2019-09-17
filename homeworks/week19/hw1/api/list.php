<?php
// required headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, PATCH');
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json,charset=utf-8');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');

// include database and object files
include_once '../config/conn.php';
include_once '../models/post.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

$requestMethod = $_SERVER["REQUEST_METHOD"];
$handler = new TodoHandler($db,$requestMethod);

switch ($requestMethod) {
	case 'GET':
		if (isset($_GET['id'])) {
			$id = $_GET['id'];
			getOne();
		} else {
			getAll();
		};
		break;
	case 'POST':
		addTodo();
		break;
	case 'PATCH':
		edit();
		break;
	case 'DELETE':
		deleteTodo();
		break;
	default:
		break;
}

// 讀取單一 todo
function getOne() {
	global $handler;
	$handler->id = isset($_GET['id']) ? $_GET['id'] : die();
	$handler->readOne();
	if($handler->content!=null){
		$todo_arr = array(
			"id" =>  $handler->id,
			"content" => $handler->content,
			"done" => $handler->done,
		);
		http_response_code(200);
		echo json_encode($todo_arr);
	}else {
		http_response_code(404);
		echo json_encode(array("message" => "Todo does not exist."));
	}
}

// 獲取所有 todo
function getAll() {
	global $handler;
	$stmt = $handler->read();
	$num = $stmt->rowCount();
	if($num>0){
		$todo_arr=array();
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);
			$todo_item=array(
				"id" => $id,
				"content" => html_entity_decode($content),
				"done" => $done,
			);
			array_push($todo_arr, $todo_item);
		}
		http_response_code(200);
		echo json_encode($todo_arr);
	} 
}

// 新增 todo
function addTodo() {
	global $handler;
	$input = file_get_contents('php://input');
	$array = explode('_', str_replace(array("="),'_',$input));
	$data = urldecode($array[1]);
	$handler->content =  $data;
	if(!empty($data)){
		if($handler->create()){
			http_response_code(201);
			echo json_encode(array("message" => "Todo was created."));
		} else {
			http_response_code(503);
			echo json_encode(array("message" => "Unable to create Todo."));
		}
	} else {
		http_response_code(400);
		echo json_encode(array("message" => "Unable to create Todo. Data is incomplete."));
		echo json_encode($array[1]);
	}
}
// 修改 todo
function edit() {
	global $handler;
	$handler->id = isset($_GET['id']) ? $_GET['id'] : die();
	$input = file_get_contents('php://input');
	$array = explode('_', str_replace(array("="),'_',$input) );

	// 修改 todo 內容
	if (!empty($array[1])) {
		$data = urldecode($array[1]);
		$handler->content = $data;
		if($handler->updateContent()){
			http_response_code(200);
			echo json_encode(array("message" => "Content was changed."));
		} else{
			http_response_code(503);
			echo json_encode(array("message" => "Unable to update content."));
		}

	// 修改 todo 狀態
	} else {
		// echo json_encode(array($array));
		if($handler->updateStatus()){
			http_response_code(200);
			echo json_encode(array("message" => "Status was changed."));
		} else{
			http_response_code(503);
			echo json_encode(array("message" => "Unable to update status."));
		}
	}
}

// 刪除 todo
function deleteTodo(){
		global $handler;
		$handler->id = isset($_GET['id']) ? $_GET['id'] : die();
		if($handler->delete()){
			http_response_code(200);
			echo json_encode(array("message" => "Todo was deleted."));
		}
		else{
			http_response_code(503);
			echo json_encode(array("message" => "Unable to delete Todo."));
		}
}
?>