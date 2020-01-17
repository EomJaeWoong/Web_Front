$(document).ready(function(){
	$('#logout').hide();
	$('#manage_btn').hide();
	$('#manage_container').hide();
	
	let login_html_content="<form method='post' class='needs-validation' novalidate>";
	login_html_content += "<input type='hidden' name='marker' value='login' />";
	
	login_html_content += "<div class='form-group pd-1'>";
	login_html_content += "<label for='email'>Email</label>";
	login_html_content += "<input type='email' id='form_email' class='form-control' size='50' placeholder='Email Address' required>";
	login_html_content += "<div class='valid-feedback'>Valid.</div>";
	login_html_content += "<div class='invalid-feedback'>Please fill out email</div>";
	login_html_content += "</div>";
	
	login_html_content += "<div class='form-group pd-1'>";
	login_html_content += "<label for='password'>Password</label>";
	login_html_content += "<input type='password' id='form_pw' class='form-control' size='50' placeholder='password' required>";
	login_html_content += "<div class='valid-feedback'>Valid.</div>";
	login_html_content += "<div class='invalid-feedback'>Please fill password</div>";
	login_html_content += "</div>";
	
	login_html_content += "<div class='form-group form-check pd-1'>";
	login_html_content += "<label class='form-check-label'>";
	login_html_content += "<input class='form-check-input' type='checkbox' name='remember' required> I agree on MYDID's policy.";
	login_html_content += "</label>";
	login_html_content += "<div class='valid-feedback'>Valid.</div>";
	login_html_content += "<div class='invalid-feedback'>Check the policy</div>";
	login_html_content += "</div>";
	
	login_html_content += "<div class='form-group-btn pd-1'>";
	login_html_content += "<button type='button' class='btn btn-primary' id='login_btn'>Sign up</button>";
	login_html_content += "</div>";
	login_html_content += "</form>";
	
	$('#login').html(login_html_content);
	
	////////////////////////////////////////////////////
	////////////////////* chart *///////////////////////
	////////////////////////////////////////////////////
	
	/*
	 * Bar chart
	 */
	let barChart = new Chart($('#bar_chart'), {
		type: 'bar', 
		data: { 
			labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			datasets: [{ 
				label: '# 사용자 연령',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [ 
				                   'rgba(255, 99, 132, 0.2)', 
				                   'rgba(54, 162, 235, 0.2)', 
				                   'rgba(255, 206, 86, 0.2)', 
				                   'rgba(75, 192, 192, 0.2)', 
				                   'rgba(153, 102, 255, 0.2)',
				                   'rgba(255, 159, 64, 0.2)' ], 
				borderColor: [ 
				               'rgba(255, 99, 132, 1)', 
				               'rgba(54, 162, 235, 1)', 
				               'rgba(255, 206, 86, 1)', 
				               'rgba(75, 192, 192, 1)', 
				               'rgba(153, 102, 255, 1)', 
				               'rgba(255, 159, 64, 1)' ],
				borderWidth: 1 
			}] 
		}, 
		options: {
			scales: { 
				yAxes: [{ 
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
	
	/*
	 * Donut Chart
	 */
	// chart colors 
	let colors = ['red','skyblue','yellowgreen','#c3e6cb','#dc3545','#6c757d']; 
	
	let donutOptions = { 
		cutoutPercentage: 30, //도넛두께 : 값이 클수록 얇아짐 
		legend: {
			position:'bottom', 
			padding:5, 
			labels: {
				pointStyle:'circle',
				usePointStyle:true
			}
		} 
	};

	let chDonutData1 = { 
			labels: ['음식점', '공공기관', '은행'],
			datasets: [
			           {
			        	   backgroundColor: colors.slice(0,3),
			        	   borderWidth: 0, 
			        	   data: [74, 11, 40]
			           } 
			           ] 
	};
	
	let chDonut1 = $("#donut_chart"); 
	if (chDonut1) { 
		new Chart(chDonut1, {
			type: 'pie', 
			data: chDonutData1,
			options: donutOptions
		});
	}
	

	////////////////////////////////////////////////////
	//////////////////* click event *///////////////////
	////////////////////////////////////////////////////
	
	/*
	 * manage click
	 */
	$('#manage_btn').click(function(){
		$('#login_jumbotron').hide();
		$('#company_container').hide();
		$('#product_container').hide();
		$('#register_container').hide();
		$('#contact_container').hide();
		
		$('#manage_container').show();
	});
	
	////////////////////////////////////////////////////
	////////////////////* on event *////////////////////
	////////////////////////////////////////////////////
	
	/*
	 * Login btn 눌렀을 때 대한 처리
	 */
	$(document).on('click', '#login_btn', function() {
		let email = $('#form_email').val();
		let pw = $('#form_pw').val();
		
		let chunk = {
				marker : 'login',
				email : email,
				pw : pw
		};
		
		let jsonOBJ = JSON.stringify(chunk);
		
		$.ajax({url:"main", 
			type:"POST", 
			data:jsonOBJ, 
			dataType:"json",
			success:function(returnData){
				if(returnData.resultCode == 1) {
					$('#login_status').html(returnData.message);
					$('#logout').show();
					
					if(email == 'admin@admin.com'){
						$('#manage_btn').show();
					}
					
					$('#login').hide();
				} 
				
				else if(returnData.resultCode == 0){
					alert(returnData.message);
				}
			},
		    error: function(err) {	// 네트워크에서 넘어오는데 문제가 생겼을 때, 여기로 온다
		        alert("error");
		    }
		});
	});
	
	/*
	 * Logout 처리
	 */
	$(document).on('click', "#logout", function() {
		let chunk = {marker : 'logout'};
		let jsonOBJ = JSON.stringify(chunk);
		
		$.ajax({url:"main", 
			type:"POST", 
			data:jsonOBJ, 
			dataType:"json",
			success:function(returnData){
				alert(returnData.message);
				
				$('#manage_container').hide();
				
				$('#login_jumbotron').show();
				$('#company_container').show();
				$('#product_container').show();
				$('#register_container').show();
				$('#contact_container').show();
				
				$('#login').show();
				$('#logout').hide();
			},
		    error: function(err) {	// 네트워크에서 넘어오는데 문제가 생겼을 때, 여기로 온다
		        alert(err);
		    }
		});
		
		$('#login').html(login_html_content);
		$('#login_status').html('');
	});
	
	/*
	 * page 이동 시 스무스하게 이동
	 */
	// Add smooth scrolling to all links in navbar + footer link
	  $(".navbar a, footer a[href='#myDidPage']").on('click', function(event) {

	   // Make sure this.hash has a value before overriding default behavior
	  if (this.hash !== "") {

	    // Prevent default anchor click behavior
	    event.preventDefault();

	    // Store hash
	    var hash = this.hash;

	    // Using jQuery's animate() method to add smooth page scroll
	    // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
	    $('html, body').animate({
	      scrollTop: $(hash).offset().top
	    }, 900, function(){

	      // Add hash (#) to URL when done scrolling (default click behavior)
	      window.location.hash = hash;
	      });
	    } // End if
	  });
	  
	  
	// Disable form submissions if there are invalid fields
	  (function() {
	    'use strict';
	    window.addEventListener('load', function() {
	      // Get the forms we want to add validation styles to
	      var forms = document.getElementsByClassName('needs-validation');
	      // Loop over them and prevent submission
	      var validation = Array.prototype.filter.call(forms, function(form) {
	        form.addEventListener('submit', function(event) {
	          if (form.checkValidity() === false) {
	            event.preventDefault();
	            event.stopPropagation();
	          }
	          form.classList.add('was-validated');
	        }, false);
	      });
	    }, false);
	  })();
////////////////////////////////////////////////////
});