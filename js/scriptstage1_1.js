var canvas = document.getElementById( 'canvas' );
canvas.width = 528;
canvas.height = 144;

var ctx = canvas.getContext( '2d' );

var player = new Object();
player.img = new Image();
player.img.src = 'img/player/player.png';
player.x = 48;
player.y = 48;
player.move = 0;

var mapchip = new Image();
mapchip.src = 'img/stage/stage.png';

var btn = new Object();
btn.up = false;
btn.down = false;
btn.right = false;
btn.left = false;
btn.attack = false;
btn.push = '';

var map = [
	[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1],
	[1, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,1],
	[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1]
]

var h = map.length;
var w = map[0].length;
var h_goal = 1;
var random = Math.floor( Math.random() * 2 );
if(random == 0){
	var w_goal = 8;
}else{
	var w_goal = 6;
}
map[h_goal][w_goal]=2;

var pathresult = pathfinding();

var shortest_count = pathresult.length;
console.log("最短距離探索結果："+shortest_count);

function main(i) {
	for (var y=0; y<map.length; y++) {
		for (var x=0; x<map[y].length; x++) {

			if ( map[y][x] === 0 ) ctx.drawImage( mapchip, 0, 0, 48, 48, 48*x, 48*y, 48, 48 );
			if ( map[y][x] === 1 ) ctx.drawImage( mapchip, 48, 0, 48, 48, 48*x, 48*y, 48, 48 );
			if ( map[y][x] === 2 ) ctx.drawImage( mapchip, 96, 0, 48, 48, 48*x, 48*y, 48, 48 );
			if ( map[y][x] === 3 ) ctx.drawImage( mapchip, 144, 0, 48, 48, 48*x, 48*y, 48, 48 );
			if ( map[y][x] === 4 ) ctx.drawImage( mapchip, 192, 0, 48, 48, 48*x, 48*y, 48, 48 );
			if ( map[y][x] === 5 ) ctx.drawImage( mapchip, 240, 0, 48, 48, 48*x, 48*y, 48, 48 );
		}
	}

	ctx.drawImage(player.img, player.x, player.y);

	if ( player.move === 0 ) {
		if ( btn.left === true ) {
			var x = player.x/48;
			var y = player.y/48;
			x--;
			if ( map[y][x] === 0 ) {
				player.move = 48;
				btn.push = 'left';
			}
			if(map[y][x] === 2){
				player.move = 48;
				btn.push = 'left';
				stop();
			}
		}
		if ( btn.up === true ) {
			var x = player.x/48;
			var y = player.y/48;
			if ( y > 0) {
				y--;
				if ( map[y][x] === 0 ) {
					player.move = 48;
					btn.push = 'up';
				}
				if(map[y][x] === 2){
					player.move = 48;
					btn.push = 'up';
					stop();
				}
			}
		}
		if ( btn.right === true ) {
			var x = player.x/48;
			var y = player.y/48;
			x++;
			if ( map[y][x] === 0 ) {
				player.move = 48;
				btn.push = 'right';
			}
			if(map[y][x] === 2){
				player.move = 48;
				btn.push = 'right';
				stop();
			}
		}
		if ( btn.down === true ) {
			var x = player.x/48;
			var y = player.y/48;
			if ( y < 4 ) {
				y++;
				if ( map[y][x] === 0 ) {
					player.move = 48;
					btn.push = 'down';
				}
				if(map[y][x] === 2){
					player.move = 48;
					btn.push = 'down';
					stop();
				}
			}
		}
		if ( btn.attack === true ) {
			var x = player.x/48;
			var y = player.y/48;

				if ( map[y][x+1] === 3) {
					map[y][x+1]=0;
					btn.push = 'attack';
				}else if( map[y][x-1] === 3){
					map[y][x-1]=0;
					btn.push = 'attack';
				}else if( map[y+1][x] === 3){
					map[y+1][x]=0;
					btn.push = 'attack';
				}else if( map[y-1][x] === 3){
					map[y-1][x]=0;
					btn.push = 'attack';
				}
			
		}
		btn.left = false;
		btn.up = false;
		btn.right = false;
		btn.down = false;
		btn.attack = false;

		function stop(){
			line.length = 0;
			var clearcount;
			window.localStorage.setItem("clearcount",count);
			var clearcountshortest;
			window.localStorage.setItem("clearcountshortest",shortest_count);

			var shortest_check = window.localStorage.getItem("shortest_check");
			if(count == shortest_count){
				shortest_check += 1;
			}
			window.localStorage.setItem("shortest_check",shortest_check);

			var filename="stage1_2.html";
			window.localStorage.setItem("filename",filename);

			window.setTimeout(function(){
				window.location.href = "clear.html";
			}, 500);
		}
	}
	

	movement();
	function movement(){
		for (let k=0; player.move>0; k++) {
			player.move -= 48;
			if ( btn.push === 'left' ) player.x -= 48;
			if ( btn.push === 'up' ) player.y -= 48;
			if ( btn.push === 'right' ) player.x += 48;
			if ( btn.push === 'down' ) player.y += 48;
		}
	}
	requestAnimationFrame( main );
}

addEventListener('load', main(), false);

function go(i) {
	console.log("go実行("+"%d"+"回目)", i+1);
	console.log(line[i]);
	if( line[i]=="左" ) btn.left = true;
	if( line[i]=="上" ) btn.up = true;
	if( line[i]=="右" ) btn.right = true;
	if( line[i]=="下" ) btn.down = true;
	if( line[i]=="攻撃" ) btn.attack = true;

	
	if(i===line.length-1){//for文最後の実行時に実行（再チャレンジ表示）
		//移動終わったら表示
		window.setTimeout(function(){
			document.getElementById("again_data").hidden=false;
			console.log("再チャレンジ表示");
			document.getElementById("comment").innerHTML = "<span class='under1'>もういちどかんがえてみよう！</span>";
		}, 600);
	}
}

document.getElementById("act").onclick = function() {
	if(line.length>=1){//しろくまくんの動きが入力されていたら実行
		document.getElementById("right").hidden=true;
		document.getElementById("left").hidden=true;
		document.getElementById("up").hidden=true;
		document.getElementById("down").hidden=true;
		document.getElementById("act").hidden=true;
		document.getElementById("del").hidden=true;
		document.getElementById("again").hidden=true;
		

		for (let i=0; i<line.length; i++) {
			window.setTimeout(function(){
				go(i);
				main(i);
			}, 500*i);
		}
	}else{
		console.log("動きを命令してないよ");
		document.getElementById("comment").innerHTML = "<span class='under1'>しろくまくんにうごきをおしえよう！<span>";
		window.setTimeout(function(){
			document.getElementById("comment").innerHTML = "<p id=comment><span class='under'>シロクマくんを１ばんすくない<ruby>数<rt>かず</rt></ruby>でゴールまでうごかそう！</span></p>";
		}, 2000);
	}
};

// //ヒントボタン
// document.getElementById("hint").onclick = function() {
// 	if (pathresult.length > 0) {
// 		for (let j = 0; j < pathresult.length; j++) {
// 			var hint_url=image[pathresult[j]];
// 			document.getElementById("hint").innerHTML += hint_url;
// 		}
// 	}
	
	

	// for (let i=0; i<pathresult.length-1; i++) {
	// 	window.setTimeout(function(){
	// 		function go_hint(i) {
	// 			console.log("go実行("+"%d"+"回目)", i+1);
	// 			console.log(pathresult[i]);
	// 			if( pathresult[i]=="左" ) btn.left = true;
	// 			if( pathresult[i]=="上" ) btn.up = true;
	// 			if( pathresult[i]=="右" ) btn.right = true;
	// 			if(	pathresult[i]=="下" ) btn.down = true;
	// 			if( pathresult[i]=="攻撃" ) btn.attack = true;
			
				
	// 			if(i===pathresult.length-2){//for文最後の実行時に実行（再チャレンジ表示）
	// 				//移動終わったら表示
	// 				document.getElementById("again_data").hidden=false;
	// 				console.log("頑張ってみよう");
	// 			}
	// 		}
	// 		go_hint(i);
	// 		main(i);
	// 	}, 500*i);
	// }
//};