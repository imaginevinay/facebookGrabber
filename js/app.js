$(document).ready(function() {

    $(".firstHide").hide();


    function getResponse() {

            var fbToken = $("input").val();


            $.ajax('https://graph.facebook.com/me?fields=about,hometown,id,name,first_name,last_name,birthday,languages,gender,education,work,relationship_status,quotes,family,website,email,picture.width(600).height(600),cover&access_token=' + fbToken, {

                success: function(response) {

                    $(".hideArea").hide();
                    $(".jumbotron").hide();
                    $(".profile-details").show();

                    //to switch over profile details and Feeds.

                    $(".btn-success").click(function() {
                        $(".profile-details").fadeOut(1000);
                        $(".recent-feed").fadeIn(2000);
                    });

                    console.log(response);
                    console.log(typeof(response));
                    $('#cover').attr("src", "" + response.cover.source + "");
                    $('#profile').attr("src", "" + response.picture.data.url + "");

                    $("#name").text("Name: " + response.name);
                    $("#hometown").text("Hometown: " + response.hometown.name);
                    $("#email").text("Email: " + response.email);
                    $("#birthday").text("Birthday: " + response.birthday);

                }, //end of success

                error: function(request, errorType, errorMessage) {

                    console.log(request);
                    console.log(errorType);
                    console.log(errorMessage);
                    alert("Token expired! Please enter a valid token");
                },

                timeout: 3000,
                beforeSend: function() {
                    $(".indicator").show();
                },

                complete: function() {
                    $(".indicator").hide();
                }


            }); //1st ajax end

            $.ajax('https://graph.facebook.com/me/posts?limit=16&access_token=' + fbToken, {

                success: function(response) {
                    $.each(response.data, function(i, val) {

                        var j = i + 1;
                        console.log(j);
                        console.log(val);
                        if (val.message) {
                            $("#posts").append(`
<h4>Post : ${j}</h4>
<h6 class="text-muted">Created Time :${val.created_time}</h6>
<p>Message : ${val.message} </p>
<p><a href="#" class="card-link">Post ID :${val.id}</a></p>
<br>
<hr>
`);

                        } //end of if
                        else {
                            $("#posts").append(`
<h4>Post : ${j}</h4>
<h6 class="text-muted">Created Time :${val.created_time}</h6>
<p>Message : ${val.story} </p>
<p><a href="#" class="card-link">Post ID :${val.id}</a></p>
<br>
<hr>

`);
                        } //end of else

                    }); //end of each
                }, //end of success

                error: function(request, errorType, errorMessage) {

                    console.log(request);
                    console.log(errorType);
                    console.log(errorMessage);
                    alert("Token expired! Please enter a valid token");
                },

                timeout: 3000,
                beforeSend: function() {
                    $(".indicator").show();
                },

                complete: function() {
                    $(".indicator").hide();
                }

            }); //end of 2nd ajax

        } //end of getResponse

    $(".submit").on("click", getResponse);


}); //document ready end