import{Ha as f,Ib as S,Jb as m,Lb as w,Za as g,a as r,b as o,pa as u,qa as y,ua as h,wc as v}from"./chunk-EOCIFGZ3.js";var T=(()=>{class i{nonce;_printStyle=[];_styleSheetFile="";constructor(e){this.nonce=e}setPrintStyle(e){this._printStyle=[];for(let t in e)e.hasOwnProperty(t)&&this._printStyle.push((t+JSON.stringify(e[t])).replace(/['"]+/g,""))}returnStyleValues(){return`<style${this.nonce?` nonce="${this.nonce}"`:""}> ${this._printStyle.join(" ").replace(/,/g,";")} </style>`}returnStyleSheetLinkTags(){return this._styleSheetFile}setStyleSheetFile(e){let t=function(n){return`<link rel="stylesheet" type="text/css" href="${n}">`};if(e.indexOf(",")!==-1){let n=e.split(",");this._styleSheetFile=n.map(s=>t(s)).join("")}else this._styleSheetFile=t(e)}updateInputDefaults(e){for(let t=0;t<e.length;t++){let n=e[t];n.defaultValue=n.value,n.checked&&(n.defaultChecked=!0)}}updateSelectDefaults(e){for(let t=0;t<e.length;t++){let n=e[t],s=n.selectedIndex,l=n.options[s];l.defaultSelected=!0}}updateTextAreaDefaults(e){for(let t=0;t<e.length;t++){let n=e[t];n.defaultValue=n.value}}canvasToImageHtml(e){return`<img src="${e.toDataURL()}" style="max-width: 100%;">`}updateCanvasToImage(e){for(let t=0;t<e.length;t++){let n=this.canvasToImageHtml(e[t]);e[t].insertAdjacentHTML("afterend",n),e[t].remove()}}getHtmlContents(e){let t=document.getElementById(e);if(!t)return null;let n=t.getElementsByTagName("input"),s=t.getElementsByTagName("select"),l=t.getElementsByTagName("textarea"),a=t.getElementsByTagName("canvas");return this.updateInputDefaults(n),this.updateSelectDefaults(s),this.updateTextAreaDefaults(l),this.updateCanvasToImage(a),t.innerHTML}getElementTag(e){let t=[],n=document.getElementsByTagName(e);for(let s=0;s<n.length;s++)t.push(n[s].outerHTML);return t.join(`\r
`)}print(e){let t="",n="",s="top=0,left=0,height=auto,width=auto",l=this.getElementTag("base");e.useExistingCss&&(t=this.getElementTag("style"),n=this.getElementTag("link")),e.openNewTab&&(s="");let a=this.getHtmlContents(e.printSectionId);if(!a){console.error(`Print section with id ${e.printSectionId} not found.`);return}let c=window.open("","_blank",s);if(!c){console.error("Could not open print window.");return}c.document.open(),c.document.write(`
          <html>
            <head>
              <title>${e.printTitle?e.printTitle:""}</title>
              ${l}
              ${this.returnStyleValues()}
              ${this.returnStyleSheetLinkTags()}
              ${t}
              ${n}
            </head>
            <body ${e.bodyClass?`class="${e.bodyClass}"`:""}>
              ${a}
              <script defer>
                function triggerPrint(event) {
                  window.removeEventListener('load', triggerPrint, false);
                  ${e.previewOnly?"":`setTimeout(function() {
                    closeWindow(window.print());
                  }, ${e.printDelay});`}
                }
                function closeWindow(){
                  ${e.closeWindow?"window.close();":""}
                }
                window.addEventListener('load', triggerPrint, false);
              <\/script>
            </body>
          </html>`),c.document.close()}static \u0275fac=function(t){return new(t||i)(h(g,8))};static \u0275prov=u({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var p=class{printSectionId="";printTitle="";useExistingCss=!1;bodyClass="";openNewTab=!1;previewOnly=!1;closeWindow=!0;printDelay=0;constructor(d){d&&Object.assign(this,d)}},$=(()=>{class i extends T{printOptions=new p;set previewOnly(e){this.printOptions=o(r({},this.printOptions),{previewOnly:e})}set printSectionId(e){this.printOptions=o(r({},this.printOptions),{printSectionId:e})}set printTitle(e){this.printOptions=o(r({},this.printOptions),{printTitle:e})}set useExistingCss(e){this.printOptions=o(r({},this.printOptions),{useExistingCss:e})}set printDelay(e){this.printOptions=o(r({},this.printOptions),{printDelay:e})}set closeWindow(e){this.printOptions=o(r({},this.printOptions),{closeWindow:e})}set bodyClass(e){this.printOptions=o(r({},this.printOptions),{bodyClass:e})}set openNewTab(e){this.printOptions=o(r({},this.printOptions),{openNewTab:e})}set printStyle(e){super.setPrintStyle(e)}set styleSheetFile(e){super.setStyleSheetFile(e)}print(){super.print(this.printOptions)}static \u0275fac=(()=>{let e;return function(n){return(e||(e=f(i)))(n||i)}})();static \u0275dir=m({type:i,selectors:[["button","ngxPrint",""]],hostBindings:function(t,n){t&1&&v("click",function(){return n.print()})},inputs:{previewOnly:"previewOnly",printSectionId:"printSectionId",printTitle:"printTitle",useExistingCss:"useExistingCss",printDelay:"printDelay",closeWindow:"closeWindow",bodyClass:"bodyClass",openNewTab:"openNewTab",printStyle:"printStyle",styleSheetFile:"styleSheetFile"},features:[w]})}return i})(),k=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=S({type:i});static \u0275inj=y({})}return i})();export{$ as a,k as b};
