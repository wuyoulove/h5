import Vue from 'vue'
import Router from 'vue-router'
import Calendar from 'vue2-datepick'
// import MapPage from '../pages/map'
import Index from '../pages/index'
import HomePage from '../pages/personcell/homePage'
import correctMeg from '../pages/personcell/correctMeg'
import Filtrate from '../pages/personcell/filtrate'
import PersonAsse from '../pages/personcell/personAsse'
import MegAsse from '../pages/personcell/megAsse'
import InterveneMeg from '../pages/personcell/interveneMeg'
import ServerDetails from '../pages/personcell/serverDetails'
import EvalutaDetails from '../pages/personcell/evalutaDetails'

//人员签收
import CurrentList from '../pages/person-sign/CurrentList'
import CurrentDetail from '../pages/person-sign/CurrentDetail'
import SignCheck from '../pages/person-sign/SignCheck'
import Screening from '../pages/person-sign/Screening'
//服务计划
import PlanView from '../pages/service-plan/PlanView'
import PlanList from '../pages/service-plan/PlanList'
import MakePlan from '../pages/service-plan/MakePlan'
import PlanDetail from '../pages/service-plan/PlanDetail'
import PlanScreening from '../pages/service-plan/PlanScreening'
//服务事项
import ItemsLIists from '../pages/service-items/ItemsLists'
import Perform from '../pages/service-items/Perform'
import ServiceView from '../pages/service-items/ServiceView'
import ItemsDetail from '../pages/service-items/ItemsDetail'
import ItemsScreening from '../pages/service-items/ItemsScreening'
//处置结果
import DisposalLists from '../pages/disposal-results/DisposalLists'
import ResultsView from '../pages/disposal-results/ResultsView'
import ResultsScreening from '../pages/disposal-results/ResultsScreening'
import  ResultDetail from '../pages/disposal-results/ResultDetail.vue'
Vue.use(Router)
Vue.use(Calendar)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/correctMeg',
      name: 'correctMeg',
      component: correctMeg,
    },
    {
      path: '/Filtrate',
      name: 'Filtrate',
      component: Filtrate,
    },
    {
      path: '/PersonAsse',
      name: 'PersonAsse',
      component: PersonAsse,
    },
    {
      path: '/MegAsse',
      name: 'MegAsse',
      component: MegAsse,
    },
    {
      path: '/InterveneMeg',
      name: 'InterveneMeg',
      component: InterveneMeg,
    },
    {
      path: '/ServerDetails',
      name: 'ServerDetails',
      component: ServerDetails,
    },
    {
      path: '/EvalutaDetails',
      name: 'EvalutaDetails',
      component: EvalutaDetails,
    },
    //人员签收
    {
      path: '/CurrentList',
      name: 'CurrentList',
      component: CurrentList,
    },
    {
      path: '/CurrentDetail',
      name: 'CurrentDetail',
      component: CurrentDetail,
    },
    {
      path: '/SignCheck',
      name: 'SignCheck',
      component: SignCheck,
    },
     {
      path: '/Screening',
      name: 'Screening',
      component: Screening,
    },
    //  服务计划
    {
      path: '/PlanList',
      name: 'PlanList',
      component: PlanList,
    },
    {
      path: '/PlanView',
      name: 'PlanView',
      component: PlanView,
    },
    {
      path: '/MakePlan',
      name: 'MakePlan',
      component: MakePlan,
    },
    {
      path: '/PlanDetail',
      name: 'PlanDetail',
      component: PlanDetail,
    },
    
    {
      path: '/PlanScreening',
      name: 'PlanScreening',
      component: PlanScreening,
    },
  
    //服务事项
    {
      path: '/ItemsLIists',
      name: 'ItemsLIists',
      component: ItemsLIists,
    },
    {
      path: '/Perform',
      name: 'Perform',
      component: Perform,
    },
    {
      path: '/ServiceView',
      name: 'ServiceView',
      component: ServiceView,
    },
    
    {
      path: '/ItemsDetail',
      name: 'ItemsDetail',
      component: ItemsDetail,
    },
    
    {
      path: '/ItemsScreening',
      name: 'ItemsScreening',
      component: ItemsScreening,
    },
    //处置结果
    {
      path: '/DisposalLists',
      name: 'DisposalLists',
      component: DisposalLists,
    },
    {
      path: '/ResultsView',
      name: 'ResultsView',
      component: ResultsView,
    },
    {
      path: '/ResultsScreening',
      name: 'ResultsScreening',
      component:ResultsScreening,
    },
    {
      path: '/ResultDetail',
      name: 'ResultDetail',
      component:ResultDetail,
    },
   
  ],
})
