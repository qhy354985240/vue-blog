// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/common.css'

import {
  Table,
  TableColumn,
  Button,
  Input,
  Message,
  Radio,
  Checkbox,
  Form,
  FormItem,
  Dialog,
  Pagination,
  Tabs,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  MenuItem,
  Submenu,
  Collapse,
  CollapseItem,
  Steps,
  Step,
  Card,
  RadioGroup,
  Select,
  OptionGroup,
  Option,
  CheckboxGroup,
  Tooltip,
  DatePicker,
  MenuItemGroup,
  Popover,
  Tag,
  Dropdown,
  DropdownItem,
  Loading,
  Icon,
  DropdownMenu,
  TabPane,
  MessageBox,
  Carousel,
  CarouselItem,
  Progress,
  ButtonGroup,
  Switch,
  TimePicker,
  Tree
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import store from '@/vuex'

Vue.use(Popover)
Vue.use(DatePicker)
Vue.use(Tooltip)
Vue.use(Card)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Submenu)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Tag)
Vue.use(Button)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Select)
Vue.use(OptionGroup)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(Row)
Vue.use(Col)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Icon)
Vue.use(TabPane)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Loading.directive)
Vue.use(Progress)
Vue.use(ButtonGroup)
Vue.use(Switch)
Vue.use(TimePicker)
Vue.use(Tree)

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
