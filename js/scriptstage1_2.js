//canvasの設定
var canvas = document.getElementById( 'canvas' );
canvas.width = 576;
canvas.height = 144;

var ctx = canvas.getContext( '2d' );
 
//オブジェクト作成
var player = new Object();
player.img = new Image();
player.img.src = 'img/player.png';
player.x = 48;
player.y = 48;
player.move = 0;
 
//マップチップのImageオブジェクト作成
var mapchip = new Image();
// mapchip.src = '地面.png';
mapchip.src = 'img/stage48-4.png';
 
//キーボードのオブジェクトを作成
var btn = new Object();
btn.up = false;
btn.down = false;
btn.right = false;
btn.left = false;
btn.attack = false;
btn.push = '';


 
//マップの作成
var map = [
	[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 ,1 ],
	[1, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,1 ],
	[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 ,1 ]
]

//findShortestPath.jsで使う変数
var h = map.length;
var w = map[0].length;
var h_goal = 1;
var random = Math.floor( Math.random() * 2 );
if(random == 0){
	var w_goal = 10;
}else{
	var w_goal = 9;
}
map[h_goal][w_goal]=2;

//最短距離探索
var pathresult = pathfinding();

//最短距離回数shortest_count
var shortest_count = pathresult.length;
console.log("最短距離探索結果："+shortest_count);

 
//メインループ
function main(i) {
	for (var y=0; y<map.length; y++) {
		for (var x=0; x<map[y].length; x++) {
			//0が道・2がゴール
			if ( map[y][x] === 0 ) ctx.drawImage( mapchip, 0, 0, 48, 48, 48*x, 48*y, 48, 48 );
			if ( map[y][x] === 1 ) ctx.drawImage( mapchip, 48, 0, 48, 48, 48*x, 48*y, 48, 48 );
			if ( map[y][x] === 2 ) ctx.drawImage( mapchip, 96, 0, 48, 48, 48*x, 48*y, 48, 48 );
			if ( map[y][x] === 3 ) ctx.drawImage( mapchip, 144, 0, 48, 48, 48*x, 48*y, 48, 48 );
			if ( map[y][x] === 4 ) ctx.drawImage( mapchip, 192, 0, 48, 48, 48*x, 48*y, 48, 48 );
			if ( map[y][x] === 5 ) ctx.drawImage( mapchip, 240, 0, 48, 48, 48*x, 48*y, 48, 48 );
		}
	}
 
	//プレイヤー画像表示
	ctx.drawImage(player.img, player.x, player.y);

	//敵の表示
	// window.onload = function() {
	// 	map[1][4]=3;//上書きされないように一度だけ実行（敵の位置）
	//   }
	


	//移動処理
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
					//3を0に変更
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

		//ゴール後の処理
		function stop(){
			// player.move = 32; //clear.htmlにすぐ移動するならいらない
			line.length = 0; //配列を空に
			

			//clear.htmlにクリア情報受け渡し
			var clearcount;
			window.localStorage.setItem("clearcount",count);
			var clearcountshortest;
			window.localStorage.setItem("clearcountshortest",shortest_count);

			//最短クリア回数チェック
			var shortest_check = 1;
			// if(count == shortest_count){
			// 	shortest_check = 1;
			// }
			window.localStorage.setItem("shortest_check",shortest_check);

			var filename="stage2_1.html";//次のページのhtmlを記載
			window.localStorage.setItem("filename",filename);

			window.setTimeout(function(){
				window.location.href = "clear.html"; //画面遷移
			}, 1000);
		}
	}


	// if (player.move > 0) {
	// }

	
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

//ページと依存している全てのデータが読み込まれたら、メインループ開始
addEventListener('load', main(), false);
 
//移動時に呼び出される関数
function go(i) {
	console.log("go実行("+"%d"+"回目)", i+1);
	console.log(line[i]);
	// console.log(player.move);
	if( line[i]=="左" ) btn.left = true;
	if( line[i]=="上" ) btn.up = true;
	if( line[i]=="右" ) btn.right = true;
	if( line[i]=="下" ) btn.down = true;
	if( line[i]=="攻撃" ) btn.attack = true;
}


//実行ボタンクリック時の処理
document.getElementById("act").onclick = function() {
	//移動ボタン非表示
	document.getElementById("right").hidden=true;
	document.getElementById("left").hidden=true;
	document.getElementById("up").hidden=true;
	document.getElementById("down").hidden=true;
	document.getElementById("act").hidden=true;
	// document.getElementById("attack").hidden=true;

	// 配列の要素回数の移動処理繰り返し
	for (let i=0; i<line.length; i++) {
		//0.5秒おきに移動
		window.setTimeout(function(){
			go(i);
			main(i);
		}, 500*i);
	}

};
