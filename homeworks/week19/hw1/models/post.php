<?php
	class TodoHandler{
    // database connection and table name
	private $conn;
	private $table_name = "TodoList_contents";
	private $requestMethod;
 
    // object properties
    public $id;
    public $content;
	public $done;
 
    // constructor with $db as database connection
    public function __construct($db, $requestMethod){
		$this->conn = $db;
		$this->requestMethod = $requestMethod;
	}

	// read all
	function read(){
		$query = "SELECT * FROM " . $this->table_name . " ORDER BY id DESC";
		$stmt = $this->conn->prepare($query);
		$stmt->execute();
		return $stmt;
	}

	// read one
	function readOne(){
	$query = "SELECT * FROM " . $this->table_name . " WHERE id = ?";
	$stmt = $this->conn->prepare( $query );
	$stmt->bindParam(1, $this->id);
	$stmt->execute();
	$row = $stmt->fetch(PDO::FETCH_ASSOC);
	$this->content= $row['content'];
	$this->done= $row['done'];
	}

	// create
	function create(){
		$query = 'INSERT INTO ' . $this->table_name . '
		(content) VALUES (:content)';
		$stmt = $this->conn->prepare($query);
		$this->content=htmlspecialchars(strip_tags($this->content));
		$stmt->bindParam(":content", $this->content);
		if($stmt->execute()){
			return true;
		}
		return false;
	}

	// update status
	function updateStatus(){
		$query = "UPDATE " . $this->table_name . "
		SET done = (
		CASE WHEN done = 0 THEN 1
		WHEN done = 1 THEN 0
		ELSE done end)
		WHERE id = ?";
		$stmt = $this->conn->prepare($query);
		$this->id=htmlspecialchars(strip_tags($this->id));
		$stmt->bindParam(1, $this->id);
		if($stmt->execute()){
			return true;
		}
		return false;
	}

	// update content
	function updateContent(){
		$query = "UPDATE " . $this->table_name . "
		SET 
			content= :content  
		WHERE id = :id";
		$stmt = $this->conn->prepare($query);
		$this->content=htmlspecialchars(strip_tags($this->content));
		$this->id=htmlspecialchars(strip_tags($this->id));
		$stmt->bindParam(":content", $this->content);
		$stmt->bindParam(":id", $this->id);
		if($stmt->execute()){
			return true;
		}
		return false;
	}
	// delete
	function delete(){
		$query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
		$stmt = $this->conn->prepare($query);
		$this->id=htmlspecialchars(strip_tags($this->id));
		$stmt->bindParam(1, $this->id);
		if($stmt->execute()){
			return true;
		}
		return false;
	}
}
?>