//最短経路探索
// スタート[distanceFromTop, distanceFromLeft]

function pathfinding(){
    var pathmap = map.slice();

    var findShortestPath = function(startCoordinates, pathmap) {
        //スタート位置指定
        var distanceFromTop = startCoordinates[1];
        var distanceFromLeft = startCoordinates[1];

        // 各"location"はその座標と到達に必要な最短経路を保持する
        var location = {
            distanceFromTop: distanceFromTop,
            distanceFromLeft: distanceFromLeft,
            path: [],
            status: 'Start'
        };

        // 内部にすでにスタート位置を持っているlocationでqueueを初期化
        var queue = [location];

        // グリッドを繰り返し処理して目的地を探索する
        while (queue.length > 0) {
            // キューから最初の位置を取る
            var currentLocation = queue.shift();
            // console.log(currentLocation);//最短経路詳細確認

            // 上を調べる
            var newLocation = exploreInDirection(currentLocation, '上', pathmap);
            if (newLocation.status === 'Goal') {
                return newLocation.path;
            }
            else if (newLocation.status === 'OK') {
                queue.push(newLocation);
            }

            // 右を調べる
            var newLocation = exploreInDirection(currentLocation, '右', pathmap);
            if (newLocation.status === 'Goal') {
                return newLocation.path;
            }
            else if (newLocation.status === 'OK') {
                queue.push(newLocation);
            }

            // 下を調べる
            var newLocation = exploreInDirection(currentLocation, '下', pathmap);
            if (newLocation.status === 'Goal') {
                return newLocation.path;
            }
            else if (newLocation.status === 'OK') {
                queue.push(newLocation);
            }

            // 左を調べる
            var newLocation = exploreInDirection(currentLocation, '左', pathmap);
            if (newLocation.status === 'Goal') {
                return newLocation.path;
            }
            else if (newLocation.status === 'OK') {
                queue.push(newLocation);
            }
        }

        // 有効な経路なし
        return false;
        

    };

    // locationのstatusを調べる関数
    // "Wall"でなく未チェックなら"OK"
    // "OK"か "NG"、"Blocked"または"Goal"を返す
    var locationStatus = function(location, pathmap) {
        var dft = location.distanceFromTop;
        var dfl = location.distanceFromLeft;

        if (location.distanceFromLeft < 0 ||
            location.distanceFromLeft >= w ||
            location.distanceFromTop < 0 ||
            location.distanceFromTop >= h) {

            // locationはグリッド上にないので'NG'を返す
            return 'NG';
        }
        else if (pathmap[dft][dfl] === 'Goal') {
            return 'Goal';
        }
        else if (pathmap[dft][dfl] !== 'Empty') {
            // locationは障害物か既にチェックしたかのどちらか
            return 'Blocked';
        }
        else {
            return 'OK';
        }
    };


    // 指定された位置から指定された方向にグリッドを調べる
    var exploreInDirection = function(currentLocation, direction, pathmap) {
        var newPath = currentLocation.path.slice();
        newPath.push(direction);

        var dft = currentLocation.distanceFromTop;
        var dfl = currentLocation.distanceFromLeft;

        if (direction === '上') {
            dft -= 1;
        }
        else if (direction === '右') {
            dfl += 1;
        }
        else if (direction === '下') {
            dft += 1;
        }
        else if (direction === '左') {
            dfl -= 1;
        }

        var newLocation = {
            distanceFromTop: dft,
            distanceFromLeft: dfl,
            path: newPath,
            status: 'Unknown'
        };
        newLocation.status = locationStatus(newLocation, pathmap);

        // この新しい位置が有効なら'Visited'の印をつける
        if (newLocation.status === 'OK') {
            pathmap[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
        }

        return newLocation;
    };


    // 必要な関数が定義できたので最短経路の取得を実行
    
    for (var i = 0; i < h; i++) {
        // pathmap[i] = [];
        for (var j = 0; j < w; j++) {
            //mapが1だったらWall
            if(pathmap[i][j]===1){
                pathmap[i][j] = "Wall";
            }else if(pathmap[i][j]!=="Wall"){
                pathmap[i][j] = 'Empty';
            }
        }
    }


    //スタートとゴールを設定
    pathmap[1][1] = "Start";
    pathmap[h_goal][w_goal] = "Goal";

    
    // console.log(findShortestPath([1, 1], pathmap));
    var pathresult=findShortestPath([1, 1], pathmap);
    console.log("最短距離探索："+pathresult);



    //数字のmapに戻すための記述（文字のままのmapだとグリッドが表示されなくなる）
    for (var i = 0; i < h; i++) {
        // pathmap[i] = [];
        for (var j = 0; j < w; j++) {
            //mapが1だったらWall
            if(pathmap[i][j]=="Wall"){
                pathmap[i][j] =1;
            }else{
                pathmap[i][j] = 0;
            }
        }
    }
    pathmap[1][1]=0;
    pathmap[h_goal][w_goal]=2;



    return pathresult;
}