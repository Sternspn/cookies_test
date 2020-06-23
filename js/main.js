var globalspeed = 2000;
function loadmap() {
	let tablebody = $(".map");
	tablebody.width($(document).width()*2);
	tablebody.height($(document).height()*2);
	for (var i = 0; i < 20; i++) {
		if (i == 0 || i == 19) {
			tablebody.append(`<tr>
				<td class='empty border' dataX=1 dataY=${i+1}></td><td class='empty border' dataX=2 dataY=${i+1}></td><td class='empty border' dataX=3 dataY=${i+1}></td><td class='empty border' dataX=4 dataY=${i+1}></td><td class='empty border' dataX=5 dataY=${i+1}></td>
				<td class='empty border' dataX=6 dataY=${i+1}></td><td class='empty border' dataX=7 dataY=${i+1}></td><td class='empty border' dataX=8 dataY=${i+1}></td><td class='empty border' dataX=9 dataY=${i+1}></td><td class='empty border' dataX=10 dataY=${i+1}></td>
				<td class='empty border' dataX=13 dataY=${i+1}></td><td class='empty border' dataX=14 dataY=${i+1}></td><td class='empty border' dataX=15 dataY=${i+1}></td><td class='empty border' dataX=14 dataY=${i+1}></td><td class='empty border' dataX=15 dataY=${i+1}></td>
				<td class='empty border' dataX=16 dataY=${i+1}></td><td class='empty border' dataX=17 dataY=${i+1}></td><td class='empty border' dataX=18 dataY=${i+1}></td><td class='empty border' dataX=19 dataY=${i+1}></td><td class='empty border' dataX=20 dataY=${i+1}></td>
			</tr>`)
		} else {
			tablebody.append(`<tr>
				<td class='empty border' dataX=1 dataY=${i+1}></td><td class='empty' dataX=2 dataY=${i+1}></td><td class='empty' dataX=3 dataY=${i+1}></td><td class='empty' dataX=4 dataY=${i+1}></td><td class='empty' dataX=5 dataY=${i+1}></td>
				<td class='empty' dataX=6 dataY=${i+1}></td><td class='empty' dataX=7 dataY=${i+1}></td><td class='empty' dataX=8 dataY=${i+1}></td><td class='empty' dataX=9 dataY=${i+1}></td><td class='empty' dataX=10 dataY=${i+1}></td>
				<td class='empty' dataX=13 dataY=${i+1}></td><td class='empty' dataX=14 dataY=${i+1}></td><td class='empty' dataX=15 dataY=${i+1}></td><td class='empty' dataX=14 dataY=${i+1}></td><td class='empty' dataX=15 dataY=${i+1}></td>
				<td class='empty' dataX=16 dataY=${i+1}></td><td class='empty' dataX=17 dataY=${i+1}></td><td class='empty' dataX=18 dataY=${i+1}></td><td class='empty' dataX=19 dataY=${i+1}></td><td class='empty border' dataX=20 dataY=${i+1}></td>
			</tr>`)
		}
	};
	let tablemass = $(".map td:not('.border')");
	for (var a = 0; a < 100; a++) {
		let min = 2;
		let max = 19;
		getplace();
		function getplace() {
			let rand1 = Math.floor(min + Math.random() * (max + 1 - min));
	  		let rand2 = Math.floor(min + Math.random() * (max + 1 - min));
	  		let checkedplace = tablemass.filter(function(index){
	  			return ($(this).attr('dataX') == rand1 && $(this).attr('dataY') == rand2)
	  		});
	  		if (checkedplace.length) {
	  			if ($(checkedplace[0]).hasClass('empty')) {
	  				$(checkedplace[0]).removeClass('empty');
	  				$(checkedplace[0]).append(`<div class='house1' type=1><div class='moneylabel'>+1</div></div>`);
	  			} else {
	  				getplace()
	  			}
	  		} else {
	  			getplace()
	  		}
	  	}
	};
	makeDraggable();
	$('.generate').off().hide().html('Недостаточно средств!').addClass('errormess');
	$('.menu').show();

	setTimeout(function getMoney() {
		let curmoney = Number($(".menu .money").html());
		let house1mass = $(".map .house1");
		let house2mass = $(".map .house2");
		let moneyadd = house2mass.length * 2 + house1mass.length + curmoney;
		$(".menu .money").html(moneyadd);
		$(".map .moneylabel").animate(
			{
		      opacity: 1,
		      top: "-15px"
		    },
		    {
		    	done: function() {
		    		$(".map .moneylabel").css('opacity', 0).css('top', 0)
		    	}
		    }
		);
		setTimeout(getMoney, globalspeed);
	}, globalspeed);
}

function makeDraggable() {
	let diffX = $(document).width() - $(".map").width();
	let diffY = $(document).height() - $(".map").height();
	$(".map").draggable({
		containment: [diffX, diffY, 0, 0]
	});
}

$('.map').on('click', '.house1', function(){
	let curmoney = Number($(".menu .money").html());
	if (curmoney >= 400) {
		curmoney -= 400;
		$(".menu .money").html(curmoney);
		$(this).removeClass('house1').addClass('house2').attr('type', 2);
		$(this).find('.moneylabel').html('+2');
	} else {
		$('.generate').show();
		setTimeout("$('.generate').hide()", 1500)
	}
})

$('.menu').on('click', '.speed', function(){
	if (!$(this).hasClass('active')) {
		$('.menu .speed').removeClass('active');
		$(this).addClass('active');
		if ($(this).hasClass('s1')) {
			globalspeed = 2000
		} else {globalspeed = 1000}
		console.log(globalspeed)
	};
})