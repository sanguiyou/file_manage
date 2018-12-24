var rightTreeObj = null;
var setting = {
    check: {
        enable: true
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onCheck: function(event, treeId, treeNode) {
            var checkedNodes = rightTreeObj.getCheckedNodes();
            for(var i=0, len=checkedNodes.length; i<len; i++) {
                var checkedNode = checkedNodes[i];
                if(checkedNode != treeNode) {
                    rightTreeObj.checkNode(checkedNode, false);
                }
            }
            console.log("onCheckNode", arguments);
        }
    }
};
var zNodes =[
    { id:1, pId:0, name:"徐海涛部门", open:true, chkDisabled: true},
    { id:11, pId:1, name:"杨锴", open:true},
    { id:11, pId:1, name:"杨锴", open:true},
    { id:12, pId:1, name:"陈子栋部门", open:true},
    { id:2, pId:0, name:"陈子栋部门", open:true, chkDisabled: true},
    { id:22, pId:2, name:"赵海洋部门", open:true, chkDisabled: true},
    { id:221, pId:22, name:"李松"},
    { id:222, pId:22, name:"胡江"},
    { id:23, pId:2, name:"李文东", chkDisabled: true}
];

$(document).ready(function(){
    rightTreeObj = $.fn.zTree.init($(".tree:last"), setting, zNodes);
});
