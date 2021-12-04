//canvasの設定
var canvas = document.getElementById( 'canvas' );
canvas.width = 432;
canvas.height = 336;

var ctx = canvas.getContext( '2d' );
 
//オブジェクト作成
var player = new Object();
player.img = new Image();
var character = window.localStorage.getItem("character");
var character_name = window.localStorage.getItem("character_name");
player.img.src = character;
player.x = 48;
player.y = 48;
player.move = 0;

 
//マップチップのImageオブジェクト作成
var mapchip = new Image();
mapchip.src = 'img/stage/bossstage.png';
 
//キーボードのオブジェクトを作成
var btn = new Object();
btn.up = false;
btn.down = false;
btn.right = false;
btn.left = false;
btn.push = '';

//アイス用配列
a_enemy=[];
b_enemy=[];
aa_enemy=[];
bb_enemy=[];
aaa_enemy=[];
bbb_enemy=[];

//残hp受け取り
// var hp;
var d_hp = window.localStorage.getItem("d_hp");
console.log(d_hp);

d_hp-=0;//stringからnumberにするための処理

//残hpによってボス画像変更
var boss = document.getElementById('boss');
if(d_hp<=70){
	boss.setAttribute('src', 'img/bossstage/boss/boss2.png');//画像変更
}if(d_hp<=40){
	boss.setAttribute('src', 'img/bossstage/boss/boss3.png');//画像変更
}if(d_hp<=20){
	boss.setAttribute('src', 'img/bossstage/boss/boss4.png');//画像変更
}


//hpゲージ設定
var meter = document.getElementById('meter');
meter.setAttribute('value', d_hp);

var ice_check=0;//０：アイス未完成

//アザラシくん注文画像確認
var order = document.getElementById('order');
var order_img=['img/bossstage/azarashi/ice_blue1.png','img/bossstage/azarashi/ice_blue2.png','img/bossstage/azarashi/ice_blue3.png'
,'img/bossstage/azarashi/ice_red1.png','img/bossstage/azarashi/ice_red2.png','img/bossstage/azarashi/ice_red3.png',
'img/bossstage/azarashi/ice_orange1.png','img/bossstage/azarashi/ice_orange2.png','img/bossstage/azarashi/ice_orange3.png'

,'img/bossstage/azarashi1/blue4.png','img/bossstage/azarashi1/blue5.png','img/bossstage/azarashi1/red7.png'
,'img/bossstage/azarashi1/red8.png','img/bossstage/azarashi1/orange10.png','img/bossstage/azarashi1/orange11.png'

,'img/bossstage/azarashi2/blue35.png','img/bossstage/azarashi2/blue43.png','img/bossstage/azarashi2/blue45.png'
,'img/bossstage/azarashi2/blue53.png','img/bossstage/azarashi2/blue54.png','img/bossstage/azarashi2/red68.png'
,'img/bossstage/azarashi2/red76.png','img/bossstage/azarashi2/red78.png','img/bossstage/azarashi2/red86.png'
,'img/bossstage/azarashi2/red87.png','img/bossstage/azarashi2/orange911.png','img/bossstage/azarashi2/orange109.png'
,'img/bossstage/azarashi2/orange1011.png','img/bossstage/azarashi2/orange119.png','img/bossstage/azarashi2/orange1110.png'

,'img/bossstage/azarashi3/blue35.png','img/bossstage/azarashi3/blue43.png','img/bossstage/azarashi3/blue45.png'
,'img/bossstage/azarashi3/blue53.png','img/bossstage/azarashi3/blue54.png','img/bossstage/azarashi3/red68.png'
,'img/bossstage/azarashi3/red76.png','img/bossstage/azarashi3/red78.png','img/bossstage/azarashi3/red86.png'
,'img/bossstage/azarashi3/red87.png','img/bossstage/azarashi3/orange911.png','img/bossstage/azarashi3/orange109.png'
,'img/bossstage/azarashi3/orange1011.png','img/bossstage/azarashi3/orange119.png','img/bossstage/azarashi3/orange1110.png'];


order.setAttribute('src', order_img[Math.floor(Math.random() * 45)]);//画像ランダムで変更させる
var src = order.getAttribute('src');//画像データ取得
if(src==order_img[0]){Q_ice=[3];Q__ice=[3,4,5];
}else if(src==order_img[1]){Q_ice=[3,4];Q__ice=[3,4,5];
}else if(src==order_img[2]){Q_ice=[3,4,5];Q__ice=[3,4,5];
}else if(src==order_img[3]){Q_ice=[6];Q__ice=[6,7,8];
}else if(src==order_img[4]){Q_ice=[6,7];Q__ice=[6,7,8];
}else if(src==order_img[5]){Q_ice=[6,7,8];Q__ice=[6,7,8];
}else if(src==order_img[6]){Q_ice=[9];Q__ice=[9,10,11];
}else if(src==order_img[7]){Q_ice=[9,10];Q__ice=[9,10,11];
}else if(src==order_img[8]){Q_ice=[9,10,11];Q__ice=[9,10,11];
}
else if(src==order_img[9]){Q_ice=[4];Q__ice=[3,4,5];
}else if(src==order_img[10]){Q_ice=[5];Q__ice=[3,4,5];
}else if(src==order_img[11]){Q_ice=[7];Q__ice=[6,7,8];
}else if(src==order_img[12]){Q_ice=[8];Q__ice=[6,7,8];
}else if(src==order_img[13]){Q_ice=[10];Q__ice=[9,10,11];
}else if(src==order_img[14]){Q_ice=[11];Q__ice=[9,10,11];
}
else if(src==order_img[15]){Q_ice=[3,5];Q__ice=[3,4,5];
}else if(src==order_img[16]){Q_ice=[4,3];Q__ice=[3,4,5];
}else if(src==order_img[17]){Q_ice=[4,5];Q__ice=[3,4,5];
}else if(src==order_img[18]){Q_ice=[5,3];Q__ice=[3,4,5];
}else if(src==order_img[19]){Q_ice=[5,4];Q__ice=[3,4,5];
}else if(src==order_img[20]){Q_ice=[6,8];Q__ice=[6,7,8];
}else if(src==order_img[21]){Q_ice=[7,6];Q__ice=[6,7,8];
}else if(src==order_img[22]){Q_ice=[7,8];Q__ice=[6,7,8];
}else if(src==order_img[23]){Q_ice=[8,6];Q__ice=[6,7,8];
}else if(src==order_img[24]){Q_ice=[8,7];Q__ice=[6,7,8];
}else if(src==order_img[25]){Q_ice=[9,11];Q__ice=[9,10,11];
}else if(src==order_img[26]){Q_ice=[10,9];Q__ice=[9,10,11];
}else if(src==order_img[27]){Q_ice=[10,11];Q__ice=[9,10,11];
}else if(src==order_img[28]){Q_ice=[11,9];Q__ice=[9,10,11];
}else if(src==order_img[29]){Q_ice=[11,10];Q__ice=[9,10,11];
}
else if(src==order_img[30]){Q_ice=[3,5,4];Q__ice=[3,4,5];
}else if(src==order_img[31]){Q_ice=[4,3,5];Q__ice=[3,4,5];
}else if(src==order_img[32]){Q_ice=[4,5,3];Q__ice=[3,4,5];
}else if(src==order_img[33]){Q_ice=[5,3,4];Q__ice=[3,4,5];
}else if(src==order_img[34]){Q_ice=[5,4,3];Q__ice=[3,4,5];
}else if(src==order_img[35]){Q_ice=[6,8,7];Q__ice=[6,7,8];
}else if(src==order_img[36]){Q_ice=[7,6,8];Q__ice=[6,7,8];
}else if(src==order_img[37]){Q_ice=[7,8,6];Q__ice=[6,7,8];
}else if(src==order_img[38]){Q_ice=[8,6,7];Q__ice=[6,7,8];
}else if(src==order_img[39]){Q_ice=[8,7,6];Q__ice=[6,7,8];
}else if(src==order_img[40]){Q_ice=[9,11,10];Q__ice=[9,10,11];
}else if(src==order_img[41]){Q_ice=[10,9,11];Q__ice=[9,10,11];
}else if(src==order_img[42]){Q_ice=[10,11,9];Q__ice=[9,10,11];
}else if(src==order_img[43]){Q_ice=[11,9,10];Q__ice=[9,10,11];
}else if(src==order_img[44]){Q_ice=[11,10,9];Q__ice=[9,10,11];
}
ice=[];//拾った順番にpush


console.log("アイス注文",Q_ice);//アイス並べ替えて毎回違う注文


//againボタンクリック時の敵再度配置
function get_enemy(){
	ice.length = 0; //ice配列を空に

	for(var en=0;en<a_enemy.length;en++){
		map[a_enemy[en]][b_enemy[en]] = Q__ice[0];
		ctx.clearRect(player.x,player.y,48,48);//一旦消す
	}
    console.log("レベル1:"+a_enemy+"  "+b_enemy);

	for(var en=0;en<aa_enemy.length;en++){
		map[aa_enemy[en]][bb_enemy[en]] = Q__ice[1];
		ctx.clearRect(player.x,player.y,48,48);//一旦消す
	}
    console.log("レベル2:"+aa_enemy+"  "+bb_enemy);
    
    for(var en=0;en<aaa_enemy.length;en++){
		map[aaa_enemy[en]][bbb_enemy[en]] = Q__ice[2];
		ctx.clearRect(player.x,player.y,48,48);//一旦消す
	}
	console.log("レベル3:"+aaa_enemy+"  "+bbb_enemy);
}
 


//マップの作成
var map = [
	[1, 1, 1, 1, 1, 1, 1, 1 ,1 ],
	[1, 0, 0, 0, 0, 0, 0, 0 ,1 ],
	[1, 0, 1, 0, 1, 0, 1, 0 ,1 ],
    [1, 0, 0, 0, 0, 0, 0, 0 ,1 ],
    [1, 0, 1, 0, 1, 0, 1, 0 ,1 ],
	[1, 0, 0, 0, 0, 0, 0, 0 ,1 ],
    [1, 1, 1, 1, 1, 1, 1, 1 ,1 ]
]

map[1][1]=0;//スタート
// map[5][7]=2;//ゴール


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
var h_goal = 5;
var w_goal = 7;

//最短距離探索
var pathresult = pathfinding();

//最短距離回数shortest_count
var shortest_count = pathresult.length;
console.log("最短距離探索結果："+shortest_count);



map[5][7]=0;//ゴールを消す

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
			if ( map[y][x] === 6 ) ctx.drawImage( mapchip, 288, 0, 48, 48, 48*x, 48*y, 48, 48 );
			if ( map[y][x] === 7 ) ctx.drawImage( mapchip, 336, 0, 48, 48, 48*x, 48*y, 48, 48 );
			if ( map[y][x] === 8 ) ctx.drawImage( mapchip, 384, 0, 48, 48, 48*x, 48*y, 48, 48 );
			if ( map[y][x] === 9 ) ctx.drawImage( mapchip, 432, 0, 48, 48, 48*x, 48*y, 48, 48 );
			if ( map[y][x] === 10 ) ctx.drawImage( mapchip, 480, 0, 48, 48, 48*x, 48*y, 48, 48 );
			if ( map[y][x] === 11 ) ctx.drawImage( mapchip, 528, 0, 48, 48, 48*x, 48*y, 48, 48 );
		}
	}
 
	//プレイヤー画像表示
	ctx.drawImage(player.img, player.x, player.y);
	// ctx.drawImage(boss.img, boss.x, boss.y);


	window.onload = function() {
		//上書きされないように一度だけ実行（アイスの位置）
		for(var n=0;n< 10 ;n++){
			a=1+Math.floor( Math.random() * h_goal );
			b=1+Math.floor( Math.random() * w_goal );
			if(map[a][b] === 0){
				map[a][b] = Q__ice[0];
				if(a==1 && b==1){
					map[1][1] = 0;
				}else{
                a_enemy.push(a);
				b_enemy.push(b);
				n=10;
				}
			}	
		}
		//二つ目のアイス
		for(var n=0;n< 10 ;n++){
			aa=1+Math.floor( Math.random() * h_goal );
			bb=1+Math.floor( Math.random() * w_goal );
			if(map[aa][bb] === 0){
				map[aa][bb] = Q__ice[1];
				if(aa==1 && bb==1){
					map[1][1] = 0;
				}else{
				aa_enemy.push(aa);
				bb_enemy.push(bb);
				n=10;
				}
			}	
        }
        //三つ目のアイス
		for(var n=0;n< 10 ;n++){
			aaa=1+Math.floor( Math.random() * h_goal );
			bbb=1+Math.floor( Math.random() * w_goal );
			if(map[aaa][bbb] === 0){
				map[aaa][bbb] = Q__ice[2];
				if(aaa==1 && bbb==1){
					map[1][1] = 0;
				}else{
				aaa_enemy.push(aaa);
				bbb_enemy.push(bbb);
				n=10;
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
			// if ( map[y][x] === 3 ) {
			// 	player.move = 48;
			// 	btn.push = 'left';
			// }
			
			for(var n=3;n<12;n++){
				if( map[y][x] === n ){
					player.move = 48;
					btn.push = 'left';
					ctx.clearRect(player.x,player.y,48,48);//一旦消す
				}
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
				// if ( map[y][x] === 3 ) {
				// 	player.move = 48;
				// 	btn.push = 'up';
				// }
				for(var n=3;n<12;n++){
					if( map[y][x] === n ){
						player.move = 48;
						btn.push = 'up';
						ctx.clearRect(player.x,player.y,48,48);//一旦消す
					}
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
				console.log(player.x,player.y);
			}
			// if ( map[y][x] === 3 ) {
			// 	player.move = 48;
			// 	btn.push = 'right';
			// 	console.log(player.x,player.y);
			// }
			for(var n=3;n<12;n++){
				if( map[y][x] === n ){
					player.move = 48;
					btn.push = 'right';
					console.log(player.x,player.y);
					ctx.clearRect(player.x,player.y,48,48);//一旦消す

				}
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
				// if ( map[y][x] === 3 ) {
				// 	player.move = 48;
				// 	btn.push = 'down';
				// }
				for(var n=3;n<12;n++){
					if( map[y][x] === n ){
						player.move = 48;
						ctx.clearRect(x*48,y*48,48,48);//一旦消す
						btn.push = 'down';
						
					}
				}
			}
		}
		if ( btn.attack === true ) {//アイス拾うボタン
			var x = player.x/48;
			var y = player.y/48;
			
			for(var n=0;n<Q__ice.length;n++){
				if ( map[y][x] === Q__ice[n]) {
					//nを0に変更
					ice.push(Q__ice[n]);
					console.log(ice);
					map[y][x]=0;
					btn.push = 'attack';
				}if( map[y][x] === Q__ice[n]){
					ice.push(Q__ice[n]);
					console.log(ice);
					map[y][x]=0;
					btn.push = 'attack';
				}if( map[y][x] === Q__ice[n]){
					ice.push(Q__ice[n]);
					console.log(ice);
					map[y][x]=0;
					btn.push = 'attack';
				}if( map[y][x] === Q__ice[n]){
					ice.push(Q__ice[n]);
					console.log(ice);
					map[y][x]=0;
					btn.push = 'attack';
				}
			}
			console.log("注文内容"+Q_ice);
			console.log("答え"+ice);


			//アイス途中結果画像表示
			var order_answer = document.getElementById('order_answer');
			
			if(ice.length===1){
				if(ice[0]===3){
					order_answer.setAttribute('src', order_img[0]);//画像変更
				}else if(ice[0]===6){
					order_answer.setAttribute('src', order_img[3]);//画像変更
				}else if(ice[0]===9){
					order_answer.setAttribute('src', order_img[6]);//画像変更
				}else if(ice[0]===4){
					order_answer.setAttribute('src', order_img[9]);//画像変更
				}else if(ice[0]===7){
					order_answer.setAttribute('src', order_img[11]);//画像変更
				}else if(ice[0]===10){
					order_answer.setAttribute('src', order_img[13]);//画像変更
				}else if(ice[0]===5){
					order_answer.setAttribute('src', order_img[10]);//画像変更
				}else if(ice[0]===8){
					order_answer.setAttribute('src', order_img[12]);//画像変更
				}else if(ice[0]===11){
					order_answer.setAttribute('src', order_img[14]);//画像変更
				}
			}
			if(ice.length===2){
				if(ice[0]===3){
					if(ice[1]===4){
						order_answer.setAttribute('src', order_img[1]);//画像変更
					}else if(ice[1]===5){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/blue35.png');//画像変更
					}
				}else if(ice[0]===6){
					if(ice[1]===7){
						order_answer.setAttribute('src', order_img[4]);//画像変更
					}else if(ice[1]===8){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/red68.png');//画像変更
					}
				}else if(ice[0]===9){
					if(ice[1]===10){
						order_answer.setAttribute('src', order_img[7]);//画像変更
					}else if(ice[1]===11){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/orange911.png');//画像変更
					}
				}else if(ice[0]===4){
					if(ice[1]===3){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/blue43.png');//画像変更
					}else if(ice[1]===5){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/blue45.png');//画像変更
					}
				}else if(ice[0]===7){
					if(ice[1]===6){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/red76.png');//画像変更
					}else if(ice[1]===8){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/red78.png');//画像変更
					}
				}else if(ice[0]===10){
					if(ice[1]===9){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/orange109.png');//画像変更
					}else if(ice[1]===11){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/orange1011.png');//画像変更
					}
				}else if(ice[0]===5){
					if(ice[1]===3){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/blue53.png');//画像変更
					}else if(ice[1]===4){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/blue54.png');//画像変更
					}
				}else if(ice[0]===8){
					if(ice[1]===6){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/red86.png');//画像変更
					}else if(ice[1]===7){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/red87.png');//画像変更
					}
				}else if(ice[0]===11){
					if(ice[1]===9){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/orange119.png');//画像変更
					}else if(ice[1]===10){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/orange1110.png');//画像変更
					}
				}
			}
			if(ice.length===3){
				if(ice[0]===3){
					if(ice[1]===4){
						order_answer.setAttribute('src', order_img[2]);//画像変更
					}else if(ice[1]===5){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/blue35.png');//画像変更
					}
				}else if(ice[0]===6){
					if(ice[1]===7){
						order_answer.setAttribute('src', order_img[5]);//画像変更
					}else if(ice[1]===8){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/red68.png');//画像変更
					}
				}else if(ice[0]===9){
					if(ice[1]===10){
						order_answer.setAttribute('src', order_img[8]);//画像変更
					}else if(ice[1]===11){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/orange911.png');//画像変更
					}
				}else if(ice[0]===4){
					if(ice[1]===3){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/blue43.png');//画像変更
					}else if(ice[1]===5){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/blue45.png');//画像変更
					}
				}else if(ice[0]===7){
					if(ice[1]===6){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/red76.png');//画像変更
					}else if(ice[1]===8){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/red78.png');//画像変更
					}
				}else if(ice[0]===10){
					if(ice[1]===9){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/orange109.png');//画像変更
					}else if(ice[1]===11){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/orange1011.png');//画像変更
					}
				}else if(ice[0]===5){
					if(ice[1]===3){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/blue53.png');//画像変更
					}else if(ice[1]===4){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/blue54.png');//画像変更
					}
				}else if(ice[0]===8){
					if(ice[1]===6){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/red86.png');//画像変更
					}else if(ice[1]===7){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/red87.png');//画像変更
					}
				}else if(ice[0]===11){
					if(ice[1]===9){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/orange119.png');//画像変更
					}else if(ice[1]===10){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/orange1110.png');//画像変更
					}
				}
			}

			//var src_answer = order_answer.getAttribute('src');//画像データ取得

			//配列一致確認
			const getResult = function (Q_ice, ice) {
				var i = Q_ice.length;
				if (i != ice.length) return false;
			 
				while (i--) {
				  if (Q_ice[i] !== ice[i]) return false;
				}
				return true;
			  };
			ice_result=getResult(Q_ice, ice);//true or false
			console.log(ice_result);//true or false

			if(ice_result === true){
				order.setAttribute("border", "5");
				order_answer.setAttribute("border", "5");
				console.log("アイス完成！");
				ice_check=1;//１：アイス完成

                //完成したアイスの攻撃力
                var d_hp = window.localStorage.getItem("d_hp");
				console.log("アイスの個数："+Q_ice.length);
				if(Q_ice.length===1){
					d_hp-=20;
				}else if(Q_ice.length===2){
					d_hp-=25;
				}else{
					d_hp-=35;
				}
				

                //hpがゼロになったらページ変わる
                if(d_hp<=0){
                    console.log("ドラゴンを倒した!");
                    meter.setAttribute('value', 0);//hpゲージをゼロに
                    window.location.href = "bossclear.html"; //画面遷移
                }

				//hp引継ぎ用
				var d_hp;
				window.localStorage.setItem("d_hp",d_hp);
				stop();
			}else{
				console.log("未完成！");
			}
		}
		
		
		btn.left = false;
		btn.up = false;
		btn.right = false;
		btn.down = false;
		btn.attack = false;
        // btn.attack2 = false;
		// btn.attack3 = false;
		
	

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
			shortest_check = 0;
			//console.log(shortest_check);
			window.localStorage.setItem("shortest_check",shortest_check);

			var filename="bossstage.html";//次のページのhtmlを記載
			window.localStorage.setItem("filename",filename);

			window.setTimeout(function(){
				window.location.href = "bossstage4.html"; //画面遷移
			}, 500);
			


			
			
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
	
	if(i===line.length-1){//for文最後の実行時に実行（再チャレンジ表示）
		//移動終わったら表示
		window.setTimeout(function(){
			document.getElementById("again_data").hidden=false;
			console.log("再チャレンジ表示");
			player.img.src = character;//しろくまくん元に戻す
			document.getElementById("comment").innerHTML = "<span class='under3'>もう<ruby>一度<rt>いちど</rt></ruby><ruby>考<rt>かんが</rt></ruby>えてみよう！</span>";
		}, 600);
	}
}


//実行ボタンクリック時の処理
document.getElementById("act").onclick = function() {
	if(line.length>=1){//しろくまくんの動きが入力されていたら実行
		//移動ボタン非表示
		document.getElementById("right").hidden=true;
		document.getElementById("left").hidden=true;
		document.getElementById("up").hidden=true;
		document.getElementById("down").hidden=true;
		document.getElementById("act").hidden=true;
		document.getElementById("attack").hidden=true;
		document.getElementById("del").hidden=true;
		document.getElementById("again").hidden=true;

		// 配列の要素回数の移動処理繰り返し
		for (let i=0; i<line.length; i++) {
			//0.5秒おきに移動
			window.setTimeout(function(){
				if(line[i]=="攻撃"){//しろくまにコーン持たせる処理
					player.img.src = 'img/player/'+character_name+'_icc.png';
				}else{
					player.img.src = character;
				}
				go(i);
				main(i);
				document.getElementById(i).style.backgroundColor="rgba(255, 112, 97)";
			}, 500*i);
		}
	}else{
		console.log("動きを命令してないよ");
		document.getElementById("comment").innerHTML = "<span class='under3'>シロクマくんに<ruby>動<rt>うご</rt></ruby>きを<ruby>教<rt>おし</rt></ruby>えよう！<span>";
		window.setTimeout(function(){
			document.getElementById("comment").innerHTML ="<p id=comment><span class='under'>シロクマくんを１<ruby>番<rt>ばん</rt></ruby><ruby>少<rt>すく</rt></ruby>ない<ruby>数<rt>かず</rt></ruby>で<ruby>動<rt>うご</rt></ruby>かしてアイスを<ruby>集<rt>あつ</rt></ruby>めよう！</span></p>";
		}, 2000);
	}
};
