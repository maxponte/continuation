//intEq : int * int -> bool
function intEq (x,y) { return x == y; }
//intWin : unit -> int list
function intWin () { return []; }
//intLose : unit -> bool
function intLose () { return false; }
//ghettoCons : 'a * 'a list -> 'a list
function ghettoCons (x, L) { return [x].concat(L); }
//isEmpty : object -> bool
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

//findMyPath : 'a * 'a tree * (unit -> bool) * (unit -> int list)
//ENSURES if me is in tree, then findMyPath returns the path of me.
//Otherwise, findMyPath returns false.

function findMyPath (me, tree, lose, win) {
  //console.log("me: "+me+"\ntree: "+JSON.stringify(tree)+"\nlose: "+lose()+"\nwin: "+win());
  if(isEmpty(tree)) { return lose(); }
  if(intEq(me, tree.val)) { return win(); }
  return findMyPath (me, tree.left, function () {
    return findMyPath (me, tree.right, lose, function() { return ghettoCons (1, win()); });
  }, function() {
    return ghettoCons (0, win());
  });
}

//sample tree
var a = {left : {left : {left : {}, val : 5, right : {}}, val : 2, right : {}}, val : 3, right : {left : {}, val : 1, right : {left : {}, val : 10, right : {}}}};
console.log(findMyPath(10,a,intLose,intWin));

function addtwo (x) { return x + 2; }
console.log([1,2,3,4].map(addtwo));
