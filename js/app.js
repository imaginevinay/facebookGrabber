$(document).ready(function(){

$(".indicator").show();
$(".firstHide").hide();

function getResponse(){

var fbToken= $("input").val();

	
	$.ajax('https://graph.facebook.com/me?fields=hometown,email,about,birthday,education,name,location,work&access_token='+fbToken,{

success : function(response){

$(".hideArea").hide();
$(".firstHide").show();
console.log(response);
console.log(typeof(response));
$('#image').attr("src", "https://graph.facebook.com/"+response.id+"/picture?type=normal&height=400&width=400");
$("#name").text("Name: "+response.name);
$("#hometown").text("Hometown: "+response.hometown.name);
$("#email").text("Email: "+response.email);
$("#about").text("About: "+response.about);
$("#birthday").text("Birthday: "+response.birthday);
$("#education").text("Education: "+response.education[0].school.name);
$("#location").text("Location: "+response.location.name);
$("#work").text("Work: "+response.work[0].employer.name);



},//end of success

error:function(request,errorType,errorMessage){

			console.log(request);
			console.log(errorType);
			console.log(errorMessage);
			alert("Token expired! Please enter a valid token");
		},

		timeout:3000,
		beforeSend:function(){
			$(".indicator").show();
		},

		complete:function(){
			$(".indicator").hide();
		}


	});//1st ajax end

$.ajax('https://graph.facebook.com/me/posts?limit=16&access_token='+fbToken,{

success : function(response){
	$.each(response.data,function(i,val){

		var j=i+1;
	console.log(j);
	if(val.message)
	{
		$("#posts").append('<div class="container"><div class="row"><h4>Post'+j+'</h4><h6 class="text-muted">Created Time : '+val.created_time+'</h6><p>Message : '+val.message+'</p><a href="#" class="card-link">Post ID : '+val.id+'</a></div><hr></div>');
	}//end of if

	else {
			$("#posts").append('<div class="container"><div class="row"><h4>Post'+j+'</h4><h6 class="text-muted">Created Time : '+val.created_time+'</h6><p>Story : '+val.story+'</p><a href="#" class="card-link">Post ID : '+val.id+'</a></div><hr></div>');

	} //end of else

	});//end of each
}, //end of success

		error:function(request,errorType,errorMessage){

			console.log(request);
			console.log(errorType);
			console.log(errorMessage);
			alert("Token expired! Please enter a valid token");
		},

		timeout:3000,
		beforeSend:function(){
			$(".indicator").show();
		},

		complete:function(){
			$(".indicator").hide();
		}

	});//end of 2nd ajax

}//end of getResponse

	$("button").on("click",getResponse);


});//document ready end

