$(document).ready(() => {

				$('#search').click(function(){
					getAllDetails();
				});
			});

	let getAllDetails = () =>  {
		let id=$('#id').val();
		let title=$('#title').val();
		let year=$('#year').val();
		if(id == '' && title == '' && year == '')
			alert("Field is empty");
		else
		$.ajax({
			type:'GET',
			dataType:'json',
			url:"https://www.omdbapi.com/?apikey=203dc767&i="+id+"&t="+title+"&y="+year+"",
			success: (data) =>{
				//console.log(data);
				if(data.Response=='False'){
					alert(data.Error);
				}
				else{
				let source="";
				let value="";
				for(i=0;i<data.Ratings.length;i++){
				source+=data.Ratings[i].Source+",";
				value+=data.Ratings[i].Value+",";
				}
				source=source.slice(0,-1)
				value=value.slice(0,-1)
				let image;
				if(data.Poster =='')
					image='common-img.jpg';
				else
					image=data.Poster;

				let resultRow="<div class='row'><div class='col-lg-4 col-sm-4 col-md-4 col-xs-12'><img class='card-img-top' src="+image+" alt='Card image cap'></div><div class='col-lg-8 col-md-8 col-sm-12 col-xs-12'><h3>"+data.Title+"</h3><p class='desc'>"+data.Plot+"</p><div class='row'><div class='col-6'><span><b>Actors:&nbsp;</b>"+data.Actors+"</span><span><b>Awards:&nbsp;</b>"+data.Awards+"</span><span><b>BoxOffice:&nbsp;</b>"+data.BoxOffice+"</span><span><b>Country:&nbsp;</b>"+data.Country+"</span><span><b>DVD:&nbsp;</b>"+data.DVD+"</span><span><b>Director:&nbsp;</b>"+data.Director+"</span><span><b>Genre:&nbsp;</b>"+data.Genre+"</span><span><b>Language:&nbsp;</b>"+data.Language+"</span><span><b>Metascore:&nbsp;</b>"+data.Metascore+"</span><span><b>Production:&nbsp;</b>"+data.Production+"</span><span><b>Rated:&nbsp;</b>"+data.Rated+"</span></div><div class='col-6'><span><b>Ratings:&nbsp;Source:</b></span><span>"+source+"</span><span><b>Value:&nbsp;</b>"+value+"</span><span><b>Released:&nbsp;</b>"+data.Released+"</span><span><b>Runtime:&nbsp;</b>"+data.Runtime+"</span><span><b>Type:&nbsp;</b>"+data.Type+"</span><span><b>Website:&nbsp;</b>"+data.Website+"</span><span><b>Writer:&nbsp;</b>"+data.Writer+"</span><span><b>Year:&nbsp;</b>"+data.Year+"</span><span><b>imdbID:&nbsp;</b>"+data.imdbID+"</span><span><b>imdbRating:&nbsp;</b>"+data.imdbRating+"</span><span><b>imdbVotes:&nbsp;</b>"+data.imdbVotes+"</span></div></div></div>";
				$('.cards').html(resultRow);
			}				

			},
			error: (data) =>{
				
			},

			beforeSend:() =>{
				let loader='<div class="container"><div class="row"><div class="text-center"><h2>Creative Animated Loading icon in HTML5 CSS3</h2></div><div class="animationload"><div class="osahanloading"></div></div></div></div>';
				$('.loader').html(loader);
			},
			complete: () =>{
				$('.cards').css('display','block');
				$('.loader').css('display','none');
			}
		});
	}