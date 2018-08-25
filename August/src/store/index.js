import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

const generate = commit => (id,mutations) =>{
  return new Promise((reslove,reject) =>{

  })
}

const state = {
  // 0 未登陆
  isLogin:0,
  //当前颜色
  color:'#409EFF',
  //屏幕宽度等级
  /*
  *   0 - xs <768px
  *   1 - >=768px
  * */
  screenLevel:0,
  /*========================赛事信息=============================*/
  matchId:'',
  matchName:'',
  //全局年龄设置列表
  globalAgeData:[],
  //组别列表
  groupList:[
    {name:'青成年组',num:'1000000'},
    {name:'少年A组',num:'0100000'},
    {name:'少年B组',num:'0010000'},
    {name:'少年C组',num:'0001000'},
    {name:'儿童A组',num:'0000100'},
    {name:'儿童B组',num:'0000010'},
    {name:'儿童C组',num:'0000001'},
    {name:'青成年+少年A',num:'1100000'},
    {name:'少年A+少年B',num:'0110000'},
    {name:'少年B+少年C',num:'0011000'},
    {name:'少年C+儿童A',num:'0001100'},
    {name:'儿童A+儿童B',num:'0000110'},
    {name:'儿童B+儿童C',num:'0000011'},
    {name:'少年全拼',num:'0111000'},
    {name:'儿童全拼',num:'0000111'},
  ],
  //项目列表
  itemsList:[
    {id: 1, name: "speed",CNName:'速度过桩',isEstablish:false,isGroupItem:false,
      group:[

      ],
      sex:[]
    },
    {id: 2, name: "speedskating",CNName:'速度轮滑',isEstablish:false,isGroupItem:false,
      group:[

      ],
      sex:[]
    },
    {id: 3, name: "obstacle",CNName:'障碍轮滑',isEstablish:false,isGroupItem:false,
      group:[

      ],
      sex:[]
    },
    {id: 4, name: "skiddingjump",CNName:'轮滑跳高',isEstablish:false,isGroupItem:false,
      group:[

      ],
      sex:[]
    },
    {id: 5, name: "single",CNName:'单人花式',isEstablish:false,isGroupItem:false,
      group:[

      ],
      sex:[]
    },
    {id: 6, name: "skaking",CNName:'轮滑刹车',isEstablish:false,isGroupItem:false,
      group:[

      ],
      sex:[]
    },
    {id: 7, name: "double",CNName:'双人花式',isEstablish:false,isGroupItem:true,
      group:[

      ],
      sex:[]
    },
    {id: 8, name: "skiddingdragon",CNName:'轮滑拉龙',isEstablish:false,isGroupItem:true,
      group:[

      ],
      sex:[]
    },
    {id: 9, name: "skiddingdance",CNName:'轮滑舞蹈',isEstablish:false,isGroupItem:true,
      group:[

      ],
      sex:[]
    }
  ]
}

const mutations = {
  changeIsLogin:(state,b) =>{
    state.isLogin = b;
  },
  changeColor:(state,color)=>{
    state.color = color;
  },
  changeScreenLevel:(state,w) =>{
    if(w >= 768){
      state.screenLevel = 1;
    }else if(w<768){
      state.screenLevel = 0;
    }
  },
  //赛事信息mutations
  changeMatchId:(state,matchId)=>{
    state.matchId = matchId;
  },
  changematchName:(state,matchName)=>{
    state.matchName = matchName;
  },
  changeGlobalAgeData:(state,obj)=>{
    obj.forEach(v=>{
      if(v.group == 'adult'){
        v["CNGroup"] = '青成年组';
      }else if( v.group == 'teenA'){
        v["CNGroup"] = '少年A组';
      }else if( v.group == 'teenB'){
        v["CNGroup"] = '少年B组';
      }else if( v.group == 'teenC'){
        v["CNGroup"] = '少年C组';
      }else if( v.group == 'childA'){
        v["CNGroup"] = '儿童A组';
      }else if( v.group == 'childB'){
        v["CNGroup"] = '儿童B组';
      }else if( v.group == 'childC'){
        v["CNGroup"] = '儿童C组';
      }
    });
    state.globalAgeData = obj;
    state.globalAgeData = obj;
  },
  changeEstablish:(state,arr)=>{
    //传入id置true，其余全部为false
    state.itemsList.forEach(v=>{
      v.isEstablish = false;
    })
    arr.forEach(v=>{
      state.itemsList[v].isEstablish = true;
    })
  },
  cleanItemGroupData:state =>{
    state.itemsList.forEach(v=>{
      v.group=[];
      v.isEstablish = false;
    })
  },
  changeItemGroupData:(state,obj)=>{
    state.itemsList.forEach(v=>{
      if(v.name === obj.group){
        v.isEstablish = true;
        v.group.push(obj);

      }
    })
  }
}

export default new vuex.Store({
  state,
  mutations
})
