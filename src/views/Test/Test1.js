import React, { useRef, useCallback, useEffect, useState, memo } from 'react'
import update from 'immutability-helper'
import immutable from 'immutable'
import _ from 'lodash'
import $update from "immutability-helper";
import './Test1.scss'

// function Child({val, getData}) {
//   useEffect(() => {
//     console.log('!!')
//     getData();
//   }, [getData]);
//
//   return <div>{val}</div>;
// }
//
// let count = 0
//
// function Text1 () {
//   const [val, setVal] = useState("");
//   const [val2, setVal2] = useState('')
//   window.setVal2 = setVal2
//
//   const getData = useCallback(() => {
//     setTimeout(() => {
//       count++;
//       setVal("new data " + count);
//     }, 1500);
//   }, [val2]);
//
//   return <Child val={val} getData={getData} />
// }
//
// function Test2 () {
//   const [s, setS] = useState(0)
//   return (<div>
//     <button onClick={() => setS(s+1)}>+1</button>
//   </div>)
// }
//
// // ---
// // ---
// const Child1 = memo((props) => {
//   // console.log('re render')
//   const { updateAry } = props
//   const fun1 = () => {
//     updateAry((new Date()).getSeconds())
//   }
//   console.log('child update')
//   return (<div>
//     <div onClick={fun1}>Click me</div>
//   </div>)
// })
//
// function Father1 () {
//   const [num, setNum] = useState(1)
//   const [price, setPrice] = useState(8.8)
//   const [ary, setAry] = useState([
//     { id: 1 , items: [{ style: { w: 3} }] },
//     { id: 2 , items: [{ style: { w: 5} }] },
//   ])
//
//   const updateAry = useCallback((val) => {
//     // setAry(ary.concat([val]))
//     console.log(ary)
//   }, [ary])
//
//   const updateAry2 = () => {
//     let s = (new Date()).getSeconds()
//     // setAry(ary.concat([s]))
//     let i = 0
//     let newD = update(ary, {
//       [i]: {
//         items: {
//           [i]: {
//             style: {
//               w: {
//                 $set: s
//               }
//             }
//           }
//         }
//       }
//     })
//     setAry(newD)
//   }
//
//   window.aji = updateAry2
//
//   const s = {
//     width: 400,
//     height: 400,
//     border: '1px solid #ccc',
//     resize: 'both',
//     overflow: 'auto',
//     'background-image': 'url(http://127.0.0.1:7890/6.18-content.png)',
//     backgroundImage: 'http://127.0.0.1:7890/6.18-content.png'
//   }
//
//   const xx = () => {
//     return ary.map((o, i) => {
//       let h3 = <h3 key={i}>{o.id}</h3>
//       let lis = null
//       if (o.items.length) {
//         lis = o.items.map((oo, ii) => {
//           return (<li key={ii}>{oo.style.w}</li>)
//         })
//       }
//       return (<div>{h3}{lis}</div>)
//     })
//   }
//
//   console.log('father render')
//
//   const attr = {
//     // disabled: true,
//   }
//
//   const debounceFun1 = _.throttle(evt => {
//     console.log(evt)
//   }, 1000, {})
//
//   const fun1 = () => {
//     console.log('...')
//   }
//
//   return (<div>
//     <button {...attr} style={s} onClick={debounceFun1}>aji</button>
//     {/*<div style={s}>?</div>*/}
//     <p>Num: {num} <button onClick={() => setNum(num + 1)}>+1</button></p>
//     {/*<p>Price: {price} <button onClick={() => setPrice(price + 2)}>+2</button></p>*/}
//     <div>
//       <ul>
//         {xx()}
//       </ul>
//     </div>
//     <div onClick={updateAry2}> click me 2</div>
//     <Child1 updateAry={updateAry}/>
//   </div>)
// }
//
// function ResizeEg () {
//   const style = {
//     width: 100,
//     height: 100,
//     resize: 'both',
//     overflow: 'hidden'
//   }
//   const ref = useRef(null)
//   useEffect(() => {
//     const resizeObserver = new window.ResizeObserver(_.debounce(targets => {
//       console.error('resize')
//       console.log(targets)
//       return false
//     }, 1500, { leading: true }))
//     const eles = document.getElementsByClassName('eg-div')
//     for (let i = 0; i < eles.length; i++) {
//       // console.log(eles[i])
//       resizeObserver.observe(eles[i])
//     }
//     console.log(ref.current)
//     return () => {
//       resizeObserver.disconnect()
//     }
//   })
//
//   const click2 = _.debounce(evt => {
//     console.log(evt, '?')
//   }, 500)
//   const click = (evt) => {
//     console.error('click')
//     click2(evt)
//   }
//
//   return (<div className={'resize-eg'} ref={ref}>
//     <div className={'eg-div'} style={style} onClick={click}>11111</div>
//     <div className={'eg-div'} style={style}>22222</div>
//     <div className={'eg-div'} style={style}>333</div>
//     <div className={'eg-div'} style={style}>444</div>
//   </div>)
// }
//
// const CC = memo(({ styleData }) => {
//   const [ s, setS] = useState({})
//
//   useEffect(() => {
//     setS(styleData)
//     return () => {
//
//     }
//   }, [styleData])
//
//   // const { name, age, style } = prop
//   console.error('cc, change', styleData)
//   return (<div>
//     { s.w }
//   </div>)
// })
//
// let aji = 'aji'

window.aji = 0

function Test1111 () {
  const [a, sa] = useState(Math.random)
  const [b, sb] = useState(Math.random)
  const [c, sc] = useState(Math.random)
  window.aji += 1

  let jjj = Math.random()

  console.error(jjj, window.aji)

  useEffect(() => {
    console.error('effo')
  })
  const fun1 = () => {
    console.error('jjj', jjj)
    sa(Math.random())
  }

  return (<div className={'test1'}>
    {a}<br/>
    {b}<br/>
    {c}<br/>
    <button onClick={() => fun1()}>点我</button>
  </div>)
}

function TestPosFixed () {
  const s_father = {
    marginTop: 300,
    marginLeft: 300,
    height: 400,
    width: 400,
    padding: 10,
    overflow: 'auto',
    border: '1px solid #ccc'
  }
  const s_child = {
    height: 50,
    marginBottom: 10,
    backgroundColor: 'red',
  }
  return (<div style={s_father}>
    <div></div>
    <div style={s_child}></div>
    <div style={s_child}></div>
    <div style={s_child}></div>
    <div style={s_child}></div>
    <div style={s_child}></div>
    <div style={s_child}></div>
    <div style={s_child}></div>
    <div style={s_child}></div>
    <div style={s_child}></div>
    <div style={s_child}></div>
    <div style={s_child}></div>
    <div style={s_child}></div>
    <div style={s_child}></div>
    <div style={s_child}></div>
    <div style={s_child}></div>
    <div style={s_child}></div>
  </div>)
}

function Test3D () {
  const b_c = {
    width: 400,
    height: 1000,
    backgroundColor: 'red',
    position: 'relative',
  }
  const b_n = {
    position: 'absolute',
    width: 330,
    height: 200,
    top: 60,
    left: 35,
    zIndex: 9,

    backgroundColor: 'blue'
  }
  const c_n = {
    position: 'absolute',
    width: 360,
    height: 300,
    top: 30,
    left: 20,
    zIndex: 8,
    backgroundColor: 'yellow'
  }
  return (
    <div style={b_c}>
      背景颜色
      <div style={b_n}>Banner图</div>
      <div style={c_n}>背景图片</div>
    </div>
  )
}

function TestStateCb () {
  // 这个函数证明了, setState 是异步的
  const [a, sa] = useState(1)

  const doit = () => {
    console.log(a)
  }

  const doit2 = () => {
    sa(2)
    doit()
  }

  return (<div>
    <button onClick={doit2}> do it</button>
  </div>)
}

function TestAryChange () {
  // 测试一个简单的方式来改变 state 中的 ary 中的 obj 的属性
  // 这里的 change 是不生效的
  // 但 change2 生效
  const [ary, setAry] = useState([
    { name: 'aji' }
  ])

  const change = () => {
    ary[0].name = 'zhi'
    setAry(ary)
  }

  const change2 = () => {
    ary[0].name = 'cjt'
    setAry([...ary])
  }

  return (<div>
    <button onClick={change}>改变</button>
    <button onClick={change2}>改变2</button>
    <div>{ary[0].name}</div>
  </div>)
}

class TestAryChange2 extends React.Component {
  // 与上面的 function 不同的是，这里的 change 是可以引起 re render的！！
  // 原因是 this.setState 每次都会引起渲染，而react 为了制止这样的行为，还提出了 对比，return false 来提高性能等做法
  constructor (props) {
    super(props)
    this.state = {
      ary: [{ name: 'aji' }]
    }
  }

  change = () => {
    const ary = this.state.ary
    ary[0].name = 'zhi'
    console.log(this)
    this.setState({
      ary
    })
  }

  render () {
    console.error('rennnnnder')
    const ary = this.state.ary
    return <div>
      {ary[0].name}
      <button onClick={this.change}>改变1</button>
    </div>
  }
}


function TestFlexOverflow () {
  return (<div className='test-flex-overflow'>
    <div className={'a'}>left</div>
    <div className={'b'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequatur, corporis
      doloremque eum neque odio quisquam repudiandae voluptas! Deleniti et facilis ipsam magni pariatur, perferendis
      quaerat qui totam vel voluptatibus.
    </div>
    <div className={'c'}>right</div>
  </div>)
}


/**
 * 这是一个无法自圆其说的呈现...
 * @returns {JSX.Element}
 * @constructor
 */
function SearchResults () {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchData () {
      console.log("fetch data")
      const result = await (new Promise(resolve => {
        window.setTimeout(() => {
          resolve([
            query + '-' + (+new Date()),
            query + '---' + (+new Date()),
          ])
        }, 2000)
      }))

      // console.log(ignore);

      if (!ignore) setData(result);
    }

    fetchData()

    console.log("effect in");

    return () => {
      console.log("effect out");
      ignore = true;
    };
  }, [query]);

  console.log("function render");

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)}/>
      <ul>
        {data.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </>
  );
}

function Form () {
  // 1. Use the name state variable
  const [name, setName] = useState('Mary');

  // 2. Use an effect for persisting the form
  useEffect(function persistForm () {
    console.log('1111')
    localStorage.setItem('formData', name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState('Poppins');

  // 4. Use an effect for updating the title
  useEffect(function updateTitle () {
    console.log('2222')
    document.title = name + ' ' + surname;
  });

  console.log('---')
  return <div>form</div>
  // ...
}

function testRef () {
  const count = useRef(0)

  useEffect(() => {
    setInterval(() => {
      count.current = count.current + 1
    }, 1000)
  }, [])

  return (<div>
    {count.current}
  </div>)
}

export default testRef
