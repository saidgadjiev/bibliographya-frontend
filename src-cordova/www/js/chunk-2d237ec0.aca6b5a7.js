(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d237ec0"],{fcd1:function(t,s,i){"use strict";i.r(s);var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return t.statistics?i("v-card",[i("v-card-title",{attrs:{"primary-title":""}},[i("h3",{staticClass:"headline font-weight-bold"},[t._v("Статистика")])]),i("v-divider"),i("v-card-text",{staticClass:"subheading font-weight-bold"},[i("div",{staticStyle:{color:"#3D5AFE"}},[t._v("\n      Количество пользователей:\n      "),i("span",[t._v(t._s(t._usersStats.count))])]),i("v-divider"),i("div",{staticStyle:{color:"#00E676"}},[t._v("\n      Количество биографий:\n      "),i("span",[t._v(t._s(t._biographiesStats.count))])]),i("v-divider"),i("div",{staticStyle:{color:"#AA00FF"}},[t._v("\n      Количество лайков:\n      "),i("span",[t._v(t._s(t._likesStats.count))])]),i("v-divider"),i("div",{staticStyle:{color:"#F50057"}},[t._v("\n      Количество комментариев:\n      "),i("span",[t._v(t._s(t._commentsStats.count))])])],1)],1):t._e()},n=[],e=i("d91a"),c=i("bc3a"),r={getStats:o};function o(){return c.get(Object(e["b"])("stats"))}var d=i("db49"),u={name:"Statistics",data:function(){return{statistics:void 0}},metaInfo:{title:d["o"].STATISTIC},computed:{_usersStats:function(){return this.statistics.usersStats},_likesStats:function(){return this.statistics.likesStats},_biographiesStats:function(){return this.statistics.biographiesStats},_commentsStats:function(){return this.statistics.commentsStats}},methods:{loadStats:function(){var t=this;r.getStats().then(function(s){t.statistics=s.data},function(t){})}},created:function(){this.loadStats()}},v=u,l=i("2877"),_=i("6544"),S=i.n(_),f=i("b0af"),h=i("99d9"),b=i("12b2"),p=i("ce7e6"),m=Object(l["a"])(v,a,n,!1,null,"5313ac0f",null);s["default"]=m.exports;S()(m,{VCard:f["a"],VCardText:h["b"],VCardTitle:b["a"],VDivider:p["a"]})}}]);