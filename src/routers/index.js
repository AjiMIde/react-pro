import { BrowserRouter as Router, HashRouter as RouterH, Switch, Route, Link, withRouter, } from "react-router-dom";
import loadable from '@loadable/component'

import RouterComp from "@views/RouterUsage/RouterComp";

const withRouterComp = withRouter(RouterComp)

const arrayRouter = [
  {
    path: 'router-comp2',
    name: 'routerComp2',
    comp: loadable(() => import(/*webpackChunkName: "routerComp2"*/'@views/RouterUsage/RouterComp2'))
  },
  {
    path: 'router-comp3',
    name: 'routerComp3',
    comp: loadable(() => import(/*webpackChunkName: "routerComp3"*/'@views/RouterUsage/RouterComp3'))
  },
  {
    path: 'router-comp4/:name',
    name: 'routerComp4',
    comp: loadable(() => import(/*webpackChunkName: "routerComp4"*/'@views/RouterUsage/RouterComp4'))
  },
  {
    path: 'router-comp5',
    name: 'routerComp5',
    comp: loadable(() => import(/*webpackChunkName: "routerComp4"*/'@views/RouterUsage/RouterComp5'))
  },
]

const Basic = [
  {
    path: '/',
    txt: '首页',
    comp: loadable(() => import(/*webpackChunkName: "readme"*/'@views/readme'))
  }
]

const Advanced = [
  {
    path: 'router-usage',
    txt: 'Router',
    name: 'routerUsage',
    comp: loadable(() => import(/*webpackChunkName: "routerUsage"*/'@views/RouterUsage/RouterUsage'))
  },
  {
    path: 'hooks',
    name: 'hooks',
    txt: 'Hooks',
    comp: loadable(() => import(/*webpackChunkName: "hooks"*/'@views/Hooks/Hooks'))
  },
  {
    path: 'comp-desc',
    name: 'compDesc',
    txt: '组件定义',
    comp: loadable(() => import(/*webpackChunkName: "compDesc"*/'@views/ComponentDesc/TheClass'))
  },
  {
    path: 'react-lazy',
    txt: 'react-lazy',
    comp: loadable(() => import(/*webpackChunkName: "reactLazy"*/'@views/ComponentDesc/ReactLazy/father'))
  },

]

const Example = [
  {
    path: 'react-dnd-ex',
    txt: 'react dnd',
    comp: loadable(() => import(/*webpackChunkName: "react-dnd"*/'@views/ReactDnd/Dnd.js'))
  },
]

const Test = [
  {
    path: 'test1',
    txt: 'test1',
    name: 'test1',
    comp: loadable(() => import(/*webpackChunkName: "test"*/'@views/Test/Test1'))
  },
  {
    path: 'test2',
    txt: 'test2',
    name: 'test2',
    comp: loadable(() => import(/*webpackChunkName: "test2"*/'@views/Test/Test2'))
  },
  {
    path: 'test3',
    txt: 'test3',
    name: 'test3',
    comp: loadable(() => import(/*webpackChunkName: "test3"*/'@views/Test/Test3'))
  }
]

const array = [].concat(Basic).concat(Advanced).concat(Test).concat(arrayRouter).concat(Example)

// export {
//   array as Routers
// }

export default function R () {
  return (
    <RouterH>
      <Switch>
        {
          array.map(o => {
            return (
              <Route key={o.name} path={'/' + o.path} component={o.comp} />
            )
          })
        }
        {/*直接将component传参是比较常用的，但这样无法进行有用参数的传递*/}
        {/*<Route path={'/router-comp'}><RouterComp/></Route>*/}
        {/*使用component来渲染组件，props自带 history/match/location等信息（和操作对象）*/}
        {/*<Route path={'/router-comp'} component={RouterComp}/>*/}
        {/*使用render亦可来渲染组件，不同的是，使用要手动传参 props(但可能带来更多灵活的业务操作) */}
        {/*<Route path={'/router-comp'} render={(props)=><RouterComp {...props}/> } />*/}
        {/*使用withRouter包裹组件，也可以在组件props中得到相关的history等信息*/}
        {/*<Route path={'/router-comp'} component={withRouterComp}/>*/}
      </Switch>
    </RouterH>
  )
}

export {
  Basic,
  Advanced,
  Test,
  Example
}
