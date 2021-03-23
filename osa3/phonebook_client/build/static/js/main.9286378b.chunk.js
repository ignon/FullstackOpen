(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){"use strict";t.r(n);var r=t(0),o=t(2),a=t(14),c=t.n(a),i=t(3),u=t(4),l=t.n(u),s="https://arden-servu.herokuapp.com/api/persons",d={getAll:function(){return l.a.get(s).then((function(e){return e.data}))},add:function(e){return l.a.post(s,e).then((function(e){return e.data}))},update:function(e,n){return l.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},remove:function(e){return l.a.delete("".concat(s,"/").concat(e))}},f=function(e){var n=e.filter,t=e.handleNewFilter;return Object(r.jsxs)("div",{children:["filter shown with ",Object(r.jsx)("input",{value:n,onChange:t})]})},b=function(e){var n=e.addPerson,t=e.newName,o=e.handleNewName,a=e.newNumber,c=e.handleNewNumber;return Object(r.jsxs)("form",{onSubmit:n,children:[Object(r.jsxs)("div",{children:["name: ",Object(r.jsx)("input",{value:t,onChange:o})]}),Object(r.jsxs)("div",{children:["number: ",Object(r.jsx)("input",{value:a,onChange:c})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})},h=function(e){var n=e.persons,t=e.filter,o=e.removePerson;return Object(r.jsx)("div",{children:Object(r.jsx)("ul",{children:n.filter((function(e){return new RegExp("^"+t,"i").test(e.name)})).map((function(e){return Object(r.jsxs)("li",{children:[e.name," ",e.number,Object(r.jsx)("button",{onClick:function(){return o(e)},children:"Delete"})]},e.name)}))})})},j=function(e){var n=e.notification;if(!n)return null;if(!n.message)return null;var t=n.message,o=n.isWarning,a=void 0!==o&&o?{color:"red",fontStyle:"bold",fontSize:20,border:"2px solid red",backgroundColor:"lightgray",borderRadius:"4px"}:{color:"green",fontStyle:"italic",fontSize:20,border:"2px solid green",backgroundColor:"lightgray",borderRadius:"4px"};return Object(r.jsx)("div",{className:"error",style:a,children:t})},m=function(){var e=Object(o.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1],c=Object(o.useState)({}),u=Object(i.a)(c,2),l=u[0],s=u[1];Object(o.useEffect)((function(){d.getAll().then((function(e){console.log("promise fulfilled"),a(e)}))}),[]);var m=Object(o.useState)(""),v=Object(i.a)(m,2),p=v[0],O=v[1],g=Object(o.useState)(""),x=Object(i.a)(g,2),w=x[0],N=x[1],k=Object(o.useState)(""),S=Object(i.a)(k,2),y=S[0],C=S[1],E=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];s({message:e,isWarning:n}),setTimeout((function(){s(null)}),5e3)};return Object(r.jsxs)("div",{children:[Object(r.jsx)(j,{notification:l}),Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(f,{filter:y,handleNewFilter:function(e){var n=e.target.value;C(n)}}),Object(r.jsx)("h3",{children:"Add a new"}),Object(r.jsx)(b,{addPerson:function(e){if(e.preventDefault(),console.log(e),p.length<=0)alert('"Name" field is required!');else if(w.length<=0)alert('"Number" field is required!');else if(/^[0-9+-]*$/.test(w)){var n={name:p,number:w};console.log("jaaa");var r=t.find((function(e){return e.name===n.name}));if(r){if(!window.confirm("".concat(n.name," already exists, replace the old number with a new one?")))return;d.update(r.id,n).then((function(e){E("Number of ".concat(e.name," updated!")),a(t.map((function(n){return n.id!==e.id?n:e})))})).catch((function(e){var n=e.response.data.error;E("Error: ".concat(n),!0)}))}else d.add(n).then((function(e){E("".concat(e.name," added to phonebook!")),a(t.concat(e)),O(""),N("")})).catch((function(e){var n=e.response.data.error;E("Error: ".concat(n),!0)}))}else alert("Invalid phone number!")},newName:p,newNumber:w,handleNewName:function(e){var n=e.target.value;O(n)},handleNewNumber:function(e){var n=e.target.value;N(n)}}),Object(r.jsx)("h3",{children:"Numbers"}),Object(r.jsx)(h,{persons:t,filter:y,removePerson:function(e){window.confirm("Delete ".concat(e.name,"?"))&&d.remove(e.id).then((function(){a(t.filter((function(n){return n.id!==e.id}))),E("".concat(e.name," removed from phonebook!"))})).catch((function(n){E("Information of ".concat(e.name," has already been removed from the server"),!0)}))}})]})};c.a.render(Object(r.jsx)(m,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.9286378b.chunk.js.map