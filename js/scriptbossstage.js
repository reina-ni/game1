var canvas = document.getElementById( 'canvas' );
canvas.width = 432;
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

var hp=100;

var mapchip = new Image();
mapchip.src = 'img/stage/bossstage.png';
 
var btn = new Object();
btn.up = false;
btn.down = false;
btn.right = false;
btn.left = false;
btn.push = '';

a_enemy=[];
b_enemy=[];
aa_enemy=[];
bb_enemy=[];
aaa_enemy=[];
bbb_enemy=[];


var ice_check=0;
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


order.setAttribute('src', order_img[Math.floor(Math.random() * 45)]);//????????????????????????????????????
var src = order.getAttribute('src');//?????????????????????
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
ice=[];//??????????????????push


console.log("???????????????",Q_ice);//??????????????????????????????????????????

function get_enemy(){
	ice.length = 0;

	for(var en=0;en<a_enemy.length;en++){
		map[a_enemy[en]][b_enemy[en]] = Q__ice[0];
		ctx.clearRect(player.x,player.y,48,48);
	}
    console.log("?????????1:"+a_enemy+"  "+b_enemy);

	for(var en=0;en<aa_enemy.length;en++){
		map[aa_enemy[en]][bb_enemy[en]] = Q__ice[1];
		ctx.clearRect(player.x,player.y,48,48);
	}
    console.log("?????????2:"+aa_enemy+"  "+bb_enemy);
    
    for(var en=0;en<aaa_enemy.length;en++){
		map[aaa_enemy[en]][bbb_enemy[en]] = Q__ice[2];
		ctx.clearRect(player.x,player.y,48,48);
	}
	console.log("?????????3:"+aaa_enemy+"  "+bbb_enemy);
}
 
var map = [
	[1, 1, 1, 1, 1, 1, 1, 1 ,1 ],
	[1, 0, 0, 0, 0, 0, 0, 0 ,1 ],
	[1, 0, 1, 0, 1, 0, 1, 0 ,1 ],
    [1, 0, 0, 0, 0, 0, 0, 0 ,1 ],
    [1, 0, 1, 0, 1, 0, 1, 0 ,1 ],
	[1, 0, 0, 0, 0, 0, 0, 0 ,1 ],
    [1, 1, 1, 1, 1, 1, 1, 1 ,1 ]
]

map[1][1]=0;

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
var w_goal = 7;

var pathresult = pathfinding();

var shortest_count = pathresult.length;
console.log("???????????????????????????"+shortest_count);

map[5][7]=0;

function main(i) {
	for (var y=0; y<map.length; y++) {
		for (var x=0; x<map[y].length; x++) {
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
 
	ctx.drawImage(player.img, player.x, player.y);

	window.onload = function() {
		//????????????????????????????????????????????????????????????????????????
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
		//?????????????????????
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
        //?????????????????????
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

	if ( player.move === 0 ) {
		if ( btn.left === true ) {
			var x = player.x/48;
			var y = player.y/48;
			x--;
			if ( map[y][x] === 0 ) {
				player.move = 48;
				btn.push = 'left';
			}
			for(var n=3;n<12;n++){
				if( map[y][x] === n ){
					player.move = 48;
					btn.push = 'left';
					ctx.clearRect(player.x,player.y,48,48);
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
				for(var n=3;n<12;n++){
					if( map[y][x] === n ){
						player.move = 48;
						btn.push = 'up';
						ctx.clearRect(player.x,player.y,48,48);
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
			for(var n=3;n<12;n++){
				if( map[y][x] === n ){
					player.move = 48;
					btn.push = 'right';
					console.log(player.x,player.y);
					ctx.clearRect(player.x,player.y,48,48);

				}
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
				for(var n=3;n<12;n++){
					if( map[y][x] === n ){
						player.move = 48;
						ctx.clearRect(x*48,y*48,48,48);
						btn.push = 'down';	
					}
				}
			}
		}
		if ( btn.attack === true ) {//????????????????????????
			var x = player.x/48;
			var y = player.y/48;
			
			for(var n=0;n<Q__ice.length;n++){
				if ( map[y][x] === Q__ice[n]) {
					//n???0?????????
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
			console.log("????????????"+Q_ice);
			console.log("??????"+ice);

			//?????????????????????????????????
			var order_answer = document.getElementById('order_answer');
			
			if(ice.length===1){
				if(ice[0]===3){
					order_answer.setAttribute('src', order_img[0]);//????????????
				}else if(ice[0]===6){
					order_answer.setAttribute('src', order_img[3]);
				}else if(ice[0]===9){
					order_answer.setAttribute('src', order_img[6]);
				}else if(ice[0]===4){
					order_answer.setAttribute('src', order_img[9]);
				}else if(ice[0]===7){
					order_answer.setAttribute('src', order_img[11]);
				}else if(ice[0]===10){
					order_answer.setAttribute('src', order_img[13]);
				}else if(ice[0]===5){
					order_answer.setAttribute('src', order_img[10]);
				}else if(ice[0]===8){
					order_answer.setAttribute('src', order_img[12]);
				}else if(ice[0]===11){
					order_answer.setAttribute('src', order_img[14]);
				}
			}
			if(ice.length===2){
				if(ice[0]===3){
					if(ice[1]===4){
						order_answer.setAttribute('src', order_img[1]);//????????????
					}else if(ice[1]===5){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/blue35.png');//????????????
					}
				}else if(ice[0]===6){
					if(ice[1]===7){
						order_answer.setAttribute('src', order_img[4]);
					}else if(ice[1]===8){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/red68.png');
					}
				}else if(ice[0]===9){
					if(ice[1]===10){
						order_answer.setAttribute('src', order_img[7]);
					}else if(ice[1]===11){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/orange911.png');
					}
				}else if(ice[0]===4){
					if(ice[1]===3){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/blue43.png');
					}else if(ice[1]===5){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/blue45.png');
					}
				}else if(ice[0]===7){
					if(ice[1]===6){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/red76.png');
					}else if(ice[1]===8){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/red78.png');
					}
				}else if(ice[0]===10){
					if(ice[1]===9){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/orange109.png');
					}else if(ice[1]===11){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/orange1011.png');
					}
				}else if(ice[0]===5){
					if(ice[1]===3){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/blue53.png');
					}else if(ice[1]===4){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/blue54.png');
					}
				}else if(ice[0]===8){
					if(ice[1]===6){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/red86.png');
					}else if(ice[1]===7){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/red87.png');
					}
				}else if(ice[0]===11){
					if(ice[1]===9){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/orange119.png');
					}else if(ice[1]===10){
						order_answer.setAttribute('src', 'img/bossstage/azarashi2/orange1110.png');
					}
				}
			}
			if(ice.length===3){
				if(ice[0]===3){
					if(ice[1]===4){
						order_answer.setAttribute('src', order_img[2]);//????????????
					}else if(ice[1]===5){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/blue35.png');//????????????
					}
				}else if(ice[0]===6){
					if(ice[1]===7){
						order_answer.setAttribute('src', order_img[5]);//????????????
					}else if(ice[1]===8){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/red68.png');//????????????
					}
				}else if(ice[0]===9){
					if(ice[1]===10){
						order_answer.setAttribute('src', order_img[8]);//????????????
					}else if(ice[1]===11){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/orange911.png');//????????????
					}
				}else if(ice[0]===4){
					if(ice[1]===3){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/blue43.png');//????????????
					}else if(ice[1]===5){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/blue45.png');//????????????
					}
				}else if(ice[0]===7){
					if(ice[1]===6){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/red76.png');//????????????
					}else if(ice[1]===8){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/red78.png');//????????????
					}
				}else if(ice[0]===10){
					if(ice[1]===9){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/orange109.png');//????????????
					}else if(ice[1]===11){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/orange1011.png');//????????????
					}
				}else if(ice[0]===5){
					if(ice[1]===3){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/blue53.png');//????????????
					}else if(ice[1]===4){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/blue54.png');//????????????
					}
				}else if(ice[0]===8){
					if(ice[1]===6){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/red86.png');//????????????
					}else if(ice[1]===7){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/red87.png');//????????????
					}
				}else if(ice[0]===11){
					if(ice[1]===9){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/orange119.png');//????????????
					}else if(ice[1]===10){
						order_answer.setAttribute('src', 'img/bossstage/azarashi3/orange1110.png');//????????????
					}
				}
			}

			//var src_answer = order_answer.getAttribute('src');//?????????????????????

			//??????????????????
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
				console.log("??????????????????");
				ice_check=1;//?????????????????????

				//?????????????????????????????????
				console.log("?????????????????????"+Q_ice.length);
				if(Q_ice.length===1){
					//hp=1;//-20
					hp-=20;
				}else if(Q_ice.length===2){
					//hp=2;//-25
					hp-=25;
				}else{
					//hp=3;//-35
					hp-=35;
				}



				//hp????????????
				var d_hp;
				window.localStorage.setItem("d_hp",hp);
				stop();
			}else{
				console.log("????????????");
			}
		}
		
		
		btn.left = false;
		btn.up = false;
		btn.right = false;
		btn.down = false;
		btn.attack = false;
        // btn.attack2 = false;
		// btn.attack3 = false;
		
	

		//?????????????????????
		function stop(){			
			// player.move = 32; //clear.html???????????????????????????????????????
			line.length = 0; //???????????????
			

			//clear.html??????????????????????????????
			var clearcount;
			window.localStorage.setItem("clearcount",count);
			var clearcountshortest;
			window.localStorage.setItem("clearcountshortest",shortest_count);

			//?????????????????????????????????
			shortest_check = 0;
			//console.log(shortest_check);
			window.localStorage.setItem("shortest_check",shortest_check);

			var filename="bossstage.html";//??????????????????html?????????
			window.localStorage.setItem("filename",filename);
			// console.log(datet);

			window.setTimeout(function(){
				window.location.href = "bossstage2.html"; //????????????
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



//???????????????????????????????????????????????????????????????????????????????????????????????????
addEventListener('load', main(), false);
 
//????????????????????????????????????
function go(i) {
	console.log("go??????("+"%d"+"??????)", i+1);
	console.log(line[i]);
	// console.log(player.move);
	if( line[i]=="???" ) btn.left = true;
	if( line[i]=="???" ) btn.up = true;
	if( line[i]=="???" ) btn.right = true;
	if( line[i]=="???" ) btn.down = true;
	if( line[i]=="??????" ) btn.attack = true;
	
	if(i===line.length-1){//for????????????????????????????????????????????????????????????
		//???????????????????????????
		window.setTimeout(function(){
			document.getElementById("again_data").hidden=false;
			console.log("????????????????????????");
			player.img.src = character;//??????????????????????????????
			document.getElementById("comment").innerHTML = "<span class='under3'>??????<ruby>??????<rt>?????????</rt></ruby><ruby>???<rt>?????????</rt></ruby>??????????????????</span>";
		}, 600);
	}
}


//???????????????????????????????????????
document.getElementById("act").onclick = function() {
	if(line.length>=1){//????????????????????????????????????????????????????????????
		//????????????????????????
		document.getElementById("right").hidden=true;
		document.getElementById("left").hidden=true;
		document.getElementById("up").hidden=true;
		document.getElementById("down").hidden=true;
		document.getElementById("act").hidden=true;
		document.getElementById("attack").hidden=true;
		document.getElementById("del").hidden=true;
		document.getElementById("again").hidden=true;

		// ????????????????????????????????????????????????
		for (let i=0; i<line.length; i++) {
			//0.5??????????????????
			window.setTimeout(function(){
				if(line[i]=="??????"){//??????????????????????????????????????????
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
		console.log("??????????????????????????????");
		document.getElementById("comment").innerHTML = "<span class='under3'>?????????????????????<ruby>???<rt>??????</rt></ruby>??????<ruby>???<rt>??????</rt></ruby>????????????<span>";
		window.setTimeout(function(){
			document.getElementById("comment").innerHTML ="<p id=comment><span class='under'>????????????????????????<ruby>???<rt>??????</rt></ruby><ruby>???<rt>??????</rt></ruby>??????<ruby>???<rt>??????</rt></ruby>???<ruby>???<rt>??????</rt></ruby>?????????????????????<ruby>???<rt>??????</rt></ruby>????????????</span></p>";
		}, 2000);
	}
};
