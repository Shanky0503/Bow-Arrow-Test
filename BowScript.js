 var arrowPrefab: Rigidbody;   
 var ArrowSpeed = 100.0;
 var fireRate = 1.5;
 var nextFire = 0.0;
 var pullStartTime = 0.0;
 var pullTime = 0.5;
 var falsePull : boolean;
 var maxStrengthPullTime = 1.5; // how long to hold button until max strength reached

 // var arrow : Rigidbody;

 function Start()
 {
 	falsePull = false;
 }
 function Update ()
 {

	 // pull back string
	 
	 if(Input.GetMouseButtonDown(0))
	 {
	 	if(Time.time > nextFire) {
	 		pull();
	 	}
	 	else {
	 		falsePull = true;
	 	}
	 }
	 
	 // fire arrow
	 
	 if(Input.GetMouseButtonUp(0))
	 { //your way wouldn't work right, since you just increased nextFire
		 if(!falsePull)
		 {
			 nextFire = Time.time + pullTime; // this is the actual fire rate as things stand now
			 GetComponent.<Animator>().Play("String_Release");
			 
			 var timePulledBack = Time.time - pullStartTime; // this is how long the button was held
			 if(timePulledBack > maxStrengthPullTime) // this says max strength is reached 
			 timePulledBack = maxStrengthPullTime; // max strength is arrowSpeed * maxStrengthPullTime
			 var arrowSpeed = ArrowSpeed * timePulledBack; // adjust speed directly using pullback time
			 
			 var arrow = Instantiate(arrowPrefab,GameObject.Find("FIREPOINT").transform.position, GameObject.Find("FIREPOINT").transform.rotation);
			 Debug.Log(arrow.mass);
			 // Physics.IgnoreCollision(arrowPrefab.GetComponent.<Collider>(), transform.root.GetComponent.<Collider>());

			 arrow.AddRelativeForce(transform.left * arrowSpeed, ForceMode.Acceleration ); // adjusted speed
		 }
		 else {
		 	falsePull = false;
		 }
	 };

	
 }
 var pull = function() {
	 	nextFire = Time.time + fireRate; // this line is unnecessary, since you are going to change it onMouseUp
		GetComponent.<Animator>().Play("String_Pull");
		pullStartTime = Time.time; //store the start time
};