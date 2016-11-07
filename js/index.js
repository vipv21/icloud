
var todo=[
    {
      id:1,
      title:'列表1',
      color:'#FF286C',
      list:[
            {
              title:'国内新闻',
              done:false
            },
            {
              title:'国际新闻',
              done:true
            },
            {
              title:'娱乐新闻',
              done:false
            },
            {
              title:'军事新闻',
              done:false
            },
            {
              title:'校园新闻',
              done:true
            } 
      ]
    },
       {
        id:2,
        title:'列表2',
        color:'#CC74E1',
        list:[
          {
            title:'早晨不上班',
            done:false
          },
          {
            title:'早晨不上班',
            done:true
          },
          {
            title:'早晨不上班',
            done:false
          },
          {
            title:'早晨不上班',
            done:true
          },         
      ]
   }
]

var colors=['#FF286C','#CC74E1','#65D839','#1CAFF8','#F7C900','#9E7F5A','#FF8400'];
var icloud=angular.module('icloud',[]);
icloud.controller('iclouds',function($scope,loca){
  //获取本地存储的服务数据
  // $scope.todo=loca.getData(todo);
  //获取本地自有数据
	$scope.todo=todo;
	$scope.index=$scope.todo.length-1; 
  $scope.flag=false;


  // 选项
  $scope.optflag=false;
  $scope.colors=colors;
  $scope.changeTitle=$scope.todo[$scope.index].title;
  $scope.changeColor=$scope.todo[$scope.index].color;
	$scope.select=function(i){

	$scope.index=i;
  $scope.changeTitle=$scope.todo[i].title;
  $scope.changeColor=$scope.todo[i].color;
  $scope.optflag=false;
	}


  // 添加列表
  $scope.add=function(){
    $scope.ids=$scope.todo[$scope.todo.length-1].id+1;
    $scope.index=$scope.todo.length;
    $scope.todo.push({
      id:$scope.ids,
      title:'列表'+$scope.ids,
      color:colors[$scope.todo.length%7],
      list:[]
    })
    loca.saveData('todo',$scope.todo);
  }




	$scope.doneNum=0;
	$scope.getDoneNums=function(){
		$scope.doneNum=0;
		var list=$scope.todo[$scope.index].list;
		angular.forEach(list,function(v,i){
      console.log(v)
			if (v.done) {
				$scope.doneNum+=1;

			}
		})
	}
	$scope.getDoneNums();


  // 新增项目
	$scope.addList=function(){
		$scope.todo[$scope.index].list.push({
			title:'信息',
			done:false
			})
    loca.saveData('todo',$scope.todo);
	}

  // 清除已完成的
  $scope.clearCom=function(){
    var list=$scope.todo[$scope.index].list;
    var arr=[];
    angular.forEach(list,function(v,i){
      if (v.done==false) {
        arr.push(v);
      };
    })
    $scope.todo[$scope.index].list=arr;
    $scope.getDoneNums();
    $scope.flag=false;
    loca.saveData('todo',$scope.todo);
  }



	$scope.set=function(o,f){
		o.done=f;
    $scope.getDoneNums();
    loca.saveData('todo',$scope.todo);
	}

	$scope.change=function(o,text){
		o.title=text.target.innerHTML;
    loca.saveData('todo',$scope.todo);
	}

  $scope.sColor=function(c){
    $scope.changeColor=c;
  }

  $scope.comChange=function(){
    var o=$scope.todo[$scope.index];
    o.title=$scope.changeTitle;
    o.color=$scope.changeColor;
    $scope.optflag=false;
    loca.saveData('todo',$scope.todo);
  }

// 删除
  $scope.delList=function(){
    if ($scope.todo.length==1 ) {
      alert("最少保留一条信息！")
      return;
    };
    $scope.todo.splice($scope.index,1);
    $scope.index=$scope.todo.length-1;
    $scope.optflag=false;
    loca.saveData('todo',$scope.todo);
  }


  // 监听模型变化
	$scope.$watch('index',function(){
		$scope.getDoneNums();
    $scope.flag=false;
	})



  // 服务









});



icloud.factory('loca',function(){
  return{
    getData:function(key){
      var d=localStorage.getItem(key);
      return d==null?[]:JSON.parse(d);
    },
    saveData:function(key,data){
      localStorage.setItem(key,JSON.stringify(data));
    },
    delData:function(key){
      localStorage.removeItem(key);
    }
  }

})































