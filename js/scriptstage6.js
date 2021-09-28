//canvasの設定
var canvas = document.getElementById( 'canvas' );
canvas.width = 528;
canvas.height = 240;

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
mapchip.src = 'img/stage48-4.png';
 
//キーボードのオブジェクトを作成
var btn = new Object();
btn.up = false;
btn.down = false;
btn.right = false;
btn.left = false;
btn.push = '';

//敵用配列
a_enemy=[];
b_enemy=[];
aa_enemy=[];
bb_enemy=[];

//againボタンクリック時の敵再度配置
function get_enemy(){
	for(var en=0;en<a_enemy.length;en++){
		map[a_enemy[en]][b_enemy[en]] = 3;
		ctx.clearRect(player.x,player.y,48,48);//一旦消す
	}
	console.log(a_enemy,b_enemy);

	for(var en=0;en<aa_enemy.length;en++){
		map[aa_enemy[en]][bb_enemy[en]] = 4;
		ctx.clearRect(player.x,player.y,48,48);//一旦消す
	}
	console.log(aa_enemy,bb_enemy);
}
 
//マップの作成
var map = [
	[1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1, 1 ],
	[1, 0, 0, 0, 0, 0, 0, 0 ,0 ,0, 1 ],
	[1, 0, 1, 0, 1, 0, 1, 0 ,1 ,0, 1 ],
	[1, 0, 0, 0, 0, 0, 0, 0 ,0 ,0, 1 ],
    [1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1, 1 ]
]

map[1][1]=0;//スタート
map[3][9]=2;//ゴール


//コース自動生成(aが縦、bが横)
for(var a=2;a<4;a+=2){
    for(var b=2;b<map[0].length-1;b+=2){
		//左が1だったら
		if(map[a][b-1]==1){
			map[a+1][b]=Math.floor( Math.random() * 2 );
			if(map[a+1][b]==0){
				map[a][b+1]=Math.floor( Math.random() * 2 );
				if(map[a+1][b]==0 && map[a][b+1]==0){
					map[a][b-1]=1;
				}
			}
			
		}else{//左が0だったら
		// console.log(map[a][b]);
		map[a-1][b]=Math.floor( Math.random() * 2 );//0or1
		
			if(map[a-1][b]==0){
				map[a][b-1]=Math.floor( Math.random() * 2 );
				if(map[a][b-1]==0){
					map[a+1][b]=Math.floor( Math.random() * 2 );
					if(map[a+1][b]==0){
						map[a][b+1]=1;
					}
				}
			}

			// if(map[a-1][b]==0){
			// 	map[a][b-1]=Math.floor( Math.random() * 2 );
			// }
			// if(map[a][b-1]==0 && map[a-1][b]==0){
			// 	map[a+1][b]=Math.floor( Math.random() * 2 );
			// }
			// if(map[a+1][b]==0 && map[a][b-1]==0 && map[a-1][b]==0){
			// 	map[a][b+1]=1;
			// }
		}
    }
}
//2行目以降（上に倒すの禁止）
for(var a=4;a<map.length-1;a+=2){
    for(var b=2;b<map[0].length-1;b+=2){
		// console.log(a,b);
		//左が1だったら
		if(map[a][b-1]==1){
			map[a+1][b]=Math.floor( Math.random() * 2 );
			if(map[a+1][b]==0){
				map[a][b+1]=1;
			}
		}else{//左が0だったら
		map[a][b-1]=Math.floor( Math.random() * 2 );//0or1
		
			if(map[a][b-1]==0){
				map[a+1][b]=Math.floor( Math.random() * 2 );
			}
			if(map[a+1][b]==0 && map[a][b-1]==0){
				map[a][b+1]=1;
			}
		}
	}
}


//findShortestPath.jsで使う変数
var h = map.length;
var w = map[0].length;
var h_goal = 3;
var w_goal = 9;

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


	window.onload = function() {
		//上書きされないように一度だけ実行（敵の位置）
		for(var n=0;n< 5 ;n++){//最大敵数
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
		//二つ目の敵
		for(var n=0;n< 4 ;n++){//最大敵数
			aa=1+Math.floor( Math.random() * h_goal );
			bb=1+Math.floor( Math.random() * w_goal );
			if(map[aa][bb] === 0){
				map[aa][bb] = 4;
				if(aa==1 && bb==1){
					map[1][1] = 0;
				}else{
				aa_enemy.push(aa);
				bb_enemy.push(bb);
				}
			}	
		}
	}
	
	

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
			//縦の長さ変えたら下の数字も変える
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
					//3を0に変更
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
		if ( btn.attack2 === true ) {
			var x = player.x/48;
			var y = player.y/48;
			
				if ( map[y][x+1] === 4) {
					//4を0に変更
					map[y][x+1]=0;
					btn.push = 'attack2';
				}if( map[y][x-1] === 4){
					map[y][x-1]=0;
					btn.push = 'attack2';
				}if( map[y+1][x] === 4){
					map[y+1][x]=0;
					btn.push = 'attack2';
				}if( map[y-1][x] === 4){
					map[y-1][x]=0;
					btn.push = 'attack2';
				}
		}
		btn.left = false;
		btn.up = false;
		btn.right = false;
		btn.down = false;
		btn.attack = false;
		btn.attack2 = false;

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
			var shortest_check = window.localStorage.getItem("shortest_check");
			if(count == shortest_count){
				shortest_check += 6;
				console.log(shortest_check);
			}
			window.localStorage.setItem("shortest_check",shortest_check);

			var filename="stage6.html";//次のページのhtmlを記載
			window.localStorage.setItem("filename",filename);
			// console.log(datet);

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
	if( line[i]=="攻撃2" ) btn.attack2 = true;
}


//実行ボタンクリック時の処理
document.getElementById("act").onclick = function() {
	//移動ボタン非表示
	document.getElementById("right").hidden=true;
	document.getElementById("left").hidden=true;
	document.getElementById("up").hidden=true;
	document.getElementById("down").hidden=true;
	document.getElementById("act").hidden=true;
	document.getElementById("attack").hidden=true;
	document.getElementById("attack2").hidden=true;

	// 配列の要素回数の移動処理繰り返し
	for (let i=0; i<line.length; i++) {
		//0.5秒おきに移動
		window.setTimeout(function(){
			go(i);
			main(i);
		}, 500*i);
	}

};


