let flatArr = [
    { id: 1, title: '标题1', parent_id: 0 },
    { id: 2, title: '标题2', parent_id: 0 },
    { id: 3, title: '标题2-1', parent_id: 2 },
    { id: 4, title: '标题3-1', parent_id: 3 },
    { id: 5, title: '标题4-1', parent_id: 4 },
    { id: 6, title: '标题2-2', parent_id: 2 },
  ];
  
  let arr = [
    {
      id: 1,
      pid: 0,
      name: 'body'
    }, {
      id: 2,
      pid: 1,
      name: 'title'
    }, {
      id: 3,
      pid: 2,
      name: 'div'
    },
    {
      id: 4,
      pid: 0,
      name: 'div'
    },
    {
      id: 9,
      pid: 4,
      name: 'div'
    }
  ]
  
  // 实现1:
  // 扁平的数组结构转换为JSON树形结构
  function convert(list) {
    const result = [];
    const map = list.reduce((pre, cur) => {
      pre[cur.id] = cur;
      return pre;
    }, {});
    for (let item of list) {
      if (item.pid === 0) {
        result.push(item);
        continue;
      }
      if (item.pid in map) {
        const parent = map[item.pid];
        parent.children = parent.children || [];
        parent.children.push(item);
      }
    }
    return result;
  }
  
  const res = convert(arr);
  console.log(res);
  
  // 实现2
  function  fn(data) {
    let map = {};
    let result = [];
    // 存映射，方便取值
    data.forEach((el) => {
        map[el.id] = el;
    });
    data.forEach((item) => {
        const father = map[item.pid];
        if (father) {
            (father.children || (father.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
  
    return result;
  }
  fn(source)
  
  // 实现3:
  function lookupChildren (target) {
    let source = JSON.parse(JSON.stringify(target))
    let newAry = []
    let i = 0
    while (i < source.length) {
        let _pitem = source[i]
        // 找当前项所有子节点
        let _ch = source.filter(item => item.pid === _pitem.id)
        let _father = source.find(item => _pitem.pid === item.id)
        _pitem.children = _ch
        !_father && newAry.push(_pitem)
        i++
    }
    return newAry
  }
  lookupChildren(source)
  
  // 实现4:
  // 找出根节点
  let root = source.filter(({ pid }) => !source.find((item) => (item.id === pid)))
  const getChilds = (list) => {
      return list.map(item => {
          let children = source.filter((temp) => temp.id === item.pid)
          item.children = getChilds(children)
          return item
      })
  }
  getChilds(root)
  
  // 实现5:
  const idMapping = source.reduce((acc, el, i) => {
    acc[el.id] = i;
    return acc;
  }, {});
  let roots;
  source.forEach(el => {
    // 判断根节点
    if (el.parentId === null) {
      roots = el;
      return;
    }
    // 用映射表找到父元素
    const parentEl = data[idMapping[el.pid]];
    // 把当前元素添加到父元素的`children`数组中
    parentEl.children = [...(parentEl.children || []), el];
  });
  



  
  // JSON树形结构转换为扁平数组结构
  function flatten(data) {
    return data.reduce((pre, cur) => {
      // concat
      const { id, title, parent_id, children = [] } = cur;
      return pre.concat([{ id, title, parent_id }], flatten(children));
    }, []);
  }
  
  const flattenRes = flatten(res);
  console.log(flattenRes);
  
  
  
  
  