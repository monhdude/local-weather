
//get geo location
       

$(document).ready(function(){
  var lat = 0;
  var long = 0;
  if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(position){
            lat = position.coords.latitude;
            long = position.coords.longitude;
            $("#latitude").text(lat);
            $("#longitude").text(long);
            $("body").fadeIn();
            console.log(lat);
            console.log(long);
            
            //AJAX Google Location Call Start
            
            $.ajax({
                url:"https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyB58XCKxMTY-80SebTdzfMh_pmrsmkjWeA",
                success:function(data){
                  console.log("success");
                  var address = data.results[0].formatted_address.split(",")
                  var city = address[1];
                  var state_zip = address[2];
                  var state = state_zip.split(" ")[1];
                  if(state === "CA"){
                    state = "California";
                  }
                  console.log(state_zip);
                  var location = city +","+ state_zip;
                  $("#city>h5").text(location);
                  
                  
                  //Google CE Image API Start
            $.ajax({
                  url:"https://www.googleapis.com/customsearch/v1?key=AIzaSyAAyGUkZNj-7Y88B6BulFB1Vue5BYxB7HI&cx=009908422013309023815:dlnmmdilvdq&searchType=image&q="+city+" "+state,
                  success:function(data){
                    $("body").css("background-image","url("+data.items[0].link+")");
                  
                  },
                fail:function(){console.log("Fail");}
            });
                  
                  
                },
                fail:function(){console.log("fail");}

              });
            //AJAX Call end
            
            //AJAX Weather Start
            $.ajax({
              url:"https://api.wunderground.com/api/fff3ce5fd0ef3f69/hourly/q/"+lat+","+long+".json",
              success:function(data){
                console.log("success");
                var temp = data.hourly_forecast[0].temp.english;
                var condition = data.hourly_forecast[0].condition;
                var wind_speed = data.hourly_forecast[0].wspd.english;
                var wind_dir = data.hourly_forecast[0].wdir.dir;
                var icon = data.hourly_forecast[0].icon_url;

                $("#degrees").html(temp + '&#8457;');
                $("#condition>h6").html(condition);
                $("#wind-speed").text(wind_speed);
                $("#wind-dir").text(wind_dir);
                $("#icon").attr("src",icon);
              },
              fail: function(){console.log("fail");}

            });
            //AJAX Weather End
            
            

          });
       } else{
          console.log("Geolocation not supported");
       }
        
  
});