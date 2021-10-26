var canvas = document.getElementById( 'canvas' );
canvas.width = 624;
canvas.height = 336;

var ctx = canvas.getContext( '2d' );
 
var player = new Object();
player.img = new Image();
player.img.src = 'img/player/player.png';
player.x = 48;
player.y = 48;
player.move = 0;

var attack2 = new Object();
attack2.img = new Image();
attack2.img.src = 'img/command/attack2.png';
attack2.x = 11*48;
attack2.y = 240;
 
var mapchip = new Image();
mapchip.src = 'img/stage/stage.png';
 
var btn = new Object();
btn.up = false;
btn.down = false;
btn.right = false;
btn.left = false;
btn.push = '';

var pub2_count=0;//ヒント表示・非表示用

a_enemy=[];
b_enemy=[];

function get_enemy(){
	for(var en=0;en<a_enemy.length;en++){
		map[a_enemy[en]][b_enemy[en]] = 3;
		ctx.clearRect(player.x,player.y,48,48);
	}
	console.log(a_enemy,b_enemy);
}

var map = [
	[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1, 1 ,1 ,1 ],
	[1, 0, 0, 0, 0, 0, 0, 0 ,0 ,0, 0 ,0 ,1 ],
	[1, 0, 1, 0, 1, 0, 1, 0 ,1 ,0, 1 ,0 ,1 ],
    [1, 0, 0, 0, 0, 0, 0, 0 ,0 ,0, 0 ,0 ,1 ],
    [1, 0, 1, 0, 1, 0, 1, 0 ,1 ,0, 1 ,0 ,1 ],
	[1, 0, 0, 0, 0, 0, 0, 0 ,0 ,0, 0 ,0 ,1 ],
    [1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1, 1 ,1 ,1 ]
]

map[1][1]=0;
map[5][11]=2;

for(var a=2;a<4;a+=2){
    for(var b=2;b<map[0].length-1;b+=2){
		if(map[a][b-1]==1){
			map[a+1][b]=Math.floor( Math.random() * 2 );
			if(map[a+1][b]==0){
				map[a][b+1]=Math.floor( Math.random() * 2 );
				if(map[a+1][b]==0 && map[a][b+1]==0){
					map[a][b-1]=1;
				}
			}
			
		}else{
		map[a-1][b]=Math.floor( Math.random() * 2 );
			if(map[a-1][b]==0){
				map[a][b-1]=Math.floor( Math.random() * 2 );
				if(map[a][b-1]==0){
					map[a+1][b]=Math.floor( Math.random() * 2 );
					if(map[a+1][b]==0){
						map[a][b+1]=1;
					}
				}
			}
		}
    }
}
for(var a=4;a<map.length-1;a+=2){
    for(var b=2;b<map[0].length-1;b+=2){
		if(map[a][b-1]==1){
			map[a+1][b]=Math.floor( Math.random() * 2 );
			if(map[a+1][b]==0){
				map[a][b+1]=1;
			}
		}else{
		map[a][b-1]=Math.floor( Math.random() * 2 );
			if(map[a][b-1]==0){
				map[a+1][b]=Math.floor( Math.random() * 2 );
			}
			if(map[a+1][b]==0 && map[a][b-1]==0){
				map[a][b+1]=1;
			}
		}
	}
}

var h = map.length;
var w = map[0].length;
var h_goal = 5;
var w_goal = 11;

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
    ctx.drawImage(attack2.img, attack2.x, attack2.y);

	window.onload = function() {

		for(var n=0;n< 5 ;n++){
			a=1+Math.floor( Math.random() * h_goal );
			b=1+Math.floor( Math.random() * w_goal );
			if(map[a][b] === 0){
				map[a][b] = 3;
				if(a==1 && b==1){
					map[1][1] = 0;
				}else{
				a_enemy.push(a);
				b_enemy.push(b);
				}
			}	
		}
	}

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
			if ( y < map.length-1 ) {
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
				}if( map[y][x-1] === 3){
					map[y][x-1]=0;
					btn.push = 'attack';
				}if( map[y+1][x] === 3){
					map[y+1][x]=0;
					btn.push = 'attack';
				}if( map[y-1][x] === 3){
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

			var shortest_check = 5;
			window.localStorage.setItem("shortest_check",shortest_check);

			var filename="gamerule3.html";
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


	//ヒントボタンクリック時の処理
	document.getElementById("pub2").onclick = function() {	  
		pub2_count++;
		player_a=1;player_b=1;//初期値
		var a=[];var b=[];
		//正当ルート新たな配列作成
		for(var i=0;i<pathresult.length;i++){
			//左右移動
			a.push(player_a);//正当ルート
			b.push(player_b);
			//console.log("現在位置:"+player_a,player_b);
			if(pathresult[i]=="右"){
				player_b+=1;
			}else if(pathresult[i]=="左"){
				player_b-=1;
			}else if(pathresult[i]=="上"){
				player_a-=1;
			}else if(pathresult[i]=="下"){
				player_a+=1;
			}
		}

		player_a=1;player_b=1;//初期値に戻す
		var pathresult_ans=[];//攻撃含めた答え配列用
		for(var i=0;i<pathresult.length;i++){
			//隣接するマスが敵 AND 正当ルート上のときに攻撃
			if ( map[player_a][player_b+1] === 3) {
				for(var k=0;k<a.length;k++){
					if(a[k]==player_a && b[k]==player_b+1){
						pathresult_ans.push("攻撃");
					}
				}map[player_a][player_b+1]=0;
				
			}if( map[player_a][player_b-1] === 3){
				for(var k=0;k<a.length;k++){
					if(a[k]==player_a && b[k]==player_b-1){
						pathresult_ans.push("攻撃");
					}
				}map[player_a][player_b-1]=0;
				
			}if( map[player_a+1][player_b] === 3){
				for(var k=0;k<a.length;k++){
					if(a[k]==player_a+1 && b[k]==player_b){
						pathresult_ans.push("攻撃");
					}
				}map[player_a+1][player_b]=0;
				
			}if( map[player_a-1][player_b] === 3){
				for(var k=0;k<a.length;k++){
					if(a[k]==player_a-1 && b[k]==player_b){
						pathresult_ans.push("攻撃");
					}
				}map[player_a-1][player_b]=0;
			}

			//左右移動
			if(pathresult[i]=="右"){
				player_b+=1;
				pathresult_ans.push("右");
			}else if(pathresult[i]=="左"){
				player_b-=1;
				pathresult_ans.push("左");
			}else if(pathresult[i]=="上"){
				player_a-=1;
				pathresult_ans.push("上");
			}else if(pathresult[i]=="下"){
				player_a+=1;
				pathresult_ans.push("下");
			}
			//console.log("途中結果"+pathresult_ans);
		}
		console.log(pathresult_ans);//最終結果表示
		get_enemy();//火が消えてしまうため

		hint_ans=[];//穴埋め問題用配列
		for(var l=0;l<pathresult_ans.length;l++){
			var ram = Math.floor( Math.random() * 2 );
			if(ram===0){
				hint_ans.push(image[pathresult_ans[l]]);
			}else{
				hint_ans.push("<img src='img/command/Q.png' width=3%>");//穴埋め部分
			}
		}
		document.getElementById("hint").innerHTML = hint_ans;
		if(pub2_count%2==0){//再度押したら非表示
			document.getElementById("hint").innerHTML = "";
		}
	};
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
			player.img.src = 'img/player/player.png';//しろくまくん元に戻す
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
		document.getElementById("attack").hidden=true;
		document.getElementById("del").hidden=true;
		document.getElementById("again").hidden=true;

		for (let i=0; i<line.length; i++) {
			window.setTimeout(function(){
				if(line[i]=="攻撃"){//しろくまにバケツ持たせる処理
					player.img.src = 'img/player/player_attack.png';
				}else if(line[i]=="攻撃2"){
					player.img.src = 'img/player/player_attack2.png';
				}else if(line[i]=="攻撃3"){
					player.img.src = 'img/player/player_attack3.png';
				}else{
					player.img.src = 'img/player/player.png';
				}
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


