(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d3866"],{"5cac":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("list",{attrs:{"infinite-load":t.infiniteLoad,"reset-id":t.resetId},scopedSlots:t._u([{key:"item",fn:function(t){var e=t.item;return[n("category-card",{attrs:{category:e}})]}}])},[n("template",{slot:"no-results"},[n("v-card",[n("v-card-text",[n("h4",[t._v("Еще категорий нет.")])])],1)],1)],2)},r=[],i=n("f3ce"),o=n("1605"),s=n("1b98"),c=n("2c57"),d={name:"CategoriesList",mixins:[c["a"]],data:function(){return{resetId:+new Date}},methods:{pullToRefresh:function(t){t("done"),++this.resetId},infiniteLoad:function(t,e){var n=this;return s["a"].getCategories(t,e).then(function(t){return 200===t.status&&t.data.content.forEach(function(t){n.$vuetify.breakpoint.mdAndUp?t.flex=6:t.flex=12}),t})}},components:{List:i["a"],CategoryCard:o["a"]}},u=d,f=n("2877"),l=n("6544"),p=n.n(l),h=n("b0af"),m=n("99d9"),v=Object(f["a"])(u,a,r,!1,null,"3f26385c",null);e["default"]=v.exports;p()(v,{VCard:h["a"],VCardText:m["b"]})}}]);