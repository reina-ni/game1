var canvas = document.getElementById( 'canvas' );
canvas.width = 624;
canvas.height = 336;

var ctx = canvas.getContext( '2d' );
 
var player = new Object();
player.img = new Image();
var character = window.localStorage.getItem("character");
var character_name = window.localStorage.getItem("character_name");
player.img.src = character;
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
btn.push = '';

var pub2_count=0;//ヒント表示・非表示用
var hint_count=0;

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

			var shortest_check = window.localStorage.getItem("shortest_check");
			if(count == shortest_count){
				shortest_check += 5;
				console.log(shortest_check);
			}
			window.localStorage.setItem("shortest_check",shortest_check);

			var filename="stage5.html";
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

		var image = { "右":"<img src='img/command/right.png' width=6%>", 
				"左":"<img src='img/command/left.png' width=6%>", 
				"上":"<img src='img/command/up.png' width=6%>",
				"下":"<img src='img/command/down.png' width=6%>",
				"攻撃":"<img src='img/command/attack.png' width=6%>",
				"攻撃2":"<img src='img/command/attack2.png' width=6%>",
				"攻撃3":"<img src='img/command/attack3.png' width=6%>"}
		hint_count++;
		hint_ans=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];//穴埋め問題用配列
		hint_ans_result=[];//画像push用配列
		hint_ans.length=pathresult_ans.length
		for(var a=0;a<hint_ans.length/2;a++){//半分を1に変える
			hint_ans[a]=1;
		}
		hint_ans = hint_ans.map(function(a){return [a, Math.random()]})//要素シャッフル
			.sort(function(a, b){return a[1] - b[1]})
			.map(function(a){return a[0]});
		for(var l=0;l<hint_ans.length;l++){//1だったら？ボックス
			if(hint_ans[l]===0){
				hint_ans_result.push(image[pathresult_ans[l]]);
			}else{
				hint_ans_result.push("<img src='img/command/Q.png' width=6%>");//穴埋め部分
			}
			if(l==9 || l==19 || l==29){ //答え表示に改行をつける処理
				hint_ans_result[hint_ans_result.length-1]+="<br>";
			}
		}
		if(hint_count===1){//初めの一回のみヒントに反映させる
			console.log(hint_ans);
			hint_ans_result_=hint_ans_result;
			hint_ans_result_ = hint_ans_result_.join(' ');
		}
		document.getElementById("hint").innerHTML = hint_ans_result_;
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
			player.img.src = character;//しろくまくん元に戻す
			document.getElementById("comment").innerHTML = "<span class='under1'>もう<ruby>一度<rt>いちど</rt></ruby><ruby>考<rt>かんが</rt></ruby>えてみよう！</span>";
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
					player.img.src = 'img/player/'+character_name+'_attack.png';
				}else if(line[i]=="攻撃2"){
					player.img.src = 'img/player/'+character_name+'_attack2.png';
				}else if(line[i]=="攻撃3"){
					player.img.src = 'img/player/'+character_name+'_attack3.png';
				}else{
					player.img.src = character;
				}
				go(i);
				main(i);
				document.getElementById(i).style.backgroundColor="rgba(119, 160, 207)";
			}, 500*i);
		}
	}else{
		console.log("動きを命令してないよ");
		document.getElementById("comment").innerHTML = "<span class='under1'>シロクマくんに<ruby>動<rt>うご</rt></ruby>きを<ruby>教<rt>おし</rt></ruby>えよう！<span>";
		window.setTimeout(function(){
			document.getElementById("comment").innerHTML = "<p id=comment><span class='under'>シロクマくんを１<ruby>番<rt>ばん</rt></ruby><ruby>少<rt>すく</rt></ruby>ない<ruby>数<rt>かず</rt></ruby>でゴールまで<ruby>動<rt>うご</rt></ruby>かそう！</span></p>";
		}, 2000);
	}
};