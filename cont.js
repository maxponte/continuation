const log = (x) => {
  console.log(x);
  return x;
}

const RandomTree = ({iterator}) => {
    const arrayToTree = arr => (p =>
        arr.length ? {
            left: arrayToTree(arr.slice(0, p)),
            val: arr[p],
            right: arrayToTree(arr.slice(p + 1))
        } : null
    )(
        ~~(arr.length * Math.random())
    )
    const make = () => arrayToTree(Array.from(iterator()))
    return { make, empty }
}

const GetTreeSearchPaths = () => {
    const eq = (x, y) => x === y
    const success = () => []
    const fail = () => null
    const prepend = (x, L) => [x, ...L]
    const empty = o => o === null
    const findH = ({me, tree, fail, success}) =>
        empty(tree) ? fail() :
            eq(me, log(tree.val)) ? success() :
                findH({
                    me,
                    tree: tree.left,
                    fail: () => findH({
                        me,
                        tree: tree.right,
                        fail,
                        success: () => prepend(1, success())
                    }),
                    success: () => prepend(0, success())
                })
    const find = ({me, tree}) => findH({me: log(me), tree: log(tree), success, fail})
    return { find }
}

const { find } = GetTreeSearchPaths()
const { make } = RandomTree({
    iterator: function*() {
      const expectedSize = 10;
      const maximumValue = 11;
      while (Math.random() > 1/expectedSize) yield ~~(maximumValue * Math.random());
    }
})
log(find({me: 1, tree: make()}))
log(find({
    me: 10,
    tree: {left : {left : {left : null, val : 5, right : null}, val : 2, right : null}, val : 3, right : {left : null, val : 1, right : {left : null, val : 10, right : null}}}
}))